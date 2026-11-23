import Link from "next/link";
import { mockLabs } from "@/features/labs/data/mockLabs";
import { mockModels } from "@/features/models/data/mockModels";
import { mockProviders } from "@/features/providers/data/mockProviders";

type GlobalSearchProps = {
  query: string;
};

type GlobalSearchResult = {
  id: string;
  name: string;
  description: string;
  href: string;
  detail?: string;
};

type GlobalSearchGroup = {
  title: string;
  results: GlobalSearchResult[];
};

function uniqueById<T extends { id: string }>(items: T[]) {
  return Array.from(new Map(items.map((item) => [item.id, item])).values());
}

export function GlobalSearch({ query }: GlobalSearchProps) {
  const normalizedQuery = query.trim().toLowerCase();
  const matchingModels = normalizedQuery
    ? uniqueById(
        mockModels.filter((model) =>
          [
            model.name,
            model.company,
            model.provider,
            model.description,
          ].some((value) => value.toLowerCase().includes(normalizedQuery)),
        ),
      )
    : [];
  const matchingLabs = normalizedQuery
    ? uniqueById(
        mockLabs.filter((lab) =>
          [lab.name, lab.description].some((value) =>
            value.toLowerCase().includes(normalizedQuery),
          ),
        ),
      )
    : [];
  const matchingProviders = normalizedQuery
    ? uniqueById(
        mockProviders.filter((provider) =>
          [provider.name, provider.description].some((value) =>
            value.toLowerCase().includes(normalizedQuery),
          ),
        ),
      )
    : [];

  const resultGroups: GlobalSearchGroup[] = [
    {
      title: "Models",
      results: matchingModels.map((model) => ({
        id: model.id,
        name: model.name,
        description: model.description,
        href: `/models/${model.id}`,
        detail: `${model.company} · ${model.provider}`,
      })),
    },
    {
      title: "AI Labs",
      results: matchingLabs.map((lab) => ({
        id: lab.id,
        name: lab.name,
        description: lab.description,
        href: `/labs?q=${encodeURIComponent(lab.name)}`,
      })),
    },
    {
      title: "Providers",
      results: matchingProviders.map((provider) => ({
        id: provider.id,
        name: provider.name,
        description: provider.description,
        href: `/providers?q=${encodeURIComponent(provider.name)}`,
      })),
    },
  ].filter((group) => group.results.length > 0);

  return (
    <section aria-label="Global search">
      <form
        action="/search"
        role="search"
        aria-label="Search models, AI labs, and providers"
        className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/60 sm:flex-row"
      >
        <label htmlFor="global-search-query" className="sr-only">
          Search models, AI labs, and providers
        </label>
        <input
          id="global-search-query"
          name="q"
          type="search"
          defaultValue={query.trim()}
          placeholder="Search models, labs, or providers"
          className="h-12 min-w-0 flex-1 rounded-xl border-0 bg-slate-50 px-4 text-slate-950 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="h-12 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Search
        </button>
      </form>

      <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Search results use fictional demonstration data and do not represent
        verified real-world models, labs, providers, or affiliations.
      </p>

      {!normalizedQuery ? (
        <p
          role="status"
          className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-sm text-slate-600"
        >
          Enter a search term to find models, AI labs, and providers.
        </p>
      ) : resultGroups.length > 0 ? (
        <div className="mt-8 space-y-8">
          <p
            className="text-sm font-medium text-slate-600"
            aria-live="polite"
            aria-atomic="true"
          >
            Results for <span className="font-semibold">{query.trim()}</span>
          </p>

          {resultGroups.map(({ title, results }) => (
            <section key={title} aria-label={`${title} search results`}>
              <h2 className="mb-4 text-xl font-semibold tracking-tight text-slate-950">
                {title}
                <span className="ml-2 text-sm font-medium text-slate-500">
                  ({results.length})
                </span>
              </h2>
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {results.map((result) => (
                  <li key={result.id}>
                    <Link
                      href={result.href}
                      className="block h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    >
                      <h3 className="font-semibold text-indigo-700">
                        {result.name}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {result.description}
                      </p>
                      {result.detail && (
                        <p className="mt-3 text-xs font-medium text-slate-500">
                          {result.detail}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <div
          role="status"
          className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center"
        >
          <p className="text-lg font-semibold text-slate-950">
            No results found for “{query.trim()}”
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Try another model, lab, provider, or company name.
          </p>
        </div>
      )}
    </section>
  );
}
