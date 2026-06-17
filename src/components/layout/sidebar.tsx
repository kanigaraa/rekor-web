import Link from "next/link";
import Image from "next/image";

import { SidebarItem } from "./sidebar-item";

export type DashboardRole = "APPLICANT" | "REVIEWER" | "ADMIN" | "SUPER_ADMIN";

export type DashboardNavItem = {
  label: string;
  href: string;
};

export const roleLabels: Record<DashboardRole, string> = {
  APPLICANT: "Applicant",
  REVIEWER: "Reviewer",
  ADMIN: "Admin",
  SUPER_ADMIN: "Super Admin",
};

const sidebarItemsByRole: Record<DashboardRole, DashboardNavItem[]> = {
  APPLICANT: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Form Pendaftaran", href: "/apply" },
    { label: "Status Saya", href: "/my-application" },
  ],
  REVIEWER: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Review Pendaftar", href: "/reviewer/applications" },
  ],
  ADMIN: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Kelola Pendaftar", href: "/admin/applications" },
    { label: "Review Pendaftar", href: "/reviewer/applications" },
  ],
  SUPER_ADMIN: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Kelola Pendaftar", href: "/admin/applications" },
    { label: "Kelola User", href: "/admin/users" },
    { label: "Activity Log", href: "/admin/activity-logs" },
  ],
};

export function getSidebarItems(role: DashboardRole) {
  return sidebarItemsByRole[role];
}

type SidebarProps = {
  role: DashboardRole;
  activeHref?: string;
};

export function Sidebar({ role, activeHref = "/dashboard" }: SidebarProps) {
  const items = getSidebarItems(role);

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-border bg-surface lg:flex lg:flex-col">
      <div className="border-b border-border px-5 py-5">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image
            src="/Rekor.png"
            alt="Rekor Logo"
            width={50}
            height={50}
          ></Image>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {items.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            label={item.label}
            active={item.href === activeHref}
          />
        ))}
      </nav>
    </aside>
  );
}
