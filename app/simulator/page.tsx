"use client";

import { useState } from "react";

const steps = [
  "Selecione a classe processual",
  "Anexe documentos assinados",
  "Revise dados das partes",
  "Protocole e emita comprovante"
];

const commonErrors = [
  {
    title: "Anexo obrigatório ausente",
    correction: "Volte para a etapa de anexos e confira a lista mínima exigida antes de prosseguir."
  },
  {
    title: "Dados das partes incompletos",
    correction: "Revise CPF/CNPJ, polo processual e representação antes de protocolar."
  },
  {
    title: "Fluxo institucional sem validação NUSAN",
    correction: "Encaminhe previamente documentos de credenciamento ao NUSAN para perfis institucionais."
  }
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

      <section className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-lg font-semibold text-amber-900">Erros comuns e como corrigir</h2>
        <ul className="mt-3 space-y-3 text-sm text-amber-950">
          {commonErrors.map((item) => (
            <li key={item.title}>
              <p className="font-semibold">{item.title}</p>
              <p>{item.correction}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
