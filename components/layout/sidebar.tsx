"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";

type NavLink = {
  label: string;
  href: Route;
  exact?: boolean;
};

type NavGroup = {
  title: string;
  links: NavLink[];
};

const navGroups: NavGroup[] = [
  {
    title: "Início",
    links: [{ label: "Dashboard", href: "/dashboard", exact: true }]
  },
  {
    title: "Trilhas por perfil",
    links: [{ label: "Aprendizado", href: "/dashboard/lessons" }]
  },
  {
    title: "Ferramentas",
    links: [
      { label: "Simulador", href: "/simulator" },
      { label: "Assistente IA", href: "/assistant" }
    ]
  },
  {
    title: "Administração",
    links: [{ label: "Admin", href: "/admin" }]
  }
];

const profileQuickAccess: Array<{ label: string; href: string }> = [
  { label: "Advogado", href: "/dashboard/lessons?profile=advogado#modulos" },
  { label: "Jus Postulandi", href: "/dashboard/lessons?profile=jus-postulandi#modulos" },
  { label: "Pessoa Jurídica", href: "/dashboard/lessons?profile=pessoa-juridica#modulos" },
  { label: "Órgão Público", href: "/dashboard/lessons?profile=orgao-publico#modulos" }
];

function isActive(pathname: string, href: string, exact = false) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const activeByGroup = useMemo(
    () =>
      navGroups.reduce<Record<string, boolean>>((acc, group) => {
        acc[group.title] = group.links.some((link) => isActive(pathname, link.href, link.exact));
        return acc;
      }, {}),
    [pathname]
  );

  return (
    <>
      <h2 className="mb-6 text-xl font-semibold">Portal e-Proc Acre</h2>

      <nav className="space-y-5">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">{group.title}</p>
            <div className="space-y-1">
              {group.links.map((link) => {
                const active = isActive(pathname, link.href, link.exact);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onNavigate}
                    className={`block rounded px-3 py-2 text-sm transition ${
                      active
                        ? "bg-white text-primary shadow-sm"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            {activeByGroup[group.title] && <div className="mt-2 h-0.5 rounded bg-white/30" />}
          </div>
        ))}
      </nav>

      <section className="mt-8 rounded-xl border border-white/20 bg-white/5 p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/70">Acesso rápido por perfil</p>
        <div className="flex flex-wrap gap-2">
          {profileQuickAccess.map((item) => (
            <Link
              key={item.href}
              href={item.href as Route}
              onClick={onNavigate}
              className="rounded-full border border-white/20 px-3 py-1 text-xs text-white transition hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Abrir navegação"
        className="fixed left-4 top-4 z-40 rounded-lg bg-primary p-2 text-white shadow md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
          aria-label="Fechar navegação"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-primary p-4 text-white shadow-xl transition-transform md:static md:min-h-screen md:w-64 md:translate-x-0 md:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex justify-end md:hidden">
          <button
            type="button"
            aria-label="Fechar navegação"
            className="rounded-lg p-1 text-white/80 hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <SidebarContent pathname={pathname} onNavigate={() => setOpen(false)} />
      </aside>
    </>
  );
}
