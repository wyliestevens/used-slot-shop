import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import PageSections from "@/components/PageSections";
import { machines } from "@/data/machines";
import MachineCard from "@/components/MachineCard";
import type { PageContent } from "@/lib/pages";
import content from "@/data/content/pages/buying-guide.json";

const page = content as PageContent;

export const metadata = buildMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/buying-guide",
});

export default function BuyingGuide() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Buying Guide", path: "/buying-guide" },
        ])}
      />
      <Section eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle}>
        <div className="prose-slot max-w-3xl">
          <PageSections sections={page.sections} />
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-white mb-6">Popular picks right now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {machines.slice(0, 3).map((m) => (
              <MachineCard key={m.slug} m={m} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
