import { Container } from "@/components/ui/Container";
import { RankingsLeaderboard } from "@/features/rankings/components/RankingsLeaderboard";

export default function RankingsPage() {
  return (
    <main className="flex-1 bg-slate-50">
      <Container className="py-12 sm:py-16">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Rankings &amp; benchmarks
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Model Leaderboard
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Explore illustrative benchmark rankings and filter by benchmark
            and model category.
          </p>
        </header>

        <RankingsLeaderboard />
      </Container>
    </main>
  );
}
