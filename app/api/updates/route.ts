import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import sanitizeHtml from "sanitize-html";
import { NextResponse } from "next/server";

export async function GET() {
  const updates = await prisma.update.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(updates);
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const body = await request.json();
  const update = await prisma.update.create({ data: { title: body.title, body: sanitizeHtml(body.body), published: true } });
  return NextResponse.json(update, { status: 201 });
}
