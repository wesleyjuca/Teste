import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen py-10">
      <section className="mx-auto max-w-6xl rounded-3xl border border-white/50 bg-white/95 px-6 py-16 text-center shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-secondary">Comissão de Acompanhamento da Transição de Sistemas do TJAC</p>
        <h1 className="mt-4 text-4xl font-bold text-primary md:text-5xl">Portal de Capacitação e-Proc — OAB Acre</h1>
        <p className="mx-auto mt-4 max-w-3xl text-slate-700">
          Ambiente institucional completo para formação prática no e-Proc, com trilhas por perfil de usuário externo,
          simulador de procedimentos, canal de suporte e atualização contínua.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link className="rounded-lg bg-primary px-6 py-3 text-white" href="/auth/login">Acessar plataforma</Link>
          <Link className="rounded-lg border border-primary px-6 py-3 font-medium text-primary" href="/dashboard/lessons">Ver trilha completa de aulas</Link>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-6xl gap-6 px-1 pb-16 md:grid-cols-3">
        <div className="rounded-2xl border border-white/60 bg-white/95 p-6"><h3 className="font-semibold text-primary">Identidade da Comissão</h3><p className="mt-2 text-sm text-slate-700">Estrutura visual inspirada no material oficial da Comissão e na paleta institucional vermelho, branco e azul.</p></div>
        <div className="rounded-2xl border border-white/60 bg-white/95 p-6"><h3 className="font-semibold text-primary">Aulas por perfil</h3><p className="mt-2 text-sm text-slate-700">Fluxos completos para advogado, jus postulandi, representante legal, perito, unidade externa e demais perfis do tutorial TJAC.</p></div>
        <div className="rounded-2xl border border-white/60 bg-white/95 p-6"><h3 className="font-semibold text-primary">Base oficial</h3><p className="mt-2 text-sm text-slate-700">Conteúdo modelado com base no PDF “Cadastro Usuário Externo eproc” (Portal eproc TJAC, nov/2024).</p></div>
      </section>
    </main>
  );
}
