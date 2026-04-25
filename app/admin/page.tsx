import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { PageContainer, PageHeader } from "@/components/ui/layout";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/dashboard");

  const [users, messages, updates] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.update.findMany({ orderBy: { createdAt: "desc" }, take: 10 })
  ]);

  return (
    <PageContainer className="space-y-6">
      <PageHeader title="Painel administrativo" description="Visão rápida dos dados mais recentes de usuários, mensagens e atualizações." />

      <Card>
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-brand-700">Usuários</CardTitle>
          <Badge variant="brand">{users.length} registros</Badge>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-text-muted">
          {users.map((u) => (
            <li key={u.id} className="rounded-md bg-surface-muted px-3 py-2 text-text">
              {u.name} • {u.email} • {u.role}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-brand-700">Mensagens colaborativas</CardTitle>
          <Badge>{messages.length} itens</Badge>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-text-muted">
          {messages.map((m) => (
            <li key={m.id} className="rounded-md bg-surface-muted px-3 py-2 text-text">
              {m.name} ({m.oab}): {m.message}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-brand-700">Atualizações</CardTitle>
          <Badge variant="success">{updates.length} publicações</Badge>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-text-muted">
          {updates.map((u) => (
            <li key={u.id} className="rounded-md bg-surface-muted px-3 py-2 text-text">
              {u.title}
            </li>
          ))}
        </ul>
      </Card>
    </PageContainer>
  );
}
