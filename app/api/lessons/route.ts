import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import sanitizeHtml from "sanitize-html";
import { NextResponse } from "next/server";

export async function GET() {
  const lessons = await prisma.lesson.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(lessons);
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const body = await request.json();
  const lesson = await prisma.lesson.create({
    data: {
      slug: body.slug,
      title: body.title,
      module: body.module,
      content: sanitizeHtml(body.content ?? ""),
      steps: body.steps ?? [],
      videoUrl: body.videoUrl,
      order: body.order ?? 0
    }
  });
  return NextResponse.json(lesson, { status: 201 });
}
