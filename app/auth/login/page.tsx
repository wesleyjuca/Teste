"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");

  return (
    <main className="mx-auto mt-24 max-w-md rounded-xl bg-white p-8 shadow">
      <h1 className="text-2xl font-bold text-primary">Entrar</h1>
      <form
        className="mt-4 space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const result = await signIn("credentials", {
            email: form.get("email"),
            password: form.get("password"),
            redirect: true,
            callbackUrl: "/dashboard"
          });
          if (result?.error) setError("Credenciais inválidas");
        }}
      >
        <input className="w-full rounded border p-2" name="email" type="email" placeholder="Email" required />
        <input className="w-full rounded border p-2" name="password" type="password" placeholder="Senha" required />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button className="w-full rounded bg-primary p-2 text-white" type="submit">Acessar</button>
      </form>
    </main>
  );
}
