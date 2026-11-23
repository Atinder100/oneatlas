import { Container } from "@/components/ui/Container";
import { GlobalSearch } from "@/features/search/components/GlobalSearch";

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = Array.isArray(q) ? q[0] ?? "" : q ?? "";

  return (
    <main className="flex-1 bg-slate-50">
      <Container className="py-12 sm:py-16">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Search OneAtlas
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Global Search
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Search the demonstration catalog of AI models, labs, and providers.
          </p>
        </header>

        <GlobalSearch query={query} />
      </Container>
    </main>
  );
}
