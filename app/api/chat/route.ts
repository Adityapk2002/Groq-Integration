
import { OpenAIStream, StreamingTextResponse } from "ai";
import  OpenAI  from "openai";

const openai = new OpenAI({
    apiKey : process.env.GROQ_API_KEY,
    baseURL : "https://api.groq.com/openai/v1"
})
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      stream: true,
      messages,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stream = OpenAIStream(response as any);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
