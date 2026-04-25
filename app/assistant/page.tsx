"use client";

import { useChatStore } from "@/hooks/use-chat-store";
import { FormEvent, useMemo, useState } from "react";

const SUGESTOES_INICIAIS = [
  "Como distribuir uma nova ação no e-Proc?",
  "Quais documentos preciso para cumprir uma intimação?",
  "Como acompanhar o andamento de um processo?"
];

export default function AssistantPage() {
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastPayload, setLastPayload] = useState<{ message: string; history: typeof messages } | null>(null);

  const hasMessages = messages.length > 0;

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  const sendMessage = async (payload: { message: string; history: typeof messages }) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "Não foi possível responder agora. Tente novamente em instantes.");
      }

      addMessage({ role: "assistant", content: data.message ?? "Sem resposta" });
      setInput("");
      setLastPayload(null);
    } catch (error) {
      const friendlyMessage = error instanceof Error
        ? error.message
        : "Ocorreu um erro inesperado. Verifique sua conexão e tente novamente.";

      setErrorMessage(friendlyMessage);
      setLastPayload(payload);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const payload = { message: trimmedInput, history: messages };
    addMessage({ role: "user", content: trimmedInput });

    await sendMessage(payload);
  };

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold text-primary">Assistente IA e-Proc</h1>

      <div className="mt-4 h-[480px] space-y-3 overflow-y-auto rounded-xl bg-white p-4">
        {!hasMessages && !isLoading && (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-medium text-slate-700">Comece por uma destas perguntas frequentes:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {SUGESTOES_INICIAIS.map((sugestao) => (
                <li key={sugestao}>{sugestao}</li>
              ))}
            </ul>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={message.role === "assistant" ? "text-primary" : "text-slate-700"}
          >
            {message.content}
          </div>
        ))}

        {isLoading && (
          <div className="inline-flex w-fit items-center gap-1 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-600">
            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
            <span className="ml-2">Gerando resposta...</span>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <p>{errorMessage}</p>
          <button
            className="mt-2 rounded bg-red-600 px-3 py-1.5 text-white disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => lastPayload && sendMessage(lastPayload)}
            disabled={isLoading || !lastPayload}
            type="button"
          >
            Tentar novamente
          </button>
        </div>
      )}

      <form className="mt-4 flex gap-2" onSubmit={handleSubmit}>
        <input
          className="flex-1 rounded border p-2 disabled:cursor-not-allowed disabled:bg-slate-100"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Faça sua pergunta..."
          disabled={isLoading}
        />
        <button
          className="rounded bg-primary px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={!canSend}
        >
          {isLoading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </main>
  );
}
