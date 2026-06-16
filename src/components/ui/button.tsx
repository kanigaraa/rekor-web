import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
  loadingText?: string;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover focus-visible:outline-primary",
  secondary:
    "border-surface-muted bg-surface-muted text-text-primary hover:border-border hover:bg-[#E8EEF6] focus-visible:outline-primary",
  outline:
    "border-border bg-surface text-text-primary hover:bg-surface-muted focus-visible:outline-primary",
  ghost:
    "border-transparent bg-transparent text-text-secondary hover:bg-surface-muted hover:text-text-primary focus-visible:outline-primary",
  danger:
    "border-danger bg-danger text-white hover:border-[#B91C1C] hover:bg-[#B91C1C] focus-visible:outline-danger",
};

export function Button({
  variant = "default",
  isLoading = false,
  loadingText,
  className = "",
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <span
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : null}
      {isLoading && loadingText ? loadingText : children}
    </button>
  );
}
