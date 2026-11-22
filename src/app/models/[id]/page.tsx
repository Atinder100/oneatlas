import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { mockModels } from "@/features/models/data/mockModels";

type ModelDetailPageProps = {
  params: Promise<{ id: string }>;
};

const unavailableValue = "Not available in demonstration data";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

const formatPrice = (value: number | null) =>
  value === null
    ? unavailableValue
    : `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value)} per million tokens`;

const formatReleaseDate = (value: string | null) => {
  if (!value) return unavailableValue;

  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return unavailableValue;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
};

export default async function ModelDetailPage({
  params,
}: ModelDetailPageProps) {
  const { id } = await params;
  const model = mockModels.find((item) => item.id === id);

  if (!model) notFound();

  return (
    <main className="flex-1 bg-slate-50">
      <Container className="py-12 sm:py-16">
        <Link
          href="/models"
          className="inline-flex rounded-md text-sm font-semibold text-indigo-700 hover:text-indigo-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <span aria-hidden="true" className="mr-2">
            &larr;
          </span>
          Back to model discovery
        </Link>

        <header className="mt-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Model details
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {model.name}
          </h1>
          <p className="mt-2 text-base text-slate-600">
            {model.company}
            <span aria-hidden="true"> / </span>
            <span className="sr-only">Provider: </span>
            {model.provider}
          </p>
        </header>

        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Fictional demonstration data only. This record is not verified
          real-world model information.
        </p>

        <section
          aria-label={`${model.name} details`}
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 sm:p-8"
        >
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Description
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {model.description || unavailableValue}
            </p>
          </div>

          <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-slate-100 pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium text-slate-500">Model type</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-950">
                {model.modelType || unavailableValue}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">Capabilities</dt>
              <dd className="mt-2">
                {model.capabilities.length > 0 ? (
                  <ul className="flex flex-wrap gap-2" aria-label="Capabilities">
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
                  <span className="text-sm font-semibold text-slate-950">
                    {unavailableValue}
                  </span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">
                Context window
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-950">
                {model.contextWindow === null
                  ? unavailableValue
                  : `${formatNumber(model.contextWindow)} tokens`}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">
                Input pricing per million tokens
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-950">
                {formatPrice(model.inputPricePerMillion)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">
                Output pricing per million tokens
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-950">
                {formatPrice(model.outputPricePerMillion)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-slate-500">Release date</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-950">
                {formatReleaseDate(model.releaseDate)}
              </dd>
            </div>
          </dl>
        </section>
      </Container>
    </main>
  );
}
