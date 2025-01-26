"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { CoreMessage, generateText } from 'ai';
import { createWorkersAI } from 'workers-ai-provider';

interface AIRequestSimple {
  prompt: string;
}
interface AIRequestChat {
  messages: Array<CoreMessage>;
}
type AIRequest = AIRequestSimple | AIRequestChat;

export async function askAI(chat: AIRequest): Promise<string> {

  let prompt = undefined;
  let messages = undefined;

  if ("prompt" in chat) {
    prompt = chat.prompt;
  } else {
    messages = chat.messages;
  }

  console.log("AI:", chat, prompt, messages);

  try {
    const ai = (await getCloudflareContext()).env.AI;
    const workersai = createWorkersAI({ binding: ai });

    const model = workersai("@cf/meta/llama-3.1-8b-instruct", {
      // additional settings
      safePrompt: true,
    });

    const response = await generateText({
      model,
      system: "You are a helpful assistant. You can answer questions about anything. You always try to be as helpful as possible. You always with sense of humor.",
      prompt,
      messages
    });

    return response.text; // Return the response text
  } catch (error) {
    console.error("AI Error:", error);
    return "AI Response Not Available...";
  }
}
