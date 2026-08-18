import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import MachineCard from "@/components/MachineCard";
import { machines } from "@/data/machines";
import Link from "next/link";
import { Search } from "lucide-react";
import SearchRedirector from "@/components/SearchRedirector";

export function generateMetadata({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = searchParams?.q?.trim() ?? "";
  return buildMetadata({
    title: q
      ? `Search results for "${q}" — Used Slot Shop`
      : "Search Slot Machines — Used Slot Shop",
    description: `Browse refurbished casino slot machines matching "${q}". IGT, Bally, Aristocrat, WMS, Konami, Ainsworth, and Aruze.`,
    path: `/search`,
  });
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const q = (params.q ?? "").trim().toLowerCase();

  const results = q
    ? machines.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.brand.toLowerCase().includes(q) ||
          (m.type && m.type.toLowerCase().includes(q)) ||
          (m.tagline && m.tagline.toLowerCase().includes(q)) ||
          (m.cabinet && m.cabinet.toLowerCase().includes(q))
      )
    : [];

  const displayQuery = (params.q ?? "").trim();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Search", path: "/search" },
        ])}
      />

      <Section
        eyebrow="Search"
        title={
          displayQuery
            ? `Results for "${displayQuery}"`
            : "Search our inventory"
        }
        subtitle={
          displayQuery
            ? results.length > 0
              ? `Found ${results.length} machine${results.length === 1 ? "" : "s"} matching your search.`
              : "No machines matched your search — try a different term or browse by brand below."
            : "Enter a machine name, brand, or type to search."
        }
      >
        {/* Search bar on the results page */}
        <SearchRedirector initialQuery={displayQuery} />

        {/* Brand quick-links */}
        <div className="flex flex-wrap gap-2 mt-6 mb-8">
          <Link
            href="/shop"
            className="rounded-full border border-ink-600 bg-ink-800/50 px-4 py-2 text-sm font-medium text-ink-200 hover:border-brand-500 hover:text-brand-300 transition"
          >
            Browse All
          </Link>
          {["igt", "bally", "aristocrat", "williams", "konami", "ainsworth", "aruze"].map((brand) => (
            <Link
              key={brand}
              href={`/shop/${brand}`}
              className="rounded-full border border-ink-600 bg-ink-800/50 px-4 py-2 text-sm font-medium text-ink-200 hover:border-brand-500 hover:text-brand-300 transition capitalize"
            >
              {brand === "williams" ? "WMS" : brand.charAt(0).toUpperCase() + brand.slice(1)}
            </Link>
          ))}
        </div>

        {/* Results grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((m) => (
              <MachineCard key={m.slug} m={m} />
            ))}
          </div>
        ) : displayQuery ? (
          <div className="py-20 text-center">
            <Search className="mx-auto h-12 w-12 text-ink-600 mb-4" />
            <p className="text-ink-400 text-lg mb-6">
              No results for &ldquo;{displayQuery}&rdquo;
            </p>
            <Link href="/shop" className="btn-primary">
              Browse all machines
            </Link>
          </div>
        ) : null}
      </Section>
    </>
  );
}
