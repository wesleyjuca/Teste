import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [lessons, updates, faqs] = await Promise.all([
    prisma.lesson.count(),
    prisma.update.count({ where: { published: true } }),
    Promise.resolve(12)
  ]);

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <Card title="Lessons" value={lessons} />
      <Card title="Updates" value={updates} />
      <Card title="FAQs" value={faqs} />
    </section>
  );
}
