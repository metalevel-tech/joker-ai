"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { CoreMessage, streamText } from 'ai';
import { createWorkersAI } from 'workers-ai-provider';

interface AIRequestChat {
  messages: Array<CoreMessage>;
}
type AIRequest = AIRequestChat;

export async function askAI({ messages }: AIRequest) {
  console.log("AI:", messages);

  try {
    const ai = (await getCloudflareContext()).env.AI;
    const workersai = createWorkersAI({ binding: ai });

    const model = workersai("@cf/meta/llama-3.1-8b-instruct", {
      // additional settings
      safePrompt: false,
    });

    const result = streamText({
      model,
      system: "You are a helpful assistant. You name is Jai from Joker AI. You can answer questions about anything. You always try to be as helpful as possible. You always with sense of humor. You always explain all possible details.",
      messages
    });

    return result.toDataStreamResponse({
      headers: {
        // add these headers to ensure that the
        // response is chunked and streamed
        "Content-Type": "text/x-unknown",
        "content-encoding": "identity",
        "transfer-encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
}
