export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

const profileNames: Record<string, string> = {
  advogado: "Advogado",
  "jus-postulandi": "Jus Postulandi",
  "pessoa-juridica": "Pessoa Jurídica",
  "orgao-publico": "Órgão Público"
};

export default async function LessonsPage({
  searchParams
}: {
  searchParams?: Promise<{ profile?: string }>;
}) {
  const lessons = await prisma.lesson.findMany({ orderBy: { order: "asc" } });
  const resolvedSearchParams = (await searchParams) ?? {};
  const selectedProfile = resolvedSearchParams.profile;
  const selectedProfileName = selectedProfile ? profileNames[selectedProfile] : null;

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-white/60 bg-white/95 p-5 text-sm text-slate-700">
        Trilha oficial baseada no tutorial do Portal eproc TJAC: <strong>Cadastro Usuário Externo eproc</strong>.
        {selectedProfileName && (
          <p className="mt-2 rounded-lg bg-primary/5 px-3 py-2 text-primary">
            Perfil selecionado: <strong>{selectedProfileName}</strong>.
          </p>
        )}
      </section>

      <section id="modulos" className="space-y-4">
        {lessons.map((lesson) => (
          <article key={lesson.id} className="rounded-2xl border border-white/60 bg-white/95 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{lesson.module}</p>
            <h3 className="mt-1 text-lg font-semibold text-primary">{lesson.title}</h3>
            <p className="mt-2 text-slate-700">{lesson.content}</p>
            <ol className="mt-3 list-decimal pl-5 text-sm text-slate-600">
              {lesson.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        ))}
      </section>
    </div>
  );
}
