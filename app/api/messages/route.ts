import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { messageSchema } from "@/lib/validators";
import sanitizeHtml from "sanitize-html";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const session = await auth();
  const payload = messageSchema.safeParse(await request.json());
  if (!payload.success) return NextResponse.json({ error: payload.error.format() }, { status: 400 });

  const message = await prisma.message.create({
    data: {
      ...payload.data,
      message: sanitizeHtml(payload.data.message),
      userId: session?.user.id
    }
  });

  return NextResponse.json(message, { status: 201 });
}
