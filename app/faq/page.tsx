import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import Faq from "@/components/Faq";
import { faqs } from "@/data/faq";

export const metadata = buildMetadata({
  title: "Slot Machine Buyer FAQ — Answers to Every Common Question",
  description:
    "Everything you need to know before buying a refurbished slot machine: legality, warranty, shipping, setup, financing, and more.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          faqJsonLd(faqs),
        ]}
      />
      <Section
        eyebrow="Frequently Asked"
        title="Every question, answered."
        subtitle="33 years of buying, selling, and refurbishing slot machines. These are the questions we get every week."
      >
        <div className="max-w-3xl">
          <Faq items={faqs} />
        </div>
      </Section>
    </>
  );
}
