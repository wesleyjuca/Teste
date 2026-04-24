import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h1 className="text-5xl font-bold text-primary">Facilitando a transição digital da advocacia no Acre</h1>
        <p className="mt-5 max-w-3xl text-lg text-slate-600">Capacitação, simulação prática e inteligência jurídica aplicada ao e-Proc em uma única plataforma institucional.</p>
        <div className="mt-8 flex gap-4">
          <Link href="/auth/login" className="rounded-lg bg-primary px-6 py-3 text-white">Acessar plataforma</Link>
          <Link href="/dashboard/lessons" className="rounded-lg border border-primary px-6 py-3 text-primary">Iniciar aprendizado</Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-2">
        <article className="rounded-xl bg-surface p-6"><h2 className="text-xl font-semibold text-primary">Sobre a Comissão</h2><p className="mt-2 text-slate-700">A Comissão e-Proc Acre atua na qualificação da advocacia, fortalecendo segurança jurídica e produtividade processual.</p></article>
        <article className="rounded-xl bg-surface p-6"><h2 className="text-xl font-semibold text-primary">Benefícios</h2><ul className="mt-2 list-disc pl-5 text-slate-700"><li>Redução de erros formais.</li><li>Padronização de rotinas.</li><li>Aumento da confiança operacional.</li></ul></article>
        <article className="rounded-xl bg-surface p-6"><h2 className="text-xl font-semibold text-primary">Como funciona</h2><p className="mt-2 text-slate-700">Diagnóstico, trilha de conteúdo, simulação guiada e atendimento assistido por IA.</p></article>
        <article className="rounded-xl bg-surface p-6"><h2 className="text-xl font-semibold text-primary">Depoimentos</h2><p className="mt-2 text-slate-700">“Passei a protocolar com segurança em poucos dias.” — Advogada, Rio Branco/AC</p></article>
      </section>
    </main>
  );
}
