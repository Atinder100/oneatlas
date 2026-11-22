"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ModelCard } from "@/features/models/components/ModelCard";
import { mockModels } from "@/features/models/data/mockModels";

export default function ModelsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const matchingModels = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return mockModels;
    }

    return mockModels.filter((model) =>
      [model.name, model.company, model.provider].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [searchQuery]);

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
            {searchQuery.trim()
              ? `${matchingModels.length} of ${mockModels.length} demonstration models match`
              : `${mockModels.length} demonstration models available`}
          </p>
        </header>

        <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Demonstration data only. These records are fictional and are not
          verified real-world model information.
        </p>

        <div className="mb-6">
          <label htmlFor="model-search" className="mb-2 block text-sm font-medium text-slate-700">
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
              Try a model name, company, or provider.
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
