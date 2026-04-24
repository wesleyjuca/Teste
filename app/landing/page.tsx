import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen py-10">
      <section className="mx-auto max-w-6xl rounded-3xl border border-white/60 bg-white/95 px-6 py-20">
        <h1 className="text-4xl font-bold text-primary md:text-5xl">Capacitação completa para transição ao e-Proc no TJAC</h1>
        <p className="mt-5 max-w-3xl text-lg text-slate-700">Trilha estruturada para todos os perfis de usuário externo, com passo a passo de cadastro, documentação, validação e acesso.</p>
        <div className="mt-8 flex gap-4">
          <Link href="/auth/login" className="rounded-lg bg-primary px-6 py-3 text-white">Acessar plataforma</Link>
          <Link href="/dashboard/lessons" className="rounded-lg border border-primary px-6 py-3 text-primary">Iniciar aprendizado</Link>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-6xl gap-6 px-1 pb-16 md:grid-cols-2">
        <article className="rounded-2xl border border-white/60 bg-white/95 p-6"><h2 className="text-xl font-semibold text-primary">Sobre a Comissão</h2><p className="mt-2 text-slate-700">A Comissão de Acompanhamento da Transição de Sistemas do TJAC, em parceria com a OAB Acre, coordena a qualificação para uso seguro do e-Proc.</p></article>
        <article className="rounded-2xl border border-white/60 bg-white/95 p-6"><h2 className="text-xl font-semibold text-primary">Escopo das aulas</h2><ul className="mt-2 list-disc pl-5 text-slate-700"><li>Cadastro e validação por perfil.</li><li>Documentos obrigatórios para credenciamento.</li><li>Fluxo de suporte com NUSAN e canais TJAC.</li></ul></article>
        <article className="rounded-2xl border border-white/60 bg-white/95 p-6"><h2 className="text-xl font-semibold text-primary">Metodologia</h2><p className="mt-2 text-slate-700">Conteúdo textual objetivo, checklist prático e simulações das etapas críticas para reduzir erros de pré-cadastro e habilitação.</p></article>
        <article className="rounded-2xl border border-white/60 bg-white/95 p-6"><h2 className="text-xl font-semibold text-primary">Fonte primária</h2><p className="mt-2 text-slate-700">Tutorial “Cadastro Usuário Externo eproc”, disponibilizado no Portal eproc TJAC (publicação de novembro/2024).</p></article>
      </section>
    </main>
  );
}
