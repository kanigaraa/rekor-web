"use client";

import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { DashboardRole } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const divisions = [
  "Biro Kesekretariatan",
  "Biro Keuangan dan Pendanaan",
  "Biro Media dan Informasi",
  "Kementerian Advokasi dan Kesejahteraan Mahasiswa",
  "Kementerian Sosial Politik",
  "Kementerian Ekonomi Kreatif",
  "Departemen Kajian Strategis",
  "Departemen Kemitraan Strategis",
];

export function ApplyClient({ userName, role }: { userName: string, role: DashboardRole }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    major: "",
    batch: "",
    division: "",
    motivation: "",
    cvUrl: "",
    portfolioUrl: "",
  });

  useEffect(() => {
    async function loadDraft() {
      try {
        const res = await fetch("/api/applications/me");
        if (res.ok) {
          const data = await res.json();
          if (data && data.status) {
            if (data.status !== "DRAFT") {
              router.push("/my-application");
              return;
            }
            setFormData({
              fullName: data.fullName || "",
              phone: data.phone || "",
              major: data.major || "",
              batch: data.batch || "",
              division: data.division || "",
              motivation: data.motivation || "",
              cvUrl: data.cvUrl || "",
              portfolioUrl: data.portfolioUrl || "",
            });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    }
    loadDraft();
  }, [router]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSaveDraft() {
    setLoading(true);
    setError("");
    setMsg("");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menyimpan draft");
      }
      setMsg("Draft berhasil disimpan.");
    } catch (err) {
      alert("Error: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMsg("");
    try {
      // Create/update first
      const res1 = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res1.ok) {
        const data = await res1.json();
        throw new Error(data.message || "Gagal menyimpan pendaftaran");
      }

      // Then submit
      const res2 = await fetch("/api/applications/submit", {
        method: "PATCH",
      });
      if (!res2.ok) {
        const data = await res2.json();
        throw new Error(data.message || "Gagal mengirim pendaftaran");
      }

      router.push("/my-application");
    } catch (err) {
      alert("Error: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <DashboardShell role={role} userName={userName} activeHref="/apply">
        <div className="flex justify-center p-10">Memuat...</div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      role={role}
      userName={userName}
      activeHref="/apply"
    >
      <form className="space-y-6" onSubmit={handleSubmitApplication}>
        <PageHeader
          title="Form Pendaftaran"
          description="Lengkapi data Open Recruitment BEM UPNVJ."
        />

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}
        {msg && (
          <div className="rounded-md bg-green-50 p-4 text-sm text-green-600">
            {msg}
          </div>
        )}

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Data Diri</CardTitle>
            <CardDescription>Informasi utama pendaftar.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nama lengkap</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Masukkan nama lengkap"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor HP</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="08xxxxxxxxxx"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="major">Jurusan</Label>
              <Input
                id="major"
                name="major"
                type="text"
                placeholder="Sistem Informasi"
                value={formData.major}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="batch">Angkatan</Label>
              <Input
                id="batch"
                name="batch"
                type="text"
                inputMode="numeric"
                placeholder="2024"
                value={formData.batch}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Pilihan Bidang</CardTitle>
            <CardDescription>Pilih bidang dan tulis motivasi.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="division">Bidang/Kementerian/Biro</Label>
              <Select id="division" name="division" value={formData.division} onChange={handleChange} required>
                <option value="" disabled>
                  Pilih bidang
                </option>
                {divisions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation">Motivasi</Label>
              <Textarea
                id="motivation"
                name="motivation"
                placeholder="Tulis motivasi kamu bergabung"
                className="min-h-36"
                value={formData.motivation}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Dokumen Pendukung</CardTitle>
            <CardDescription>Gunakan URL CV dan portofolio.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cvUrl">Link CV</Label>
              <Input
                id="cvUrl"
                name="cvUrl"
                type="url"
                placeholder="https://example.com/cv"
                value={formData.cvUrl}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolioUrl">Link Portofolio</Label>
              <Input
                id="portfolioUrl"
                name="portfolioUrl"
                type="url"
                placeholder="https://example.com/portfolio"
                value={formData.portfolioUrl}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? "Menyimpan..." : "Simpan Draft"}
          </Button>
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? "Mengirim..." : "Kirim Pendaftaran"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  );
}
