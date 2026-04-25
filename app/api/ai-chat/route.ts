import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let payload: { message?: string; history?: Array<{ role: "system" | "user" | "assistant"; content: string }> };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Não foi possível interpretar a requisição. Revise os dados enviados e tente novamente." },
      { status: 400 }
    );
  }

  const message = payload?.message?.trim();

  if (!message) {
    return NextResponse.json(
      { error: "Envie uma mensagem válida para que o assistente possa responder." },
      { status: 400 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Configuração ausente: defina a variável OPENAI_API_KEY para habilitar o assistente." },
      { status: 503 }
    );
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a legal assistant specialized in the e-Proc system. Provide clear and practical step-by-step guidance."
        },
        ...(payload.history ?? []),
        { role: "user", content: message }
      ]
    });

    return NextResponse.json({ message: completion.choices[0]?.message?.content ?? "" });
  } catch (error) {
    const status = typeof error === "object" && error !== null && "status" in error && typeof error.status === "number"
      ? error.status
      : 502;

    return NextResponse.json(
      {
        error:
          "Não foi possível obter resposta da IA neste momento. Tente novamente em instantes ou verifique a configuração do provedor."
      },
      { status: status >= 400 && status < 600 ? status : 502 }
    );
  }
}
