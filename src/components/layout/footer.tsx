import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="mx-auto flex w-full max-w-6xl flex-col md:flex-row justify-center items-center gap-4 px-4 py-8 text-sm text-text-muted sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image src="/Rekor.png" alt="Rekor Logo" width={24} height={24} className="grayscale opacity-70" />
          <span className="font-semibold text-text-primary">Rekor</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
