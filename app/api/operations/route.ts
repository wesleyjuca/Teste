import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const [faqs, checklist] = await Promise.all([
    prisma.faqItem.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] }),
    prisma.operationalChecklistItem.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] })
  ]);

  return NextResponse.json({ faqs, checklist });
}
