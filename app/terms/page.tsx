import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/Section";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms governing your use of usedslotshop.com and purchase of slot machines.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Section eyebrow="Legal" title="Terms of Service" subtitle="Last updated: 2026-04-19">
      <div className="prose-slot max-w-3xl">
        <h2>Acceptance of terms</h2>
        <p>
          By accessing usedslotshop.com or purchasing from Used Slot Shop, you agree to
          these terms. If you disagree, please do not use the site or purchase.
        </p>
        <h2>Home amusement only</h2>
        <p>
          Slot machines sold by Used Slot Shop are intended for home amusement use only.
          Using a slot machine for gambling-for-profit is illegal in most U.S. states
          unless you hold a valid gaming operator's license.
        </p>
        <h2>Buyer responsibility for state compliance</h2>
        <p>
          It is your responsibility to ensure private slot machine ownership is legal in
          your state. We provide a state-by-state reference as a convenience but do not
          provide legal advice. See our{" "}
          <a href="/state-legality">State Legality guide</a>.
        </p>
        <h2>Warranty & returns</h2>
        <p>
          See our <a href="/warranty">Warranty page</a> for coverage details and returns.
        </p>
        <h2>Limitation of liability</h2>
        <p>
          Used Slot Shop's liability is limited to the purchase price of the product. We
          are not liable for consequential damages.
        </p>
      </div>
    </Section>
  );
}
