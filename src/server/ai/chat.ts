"use server";

export async function askAI(prompt: string): Promise<string> {
  if (typeof AI === "undefined") {
    return "AI is not available. Ensure you are running in the Cloudflare Worker runtime.";
  }

  try {
    // Use the AI binding to run a model
    const response = await AI.run("@cf/meta/llama-3.1-8b-instruct", { prompt });
    return response.text; // Return the response text
  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("Failed to fetch AI response");
  }
}
