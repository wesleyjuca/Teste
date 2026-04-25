export const dynamic = "force-dynamic";

import { StatCard } from "@/components/ui/card";
import { PageContainer, PageHeader } from "@/components/ui/layout";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [lessons, updates, faqs] = await Promise.all([
    prisma.lesson
      .count()
      .catch(() => 0),
    prisma.update
      .count({ where: { published: true } })
      .catch(() => 0),
    Promise.resolve(12)
  ]);

  return (
    <PageContainer>
      <PageHeader title="Dashboard" description="Indicadores rápidos da trilha de capacitação e-Proc e do conteúdo institucional publicado." />
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard title="Lessons" value={lessons} />
        <StatCard title="Updates" value={updates} />
        <StatCard title="FAQs" value={faqs} />
      </section>
    </PageContainer>
  );
}
