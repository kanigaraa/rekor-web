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

export default function LoginPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: Integrate with POST /api/auth/login when the auth API is ready.
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-text-primary">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <Link
              href="/"
              className="mx-auto flex w-fit items-center gap-3 text-left"
            >
              <Image src="/Rekor.png" alt="Rekor Logo" width={50} height={50} />
            </Link>
            <CardTitle className="text-2xl">Masuk ke Rekor</CardTitle>
            <CardDescription>
              Lanjutkan proses rekrutmen organisasi kamu.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
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
                  autoComplete="current-password"
                  placeholder="Masukkan password"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Masuk
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-text-muted">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="font-medium text-primary transition-colors hover:text-primary-hover"
              >
                Daftar
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
