"use client";

import { useEffect, useMemo, useState } from "react";

type Lesson = {
  id: string;
  module: string;
  title: string;
  content: string;
  steps: string[];
};

type OperationsPayload = {
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
    level: string;
    editorialReviewedAt: string;
    normativeSource: string;
  }>;
  checklist: Array<{
    id: string;
    title: string;
    description: string;
    level: string;
    editorialReviewedAt: string;
    normativeSource: string;
  }>;
};

const levelLabels: Record<string, string> = {
  FUNDAMENTOS: "Fundamentos",
  OPERACAO_DIARIA: "Operação diária",
  CASOS_ESPECIAIS: "Casos especiais"
};

const commonErrors = [
  {
    error: "Cadastro sem documentação mínima",
    correction: "Revisar checklist de validação e anexar documentos obrigatórios antes do envio."
  },
  {
    error: "Classe processual incompatível com a petição",
    correction: "Conferir tabela de classes e validar o tipo de petição antes do protocolo."
  },
  {
    error: "Fluxo institucional enviado ao canal incorreto",
    correction: "Encaminhar pedidos institucionais diretamente para nusan@tjac.jus.br com identificação do perfil."
  }
];

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [operations, setOperations] = useState<OperationsPayload>({ faqs: [], checklist: [] });

  useEffect(() => {
    async function loadData() {
      const [lessonsRes, operationsRes] = await Promise.all([fetch("/api/lessons"), fetch("/api/operations")]);
      const lessonsJson: Lesson[] = await lessonsRes.json();
      const operationsJson: OperationsPayload = await operationsRes.json();
      setLessons(lessonsJson);
      setOperations(operationsJson);
    }

    loadData();
  }, []);

  const groupedFaqs = useMemo(() => {
    return operations.faqs.reduce<Record<string, OperationsPayload["faqs"]>>((acc, faq) => {
      const level = faq.level;
      if (!acc[level]) acc[level] = [];
      acc[level].push(faq);
      return acc;
    }, {});
  }, [operations.faqs]);

  const groupedChecklist = useMemo(() => {
    return operations.checklist.reduce<Record<string, OperationsPayload["checklist"]>>((acc, item) => {
      const level = item.level;
      if (!acc[level]) acc[level] = [];
      acc[level].push(item);
      return acc;
    }, {});
  }, [operations.checklist]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/60 bg-white/95 p-5 text-sm text-slate-700">
        Trilha oficial baseada no tutorial do Portal eproc TJAC: <strong>Cadastro Usuário Externo eproc</strong>.
      </section>

      {lessons.map((lesson) => (
        <article key={lesson.id} className="rounded-2xl border border-white/60 bg-white/95 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{lesson.module}</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">{lesson.title}</h3>
          <p className="mt-2 text-slate-700">{lesson.content}</p>
          <ol className="mt-3 list-decimal pl-5 text-sm text-slate-600">
            {lesson.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
      ))}

      <section className="rounded-2xl border border-white/60 bg-white/95 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-primary">FAQ e checklist operacional</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {Object.keys(levelLabels).map((level) => (
            <div key={level} className="rounded-xl border border-slate-100 p-4">
              <h3 className="font-semibold text-slate-800">{levelLabels[level]}</h3>
              <ul className="mt-2 space-y-3 text-sm text-slate-700">
                {(groupedFaqs[level] ?? []).map((faq) => (
                  <li key={faq.id}>
                    <p className="font-medium">{faq.question}</p>
                    <p>{faq.answer}</p>
                    <p className="text-xs text-slate-500">
                      Revisão editorial: {new Date(faq.editorialReviewedAt).toLocaleDateString("pt-BR")} · Fonte:
                      {" "}
                      {faq.normativeSource}
                    </p>
                  </li>
                ))}
              </ul>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {(groupedChecklist[level] ?? []).map((item) => (
                  <li key={item.id} className="rounded bg-slate-50 p-2">
                    <p className="font-medium">{item.title}</p>
                    <p>{item.description}</p>
                    <p className="text-xs text-slate-500">
                      Revisão editorial: {new Date(item.editorialReviewedAt).toLocaleDateString("pt-BR")} · Fonte:
                      {" "}
                      {item.normativeSource}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-amber-900">Erros comuns e como corrigir</h2>
        <ul className="mt-3 space-y-3 text-sm text-amber-950">
          {commonErrors.map((item) => (
            <li key={item.error}>
              <p className="font-semibold">{item.error}</p>
              <p>{item.correction}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
