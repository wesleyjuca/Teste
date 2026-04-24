import { prisma } from "@/lib/prisma";

export async function listLessonModules() {
  return prisma.lesson.findMany({ select: { id: true, title: true, module: true, order: true }, orderBy: { order: "asc" } });
}
