"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function askAI(prompt: string): Promise<string> {
  try {
    const ai = (await getCloudflareContext()).env.AI;

    const response = await ai.run("@cf/meta/llama-3.1-8b-instruct", { prompt });
    return response.response; // Return the response text
  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("Failed to fetch AI response");
  }
}
