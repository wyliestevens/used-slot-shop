import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import PageSections from "@/components/PageSections";
import type { PageContent } from "@/lib/pages";
import content from "@/data/content/pages/shipping.json";

const page = content as PageContent;

export const metadata = buildMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/shipping",
});

export default function ShippingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shipping", path: "/shipping" },
        ])}
      />
      <Section eyebrow={page.eyebrow} subtitle={page.subtitle}>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-12">
          {page.title}
        </h1>
        <div className="prose-slot max-w-3xl">
          <PageSections sections={page.sections} />
        </div>
      </Section>
    </>
  );
}
