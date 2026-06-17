import Link from "next/link";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import {
  type ApplicationStatus,
  StatusBadge,
} from "@/components/ui/status-badge";

type ApplicantApplication = {
  fullName: string;
  phone: string;
  major: string;
  batch: string;
  division: string;
  motivation: string;
  cvUrl: string;
  portfolioUrl?: string;
  status: ApplicationStatus;
  submittedAt?: string;
  reviewerNote?: string;
};

const statusCopy: Record<ApplicationStatus, string> = {
  DRAFT: "Form masih tersimpan sebagai draft.",
  SUBMITTED: "Pendaftaran sudah dikirim.",
  UNDER_REVIEW: "Pendaftaran sedang direview.",
  ACCEPTED: "Selamat, kamu diterima.",
  REJECTED: "Kamu belum diterima pada periode ini.",
};

// TODO: Replace this mock data with GET /api/applications/me once the API is ready.
const mockApplication: ApplicantApplication | null = {
  fullName: "Khaliz Kanigara",
  phone: "08123456789",
  major: "Sistem Informasi",
  batch: "2024",
  division: "Biro Media dan Informasi",
  motivation:
    "Saya ingin mengembangkan kemampuan dan berkontribusi dalam kegiatan BEM UPNVJ.",
  cvUrl: "https://example.com/cv.pdf",
  portfolioUrl: "https://example.com/portfolio",
  status: "UNDER_REVIEW",
  submittedAt: "16 Juni 2026",
  reviewerNote: "Motivasi sudah jelas. Tunggu proses review berikutnya.",
};

const emptyApplication: ApplicantApplication | null = null;
const mockUserName = "Khaliz";

export default function MyApplicationPage() {
  const application = mockApplication ?? emptyApplication;

  return (
    <DashboardShell
      role="APPLICANT"
      userName={mockUserName}
      activeHref="/my-application"
    >
      <div className="space-y-6">
        <PageHeader title="Status Pendaftaran" />

        {!application ? (
          <EmptyState
            title="Belum ada pendaftaran"
            action={
              <Link href="/apply" tabIndex={-1}>
                <Button>Isi Form Pendaftaran</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <Card className="shadow-none">
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardDescription>Status saat ini</CardDescription>
                    <CardTitle className="mt-2">
                      {statusCopy[application.status]}
                    </CardTitle>
                  </div>
                  <StatusBadge status={application.status} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 rounded-md border border-border bg-surface-muted p-4 text-sm">
                  <InfoRow label="Nama" value={application.fullName} />
                  <InfoRow
                    label="Bidang/Kementerian/Biro"
                    value={application.division}
                  />
                  <InfoRow
                    label="Tanggal submit"
                    value={application.submittedAt ?? "-"}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle>Ringkasan data pendaftaran</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
                  <InfoRow label="Nama" value={application.fullName} />
                  <InfoRow label="Nomor HP" value={application.phone} />
                  <InfoRow label="Jurusan" value={application.major} />
                  <InfoRow label="Angkatan" value={application.batch} />
                  <InfoRow
                    label="Bidang/Kementerian/Biro"
                    value={application.division}
                  />
                  <div className="sm:col-span-2">
                    <p className="font-medium text-text-primary">Motivasi</p>
                    <p className="mt-1 leading-6 text-text-muted">
                      {application.motivation}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle>Dokumen pendukung</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 text-sm">
                  <DocumentLink label="Link CV" href={application.cvUrl} />
                  {application.portfolioUrl ? (
                    <DocumentLink
                      label="Link portofolio"
                      href={application.portfolioUrl}
                    />
                  ) : null}
                </CardContent>
              </Card>

              {application.reviewerNote ? (
                <Card className="shadow-none">
                  <CardHeader>
                    <CardTitle>Catatan reviewer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-text-muted">
                      {application.reviewerNote}
                    </p>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-medium text-text-primary">{label}</p>
      <p className="mt-1 text-text-muted">{value}</p>
    </div>
  );
}

function DocumentLink({ label, href }: { label: string; href: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-md border border-border p-3 sm:flex-row sm:items-center sm:justify-between">
      <span className="font-medium text-text-primary">{label}</span>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="break-all text-primary transition-colors hover:text-primary-hover"
      >
        {href}
      </a>
    </div>
  );
}
