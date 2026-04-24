export function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-primary">{value}</p>
    </div>
  );
}
