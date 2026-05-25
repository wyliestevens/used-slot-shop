import { buildMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import MachineCard from "@/components/MachineCard";
import { machines } from "@/data/machines";
import Link from "next/link";
import { site } from "@/lib/site";

const PER_PAGE = 24;

export const metadata = buildMetadata({
  title: "Shop All Slot Machines for Sale — Refurbished Casino Slots",
  description:
    "Browse our full inventory of refurbished casino slot machines. IGT, Bally, Aristocrat, WMS, Konami, Ainsworth, and Aruze. All machines include a 1-year warranty and nationwide shipping.",
  path: "/shop",
});

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const totalPages = Math.ceil(machines.length / PER_PAGE);
  const page = Math.min(currentPage, totalPages);
  const start = (page - 1) * PER_PAGE;
  const visible = machines.slice(start, start + PER_PAGE);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
          ]),
          itemListJsonLd(
            visible.map((m, i) => ({
              name: m.name,
              url: `${site.url}/machines/${m.slug}`,
              position: start + i + 1,
            }))
          ),
        ]}
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
          {visible.map((m) => (
            <MachineCard key={m.slug} m={m} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-12 flex justify-center items-center gap-2" aria-label="Shop pagination">
            {page > 1 && (
              <Link
                href={`/shop?page=${page - 1}`}
                className="rounded-full border border-ink-600 px-4 py-2 text-sm font-medium text-ink-200 hover:border-brand-500 hover:text-brand-300 transition"
              >
                ← Previous
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/shop?page=${p}`}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  p === page
                    ? "bg-brand-500 text-ink-950"
                    : "border border-ink-600 text-ink-200 hover:border-brand-500 hover:text-brand-300"
                }`}
              >
                {p}
              </Link>
            ))}
            {page < totalPages && (
              <Link
                href={`/shop?page=${page + 1}`}
                className="rounded-full border border-ink-600 px-4 py-2 text-sm font-medium text-ink-200 hover:border-brand-500 hover:text-brand-300 transition"
              >
                Next →
              </Link>
            )}
          </nav>
        )}
        <p className="mt-4 text-center text-sm text-ink-400">
          Showing {start + 1}–{Math.min(start + PER_PAGE, machines.length)} of {machines.length} machines
        </p>
      </Section>
    </>
  );
}
