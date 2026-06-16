import type { ReactNode } from "react";

import { DashboardNavbar } from "./dashboard-navbar";
import {
  getSidebarItems,
  Sidebar,
  type DashboardRole,
} from "./sidebar";

type DashboardShellProps = {
  role: DashboardRole;
  userName: string;
  activeHref?: string;
  children: ReactNode;
};

export function DashboardShell({
  role,
  userName,
  activeHref = "/dashboard",
  children,
}: DashboardShellProps) {
  const items = getSidebarItems(role);

  return (
    <div className="min-h-screen bg-background text-text-primary lg:flex">
      <Sidebar role={role} activeHref={activeHref} />
      <div className="min-w-0 flex-1">
        <DashboardNavbar
          role={role}
          items={items}
          activeHref={activeHref}
          userName={userName}
        />
        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
