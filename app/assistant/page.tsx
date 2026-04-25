"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageContainer, PageHeader } from "@/components/ui/layout";
import { useChatStore } from "@/hooks/use-chat-store";
import { FormEvent, useState } from "react";

export default function AssistantPage() {
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;

    const currentInput = input;
    addMessage({ role: "user", content: currentInput });
    setInput("");

    const response = await fetch("/api/ai-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: currentInput, history: messages })
    });

    if (!response.ok) {
      addMessage({ role: "assistant", content: "Não foi possível obter uma resposta no momento." });
      return;
    }

    const data = await response.json();
    addMessage({ role: "assistant", content: data.message ?? "Sem resposta" });
  };

  return (
    <PageContainer className="max-w-4xl">
      <PageHeader
        title="Assistente IA e-Proc"
        description="Canal rápido para dúvidas sobre fluxos do sistema, validações de cadastro e boas práticas para protocolo."
        actions={<Badge variant="brand">Beta</Badge>}
      />

      <Card className="h-[480px] space-y-3 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-sm text-text-muted">Comece a conversa perguntando sobre cadastro, anexação de documentos ou protocolo.</p>
        ) : null}
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.role === "assistant" ? "rounded-md bg-brand-50 p-3 text-brand-700" : "rounded-md bg-surface-muted p-3 text-text"}
          >
            {message.content}
          </div>
        ))}
      </Card>

      <form className="mt-4 flex gap-2" onSubmit={handleSubmit}>
        <input
          className="flex-1 rounded-md border border-border-subtle bg-surface-elevated px-3 py-2 text-sm text-text placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Faça sua pergunta..."
        />
        <Button type="submit">Enviar</Button>
      </form>
    </PageContainer>
  );
}
