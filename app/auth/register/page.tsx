"use client";

import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const { push } = useToast();

  return (
    <main className="mx-auto mt-24 max-w-md rounded-xl bg-white p-8 shadow">
      <h1 className="text-2xl font-bold text-primary">Cadastrar</h1>
      <form
        className="mt-4 space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(form))
          });
          push(response.ok ? "Cadastro realizado com sucesso" : "Falha ao cadastrar");
        }}
      >
        <input className="w-full rounded border p-2" name="name" placeholder="Nome" required />
        <input className="w-full rounded border p-2" name="email" type="email" placeholder="Email" required />
        <input className="w-full rounded border p-2" name="password" type="password" placeholder="Senha" required />
        <button className="w-full rounded bg-primary p-2 text-white" type="submit">Criar conta</button>
      </form>
    </main>
  );
}
