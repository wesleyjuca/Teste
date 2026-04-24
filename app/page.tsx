import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase text-primary">Portal e-Proc Acre</p>
        <h1 className="mt-4 text-4xl font-bold text-primary">Facilitando a transição digital da advocacia no Acre</h1>
        <p className="mx-auto mt-4 max-w-3xl text-slate-600">
          Plataforma institucional da Comissão para capacitação jurídica, simulação de fluxos e apoio por inteligência artificial no sistema e-Proc.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link className="rounded-lg bg-primary px-6 py-3 text-white" href="/auth/login">Acessar plataforma</Link>
          <Link className="rounded-lg border border-primary px-6 py-3 text-primary" href="/dashboard">Iniciar aprendizado</Link>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-3">
        <div className="rounded-xl bg-surface p-6"><h3 className="font-semibold text-primary">Sobre a Comissão</h3><p className="mt-2 text-sm">Núcleo especializado em transformação digital da advocacia e adoção segura do e-Proc.</p></div>
        <div className="rounded-xl bg-surface p-6"><h3 className="font-semibold text-primary">Benefícios</h3><p className="mt-2 text-sm">Aprendizado estruturado, redução de erros e eficiência processual para advogados do Acre.</p></div>
        <div className="rounded-xl bg-surface p-6"><h3 className="font-semibold text-primary">Como funciona</h3><p className="mt-2 text-sm">Conteúdos, simulador prático, canal colaborativo, alertas e assistente especializado 24h.</p></div>
      </section>
    </main>
  );
}
