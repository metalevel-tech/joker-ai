import { askAI } from "@/server/ai-sdk/chat-stream";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;


export async function POST(req: Request) {
	const { messages } = await req.json();

	return askAI({ messages });
}
