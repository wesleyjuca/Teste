import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <article className={cn("surface-panel p-card", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold text-text", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("mt-2 text-sm text-text-muted", className)} {...props} />;
}

export function StatCard({ title, value, icon }: { title: string; value: string | number; icon?: ReactNode }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-text-muted">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-brand-600">{value}</p>
        </div>
        {icon ? <div className="rounded-md bg-brand-50 p-2 text-brand-600">{icon}</div> : null}
      </div>
    </Card>
  );
}
