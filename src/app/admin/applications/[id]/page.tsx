import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import { mockApplications } from "@/lib/recruitment-mock-data";

const adminStatuses = [
  { value: "UNDER_REVIEW", label: "Direview" },
  { value: "ACCEPTED", label: "Diterima" },
  { value: "REJECTED", label: "Ditolak" },
];

export default async function AdminApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = mockApplications.find((item) => item.id === id);

  if (!application) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-text-primary sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <PageHeader
          title={application.fullName}
          description="Detail pendaftaran dan status seleksi."
          actions={
            <Link href="/admin/applications" tabIndex={-1}>
              <Button variant="outline">Kembali</Button>
            </Link>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Card className="shadow-none">
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <CardTitle>Data pendaftar</CardTitle>
                  <StatusBadge status={application.status} />
                </div>
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
                <InfoRow
                  label="Tanggal submit"
                  value={application.submittedAt}
                />
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Motivasi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-text-secondary">
                  {application.motivation}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Dokumen dan review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <DocumentLink label="Link CV" href={application.cvUrl} />
                {application.portfolioUrl ? (
                  <DocumentLink
                    label="Link Portofolio"
                    href={application.portfolioUrl}
                  />
                ) : null}
                <div className="grid gap-4 rounded-md border border-border p-4 sm:grid-cols-2">
                  <InfoRow label="Nilai" value={`${application.score ?? "-"}`} />
                  <InfoRow
                    label="Catatan reviewer"
                    value={application.reviewerNote ?? "-"}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit shadow-none">
            <CardHeader>
              <CardTitle>Ubah status</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Integrate with PATCH /api/admin/applications/[id]/status once the API is ready. */}
              <form className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="status">Status seleksi</Label>
                  <Select
                    id="status"
                    name="status"
                    defaultValue={
                      application.status === "SUBMITTED"
                        ? "UNDER_REVIEW"
                        : application.status
                    }
                    required
                  >
                    {adminStatuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </Select>
                </div>

                <Button type="submit" className="w-full">
                  Simpan Status
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
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
