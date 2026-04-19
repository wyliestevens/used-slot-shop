import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import MachineCard from "@/components/MachineCard";
import { machinesByBrand } from "@/data/machines";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return site.brands.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const b = site.brands.find((x) => x.slug === brand);
  if (!b) return {};
  return buildMetadata({
    title: `${b.name} Slot Machines for Sale — Refurbished ${b.name} Slots`,
    description: `Shop refurbished ${b.name} slot machines. ${b.blurb}. All machines include a 1-year warranty, free tech support, and nationwide freight shipping.`,
    path: `/shop/${b.slug}`,
  });
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const b = site.brands.find((x) => x.slug === brand);
  if (!b) notFound();
  const list = machinesByBrand(b.slug);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: b.name, path: `/shop/${b.slug}` },
        ])}
      />
      <Section
        eyebrow={b.name}
        title={`${b.name} Slot Machines for Sale`}
        subtitle={`${b.blurb}. ${list.length} machine${list.length === 1 ? "" : "s"} currently in stock.`}
      >
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/shop" className="rounded-full border border-ink-600 bg-ink-800/50 px-4 py-2 text-sm font-medium text-ink-200 hover:border-brand-500 hover:text-brand-300">
            All brands
          </Link>
          {site.brands.map((x) => (
            <Link
              key={x.slug}
              href={`/shop/${x.slug}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                x.slug === b.slug
                  ? "bg-brand-500 text-ink-950"
                  : "border border-ink-600 bg-ink-800/50 text-ink-200 hover:border-brand-500 hover:text-brand-300"
              }`}
            >
              {x.name}
            </Link>
          ))}
        </div>
        {list.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-ink-200">
              No {b.name} machines in stock right now. Call us at{" "}
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
