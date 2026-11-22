import { Container } from "@/components/ui/Container";
import { ModelComparison } from "@/features/comparison/components/ModelComparison";

export default function ComparePage() {
  return (
    <main className="flex-1 bg-slate-50">
      <Container className="py-12 sm:py-16">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Model comparison
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Compare AI Models
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Select models to compare their available details side by side.
          </p>
        </header>

        <p className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Fictional demonstration data only. These records are not verified
          real-world model information.
        </p>

        <ModelComparison />
      </Container>
    </main>
  );
}
