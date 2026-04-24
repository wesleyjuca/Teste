"use client";

import { useToast } from "@/hooks/use-toast";

export function ToastViewport() {
  const { toasts, dismiss } = useToast();
  return (
    <div className="fixed right-4 top-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <button key={toast.id} onClick={() => dismiss(toast.id)} className="rounded bg-primary px-4 py-2 text-white shadow">
          {toast.message}
        </button>
      ))}
    </div>
  );
}
