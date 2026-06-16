import Link from "next/link";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { DashboardRole } from "@/components/layout/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";

type DashboardMetric = {
  title: string;
  value: string;
  description?: string;
};

type DashboardAction = {
  label: string;
  href: string;
  variant?: "primary" | "outline";
};

type DashboardContent = {
  title: string;
  description: string;
  metrics: DashboardMetric[];
  actions?: DashboardAction[];
};

const dashboardContentByRole: Record<DashboardRole, DashboardContent> = {
  APPLICANT: {
    title: "Dashboard Applicant",
    description: "Pantau status pendaftaran dan lanjutkan proses kamu.",
    metrics: [
      {
        title: "Status Pendaftaran",
        value: "Draft",
        description: "Form belum dikirim",
      },
    ],
    actions: [
      { label: "Isi Form", href: "/apply" },
      { label: "Lihat Status", href: "/my-application", variant: "outline" },
    ],
  },
  REVIEWER: {
    title: "Dashboard Reviewer",
    description: "Lihat ringkasan pendaftar yang perlu direview.",
    metrics: [
      { title: "Pendaftar Menunggu Review", value: "12" },
      { title: "Sudah Direview", value: "28" },
    ],
    actions: [{ label: "Review Pendaftar", href: "/reviewer/applications" }],
  },
  ADMIN: {
    title: "Dashboard Admin",
    description: "Kelola ringkasan data pendaftar dan status seleksi.",
    metrics: [
      { title: "Total Pendaftar", value: "128" },
      { title: "Terkirim", value: "76" },
      { title: "Direview", value: "42" },
      { title: "Diterima", value: "18" },
      { title: "Ditolak", value: "9" },
    ],
  },
  SUPER_ADMIN: {
    title: "Dashboard Super Admin",
    description: "Pantau user, peran, dan aktivitas sistem.",
    metrics: [
      { title: "Total User", value: "156" },
      { title: "Reviewer", value: "8" },
      { title: "Admin", value: "3" },
      { title: "Activity Log", value: "214" },
    ],
  },
};

// TODO: Replace this mock role with server-side auth once session handling is ready.
const mockRole: DashboardRole = "APPLICANT";
const mockUserName = "Khaliz";

export default function DashboardPage() {
  const content = dashboardContentByRole[mockRole];

  return (
    <DashboardShell role={mockRole} userName={mockUserName}>
      <div className="space-y-6">
        <PageHeader title={content.title} description={content.description} />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {content.metrics.map((metric) => (
            <Card key={metric.title} className="shadow-none">
              <CardHeader className="pb-3">
                <CardDescription>{metric.title}</CardDescription>
                <CardTitle className="text-3xl">{metric.value}</CardTitle>
              </CardHeader>
              {metric.description ? (
                <CardContent>
                  <StatusBadge status="DRAFT" />
                  <p className="mt-3 text-sm text-text-muted">
                    {metric.description}
                  </p>
                </CardContent>
              ) : null}
            </Card>
          ))}
        </div>

        {content.actions ? (
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">Aksi cepat</CardTitle>
              <CardDescription>
                Lanjutkan proses rekrutmen dari dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 sm:flex-row">
              {content.actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`inline-flex h-10 w-full items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto ${
                    action.variant === "outline"
                      ? "border-border bg-surface text-text-primary hover:bg-surface-muted"
                      : "border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover"
                  }`}
                >
                  {action.label}
                </Link>
              ))}
            </CardContent>
          </Card>
        ) : null}
      </div>
    </DashboardShell>
  );
}
