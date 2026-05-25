import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import Faq from "@/components/Faq";
import { faqs } from "@/lib/faq";

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
        subtitle="33 years of buying, selling, and refurbishing slot machines. These are the questions we get every week."
      >
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-12">
          Slot Machine Buyer FAQ — Every Question, Answered
        </h1>
        <div className="max-w-3xl">
          <Faq items={faqs} />
        </div>
      </Section>
    </>
  );
}
