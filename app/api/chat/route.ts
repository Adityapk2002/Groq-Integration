
import { OpenAIStream, StreamingTextResponse } from "ai";
import  OpenAI  from "openai";

const openai = new OpenAI({
    apiKey : process.env.GROQ_API_KEY,
    baseURL : "https://api.groq.com/openai/v1"
})
export async function POST(req : Request){
    const {messages} = await req.json()

    const response = await openai.chat.completions.create({
    model: "llama3-70b-8192", 
    stream : true,
    messages,
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stream = OpenAIStream(response as any)

  return new StreamingTextResponse(stream)
}