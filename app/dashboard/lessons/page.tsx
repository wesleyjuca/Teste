import { prisma } from "@/lib/prisma";

export default async function LessonsPage() {
  const lessons = await prisma.lesson.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="space-y-4">
      {lessons.map((lesson) => (
        <article key={lesson.id} className="rounded-xl bg-white p-6">
          <h3 className="text-lg font-semibold text-primary">{lesson.title}</h3>
          <p className="mt-2 text-slate-700">{lesson.content}</p>
          <ol className="mt-3 list-decimal pl-5 text-sm text-slate-600">
            {lesson.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
          {lesson.videoUrl ? <iframe className="mt-4 h-64 w-full rounded" src={lesson.videoUrl} title={lesson.title} /> : null}
        </article>
      ))}
    </div>
  );
}
