import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-slate-950">OneAtlas</p>
          <p className="mt-1 text-sm text-slate-500">
            AI model discovery and intelligence.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link
            href="/models"
            className="text-sm text-slate-500 transition-colors hover:text-slate-950"
          >
            Models
          </Link>
          <Link
            href="/compare"
            className="text-sm text-slate-500 transition-colors hover:text-slate-950"
          >
            Compare
          </Link>
          <Link
            href="/rankings"
            className="text-sm text-slate-500 transition-colors hover:text-slate-950"
          >
            Rankings
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
