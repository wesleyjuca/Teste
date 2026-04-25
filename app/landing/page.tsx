import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/layout";
import Link from "next/link";

const highlights = [
  {
    title: "Sobre a Comissão",
    content:
      "A Comissão de Acompanhamento da Transição de Sistemas do TJAC, em parceria com a OAB Acre, coordena a qualificação para uso seguro do e-Proc."
  },
  {
    title: "Escopo das aulas",
    content: "Cadastro e validação por perfil, documentos obrigatórios, suporte com NUSAN e canais oficiais do TJAC."
  },
  {
    title: "Metodologia",
    content: "Conteúdo objetivo, checklist prático e simulações para reduzir erros de pré-cadastro e habilitação."
  },
  {
    title: "Fonte primária",
    content: "Tutorial “Cadastro Usuário Externo eproc”, disponibilizado no Portal eproc TJAC (novembro/2024)."
  }
];

export default function LandingPage() {
  return (
    <PageContainer className="min-h-screen py-10">
      <section className="surface-panel px-6 py-16 text-center md:px-10">
        <Badge variant="brand" className="mx-auto">
          Comissão de Acompanhamento da Transição de Sistemas do TJAC
        </Badge>
        <h1 className="mx-auto mt-4 max-w-4xl text-display text-brand-700">Capacitação completa para transição ao e-Proc no TJAC</h1>
        <p className="mx-auto mt-5 max-w-3xl text-base text-text-muted md:text-lg">
          Trilha estruturada para todos os perfis de usuário externo, com passo a passo de cadastro, documentação, validação e acesso.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/auth/login" className={buttonClasses({ size: "lg" })}>Acessar plataforma</Link>
          <Link href="/dashboard/lessons" className={cn(buttonClasses({ variant: "secondary", size: "lg" }))}>
            Iniciar aprendizado
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-6 pb-16 md:grid-cols-2">
        {highlights.map((item) => (
          <Card key={item.title}>
            <CardTitle className="text-brand-700">{item.title}</CardTitle>
            <CardDescription className="text-base leading-relaxed">{item.content}</CardDescription>
          </Card>
        ))}
      </section>
    </PageContainer>
  );
}
