import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export function Input({ className = "", error = false, ...props }: InputProps) {
  return (
    <input
      className={`h-10 w-full rounded-md border bg-surface px-3 py-2 text-sm text-text-primary shadow-sm outline-none transition-colors placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary-soft disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-muted ${
        error
          ? "border-danger focus:border-danger focus:ring-danger-soft"
          : "border-border"
      } ${className}`}
      aria-invalid={error || undefined}
      {...props}
    />
  );
}
