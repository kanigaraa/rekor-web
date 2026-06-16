import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export function Textarea({
  className = "",
  error = false,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={`min-h-28 w-full resize-y rounded-md border bg-surface px-3 py-2 text-sm text-text-primary shadow-sm outline-none transition-colors placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary-soft disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-muted ${
        error
          ? "border-danger focus:border-danger focus:ring-danger-soft"
          : "border-border"
      } ${className}`}
      aria-invalid={error || undefined}
      {...props}
    />
  );
}
