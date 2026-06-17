import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Users,
  Settings2,
  FileText,
  ArrowRight,
  Sparkles,
  Target,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    title: "Sistem Terpusat",
    description:
      "Satu portal untuk semua proses rekrutmen. Tidak perlu lagi mencari link formulir yang tersebar.",
    icon: Sparkles,
  },
  {
    title: "Transparan",
    description:
      "Pantau status pendaftaran kamu secara real-time dari dashboard personal.",
    icon: Target,
  },
  {
    title: "Akses Mudah",
    description:
      "Antarmuka yang bersih dan mudah digunakan di perangkat apapun, kapanpun.",
    icon: CheckCircle2,
  },
];

const processSteps = [
  {
    title: "Isi Formulir",
    description:
      "Lengkapi data diri dan motivasi kamu untuk bergabung bersama kami.",
    icon: FileText,
  },
  {
    title: "Pilih Bidang",
    description:
      "Temukan kementerian atau biro yang paling sesuai dengan passion kamu.",
    icon: Settings2,
  },
  {
    title: "Wawancara & Seleksi",
    description:
      "Ikuti tahapan wawancara dan tunjukkan potensi terbaikmu.",
    icon: Users,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text-primary flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden border-b border-border/40 pt-32 pb-32 flex items-center">
        <Image
          src="/upnvj.jpg"
          alt="UPNVJ"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-background" />

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <h1 className="text-5xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-6xl lg:text-7xl max-w-4xl mx-auto">
            Wujudkan Perubahan Nyata Bersama{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-soft">
              BEM UPNVJ
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/80">
            Mari bergabung dan berkontribusi bersama Badan Eksekutif Mahasiswa
            Universitas Pembangunan Nasional &quot;Veteran&quot; Jakarta.
            Kelola rekrutmen organisasi dengan lebih rapi dan profesional.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row items-center">
            <Link href="/register" tabIndex={-1}>
              <Button className="w-full sm:w-auto h-14 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                Mulai Daftar Sekarang <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/login" tabIndex={-1}>
              <Button
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 text-base bg-white/10 text-white backdrop-blur hover:bg-white/20 border-white/30 cursor-pointer"
              >
                Masuk ke Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="fitur"
        className="py-24 bg-surface/30 border-b border-border/40 scroll-mt-16"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Platform Rekrutmen Modern
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Semua yang kamu butuhkan untuk mengikuti proses seleksi dengan
              mudah dalam satu platform yang elegan.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-border/50 bg-background/50 backdrop-blur-sm group"
                >
                  <CardHeader>
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="h-7 w-7" />
                    </div>

                    <CardTitle className="text-xl mb-2">
                      {feature.title}
                    </CardTitle>

                    <CardDescription className="text-base leading-relaxed text-text-secondary">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        id="alur"
        className="py-24 scroll-mt-16 bg-gradient-to-b from-background to-surface/30"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Alur Pendaftaran
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Ikuti langkah-langkah berikut untuk menjadi bagian dari perjalanan
              kami.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3 relative">
            <div className="absolute top-10 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent hidden md:block z-0" />

            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="relative z-10 flex flex-col items-center text-center group"
                >
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-surface border-2 border-border shadow-sm group-hover:border-primary group-hover:shadow-primary/20 transition-all duration-300 relative">
                    <Icon className="h-8 w-8 text-text-primary group-hover:text-primary transition-colors duration-300" />

                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold shadow-sm">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-text-primary mb-3">
                    {step.title}
                  </h3>

                  <p className="text-text-secondary leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border/40 bg-surface">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary px-6 py-20 text-center shadow-2xl sm:px-12 lg:px-16">
            <div className="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/shapes/svg?seed=CTA&backgroundColor=transparent')] opacity-10" />
            <div className="absolute -inset-24 bg-gradient-to-b from-white/10 to-transparent blur-3xl opacity-50 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-6">
                Siap Memulai Perjalananmu?
              </h2>

              <p className="mx-auto max-w-2xl text-lg sm:text-xl text-primary-soft mb-10 leading-relaxed">
                Jangan lewatkan kesempatan untuk berkembang, belajar, dan
                berkontribusi bersama kami. Daftar sekarang dan jadilah agen
                perubahan!
              </p>

              <Link href="/register" tabIndex={-1}>
                <Button
                  variant="secondary"
                  className="h-14 px-10 text-lg font-semibold text-primary bg-white hover:bg-gray-50 border-none shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  Daftar Sekarang Secara Gratis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}