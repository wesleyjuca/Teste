export const dynamic = "force-dynamic";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageContainer, PageHeader, Section } from "@/components/ui/layout";
import { prisma } from "@/lib/prisma";

export default async function LessonsPage() {
  const lessons = await prisma.lesson.findMany({ orderBy: { order: "asc" } });

  return (
    <PageContainer className="space-y-4">
      <PageHeader
        title="Trilha oficial de aulas"
        description="Conteúdo baseado no tutorial do Portal eproc TJAC para cadastro de usuário externo e procedimentos essenciais."
      />
      <Section className="text-sm">
        Trilha oficial baseada no tutorial do Portal eproc TJAC: <strong className="text-text">Cadastro Usuário Externo eproc</strong>.
      </Section>
      {lessons.map((lesson) => (
        <Card key={lesson.id}>
          <Badge variant="brand">{lesson.module}</Badge>
          <CardTitle className="mt-3 text-brand-700">{lesson.title}</CardTitle>
          <CardDescription className="text-base leading-relaxed">{lesson.content}</CardDescription>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-text-muted">
            {lesson.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Card>
      ))}
    </PageContainer>
  );
}
