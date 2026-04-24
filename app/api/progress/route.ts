import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { progressSchema } from "@/lib/validators";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const payload = progressSchema.safeParse(await request.json());
  if (!payload.success) return NextResponse.json({ error: payload.error.format() }, { status: 400 });

  const progress = await prisma.lessonProgress.upsert({
    where: { userId_lessonId: { userId: session.user.id, lessonId: payload.data.lessonId } },
    update: { percent: payload.data.percent, completed: payload.data.completed ?? payload.data.percent === 100 },
    create: { userId: session.user.id, lessonId: payload.data.lessonId, percent: payload.data.percent, completed: payload.data.percent === 100 }
  });

  return NextResponse.json(progress);
}
