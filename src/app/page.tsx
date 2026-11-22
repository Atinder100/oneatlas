import { Container } from "@/components/ui/Container";

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

          <form
            role="search"
            action="#"
            aria-label="Search AI models"
            className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/60 sm:flex-row"
          >
            <label htmlFor="model-search" className="sr-only">
              Search for an AI model
            </label>
            <div className="relative flex-1">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                id="model-search"
                name="model"
                type="search"
                placeholder="Search models, providers, or capabilities"
                className="h-12 w-full rounded-xl border-0 bg-slate-50 pl-12 pr-4 text-slate-950 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="h-12 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Search
            </button>
          </form>
        </section>
      </Container>
    </main>
  );
}
