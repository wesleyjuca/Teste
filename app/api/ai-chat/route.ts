import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const { message, history } = await request.json();

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a legal assistant specialized in the e-Proc system. Provide clear and practical step-by-step guidance." },
      ...(history ?? []),
      { role: "user", content: message }
    ]
  });

  return NextResponse.json({ message: completion.choices[0]?.message?.content ?? "" });
}
