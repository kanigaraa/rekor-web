import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { mockApplications } from "@/lib/recruitment-mock-data";

export default async function ReviewerApplicationDetailPage({
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
          description="Detail pendaftar dan form review."
          actions={
            <Link href="/reviewer/applications" tabIndex={-1}>
              <Button variant="outline">Kembali</Button>
            </Link>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Card className="shadow-none">
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <CardTitle>Applicant detail</CardTitle>
                  <StatusBadge status={application.status} />
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
                <InfoRow label="Nama" value={application.fullName} />
                <InfoRow label="Nomor HP" value={application.phone} />
                <InfoRow label="Jurusan" value={application.major} />
                <InfoRow label="Angkatan" value={application.batch} />
                <div className="sm:col-span-2">
                  <InfoRow
                    label="Bidang/Kementerian/Biro"
                    value={application.division}
                  />
                </div>
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
                <CardTitle>Dokumen</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <DocumentLink label="Link CV" href={application.cvUrl} />
                {application.portfolioUrl ? (
                  <DocumentLink
                    label="Link Portofolio"
                    href={application.portfolioUrl}
                  />
                ) : null}
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit shadow-none">
            <CardHeader>
              <CardTitle>Review</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Integrate with POST /api/reviewer/applications/[id]/review once the API is ready. */}
              <form className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="score">Input nilai</Label>
                  <Input
                    id="score"
                    name="score"
                    type="number"
                    min={0}
                    max={100}
                    defaultValue={application.score ?? ""}
                    placeholder="0-100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Catatan reviewer</Label>
                  <Textarea
                    id="note"
                    name="note"
                    defaultValue={application.reviewerNote ?? ""}
                    placeholder="Tulis catatan singkat"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Simpan Review
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
