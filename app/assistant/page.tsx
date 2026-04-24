"use client";

import { useChatStore } from "@/hooks/use-chat-store";
import { useState } from "react";

export default function AssistantPage() {
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = useState("");

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold text-primary">Assistente IA e-Proc</h1>
      <div className="mt-4 h-[480px] space-y-2 overflow-y-auto rounded-xl bg-white p-4">
        {messages.map((message, index) => (
          <div key={index} className={message.role === "assistant" ? "text-primary" : "text-slate-700"}>{message.content}</div>
        ))}
      </div>
      <form
        className="mt-4 flex gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!input.trim()) return;
          addMessage({ role: "user", content: input });
          const response = await fetch("/api/ai-chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input, history: messages })
          });
          const data = await response.json();
          addMessage({ role: "assistant", content: data.message ?? "Sem resposta" });
          setInput("");
        }}
      >
        <input className="flex-1 rounded border p-2" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Faça sua pergunta..." />
        <button className="rounded bg-primary px-4 py-2 text-white" type="submit">Enviar</button>
      </form>
    </main>
  );
}
