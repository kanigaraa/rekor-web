"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 h-16 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <Image src="/Rekor.png" alt="Rekor Logo" width={36} height={36} className="rounded-md" />
          <div className="hidden sm:block">
            <span className="block text-lg font-bold leading-tight tracking-tight text-text-primary">
              Rekor
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
          >
            Beranda
          </Link>
          <a
            href="#fitur"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
          >
            Fitur Utama
          </a>
          <a
            href="#alur"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
          >
            Alur Rekrutmen
          </a>
          <a
            href="#kontak"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
          >
            Hubungi Kami
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" tabIndex={-1}>
              <Button variant="ghost" className="h-9 px-4">
                Masuk
              </Button>
            </Link>
            <Link href="/register" tabIndex={-1}>
              <Button variant="default" className="h-9 px-4 shadow-sm">
                Daftar Gratis
              </Button>
            </Link>
          </div>
          <Button 
            variant="ghost" 
            className="md:hidden px-2 h-9"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <div className="space-y-1 px-4 pb-4 pt-2">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Beranda
            </Link>
            <a
              href="#fitur"
              className="block rounded-md px-3 py-2 text-base font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Fitur Utama
            </a>
            <a
              href="#alur"
              className="block rounded-md px-3 py-2 text-base font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Alur Rekrutmen
            </a>
            <a
              href="#kontak"
              className="block rounded-md px-3 py-2 text-base font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hubungi Kami
            </a>
            <div className="mt-4 flex flex-col gap-2 border-t border-border/40 pt-4">
              <Link href="/login" tabIndex={-1} onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-center">
                  Masuk
                </Button>
              </Link>
              <Link href="/register" tabIndex={-1} onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="default" className="w-full justify-center">
                  Daftar Gratis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
