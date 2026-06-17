"use client";

import type { FormEvent } from "react";

import { DashboardShell } from "@/components/layout/dashboard-shell";
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

// TODO: Replace this mock user with server-side auth once session handling is ready.
const mockUserName = "Khaliz";

export default function ApplyPage() {
  function handleSaveDraft() {
    // TODO: Integrate with POST /api/applications for draft save.
  }

  function handleSubmitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: Integrate with POST /api/applications and PATCH /api/applications/submit.
  }

  return (
    <DashboardShell
      role="APPLICANT"
      userName={mockUserName}
      activeHref="/apply"
    >
      <form className="space-y-6" onSubmit={handleSubmitApplication}>
        <PageHeader
          title="Form Pendaftaran"
          description="Lengkapi data Open Recruitment BEM UPNVJ."
        />

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
              <Select id="division" name="division" defaultValue="" required>
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
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            className="w-full sm:w-auto"
          >
            Simpan Draft
          </Button>
          <Button type="submit" className="w-full sm:w-auto">
            Kirim Pendaftaran
          </Button>
        </div>
      </form>
    </DashboardShell>
  );
}
