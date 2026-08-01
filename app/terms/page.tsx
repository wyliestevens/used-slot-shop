import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import PageSections from "@/components/PageSections";
import type { PageContent } from "@/lib/pages";
import content from "@/data/content/pages/terms.json";

const page = content as PageContent;

export const metadata = buildMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <Section eyebrow={page.eyebrow}>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          {page.title}
        </h1>
        {page.subtitle ? (
          <p className="mt-4 mb-12 text-ink-300 text-lg leading-relaxed">{page.subtitle}</p>
        ) : null}
        <div className="prose-slot max-w-3xl">
          <PageSections sections={page.sections} />
        </div>
      </Section>
    </>
  );
}
