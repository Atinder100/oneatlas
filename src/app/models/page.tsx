"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ModelCard } from "@/features/models/components/ModelCard";
import { mockModels } from "@/features/models/data/mockModels";

export default function ModelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [providerFilter, setProviderFilter] = useState("");
  const [capabilityFilter, setCapabilityFilter] = useState("");
  const [modelTypeFilter, setModelTypeFilter] = useState("");

  const companyOptions = useMemo(
    () =>
      Array.from(new Set(mockModels.map((model) => model.company))).sort(
        (a, b) => a.localeCompare(b),
      ),
    [],
  );

  const providerOptions = useMemo(
    () =>
      Array.from(new Set(mockModels.map((model) => model.provider))).sort(
        (a, b) => a.localeCompare(b),
      ),
    [],
  );

  const capabilityOptions = useMemo(
    () =>
      Array.from(
        new Set(mockModels.flatMap((model) => model.capabilities)),
      ).sort((a, b) => a.localeCompare(b)),
    [],
  );

  const modelTypeOptions = useMemo(
    () =>
      Array.from(new Set(mockModels.map((model) => model.modelType))).sort(
        (a, b) => a.localeCompare(b),
      ),
    [],
  );

  const matchingModels = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return mockModels.filter((model) => {
      const matchesSearch =
        !normalizedQuery ||
        [model.name, model.company, model.provider].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        );
      const matchesCompany =
        !companyFilter || model.company === companyFilter;
      const matchesProvider =
        !providerFilter || model.provider === providerFilter;
      const matchesCapability =
        !capabilityFilter ||
        model.capabilities.includes(capabilityFilter);
      const matchesModelType =
        !modelTypeFilter || model.modelType === modelTypeFilter;

      return (
        matchesSearch &&
        matchesCompany &&
        matchesProvider &&
        matchesCapability &&
        matchesModelType
      );
    });
  }, [
    searchQuery,
    companyFilter,
    providerFilter,
    capabilityFilter,
    modelTypeFilter,
  ]);

  const hasActiveFilters =
    companyFilter ||
    providerFilter ||
    capabilityFilter ||
    modelTypeFilter;
  const hasSearchOrFilters =
    searchQuery.trim() !== "" || Boolean(hasActiveFilters);

  const clearFilters = () => {
    setCompanyFilter("");
    setProviderFilter("");
    setCapabilityFilter("");
    setModelTypeFilter("");
  };

  return (
    <main className="flex-1 bg-slate-50">
      <Container className="py-12 sm:py-16">
        <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
              Model discovery
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Explore AI Models
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Browse a curated demonstration collection of AI models and compare
              their capabilities and pricing fields.
            </p>
          </div>
          <p className="shrink-0 text-sm font-medium text-slate-600">
            {hasSearchOrFilters
              ? `${matchingModels.length} of ${mockModels.length} demonstration models match`
              : `${mockModels.length} demonstration models available`}
          </p>
        </header>

        <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Demonstration data only. These records are fictional and are not
          verified real-world model information.
        </p>

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="mb-4">
            <label
              htmlFor="model-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Search demonstration models
            </label>
            <input
              id="model-search"
              name="model-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by model, company, or provider"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-950 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label
                htmlFor="company-filter"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Company
              </label>
              <select
                id="company-filter"
                value={companyFilter}
                onChange={(event) => setCompanyFilter(event.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">All companies</option>
                {companyOptions.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="provider-filter"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Provider
              </label>
              <select
                id="provider-filter"
                value={providerFilter}
                onChange={(event) => setProviderFilter(event.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">All providers</option>
                {providerOptions.map((provider) => (
                  <option key={provider} value={provider}>
                    {provider}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="capability-filter"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Capability
              </label>
              <select
                id="capability-filter"
                value={capabilityFilter}
                onChange={(event) => setCapabilityFilter(event.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">All capabilities</option>
                {capabilityOptions.map((capability) => (
                  <option key={capability} value={capability}>
                    {capability}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="model-type-filter"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Model type
              </label>
              <select
                id="model-type-filter"
                value={modelTypeFilter}
                onChange={(event) => setModelTypeFilter(event.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">All model types</option>
                {modelTypeOptions.map((modelType) => (
                  <option key={modelType} value={modelType}>
                    {modelType}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear filters
          </button>
        </div>

        {matchingModels.length > 0 ? (
          <section
            aria-label="Demonstration AI models"
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {matchingModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </section>
        ) : (
          <div
            role="status"
            className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center"
          >
            <p className="text-lg font-semibold text-slate-950">
              No demonstration models found
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Try changing your search or clearing one or more filters.
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
