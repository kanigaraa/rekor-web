import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-10 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image src="/Rekor.png" alt="Rekor Logo" width={40} height={40} />
          <span className="min-w-0">
            <span className="block text-base font-semibold leading-5 text-text-primary">
              Rekor
            </span>
            <span className="block text-xs font-medium text-text-muted">
              Rekrut Organisasi
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href="#alur"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            Alur
          </a>
          <a
            href="#fitur"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            Fitur
          </a>
          <Link
            href="/login"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            Masuk
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-surface px-4 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="inline-flex h-10 items-center justify-center rounded-md border border-primary bg-primary px-4 text-sm font-medium text-white transition-colors hover:border-primary-hover hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
}
