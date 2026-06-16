import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

type CardSectionProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

type CardTextProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
};

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface text-text-primary shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  children,
  ...props
}: CardSectionProps) {
  return (
    <div className={`space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children, ...props }: CardTextProps) {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-normal text-text-primary ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className = "",
  children,
  ...props
}: CardTextProps) {
  return (
    <p className={`text-sm text-text-muted ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className = "",
  children,
  ...props
}: CardSectionProps) {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className = "",
  children,
  ...props
}: CardSectionProps) {
  return (
    <div className={`flex items-center gap-3 p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}
