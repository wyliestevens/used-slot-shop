import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import PageSections from "@/components/PageSections";
import type { PageContent } from "@/lib/pages";
import content from "@/data/content/pages/about.json";

const page = content as PageContent;

export const metadata = buildMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Section eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle}>
        <div className="prose-slot max-w-3xl">
          <PageSections sections={page.sections} />
        </div>
      </Section>
    </>
  );
}
