import Link from "next/link";
import { 
  FileText, 
  Clock, 
  Activity, 
  ArrowRight,
  Send,
  Briefcase,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { DashboardRole } from "@/components/layout/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// TODO: Replace this mock role with server-side auth once session handling is ready.
const mockRole: DashboardRole = "APPLICANT";
const mockUserName = "Khaliz";

export default function DashboardPage() {
  return (
    <DashboardShell role={mockRole} userName={mockUserName}>
      <div className="space-y-6 pb-8">
        
        {/* Welcome Banner */}
        <div className="rounded-xl border border-border bg-surface px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                Selamat Datang, {mockUserName}! 👋
              </h1>
              <p className="text-text-secondary max-w-xl text-base">
                Selesaikan pendaftaranmu sebelum batas waktu berakhir. Kami tidak sabar melihat potensimu!
              </p>
            </div>
            <div className="shrink-0 bg-surface-muted p-4 rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-text-muted">Deadline</p>
                  <p className="text-lg font-bold text-text-primary">14 Hari Lagi</p>
                </div>
                <div className="h-10 w-10 bg-primary-soft rounded-full flex items-center justify-center text-primary">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6 auto-rows-auto">
          
          {/* Primary Action Card */}
          <Card className="shadow-none md:col-span-4 flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="warning" className="uppercase text-[10px] font-bold tracking-wider">
                  Tindakan Diperlukan
                </Badge>
              </div>
              <CardTitle className="text-xl">
                Lengkapi Berkas Pendaftaran
              </CardTitle>
              <CardDescription className="text-sm mt-1">
                Kamu baru menyelesaikan 30% dari total form. Jangan sampai ada yang terlewat.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Progress Bar */}
              <div className="w-full bg-surface-muted rounded-full h-3 mb-6 overflow-hidden border border-border">
                <div className="bg-primary h-3 rounded-full transition-all" style={{ width: "30%" }} />
              </div>
              
              <Link href="/apply" tabIndex={-1}>
                <Button className="w-full sm:w-auto">
                  <Send className="mr-2 h-4 w-4" /> Lanjutkan Pengisian
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Stats 1 */}
          <Card className="shadow-none md:col-span-2 lg:col-span-1 flex flex-col justify-center items-center text-center p-6">
            <div className="bg-info-soft p-3 rounded-xl text-info mb-4">
              <FileText className="h-6 w-6" />
            </div>
            <p className="text-2xl font-bold text-text-primary">0</p>
            <p className="text-sm font-medium text-text-secondary mt-1">Dokumen Valid</p>
          </Card>

          {/* Quick Stats 2 */}
          <Card className="shadow-none md:col-span-2 lg:col-span-1 flex flex-col justify-center items-center text-center p-6">
            <div className="bg-warning-soft p-3 rounded-xl text-warning mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <p className="text-2xl font-bold text-text-primary">3</p>
            <p className="text-sm font-medium text-text-secondary mt-1">Belum Diisi</p>
          </Card>

          {/* Guidelines / Help Card */}
          <Card className="shadow-none bg-surface-muted md:col-span-2 lg:col-span-2 flex flex-col justify-center p-6 border-dashed border-2">
             <div className="flex items-start gap-4">
               <div className="bg-surface p-2 rounded-lg border border-border text-text-muted">
                 <Briefcase className="h-5 w-5" />
               </div>
               <div>
                 <h3 className="font-semibold text-text-primary mb-1">Panduan Pendaftaran</h3>
                 <p className="text-sm text-text-secondary mb-3">Lihat tata cara lengkap dan tips lolos seleksi organisasi.</p>
                 <Link href="/guidelines" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                   Baca Panduan <ArrowRight className="h-3 w-3" />
                 </Link>
               </div>
             </div>
          </Card>

          {/* Activity Log */}
          <Card className="shadow-none md:col-span-4 lg:col-span-4 flex flex-col">
            <CardHeader className="border-b border-border bg-surface-muted/50 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2 font-semibold">
                  <Activity className="h-4 w-4 text-primary" /> Riwayat Aktivitas
                </CardTitle>
                <Button variant="ghost" className="h-8 text-xs px-2 py-1">Lihat Semua</Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="divide-y divide-border">
                <div className="px-6 py-4 flex gap-4 hover:bg-surface-muted/50 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-info-soft text-info">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Login dari perangkat baru</p>
                    <p className="text-xs text-text-secondary mt-0.5">Chrome di Windows 11</p>
                    <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider font-semibold">Baru Saja</p>
                  </div>
                </div>
                <div className="px-6 py-4 flex gap-4 hover:bg-surface-muted/50 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Akun berhasil dibuat</p>
                    <p className="text-xs text-text-secondary mt-0.5">Memulai pendaftaran tahap 1</p>
                    <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider font-semibold">2 Jam Lalu</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </DashboardShell>
  );
}
