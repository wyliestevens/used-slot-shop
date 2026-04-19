import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Warranty & Return Policy — 1-Year Home-Use Coverage",
  description:
    "Every slot machine from Used Slot Shop includes a 1-year home-use warranty and free lifetime phone/video tech support. Full coverage details.",
  path: "/warranty",
});

export default function WarrantyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Warranty", path: "/warranty" },
        ])}
      />
      <Section
        eyebrow="Warranty"
        title="Every machine is covered for a full year."
        subtitle="Plus free lifetime tech support from the people who refurbished it."
      >
        <div className="prose-slot max-w-3xl">
          <h2>What's covered (12 months from delivery)</h2>
          <ul>
            <li>Main boards, RAM, and CPU modules</li>
            <li>Power supplies</li>
            <li>Bill validators and ticket printers</li>
            <li>Reel mechanics (steppers, optics, strip retainers)</li>
            <li>LCD and CRT displays (failures, not impact damage)</li>
            <li>Buttons, candle lights, speakers</li>
          </ul>

          <h2>What's not covered</h2>
          <ul>
            <li>Light bulbs and light bulb starters</li>
            <li>Fuses (consumables)</li>
            <li>Glass, LCD, or bezel breakage from impact or drop</li>
            <li>Damage from power surges (use a surge protector)</li>
            <li>Unauthorized modifications or opened/tampered hardware</li>
            <li>Commercial use (home-use warranty only)</li>
          </ul>

          <h2>How the warranty works</h2>
          <p>
            If something fails in the first 12 months, call{" "}
            <a href={site.phoneHref}>{site.phone}</a> or email{" "}
            <a href={`mailto:${site.serviceEmail}`}>{site.serviceEmail}</a>. A technician
            will diagnose over the phone or video. If it's a covered part, we ship the
            replacement at no cost to you. You are responsible for return shipping of the
            defective component.
          </p>

          <h2>Return policy</h2>
          <p>
            We accept returns within 14 days of delivery on machines that are in original
            condition. The buyer is responsible for return freight. A 15% restocking fee
            applies to all non-defective returns. If your machine arrived damaged in
            transit, call us immediately (within 48 hours) and we'll handle the freight
            claim and replacement on our end.
          </p>

          <h2>Free lifetime tech support</h2>
          <p>
            The warranty period is 12 months. Phone and video tech support is forever. Even
            a decade from now, if you can't figure out why your hopper isn't feeding or
            your bill validator stopped reading $20s, call us. Parts availability is never
            guaranteed for legacy platforms, but advice always is.
          </p>

          <p>
            Questions? <Link href="/contact">Send us a message</Link> or call{" "}
            <a href={site.phoneHref}>{site.phone}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
