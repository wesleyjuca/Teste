import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-text-inverse hover:bg-brand-500 active:bg-brand-700 disabled:bg-brand-600/60 disabled:text-text-inverse/80",
  secondary:
    "border border-brand-600 bg-surface-elevated text-brand-600 hover:bg-brand-50 active:bg-brand-100 disabled:border-border-strong disabled:text-text-muted",
  ghost:
    "bg-transparent text-text hover:bg-surface-muted active:bg-surface-muted/80 disabled:text-text-muted",
  danger: "bg-accent-500 text-text-inverse hover:bg-accent-600 active:bg-accent-600/90 disabled:bg-accent-500/70"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base"
};

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: ButtonVariant; size?: ButtonSize; className?: string }) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

export function Button({ className, variant = "primary", size = "md", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...props} />;
}
