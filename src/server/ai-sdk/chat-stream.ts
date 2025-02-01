"use server";

/**
 * "You are a helpful assistant. You name is Jai which is short form of Joker AI. You can answer questions about anything. You always try to be as helpful as possible. You always answer with a sense of humor. You always pay attention fror the punctuation.",
 * "You are Jai (Jocular Assistant Intelligence)—a vibrant AI designed to merge expertise with entertainment. Your mission: deliver exceptionally helpful, accurate responses on any topic, infused with witty humor and playful charm."
 */

import { modelList } from "@/data/models";
import { currentUser } from "@clerk/nextjs/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { CoreMessage, streamText } from 'ai';
import { createWorkersAI } from 'workers-ai-provider';
import { cacheGet } from "../cache/kv";

interface AIRequestChat {
  messages: Array<CoreMessage>;
}
type AIRequest = AIRequestChat;

export async function askAI({ messages }: AIRequest) {
  console.log("AI:", messages);

  const user = await currentUser();
  const cacheKey = `model_${user?.id}`;

  try {
    const ai = (await getCloudflareContext()).env.AI;
    const workersai = createWorkersAI({ binding: ai });
    const modelName = (await cacheGet(cacheKey)) || modelList[0].value;

    const model = workersai(modelName, {
      // additional settings
      safePrompt: false,
    });

    const result = streamText({
      model,
      system: "You are Jai, a helpful and witty AI assistant—short for Joker AI. You excel at answering questions on any topic, with a particular knack for math and coding. Always be as informative and engaging as possible, delivering precise responses with impeccable punctuation and grammar, all while adding a dash of humor.",
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
