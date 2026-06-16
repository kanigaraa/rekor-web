import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  children: ReactNode;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-primary-soft bg-primary-soft text-primary",
  secondary: "border-border bg-surface-muted text-text-secondary",
  success: "border-success-soft bg-success-soft text-success",
  warning: "border-warning-soft bg-warning-soft text-warning",
  danger: "border-danger-soft bg-danger-soft text-danger",
  info: "border-info-soft bg-info-soft text-info",
};

export function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
