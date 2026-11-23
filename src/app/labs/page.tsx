import { Container } from "@/components/ui/Container";
import { LabDirectory } from "@/features/labs/components/LabDirectory";

type LabsPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function LabsPage({ searchParams }: LabsPageProps) {
  const { q } = await searchParams;
  const initialQuery = Array.isArray(q) ? q[0] ?? "" : q ?? "";

  return (
    <main className="flex-1 bg-slate-50">
      <Container className="py-12 sm:py-16">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            AI research organizations
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Explore AI Labs
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Browse fictional research labs, their areas of focus, and associated
            model releases.
          </p>
        </header>

        <LabDirectory initialQuery={initialQuery} />
      </Container>
    </main>
  );
}
