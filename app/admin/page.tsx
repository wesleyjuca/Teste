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
    <main className="space-y-6 p-6">
      <section className="rounded-xl bg-white p-6"><h2 className="font-semibold text-primary">Usuários</h2><ul className="mt-3 space-y-2 text-sm">{users.map((u) => <li key={u.id}>{u.name} • {u.email} • {u.role}</li>)}</ul></section>
      <section className="rounded-xl bg-white p-6"><h2 className="font-semibold text-primary">Mensagens colaborativas</h2><ul className="mt-3 space-y-2 text-sm">{messages.map((m) => <li key={m.id}>{m.name} ({m.oab}): {m.message}</li>)}</ul></section>
      <section className="rounded-xl bg-white p-6"><h2 className="font-semibold text-primary">Atualizações</h2><ul className="mt-3 space-y-2 text-sm">{updates.map((u) => <li key={u.id}>{u.title}</li>)}</ul></section>
    </main>
  );
}
