"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageContainer, PageHeader } from "@/components/ui/layout";
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
    <PageContainer className="max-w-3xl space-y-4">
      <PageHeader title="Simulador Interativo" description="Treino guiado de etapas críticas para reduzir falhas comuns de pré-cadastro e protocolo." />
      <Card>
        <Badge variant="brand">Etapa {index + 1}</Badge>
        <p className="mt-3 text-lg font-medium text-text">{steps[index]}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            variant="danger"
            onClick={() => setFeedback("Erro comum: ausência de conferência dos anexos obrigatórios.")}
          >
            Simular erro
          </Button>
          <Button
            variant="secondary"
            onClick={() => setFeedback("Procedimento correto: checklist final validado antes do protocolo.")}
          >
            Executar corretamente
          </Button>
          <Button onClick={() => setIndex((prev) => (prev + 1) % steps.length)}>Próxima etapa</Button>
        </div>
        {feedback ? (
          <p className="mt-4 rounded-md border border-border-subtle bg-surface-muted p-3 text-sm text-text">{feedback}</p>
        ) : null}
      </Card>
    </PageContainer>
  );
}
