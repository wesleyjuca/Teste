"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-red-600">Falha ao carregar conteúdo.</h2>
      <button className="mt-4 rounded bg-primary px-4 py-2 text-white" onClick={() => reset()}>Tentar novamente</button>
    </div>
  );
}
