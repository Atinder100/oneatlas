import type { Model } from "@/features/models/types/model";

type ModelCardProps = {
  model: Model;
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

const formatPrice = (value: number | null) =>
  value === null
    ? "Not available"
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);

const formatReleaseDate = (value: string | null) => {
  if (!value) return "Not available";

  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
};

export function ModelCard({ model }: ModelCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 transition-shadow hover:shadow-md sm:p-6">
      <header className="border-b border-slate-100 pb-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              {model.name}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {model.company}
              <span aria-hidden="true"> / </span>
              <span className="sr-only">Provider: </span>
              {model.provider}
            </p>
          </div>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            {model.modelType}
          </span>
        </div>
      </header>

      <p className="mt-5 text-sm leading-6 text-slate-600">
        {model.description}
      </p>

      <div className="mt-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Capabilities
        </h3>
        <ul className="mt-2 flex flex-wrap gap-2" aria-label="Model capabilities">
          {model.capabilities.map((capability) => (
            <li
              key={capability}
              className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
            >
              {capability}
            </li>
          ))}
        </ul>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium text-slate-500">Context window</dt>
          <dd className="mt-1 text-sm font-semibold text-slate-950">
            {model.contextWindow === null
              ? "Not available"
              : `${formatNumber(model.contextWindow)} tokens`}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-slate-500">Released</dt>
          <dd className="mt-1 text-sm font-semibold text-slate-950">
            {formatReleaseDate(model.releaseDate)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-slate-500">Input price</dt>
          <dd className="mt-1 text-sm font-semibold text-slate-950">
            {formatPrice(model.inputPricePerMillion)}
            {model.inputPricePerMillion !== null && (
              <span className="font-normal text-slate-500"> / 1M tokens</span>
            )}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-slate-500">Output price</dt>
          <dd className="mt-1 text-sm font-semibold text-slate-950">
            {formatPrice(model.outputPricePerMillion)}
            {model.outputPricePerMillion !== null && (
              <span className="font-normal text-slate-500"> / 1M tokens</span>
            )}
          </dd>
        </div>
      </dl>
    </article>
  );
}
