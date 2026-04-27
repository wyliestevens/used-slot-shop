import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import MachineCard from "@/components/MachineCard";
import {
  machinesBySeries,
  seriesByBrand,
  getSeries,
} from "@/data/machines";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return site.brands.flatMap((b) =>
    seriesByBrand(b.slug).map((s) => ({ brand: b.slug, series: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; series: string }>;
}) {
  const { brand, series } = await params;
  const b = site.brands.find((x) => x.slug === brand);
  const s = b ? getSeries(brand, series) : null;
  if (!b || !s) return {};
  return buildMetadata({
    title: `${s.name} for Sale — Refurbished ${b.name} Slot Machines`,
    description: `Shop refurbished ${s.name} slot machines from ${b.name}. ${s.count} machine${
      s.count === 1 ? "" : "s"
    } in stock with a 1-year warranty, free tech support, and nationwide freight shipping.`,
    path: `/shop/${b.slug}/${s.slug}`,
  });
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ brand: string; series: string }>;
}) {
  const { brand, series } = await params;
  const b = site.brands.find((x) => x.slug === brand);
  if (!b) notFound();
  const s = getSeries(brand, series);
  if (!s) notFound();
  const list = machinesBySeries(brand, series);
  const allSeries = seriesByBrand(brand);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: b.name, path: `/shop/${b.slug}` },
          { name: s.name, path: `/shop/${b.slug}/${s.slug}` },
        ])}
      />
      <Section
        eyebrow={`${b.name} · ${s.name}`}
        title={`${s.name} Slot Machines for Sale`}
        subtitle={`${list.length} ${s.name} machine${
          list.length === 1 ? "" : "s"
        } currently in stock — refurbished, tested, and shipped with a 1-year warranty.`}
      >
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href={`/shop/${b.slug}`}
            className="rounded-full border border-ink-600 bg-ink-800/50 px-4 py-2 text-sm font-medium text-ink-200 hover:border-brand-500 hover:text-brand-300"
          >
            All {b.name}
          </Link>
          {allSeries.map((x) => (
            <Link
              key={x.slug}
              href={`/shop/${b.slug}/${x.slug}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                x.slug === s.slug
                  ? "bg-brand-500 text-ink-950"
                  : "border border-ink-600 bg-ink-800/50 text-ink-200 hover:border-brand-500 hover:text-brand-300"
              }`}
            >
              {x.name}{" "}
              <span
                className={`text-xs ${
                  x.slug === s.slug ? "text-ink-950/70" : "text-ink-400"
                }`}
              >
                {x.count}
              </span>
            </Link>
          ))}
        </div>
        {list.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-ink-200">
              No {s.name} machines in stock right now. Call us at{" "}
              <a href={site.phoneHref} className="text-brand-300 underline">
                {site.phone}
              </a>{" "}
              — we often source on request.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {list.map((m) => (
              <MachineCard key={m.slug} m={m} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
