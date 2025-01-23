"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";

interface AIRequestSimple {
  prompt: string;
}
interface AIRequestChat {
  messages: { role: 'system' | 'user', content: string; }[];
}
type AIRequest = AIRequestSimple | AIRequestChat;

export async function askAI(chat: AIRequest): Promise<string> {
  console.log("AI Prompt:", chat);

  try {
    const ai = (await getCloudflareContext()).env.AI;

    const response = await ai.run("@cf/meta/llama-3.1-8b-instruct", chat);
    return response.response; // Return the response text
  } catch (error) {
    console.error("AI Error:", error);
    return "AI Response Not Available...";
  }
}
