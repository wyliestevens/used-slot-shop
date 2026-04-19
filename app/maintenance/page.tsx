import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Slot Machine Repair & Maintenance Service — Nationwide Parts",
  description:
    "Slot machine repair, diagnostic, and parts sourcing service. IGT, Bally, Aristocrat, WMS, Konami factory-trained technicians. Ship us your machine or get a phone diagnosis.",
  path: "/maintenance",
});

export default function MaintenancePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Maintenance", path: "/maintenance" },
        ])}
      />
      <Section
        eyebrow="Repair & Service"
        title="Broken slot machine? We've probably seen it."
        subtitle="33+ years of slot machine repair. If you bought it from us, support is free forever. If you didn't, we'll still help."
      >
        <div className="prose-slot max-w-3xl">
          <h2>Services we offer</h2>
          <ul>
            <li>Full diagnostic and repair (ship-in or mail-in)</li>
            <li>Phone and video tech support</li>
            <li>Replacement parts sourcing (main boards, power supplies, validators, printers, displays)</li>
            <li>Reel strip reproduction and replacement</li>
            <li>Bezel, button, and cabinet refurbishment</li>
            <li>Bill validator and hopper service</li>
          </ul>

          <h2>How it works</h2>
          <p>
            Call <a href={site.phoneHref}>{site.phone}</a> or email{" "}
            <a href={`mailto:${site.serviceEmail}`}>{site.serviceEmail}</a> with a
            description of the issue and, ideally, a short video of the symptom. We'll
            diagnose over the phone in most cases. If a physical repair is needed, we'll
            coordinate inbound freight (at your cost) and provide a firm bench estimate
            before any work begins.
          </p>

          <h2>Parts</h2>
          <p>
            We maintain one of the deepest inventories of legacy slot machine parts in
            North America — IGT S2000, Bally S9000/Alpha, WMS Bluebird, Konami Podium,
            Aristocrat MK6, and more. If we don't have it in stock, we know who does.
          </p>

          <h2>Platforms we service</h2>
          <ul>
            <li>IGT — S+, S2000, Game King, AVP, G20, Axxis</li>
            <li>Bally — S6000, S9000, V32, V22, Alpha, Alpha 2, Pro V32</li>
            <li>Aristocrat — MK5, MK6, Viridian, Helix, Arc Single / Arc Double</li>
            <li>WMS — Bluebird, Bluebird 2, Gamefield XD, BB3</li>
            <li>Konami — Podium, K2V, Selexion, Concerto</li>
            <li>Ainsworth — A560, A600</li>
            <li>Aruze — Gen 2 Muso, Innovator</li>
          </ul>

          <p>
            <Link href="/contact">Get a service quote →</Link>
          </p>
        </div>
      </Section>
    </>
  );
}
