import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Used Slot Shop — 33+ Years of Slot Machine Expertise",
  description:
    "Used Slot Shop has been refurbishing, selling, and servicing casino slot machines from our Kingman, Arizona headquarters since 1992. Meet the team and our refurbishment process.",
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
      <Section
        eyebrow="Our Story"
        title="Since 1992, we've refurbished over 12,000 slot machines."
        subtitle="From a single bay in Kingman, Arizona, to one of the most trusted names in the private slot machine market."
      >
        <div className="prose-slot max-w-3xl">
          <p>
            Used Slot Shop started as a one-man repair operation in {site.founded}. Three
            decades later, we're a family-run business with a dedicated technician team,
            a deep parts inventory, and customers in every U.S. state — plus a growing
            list of international collectors.
          </p>

          <h2>What makes us different</h2>
          <p>
            There are a lot of places to buy a slot machine online. Most are resellers who
            flip auction lots with a rag and a spray bottle. We're different for three
            reasons:
          </p>
          <ul>
            <li>
              <strong>We refurbish everything in-house.</strong> Every machine we sell
              passes through our Kingman bench, where certified technicians spend an
              average of 18–40 hours per unit.
            </li>
            <li>
              <strong>We stock parts.</strong> Our parts warehouse is one of the deepest
              in the country for legacy IGT, Bally, WMS, and Aristocrat platforms. That
              means your machine can be serviced in 10 years, not 10 weeks.
            </li>
            <li>
              <strong>We answer the phone.</strong> Same number. Same people. Same
              expertise. Try it: <a href={site.phoneHref}>{site.phone}</a>.
            </li>
          </ul>

          <h2>Our refurbishment process</h2>
          <ol className="list-decimal pl-6 space-y-2 text-ink-200 mb-4">
            <li>Full strip-down and inspection of all assemblies</li>
            <li>Deep cleaning — cabinet, internals, and glass</li>
            <li>Bench testing of main board, RAM, power supply, bill validator, hopper/printer, and display</li>
            <li>Component replacement where needed — caps, fuses, switches, steppers</li>
            <li>LED re-lamping for consistent long-term brightness</li>
            <li>Reel strip replacement, bezel polishing, button refresh</li>
            <li>Casino-grade compliance testing of RNG and paytable behavior</li>
            <li>48-hour burn-in test before final QC sign-off</li>
            <li>Custom-crated or palletized for freight</li>
          </ol>

          <h2>Where to find us</h2>
          <p>
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postalCode}
            <br />
            Phone: <a href={site.phoneHref}>{site.phone}</a>
            <br />
            Email: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>
            Walk-ins welcome by appointment — <Link href="/contact">schedule a visit</Link>.
          </p>
        </div>
      </Section>
    </>
  );
}
