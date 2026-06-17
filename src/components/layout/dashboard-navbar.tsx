import Link from "next/link";

import type { DashboardNavItem, DashboardRole } from "./sidebar";
import { roleLabels } from "./sidebar";
import { UserMenu } from "./user-menu";

type DashboardNavbarProps = {
  role: DashboardRole;
  items: DashboardNavItem[];
  activeHref?: string;
  userName: string;
};

export function DashboardNavbar({
  role,
  items,
  activeHref = "/dashboard",
  userName,
}: DashboardNavbarProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/95 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-text-primary">Dashboard</p>
          <p className="text-xs text-text-muted">{roleLabels[role]}</p>
        </div>
        <UserMenu name={userName} roleLabel={roleLabels[role]} />
      </div>

      <nav className="flex gap-2 overflow-x-auto border-t border-border px-4 py-2 lg:hidden">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              item.href === activeHref
                ? "bg-primary-soft text-primary"
                : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
