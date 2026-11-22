"use client";

import { useState, type ReactNode } from "react";
import { mockModels } from "@/features/models/data/mockModels";
import type { Model } from "@/features/models/types/model";

const maximumSelection = 4;
const unavailableValue = "Not available in demonstration data";

const formatContextWindow = (value: number | null) =>
  value === null
    ? unavailableValue
    : `${new Intl.NumberFormat("en-US").format(value)} tokens`;

const formatPrice = (value: number | null) =>
  value === null
    ? unavailableValue
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);

type ComparisonRow = {
  label: string;
  render: (model: Model) => ReactNode;
};

const comparisonRows: ComparisonRow[] = [
  { label: "Model name", render: (model) => model.name },
  { label: "Company", render: (model) => model.company },
  { label: "Provider", render: (model) => model.provider },
  { label: "Model type", render: (model) => model.modelType },
  {
    label: "Context window",
    render: (model) => formatContextWindow(model.contextWindow),
  },
  {
    label: "Input price per million tokens",
    render: (model) => formatPrice(model.inputPricePerMillion),
  },
  {
    label: "Output price per million tokens",
    render: (model) => formatPrice(model.outputPricePerMillion),
  },
];

export function ModelComparison() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedModels = selectedIds.flatMap((id) => {
    const model = mockModels.find((item) => item.id === id);
    return model ? [model] : [];
  });
  const selectionLimitReached = selectedIds.length >= maximumSelection;

  const toggleModel = (modelId: string) => {
    setSelectedIds((currentIds) => {
      if (currentIds.includes(modelId)) {
        return currentIds.filter((id) => id !== modelId);
      }
      if (currentIds.length >= maximumSelection) return currentIds;
      return [...currentIds, modelId];
    });
  };

  const removeModel = (modelId: string) => {
    setSelectedIds((currentIds) => currentIds.filter((id) => id !== modelId));
  };

  const clearSelection = () => setSelectedIds([]);

  return (
    <section aria-label="Choose models to compare">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Available models
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Select 2 to 4 models to compare.
          </p>
        </div>
        <p
          className="text-sm font-semibold text-slate-700"
          aria-live="polite"
          aria-atomic="true"
        >
          {selectedIds.length} of {maximumSelection} selected
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {mockModels.map((model) => {
          const isSelected = selectedIds.includes(model.id);
          const isDisabled = !isSelected && selectionLimitReached;

          return (
            <li key={model.id}>
              <label
                className={`flex h-full cursor-pointer items-start gap-3 rounded-xl border bg-white p-4 transition-colors ${
                  isSelected
                    ? "border-indigo-400 ring-1 ring-indigo-400"
                    : "border-slate-200 hover:border-slate-300"
                } ${isDisabled ? "cursor-not-allowed opacity-60" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  disabled={isDisabled}
                  onChange={() => toggleModel(model.id)}
                  aria-label={`Select ${model.name}`}
                  className="mt-1 size-4 shrink-0 accent-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                />
                <span className="min-w-0">
                  <span className="block font-semibold text-slate-950">
                    {model.name}
                  </span>
                  <span className="mt-1 block text-sm text-slate-600">
                    {model.company}
                  </span>
                  <span className="mt-2 inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                    {model.modelType}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            Selected models
          </h3>
          <button
            type="button"
            onClick={clearSelection}
            disabled={selectedIds.length === 0}
            className="self-start rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
          >
            Clear all
          </button>
        </div>

        {selectedModels.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {selectedModels.map((model) => (
              <li
                key={model.id}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-100 py-1 pl-3 pr-1 text-sm font-medium text-slate-800"
              >
                <span>{model.name}</span>
                <button
                  type="button"
                  onClick={() => removeModel(model.id)}
                  aria-label={`Remove ${model.name} from comparison`}
                  className="inline-flex size-7 items-center justify-center rounded-md text-slate-600 hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-slate-600">
            No models selected yet. Choose at least two models above to compare
            them.
          </p>
        )}
      </div>

      {selectedModels.length >= 2 ? (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold tracking-tight text-slate-950">
            Side-by-side comparison
          </h2>
          <div
            className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50"
            tabIndex={0}
            role="region"
            aria-label="Model comparison table. Scroll horizontally to view all models."
          >
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Comparison of selected fictional demonstration models
              </caption>
              <thead>
                <tr className="bg-slate-50">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 min-w-56 border-b border-slate-200 bg-slate-50 px-4 py-4 font-semibold text-slate-700"
                  >
                    Model detail
                  </th>
                  {selectedModels.map((model) => (
                    <th
                      key={model.id}
                      scope="col"
                      className="min-w-56 border-b border-slate-200 px-4 py-4 text-base font-semibold text-slate-950"
                    >
                      {model.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-white px-4 py-4 font-medium text-slate-600"
                    >
                      {row.label}
                    </th>
                    {selectedModels.map((model) => (
                      <td
                        key={model.id}
                        className="px-4 py-4 align-top text-slate-900"
                      >
                        {row.render(model)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white px-4 py-4 font-medium text-slate-600"
                  >
                    Capabilities
                  </th>
                  {selectedModels.map((model) => (
                    <td
                      key={model.id}
                      className="px-4 py-4 align-top text-slate-900"
                    >
                      {model.capabilities.length > 0 ? (
                        <ul
                          className="flex min-w-40 flex-wrap gap-2"
                          aria-label={`${model.name} capabilities`}
                        >
                          {model.capabilities.map((capability) => (
                            <li
                              key={capability}
                              className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                            >
                              {capability}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        unavailableValue
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div
          role="status"
          className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center"
        >
          <p className="text-base font-semibold text-slate-900">
            {selectedModels.length === 0
              ? "Your comparison will appear here"
              : "Select one more model"}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Choose at least two models to see their details side by side.
          </p>
        </div>
      )}
    </section>
  );
}
