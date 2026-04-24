import Link from "next/link";

const links = [
  ["Dashboard", "/dashboard"],
  ["Aprendizado", "/dashboard/lessons"],
  ["Simulador", "/simulator"],
  ["Assistente IA", "/assistant"],
  ["Admin", "/admin"]
];

export function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-primary p-4 text-white">
      <h2 className="mb-6 text-xl font-semibold">Portal e-Proc Acre</h2>
      <nav className="space-y-2">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="block rounded px-3 py-2 hover:bg-white/10">{label}</Link>
        ))}
      </nav>
    </aside>
  );
}
