import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeVariant = "neutral" | "brand" | "success" | "danger";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const badgeStyles: Record<BadgeVariant, string> = {
  neutral: "bg-surface-muted text-text",
  brand: "bg-brand-50 text-brand-700",
  success: "bg-success-bg text-success-fg",
  danger: "bg-danger-bg text-danger-fg"
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-1 text-xs font-semibold tracking-wide",
        badgeStyles[variant],
        className
      )}
      {...props}
    />
  );
}
