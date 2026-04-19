import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Used Slot Shop collects, uses, and protects your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Section eyebrow="Legal" title="Privacy Policy" subtitle="Last updated: 2026-04-19">
      <div className="prose-slot max-w-3xl">
        <p>
          Used Slot Shop ("we", "us") respects your privacy. This policy explains what
          information we collect and how we use it.
        </p>
        <h2>What we collect</h2>
        <ul>
          <li>Information you submit via contact or quote forms (name, email, phone, state, message)</li>
          <li>Transaction details required to process your order</li>
          <li>Standard web analytics (pages visited, approximate location, device type)</li>
        </ul>
        <h2>How we use it</h2>
        <p>
          We use your information to respond to inquiries, process orders, ship and service
          machines, and improve our site. We do not sell your personal information to third
          parties.
        </p>
        <h2>Cookies & analytics</h2>
        <p>
          We may use first-party cookies and privacy-respecting analytics to understand how
          visitors use the site. You can disable cookies in your browser settings.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
          <a href={site.phoneHref}>{site.phone}</a>.
        </p>
      </div>
    </Section>
  );
}
