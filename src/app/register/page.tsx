"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

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

export default function RegisterPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: Integrate with POST /api/auth/register when the auth API is ready.
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-text-primary">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <Link
              href="/"
              className="mx-auto mb-6 flex w-fit items-center gap-3 text-left"
            >
              <Image src="/Rekor.png" alt="Rekor Logo" width={50} height={50} />
            </Link>
            <CardTitle className="text-2xl">Buat akun Rekor</CardTitle>
            <CardDescription>
              Daftar untuk mulai mengisi pendaftaran organisasi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Nama lengkap</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Nama lengkap"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nama@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Minimal 8 karakter"
                  minLength={8}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Konfirmasi password</Label>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Ulangi password"
                  minLength={8}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Daftar
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-text-muted">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="font-medium text-primary transition-colors hover:text-primary-hover"
              >
                Masuk
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
