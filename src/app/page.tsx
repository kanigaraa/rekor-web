import Link from "next/link";

import { Navbar } from "@/components/layout/navbar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Form Pendaftaran",
    description:
      "Kumpulkan data pendaftar, motivasi, CV, dan portofolio dengan format yang rapi.",
  },
  {
    title: "Dashboard Reviewer",
    description:
      "Reviewer dapat melihat daftar pendaftar dan memberi penilaian dari satu tempat.",
  },
  {
    title: "Kelola Status",
    description:
      "Admin bisa mengatur status seleksi seperti direview, diterima, atau ditolak.",
  },
  {
    title: "Manajemen Role",
    description:
      "Atur peran applicant, reviewer, admin, dan super admin sesuai kebutuhan tim.",
  },
];

const processSteps = [
  {
    title: "Pendaftar mengisi form",
    description: "Applicant mengirim data pendaftaran sesuai divisi yang dipilih.",
  },
  {
    title: "Reviewer memberi penilaian",
    description: "Reviewer memberi skor dan catatan untuk setiap pendaftar.",
  },
  {
    title: "Admin menentukan hasil",
    description: "Admin memperbarui status akhir seleksi berdasarkan hasil review.",
  },
];

const stats = [
  {
    title: "Pendaftaran",
    description: "Form pendaftar tersusun dan mudah dicek.",
  },
  {
    title: "Review",
    description: "Penilaian kandidat lebih terpusat.",
  },
  {
    title: "Seleksi",
    description: "Status akhir bisa dikelola dengan jelas.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text-primary">
      <Navbar />

      <section className="border-b border-border bg-gradient-to-b from-surface to-background">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-text-primary sm:text-5xl">
              Kelola rekrutmen organisasi dengan lebih rapi
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
              Rekor membantu organisasi membuka pendaftaran, mengelola data
              pendaftar, melakukan review, dan menentukan hasil seleksi dalam
              satu platform.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex h-11 items-center justify-center rounded-md border border-primary bg-primary px-5 text-sm font-medium text-white transition-colors hover:border-primary-hover hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Mulai Daftar
              </Link>
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface px-5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Masuk
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <Card key={item.title} className="shadow-none">
              <CardHeader>
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription className="leading-6">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="alur"
        className="border-y border-border bg-surface scroll-mt-20"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="mt-4 text-2xl font-semibold text-text-primary">
              Alur rekrutmen yang sederhana
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <Card key={step.title} className="shadow-none">
                <CardHeader>
                  <span className="mb-3 flex size-9 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <CardTitle className="text-base">{step.title}</CardTitle>
                  <CardDescription className="leading-6">
                    {step.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="fitur"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl">
          <h2 className="mt-4 text-2xl font-semibold text-text-primary">
            Fitur utama Rekor
          </h2>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            Semua yang dibutuhkan untuk menjalankan proses rekrutmen organisasi
            dalam satu platform.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="shadow-none">
              <CardHeader>
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <CardDescription className="leading-6">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-primary px-6 py-10 text-center text-white sm:px-10">
          <h2 className="text-2xl font-semibold">
            Siap mulai rekrutmen organisasi?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100">
            Buat proses pendaftaran lebih terstruktur dari awal sampai akhir.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-md border border-white bg-white px-5 text-sm font-medium text-primary transition-colors hover:bg-primary-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Daftar Sekarang
          </Link>
        </div>
      </section>

      <footer className="bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 border-t border-border px-4 py-8 text-sm text-text-muted sm:px-6 lg:px-8">
          <p className="font-semibold text-text-primary">Rekor</p>
          <p>Rekrut Organisasi</p>
          <p>Project UAS Keamanan Jaringan</p>
          <p>UPN Veteran Jakarta</p>
        </div>
      </footer>
    </main>
  );
}
