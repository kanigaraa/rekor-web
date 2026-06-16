import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface px-6 py-10 text-center ${className}`}
    >
      {icon ? (
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary-soft text-primary">
          {icon}
        </div>
      ) : null}
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-md text-sm leading-6 text-text-muted">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
