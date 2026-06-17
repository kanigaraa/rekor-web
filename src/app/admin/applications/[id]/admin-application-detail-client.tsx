"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { DashboardRole } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";
import { StatusBadge, type ApplicationStatus } from "@/components/ui/status-badge";

type Application = {
  id: string;
  fullName: string;
  phone: string;
  major: string;
  batch: string;
  division: string;
  motivation: string;
  cvUrl: string;
  portfolioUrl?: string;
  status: ApplicationStatus;
  updatedAt: string;
  reviews?: { score: number; note: string | null }[];
};

const adminStatuses = [
  { value: "UNDER_REVIEW", label: "Direview" },
  { value: "ACCEPTED", label: "Diterima" },
  { value: "REJECTED", label: "Ditolak" },
];

export function AdminApplicationDetailClient({ applicationId, userName, role }: { applicationId: string, userName: string, role: DashboardRole }) {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/admin/applications/${applicationId}`);
        if (res.ok) {
          const data = await res.json();
          setApplication(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [applicationId]);

  async function handleStatusChange(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const status = formData.get("status") as ApplicationStatus;
    
    try {
      const res = await fetch(`/api/admin/applications/${applicationId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal mengubah status");
      }
      setApplication(prev => prev ? { ...prev, status } : prev);
      alert("Status berhasil diubah");
    } catch (err) {
      alert("Error: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <DashboardShell role={role} userName={userName} activeHref="/admin/applications">
        <div className="flex justify-center p-10">Memuat...</div>
      </DashboardShell>
    );
  }

  if (!application) {
    return (
      <DashboardShell role={role} userName={userName} activeHref="/admin/applications">
        <div className="flex justify-center p-10">Pendaftar tidak ditemukan</div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell role={role} userName={userName} activeHref="/admin/applications">
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
                  value={new Date(application.updatedAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
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
                  <InfoRow label="Nilai" value={application.reviews && application.reviews.length > 0 ? `${application.reviews[0].score}` : "-"} />
                  <InfoRow
                    label="Catatan reviewer"
                    value={application.reviews && application.reviews.length > 0 ? (application.reviews[0].note || "-") : "-"}
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
              <form className="space-y-5" onSubmit={handleStatusChange}>
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

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "Menyimpan..." : "Simpan Status"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
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
