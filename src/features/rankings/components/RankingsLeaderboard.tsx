"use client";

import { useState } from "react";
import { mockModels } from "@/features/models/data/mockModels";
import { mockBenchmarkResults, mockBenchmarks } from "@/features/rankings/data/mockBenchmarkResults";
import type { BenchmarkResult } from "@/features/rankings/types/benchmark";
import type { Model } from "@/features/models/types/model";

type LeaderboardEntry = {
  model: Model;
  result: BenchmarkResult;
  rank: number;
};

const modelCategories = Array.from(
  new Set(mockModels.map((model) => model.modelType)),
).sort((a, b) => a.localeCompare(b));

export function RankingsLeaderboard() {
  const [benchmarkId, setBenchmarkId] = useState(
    mockBenchmarks[0]?.id ?? "",
  );
  const [modelCategory, setModelCategory] = useState("");

  const selectedBenchmark = mockBenchmarks.find(
    (benchmark) => benchmark.id === benchmarkId,
  );
  const modelsById = new Map(mockModels.map((model) => [model.id, model]));

  const matchingResults = mockBenchmarkResults
    .flatMap((result) => {
      if (result.benchmarkId !== benchmarkId) return [];

      const model = modelsById.get(result.modelId);
      if (!model || !Number.isFinite(result.score)) return [];
      if (result.score < 0 || result.score > 100) return [];
      if (modelCategory && model.modelType !== modelCategory) return [];

      return [{ model, result }];
    })
    .sort((a, b) => b.result.score - a.result.score);

  const rankedResults: LeaderboardEntry[] = [];
  matchingResults.forEach((entry, index) => {
    const previousEntry = rankedResults[index - 1];
    const rank =
      previousEntry && previousEntry.result.score === entry.result.score
        ? previousEntry.rank
        : index + 1;
    rankedResults.push({ ...entry, rank });
  });

  return (
    <section aria-label="Model benchmark leaderboard">
      <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Scores shown are fictional illustrative demonstration data, not real
        benchmark measurements.
      </p>

      <div className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2 sm:p-5">
        <div>
          <label
            htmlFor="benchmark-filter"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Benchmark
          </label>
          <select
            id="benchmark-filter"
            value={benchmarkId}
            onChange={(event) => setBenchmarkId(event.target.value)}
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          >
            {mockBenchmarks.map((benchmark) => (
              <option key={benchmark.id} value={benchmark.id}>
                {benchmark.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="model-category-filter"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Model category
          </label>
          <select
            id="model-category-filter"
            value={modelCategory}
            onChange={(event) => setModelCategory(event.target.value)}
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="">All categories</option>
            {modelCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedBenchmark && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            {selectedBenchmark.name}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {selectedBenchmark.description}
          </p>
        </div>
      )}

      {rankedResults.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">
              {selectedBenchmark
                ? `Rankings for ${selectedBenchmark.name}`
                : "Model benchmark rankings"}
            </caption>
            <thead className="bg-slate-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-4 font-semibold text-slate-700 sm:px-6"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="px-4 py-4 font-semibold text-slate-700 sm:px-6"
                >
                  Model
                </th>
                <th
                  scope="col"
                  className="px-4 py-4 font-semibold text-slate-700 sm:px-6"
                >
                  Company
                </th>
                <th
                  scope="col"
                  className="px-4 py-4 font-semibold text-slate-700 sm:px-6"
                >
                  Model category
                </th>
                <th
                  scope="col"
                  className="px-4 py-4 text-right font-semibold text-slate-700 sm:px-6"
                >
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rankedResults.map(({ model, result, rank }) => (
                <tr key={`${result.benchmarkId}-${result.modelId}`}>
                  <td className="px-4 py-4 font-semibold text-indigo-700 sm:px-6">
                    {rank}
                  </td>
                  <th
                    scope="row"
                    className="px-4 py-4 font-semibold text-slate-950 sm:px-6"
                  >
                    {model.name}
                  </th>
                  <td className="px-4 py-4 text-slate-700 sm:px-6">
                    {model.company}
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {model.modelType}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right font-semibold tabular-nums text-slate-950 sm:px-6">
                    {result.score}
                    <span className="ml-1 font-normal text-slate-500">
                      / 100
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          role="status"
          className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center"
        >
          <p className="text-lg font-semibold text-slate-950">
            No results for these filters
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Try selecting a different benchmark or model category.
          </p>
        </div>
      )}
    </section>
  );
}
