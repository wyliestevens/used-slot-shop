import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Shipping & Delivery — Nationwide Slot Machine Freight",
  description:
    "How we ship slot machines: insured pallet freight, 5-10 business day transit nationwide, liftgate residential delivery available. Full shipping details.",
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
      <Section
        eyebrow="Shipping"
        title="Insured freight. Straight to your driveway."
        subtitle="Every machine ships from our Kingman, AZ warehouse on a wooden pallet, shrink-wrapped with corner protection, and fully insured for the replacement value."
      >
        <div className="prose-slot max-w-3xl">
          <h2>How we ship</h2>
          <ul>
            <li>Machines are palletized, strapped, and corner-protected</li>
            <li>Fully insured for the purchase price</li>
            <li>Tracking provided within 24 hours of pickup</li>
            <li>Photos of the packaged machine before it leaves the bay</li>
          </ul>

          <h2>Transit times</h2>
          <ul>
            <li>Arizona / Nevada / Utah / New Mexico: 2–4 business days</li>
            <li>West Coast (CA, OR, WA): 3–5 business days</li>
            <li>Midwest: 5–7 business days</li>
            <li>East Coast / Southeast: 7–10 business days</li>
          </ul>
          <p>
            Shipping origin: {site.address.street}, {site.address.city}, {site.address.region}{" "}
            {site.address.postalCode}.
          </p>

          <h2>What to expect on delivery day</h2>
          <p>
            The freight carrier will call 24 hours before arrival to schedule a delivery
            window. Standard terminal-to-terminal freight delivers to the back of the truck
            at your curb — bring a friend or choose our liftgate option so the pallet
            lowers to ground level. Open the shrink wrap and confirm no visible damage
            before signing. If there's any damage, refuse the delivery or note it on the
            bill of lading — we'll handle the claim.
          </p>

          <h2>Inside delivery / upstairs</h2>
          <p>
            Freight carriers do not move machines inside your home. You'll need a friend,
            dolly, or local moving service to roll the ~250 lb machine into place. Upstairs
            delivery is possible but requires two strong people.
          </p>

          <h2>International shipping</h2>
          <p>
            We ship internationally by quote. Contact{" "}
            <a href={`mailto:${site.salesEmail}`}>{site.salesEmail}</a> with your delivery
            country, city, and the machine model you want — we'll coordinate a freight
            quote with customs paperwork.
          </p>
        </div>
      </Section>
    </>
  );
}
