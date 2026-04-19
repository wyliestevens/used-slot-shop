import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import MachineCard from "@/components/MachineCard";
import { machines } from "@/data/machines";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Shop All Slot Machines for Sale — Refurbished Casino Slots",
  description:
    "Browse our full inventory of refurbished casino slot machines. IGT, Bally, Aristocrat, WMS, Konami, Ainsworth, and Aruze. All machines include a 1-year warranty and nationwide shipping.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
        ])}
      />
      <Section
        eyebrow={`${machines.length} Machines In Stock`}
        title="Shop Refurbished Slot Machines"
        subtitle="All machines ship from our Kingman, AZ warehouse with a 1-year home-use warranty, free lifetime tech support, and insured freight delivery."
      >
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/shop" className="rounded-full bg-brand-500 text-ink-950 px-4 py-2 text-sm font-semibold">
            All
          </Link>
          {site.brands.map((b) => (
            <Link
              key={b.slug}
              href={`/shop/${b.slug}`}
              className="rounded-full border border-ink-600 bg-ink-800/50 px-4 py-2 text-sm font-medium text-ink-200 hover:border-brand-500 hover:text-brand-300 transition"
            >
              {b.name}
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {machines.map((m) => (
            <MachineCard key={m.slug} m={m} />
          ))}
        </div>
      </Section>
    </>
  );
}
