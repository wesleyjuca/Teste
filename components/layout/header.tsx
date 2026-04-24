import { GlobalSearch } from "@/components/layout/global-search";

export function Header() {
  return (
    <header className="flex items-center justify-between gap-4 border-b bg-white px-6 py-4">
      <h1 className="text-xl font-semibold text-primary">Painel Institucional</h1>
      <GlobalSearch />
    </header>
  );
}
