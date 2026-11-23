"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { mockModels } from "@/features/models/data/mockModels";
import { mockLabs } from "@/features/labs/data/mockLabs";

const formatReleaseDate = (value: string | null) => {
  if (!value) return "Release date not listed";

  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return "Release date not listed";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
};

const modelTypes = Array.from(
  new Set(mockModels.map((model) => model.modelType)),
).sort((a, b) => a.localeCompare(b));

const focusAreas = Array.from(
  new Set(mockLabs.map((lab) => lab.focusArea)),
).sort((a, b) => a.localeCompare(b));

type LabDirectoryProps = {
  initialQuery?: string;
};

export function LabDirectory({ initialQuery = "" }: LabDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [focusFilter, setFocusFilter] = useState("");
  const [modelTypeFilter, setModelTypeFilter] = useState("");

  const matchingLabs = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return mockLabs.flatMap((lab) => {
      const associatedModels = mockModels.filter(
        (model) => model.company === lab.name,
      );
      const visibleModels = modelTypeFilter
        ? associatedModels.filter((model) => model.modelType === modelTypeFilter)
        : associatedModels;
      const matchesSearch =
        !normalizedQuery ||
        [lab.name, lab.focusArea, ...associatedModels.map((model) => model.name)]
          .some((value) => value.toLowerCase().includes(normalizedQuery));

      if (
        !matchesSearch ||
        (focusFilter && lab.focusArea !== focusFilter) ||
        (modelTypeFilter && visibleModels.length === 0)
      ) {
        return [];
      }

      return [{ lab, models: visibleModels }];
    });
  }, [searchQuery, focusFilter, modelTypeFilter]);

  const hasActiveFilters =
    searchQuery.trim() !== "" || Boolean(focusFilter || modelTypeFilter);

  const clearFilters = () => {
    setSearchQuery("");
    setFocusFilter("");
    setModelTypeFilter("");
  };

  return (
    <section aria-label="AI labs directory">
      <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Fictional demonstration data only. Lab names, descriptions,
        affiliations, and model listings are not verified real-world
        information.
      </p>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="mb-4">
          <label
            htmlFor="lab-search"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Search labs
          </label>
          <input
            id="lab-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by lab, focus area, or model"
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-950 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="lab-focus-filter"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Research focus
            </label>
            <select
              id="lab-focus-filter"
              value={focusFilter}
              onChange={(event) => setFocusFilter(event.target.value)}
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="">All focus areas</option>
              {focusAreas.map((focusArea) => (
                <option key={focusArea} value={focusArea}>
                  {focusArea}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="lab-model-type-filter"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Associated model type
            </label>
            <select
              id="lab-model-type-filter"
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
              ? `${matchingLabs.length} of ${mockLabs.length} labs match`
              : `${mockLabs.length} demonstration labs`}
          </p>
        </div>
      </div>

      {matchingLabs.length > 0 ? (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {matchingLabs.map(({ lab, models }) => (
            <li key={lab.id}>
              <article className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 sm:p-6">
                <header className="border-b border-slate-100 pb-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                      {lab.name}
                    </h2>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {lab.focusArea}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {lab.description}
                  </p>
                </header>

                <div className="mt-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Associated models
                  </h3>
                  {models.length > 0 ? (
                    <ul className="mt-3 divide-y divide-slate-100">
                      {models.map((model) => (
                        <li
                          key={model.id}
                          className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <Link
                              href={`/models/${model.id}`}
                              className="rounded-sm text-sm font-semibold text-indigo-700 hover:text-indigo-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                            >
                              {model.name}
                            </Link>
                            <p className="mt-1 text-xs text-slate-500">
                              {formatReleaseDate(model.releaseDate)}
                            </p>
                          </div>
                          <span className="self-start rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 sm:self-auto">
                            {model.modelType}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-slate-600">
                      No associated models match this model type.
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
            No labs match your search or filters
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Try a different search, focus area, or model type, or clear your
            filters.
          </p>
        </div>
      )}
    </section>
  );
}
