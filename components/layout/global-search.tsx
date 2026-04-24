"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Route } from "next";

const pages: Array<{ label: string; href: Route }> = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Módulos de Aprendizado", href: "/dashboard/lessons" },
  { label: "Simulador", href: "/simulator" },
  { label: "Assistente IA", href: "/assistant" },
  { label: "Admin", href: "/admin" }
];

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => pages.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())).slice(0, 5),
    [query]
  );

  return (
    <div className="relative w-full max-w-md">
      <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded border px-3 py-2" placeholder="Busca global" />
      {query && (
        <div className="absolute z-10 mt-1 w-full rounded border bg-white p-2 shadow">
          {filtered.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded px-2 py-1 hover:bg-surface">{item.label}</Link>
          ))}
        </div>
      )}
    </div>
  );
}
