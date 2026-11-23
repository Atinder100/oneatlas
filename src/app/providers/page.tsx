import { Container } from "@/components/ui/Container";
import { ProviderDirectory } from "@/features/providers/components/ProviderDirectory";

export default function ProvidersPage() {
  return (
    <main className="flex-1 bg-slate-50">
      <Container className="py-12 sm:py-16">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            AI platforms
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Explore Providers
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Discover fictional AI platforms and browse the demonstration models
            associated with each provider.
          </p>
        </header>

        <ProviderDirectory />
      </Container>
    </main>
  );
}
