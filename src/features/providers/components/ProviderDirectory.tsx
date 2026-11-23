"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { mockModels } from "@/features/models/data/mockModels";
import { mockProviders } from "@/features/providers/data/mockProviders";

const modelTypes = Array.from(
  new Set(mockModels.map((model) => model.modelType)),
).sort((a, b) => a.localeCompare(b));

export function ProviderDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modelTypeFilter, setModelTypeFilter] = useState("");

  const matchingProviders = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return mockProviders.flatMap((provider) => {
      const supportedModels = mockModels.filter(
        (model) => model.provider === provider.name,
      );
      const visibleModels = modelTypeFilter
        ? supportedModels.filter((model) => model.modelType === modelTypeFilter)
        : supportedModels;
      const matchesSearch =
        !normalizedQuery ||
        [
          provider.name,
          provider.description,
          ...supportedModels.map((model) => model.name),
        ].some((value) => value.toLowerCase().includes(normalizedQuery));

      if (
        !matchesSearch ||
        (modelTypeFilter && visibleModels.length === 0)
      ) {
        return [];
      }

      return [{ provider, models: visibleModels }];
    });
  }, [searchQuery, modelTypeFilter]);

  const hasActiveFilters =
    searchQuery.trim() !== "" || Boolean(modelTypeFilter);

  const clearFilters = () => {
    setSearchQuery("");
    setModelTypeFilter("");
  };

  return (
    <section aria-label="AI providers directory">
      <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Fictional demonstration data only. Provider names, descriptions,
        affiliations, and supported-model listings are not verified real-world
        information.
      </p>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="provider-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Search providers
            </label>
            <input
              id="provider-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by provider, description, or model"
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="provider-model-type-filter"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Supported model type
            </label>
            <select
              id="provider-model-type-filter"
              value={modelTypeFilter}
              onChange={(event) => setModelTypeFilter(event.target.value)}
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="">All model types</option>
              {modelTypes.map((modelType) => (
                <option key={modelType} value={modelType}>
                  {modelType}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className="self-start rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear search and filters
          </button>
          <p
            className="text-sm font-medium text-slate-600"
            aria-live="polite"
            aria-atomic="true"
          >
            {hasActiveFilters
              ? `${matchingProviders.length} of ${mockProviders.length} providers match`
              : `${mockProviders.length} demonstration providers`}
          </p>
        </div>
      </div>

      {matchingProviders.length > 0 ? (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {matchingProviders.map(({ provider, models }) => (
            <li key={provider.id}>
              <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 sm:p-6">
                <header className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                    {provider.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {provider.description}
                  </p>
                </header>

                <div className="mt-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Supported models
                  </h3>
                  {models.length > 0 ? (
                    <ul className="mt-3 divide-y divide-slate-100">
                      {models.map((model) => (
                        <li
                          key={model.id}
                          className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <Link
                            href={`/models/${model.id}`}
                            className="rounded-sm text-sm font-semibold text-indigo-700 hover:text-indigo-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                          >
                            {model.name}
                          </Link>
                          <span className="self-start rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 sm:self-auto">
                            {model.modelType}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-slate-600">
                      No supported models match this model type.
                    </p>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div
          role="status"
          className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center"
        >
          <p className="text-lg font-semibold text-slate-950">
            No providers match your search or filter
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Try a different provider, description, or model, or clear your
            filters.
          </p>
        </div>
      )}
    </section>
  );
}
