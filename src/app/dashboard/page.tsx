import Link from "next/link";
import {
  ClipboardCheck,
  ClipboardList,
  FileText,
  History,
  ListChecks,
  Send,
  UserCog,
  Users,
} from "lucide-react";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { DashboardRole } from "@/components/layout/sidebar";
import { roleLabels } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// TODO: Replace this mock role with server-side auth once session handling is ready.
const mockRole: DashboardRole = "APPLICANT";
const mockUserName = "Khaliz";

type DashboardCard = {
  title: string;
  value: string;
  description: string;
  icon: typeof ClipboardList;
};

type DashboardAction = {
  label: string;
  href: string;
  icon: typeof ClipboardList;
};

type DashboardContent = {
  heading: string;
  description: string;
  cards: DashboardCard[];
  actions: DashboardAction[];
};

const dashboardContentByRole: Record<DashboardRole, DashboardContent> = {
  APPLICANT: {
    heading: "Dashboard Pendaftar",
    description: "Pantau pendaftaran dan lanjutkan proses seleksi kamu.",
    cards: [
      {
        title: "Status Pendaftaran",
        value: "Draft",
        description: "Form belum dikirim",
        icon: FileText,
      },
    ],
    actions: [
      { label: "Isi Form", href: "/apply", icon: Send },
      { label: "Lihat Status", href: "/my-application", icon: ClipboardCheck },
    ],
  },
  REVIEWER: {
    heading: "Dashboard Reviewer",
    description: "Lihat ringkasan pendaftar yang masuk ke tahap review.",
    cards: [
      {
        title: "Pendaftar Menunggu Review",
        value: "12",
        description: "Perlu ditinjau",
        icon: ClipboardList,
      },
      {
        title: "Sudah Direview",
        value: "28",
        description: "Review tersimpan",
        icon: ListChecks,
      },
    ],
    actions: [
      {
        label: "Review Pendaftar",
        href: "/reviewer/applications",
        icon: ClipboardCheck,
      },
    ],
  },
  ADMIN: {
    heading: "Dashboard Admin",
    description: "Kelola data pendaftar dan status seleksi.",
    cards: [
      {
        title: "Total Pendaftar",
        value: "124",
        description: "Semua pendaftar",
        icon: Users,
      },
      {
        title: "Terkirim",
        value: "86",
        description: "Form masuk",
        icon: Send,
      },
      {
        title: "Direview",
        value: "31",
        description: "Sedang diproses",
        icon: ClipboardList,
      },
      {
        title: "Diterima",
        value: "18",
        description: "Lolos seleksi",
        icon: ClipboardCheck,
      },
      {
        title: "Ditolak",
        value: "9",
        description: "Tidak lolos",
        icon: FileText,
      },
    ],
    actions: [
      {
        label: "Kelola Pendaftar",
        href: "/admin/applications",
        icon: Users,
      },
    ],
  },
  SUPER_ADMIN: {
    heading: "Dashboard Super Admin",
    description: "Pantau user, role, dan aktivitas utama Rekor.",
    cards: [
      {
        title: "Total User",
        value: "42",
        description: "Akun terdaftar",
        icon: Users,
      },
      {
        title: "Reviewer",
        value: "6",
        description: "User reviewer",
        icon: ClipboardCheck,
      },
      {
        title: "Admin",
        value: "3",
        description: "User admin",
        icon: UserCog,
      },
      {
        title: "Activity Log",
        value: "157",
        description: "Aktivitas tercatat",
        icon: History,
      },
    ],
    actions: [
      { label: "Kelola User", href: "/admin/users", icon: UserCog },
      { label: "Activity Log", href: "/admin/activity-logs", icon: History },
    ],
  },
};

export default function DashboardPage() {
  const dashboardContent = dashboardContentByRole[mockRole];

  return (
    <DashboardShell role={mockRole} userName={mockUserName}>
      <div className="space-y-6 pb-8">
        <section className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-primary">
                {roleLabels[mockRole]}
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-normal text-text-primary sm:text-3xl">
                Halo, {mockUserName}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
                {dashboardContent.description}
              </p>
            </div>
            <div className="rounded-md border border-border bg-surface-muted px-4 py-3">
              <p className="text-xs font-medium uppercase text-text-muted">
                Periode
              </p>
              <p className="mt-1 text-sm font-semibold text-text-primary">
                Open Recruitment BEM UPNVJ
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-text-primary">
              {dashboardContent.heading}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardContent.cards.map((card) => {
              const Icon = card.icon;

              return (
                <Card key={card.title} className="shadow-none">
                  <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
                    <div>
                      <CardDescription>{card.title}</CardDescription>
                      <CardTitle className="mt-3 text-3xl">
                        {card.value}
                      </CardTitle>
                    </div>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-secondary">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-text-primary">
                Aksi Cepat
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                Lanjutkan pekerjaan utama sesuai role kamu.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              {dashboardContent.actions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link key={action.href} href={action.href} tabIndex={-1}>
                    <Button className="w-full sm:w-auto">
                      <Icon className="size-4" aria-hidden="true" />
                      {action.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
