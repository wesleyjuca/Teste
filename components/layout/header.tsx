"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { GlobalSearch } from "@/components/layout/global-search";

const segmentLabels: Record<string, string> = {
  dashboard: "Painel",
  lessons: "Trilhas de Aprendizado",
  simulator: "Simulador",
  assistant: "Assistente IA",
  admin: "Administração"
};

const contextDescriptions: Array<{ match: RegExp; text: string }> = [
  { match: /^\/dashboard\/lessons/, text: "Navegue pelos módulos de aula por perfil profissional." },
  { match: /^\/simulator/, text: "Execute simulações guiadas de peticionamento no e-Proc." },
  { match: /^\/assistant/, text: "Use a IA para consultar procedimentos e modelos de atuação." },
  { match: /^\/admin/, text: "Gerencie trilhas, conteúdos e permissões da plataforma." },
  { match: /^\/dashboard$/, text: "Acompanhe indicadores e acesse rapidamente as áreas do portal." }
];

function humanizeSegment(segment: string) {
  return segmentLabels[segment] ?? segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function Header() {
  const pathname = usePathname();

  const crumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);

    return segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      return { href, label: humanizeSegment(segment), current: index === segments.length - 1 };
    });
  }, [pathname]);

  const context = useMemo(
    () => contextDescriptions.find((item) => item.match.test(pathname))?.text ?? "Visualize informações e acesse recursos relacionados à página atual.",
    [pathname]
  );

  return (
    <header className="border-b bg-white px-6 py-4 pl-16 md:pl-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
            <Link href="/dashboard" className="font-medium text-primary hover:underline">
              Início
            </Link>
            {crumbs.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-1">
                <ChevronRight className="h-4 w-4" />
                {crumb.current ? (
                  <span className="font-semibold text-slate-700">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:underline">
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>

          <div>
            <h1 className="text-xl font-semibold text-primary">{crumbs[crumbs.length - 1]?.label ?? "Painel Institucional"}</h1>
            <p className="text-sm text-slate-600">{context}</p>
          </div>
        </div>

        <GlobalSearch />
      </div>
    </header>
  );
}
