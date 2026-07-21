import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google('gemini-1.5-pro-latest'),
      system: "You are the AI Tutor for the 'Yi AI Course'. Your goal is to help students learn about LLMs, Prompt Engineering, AI Agents, and how to build SaaS applications. Be encouraging, concise, and highly technical when appropriate. Format your responses using markdown.",
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("AI Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to fetch response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
