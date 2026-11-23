import { Container } from "@/components/ui/Container";
import { GlobalSearch } from "@/features/search/components/GlobalSearch";

export default function Home() {
  return (
    <main className="relative flex flex-1 items-center overflow-hidden bg-slate-50">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.12),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.10),_transparent_35%)]"
      />
      <Container className="relative py-20 sm:py-28 lg:py-36">
        <section
          aria-labelledby="hero-heading"
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            AI model intelligence
          </p>
          <h1
            id="hero-heading"
            className="text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl"
          >
            Discover the right AI model for every task
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Explore the AI model landscape, compare capabilities, and find the
            tools shaping what comes next.
          </p>

          <div className="mx-auto mt-10 max-w-2xl text-left">
            <GlobalSearch query="" />
          </div>
        </section>
      </Container>
    </main>
  );
}
