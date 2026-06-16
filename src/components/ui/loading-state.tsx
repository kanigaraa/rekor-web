type LoadingStateProps = {
  label?: string;
  className?: string;
};

export function LoadingState({
  label = "Loading...",
  className = "",
}: LoadingStateProps) {
  return (
    <div
      className={`flex min-h-40 items-center justify-center gap-3 text-sm text-text-muted ${className}`}
      role="status"
      aria-live="polite"
    >
      <span
        className="size-5 animate-spin rounded-full border-2 border-primary-soft border-t-primary"
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  );
}
