"use client";
import { create } from "zustand";

type Toast = { id: string; message: string };

interface ToastStore {
  toasts: Toast[];
  push: (message: string) => void;
  dismiss: (id: string) => void;
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  push: (message) => set((state) => ({ toasts: [...state.toasts, { id: crypto.randomUUID(), message }] })),
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
}));
