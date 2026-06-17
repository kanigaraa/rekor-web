import Link from "next/link";

type SidebarItemProps = {
  href: string;
  label: string;
  active?: boolean;
};

export function SidebarItem({ href, label, active = false }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-primary-soft text-primary"
          : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
      }`}
    >
      {label}
    </Link>
  );
}
