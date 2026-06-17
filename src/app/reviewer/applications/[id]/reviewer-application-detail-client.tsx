"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { DashboardRole } from "@/components/layout/sidebar";
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
import { StatusBadge, type ApplicationStatus } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";

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
  reviews?: { score: number; note: string | null }[];
};

export function ReviewerApplicationDetailClient({ applicationId, userName, role }: { applicationId: string, userName: string, role: DashboardRole }) {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  
  const [score, setScore] = useState<number | "">("");
  const [note, setNote] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/reviewer/applications/${applicationId}`);
        if (res.ok) {
          const data = await res.json();
          setApplication(data);
          if (data.reviews && data.reviews.length > 0) {
            setScore(data.reviews[0].score);
            setNote(data.reviews[0].note || "");
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [applicationId]);

  async function handleSubmitReview(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setMsg("");
    
    try {
      const res = await fetch(`/api/reviewer/applications/${applicationId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: Number(score), note }),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menyimpan review");
      }
      
      setMsg("Review berhasil disimpan");
      setApplication(prev => prev ? { ...prev, status: "UNDER_REVIEW" } : prev);
    } catch (err) {
      alert("Error: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <DashboardShell role={role} userName={userName} activeHref="/reviewer/applications">
        <div className="flex justify-center p-10">Memuat...</div>
      </DashboardShell>
    );
  }

  if (!application) {
    return (
      <DashboardShell role={role} userName={userName} activeHref="/reviewer/applications">
        <div className="flex justify-center p-10">Pendaftar tidak ditemukan</div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell role={role} userName={userName} activeHref="/reviewer/applications">
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
              <form className="space-y-5" onSubmit={handleSubmitReview}>
                {error && (
                  <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}
                {msg && (
                  <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">
                    {msg}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="score">Input nilai</Label>
                  <Input
                    id="score"
                    name="score"
                    type="number"
                    min={0}
                    max={100}
                    value={score}
                    onChange={(e) => setScore(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="0-100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Catatan reviewer</Label>
                  <Textarea
                    id="note"
                    name="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Tulis catatan singkat"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "Menyimpan..." : "Simpan Review"}
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
