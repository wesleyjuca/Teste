import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export function PageContainer({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <main className={cn("mx-auto w-full max-w-6xl p-gutter", className)} {...props} />;
}

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn("surface-panel p-card", className)} {...props} />;
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-2">
        <h1 className="text-h1">{title}</h1>
        {description ? <p className="max-w-3xl text-base text-text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
