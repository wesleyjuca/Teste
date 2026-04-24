import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().trim().min(3).refine((value) => /\S+@\S+/.test(value), {
    message: "Email inválido"
  }),
  password: z.string().min(8)
});

export const messageSchema = z.object({
  name: z.string().min(3),
  oab: z.string().min(5),
  message: z.string().min(10).max(2000)
});

export const progressSchema = z.object({
  lessonId: z.string().cuid(),
  percent: z.number().int().min(0).max(100),
  completed: z.boolean().optional()
});
