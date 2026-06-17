import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Settings2, 
  FileText, 
  ArrowRight
} from "lucide-react";

const features = [
  {
    title: "Isi Formulir",
    description: "Lengkapi data diri dan motivasi kamu untuk bergabung bersama kami.",
    icon: FileText,
  },
  {
    title: "Pilih Bidang",
    description: "Temukan kementerian atau biro yang paling sesuai dengan passion kamu.",
    icon: Settings2,
  },
  {
    title: "Wawancara & Seleksi",
    description: "Ikuti tahapan wawancara dan tunjukkan potensi terbaikmu.",
    icon: Users,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text-primary flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8 text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Open Recruitment <span className="text-primary">BEM UPNVJ 2026</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            Mari bergabung dan berkontribusi bersama Badan Eksekutif Mahasiswa Universitas Pembangunan Nasional &quot;Veteran&quot; Jakarta. Wujudkan perubahan nyata!
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/register" tabIndex={-1}>
              <Button className="w-full sm:w-auto h-12 px-8 text-base">
                Daftar Sekarang <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login" tabIndex={-1}>
              <Button variant="outline" className="w-full sm:w-auto h-12 px-8 text-base">
                Masuk
              </Button>
            </Link>
          </div>
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
              Alur Pendaftaran
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Ikuti langkah-langkah berikut untuk menjadi bagian dari BEM UPNVJ.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 relative">
            <div className="absolute top-[4.5rem] left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block z-0"></div>
            {features.map((step, index) => {
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

      <Footer />
    </main>
  );
}
