"use client";

import { useState } from "react";

const steps = [
  "Selecione a classe processual",
  "Anexe documentos assinados",
  "Revise dados das partes",
  "Protocole e emita comprovante"
];

export default function SimulatorPage() {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState("");

  return (
    <main className="mx-auto max-w-3xl space-y-4 p-6">
      <h1 className="text-2xl font-bold text-primary">Simulador Interativo</h1>
      <div className="rounded-xl bg-white p-6">
        <p className="font-medium">Etapa {index + 1}</p>
        <p className="mt-2">{steps[index]}</p>
        <div className="mt-4 flex gap-3">
          <button
            className="rounded bg-red-100 px-4 py-2 text-red-700"
            onClick={() => setFeedback("Erro comum: ausência de conferência dos anexos obrigatórios.")}
          >
            Simular erro
          </button>
          <button
            className="rounded bg-green-100 px-4 py-2 text-green-700"
            onClick={() => setFeedback("Procedimento correto: checklist final validado antes do protocolo.")}
          >
            Executar corretamente
          </button>
          <button
            className="rounded bg-primary px-4 py-2 text-white"
            onClick={() => setIndex((prev) => (prev + 1) % steps.length)}
          >
            Próxima etapa
          </button>
        </div>
        {feedback ? <p className="mt-4 rounded bg-surface p-3 text-sm">{feedback}</p> : null}
      </div>
    </main>
  );
}
