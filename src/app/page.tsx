import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, 
  Users, 
  Settings2, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  ArrowRight
} from "lucide-react";

const features = [
  {
    title: "Form Pendaftaran",
    description: "Kumpulkan data pendaftar, motivasi, CV, dan portofolio dengan format yang rapi.",
    icon: ClipboardList,
  },
  {
    title: "Dashboard Reviewer",
    description: "Reviewer dapat melihat daftar pendaftar dan memberi penilaian dari satu tempat.",
    icon: Users,
  },
  {
    title: "Kelola Status",
    description: "Admin bisa mengatur status seleksi seperti direview, diterima, atau ditolak.",
    icon: Settings2,
  },
  {
    title: "Manajemen Role",
    description: "Atur peran applicant, reviewer, admin, dan super admin sesuai kebutuhan tim.",
    icon: ShieldCheck,
  },
];

const processSteps = [
  {
    title: "Pendaftar mengisi form",
    description: "Applicant mengirim data pendaftaran sesuai divisi yang dipilih.",
    icon: FileText,
  },
  {
    title: "Reviewer memberi penilaian",
    description: "Reviewer memberi skor dan catatan untuk setiap pendaftar.",
    icon: Users,
  },
  {
    title: "Admin menentukan hasil",
    description: "Admin memperbarui status akhir seleksi berdasarkan hasil review.",
    icon: CheckCircle2,
  },
];

const stats = [
  {
    value: "10x",
    title: "Lebih Cepat",
    description: "Proses seleksi menjadi jauh lebih efisien.",
  },
  {
    value: "100%",
    title: "Terpusat",
    description: "Semua data kandidat ada di satu tempat.",
  },
  {
    value: "24/7",
    title: "Akses Kapan Saja",
    description: "Review kandidat dari mana saja.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text-primary flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface to-background">
        <div className="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/shapes/svg?seed=Rekor&backgroundColor=transparent')] opacity-5" />
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:px-8 lg:py-32 relative z-10">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              Kelola rekrutmen organisasi dengan <span className="text-primary">lebih rapi</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Rekor membantu organisasi membuka pendaftaran, mengelola data
              pendaftar, melakukan review, dan menentukan hasil seleksi dalam
              satu platform yang terintegrasi.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/register" tabIndex={-1}>
                <Button className="w-full sm:w-auto h-12 px-8 text-base shadow-lg hover:shadow-primary/25 transition-all">
                  Mulai Daftar Gratis <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login" tabIndex={-1}>
                <Button variant="outline" className="w-full sm:w-auto h-12 px-8 text-base">
                  Masuk ke Dashboard
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative flex items-center justify-center lg:justify-end mt-10 lg:mt-0">
            <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-surface flex items-center justify-center">
               <img 
                 src="https://placehold.co/800x600/f8fafc/0f172a?text=Dashboard+Preview" 
                 alt="Dashboard Preview" 
                 className="object-cover w-full h-full"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {stats.map((item) => (
            <div key={item.title} className="flex flex-col items-center justify-center text-center py-6 sm:py-0 px-4">
              <dt className="text-4xl font-bold tracking-tight text-primary">{item.value}</dt>
              <dd className="mt-2 text-lg font-semibold text-text-primary">{item.title}</dd>
              <dd className="mt-1 text-sm text-text-secondary">{item.description}</dd>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section
        id="alur"
        className="border-y border-border bg-surface/50 scroll-mt-20"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Alur rekrutmen yang sederhana
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Proses yang terstruktur membuat seleksi lebih transparan dan efisien.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 relative">
            <div className="absolute top-[4.5rem] left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block z-0"></div>
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative z-10 flex flex-col items-center text-center bg-background p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg ring-8 ring-background">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="mb-2 flex items-center justify-center">
                     <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Langkah {index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="fitur"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Fitur utama Rekor
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Semua yang dibutuhkan untuk menjalankan proses rekrutmen organisasi
            dalam satu platform yang elegan.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="shadow-sm hover:shadow-md transition-shadow border-border/50 bg-background/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary px-6 py-16 text-center shadow-2xl sm:px-12 lg:px-16">
          <div className="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/shapes/svg?seed=CTA&backgroundColor=transparent')] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Siap mulai rekrutmen organisasi?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-primary-soft mb-8">
              Buat proses pendaftaran lebih terstruktur dari awal sampai akhir. Bergabung dengan puluhan organisasi lainnya sekarang.
            </p>
            <Link href="/register" tabIndex={-1}>
              <Button variant="secondary" className="h-12 px-8 text-base font-semibold text-primary bg-white hover:bg-gray-50 border-none shadow-md">
                Daftar Sekarang Secara Gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
