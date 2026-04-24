import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = registerSchema.safeParse(await request.json());
  if (!payload.success) return NextResponse.json({ error: payload.error.format() }, { status: 400 });

  const exists = await prisma.user.findUnique({ where: { email: payload.data.email } });
  if (exists) return NextResponse.json({ error: "Email já cadastrado" }, { status: 409 });

  const passwordHash = await bcrypt.hash(payload.data.password, 10);
  await prisma.user.create({ data: { ...payload.data, passwordHash } });

  return NextResponse.json({ ok: true }, { status: 201 });
}
