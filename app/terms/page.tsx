import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/Section";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Terms governing your purchase of refurbished used slot machines and used parts from Used Slot Shop.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Section
      eyebrow="Legal"
      title="Terms of Service"
      subtitle="Last updated: 2026-07-31"
    >
      <div className="prose-slot max-w-3xl">
        <h2>Refurbished to order</h2>
        <p>
          Please understand you are purchasing a used slot machine. Here at Slot
          Machines Unlimited we refurbish every machine to order. These machines
          are up to 25+ years old and probably will have imperfections including
          but not limited to: scratches, chips, wear on button panel, nicks and
          dents in the exterior cabinet. We strive to clean each machine and only
          sell machines we would want to put in our home.
        </p>
        <p>
          All photos on our website are stock photos. Machines may vary in cabinet
          style, color or glass. We will send you a video of the machine after
          refurbishment before it ships from our warehouse. We do require approval
          of the video before we ship the machine.
        </p>

        <h2>Setup &amp; programming</h2>
        <p>
          We refurbish each machine to order. Please verify the setup details
          (credit input method, payout method, payout %, bet denominations) on your
          invoice. Any changes to the initial setup request will cost an additional
          $150. Reprogramming the machine on your own will void our warranty.
        </p>

        <h2>Shipping &amp; delivery</h2>
        <p>
          Shipping is curbside delivery only. The driver may take it to your garage
          door but they do not take the pallet inside. When you receive the machine,
          please make sure to check the machine for damage before signing the Bill
          of Lading. Minor damage like a candle being broken can be fixed.
        </p>

        <h2>Tech support</h2>
        <p>
          You should receive instructions on how to do the initial setup of your
          machine. If your machine has technical issues, we will work with you to
          make sure it is in working order. Please contact our tech support contact
          regarding this. Our technicians will be able to walk with you over the
          phone, text, or Face-time to help you troubleshoot the issue.
        </p>
        <p>
          We do not have on-site technicians, you will be responsible for doing the
          work on the machine with our technician&rsquo;s guidance. Our technicians
          work during normal business hours. We are in Mountain Standard Time. Please
          make sure your calls are within reasonable hours. Tech support outside of
          warranty period is available for $75 per hour plus cost of parts.
        </p>

        <h2>eKey deposit</h2>
        <p>
          If you purchase a machine that requires an eKey for tech support (IGT
          Family 14 machines like G20, G23, Universal, etc), a $300 credit card hold
          will be required while the eKey is on loan to you. Upon the return of the
          eKey, the $300 hold will be removed from your card.
        </p>

        <h2>Power &amp; surge protection</h2>
        <p>
          Please use a surge protector with the slot machine at all times. The
          machines have CPU boards that are highly sensitive to electrical surges.
          We highly recommend you leave the machine(s) turned on and plugged in at
          all times. Slot machines are designed to be on 24/7 in casinos.
        </p>

        <h2>Intended use</h2>
        <p>
          Used Slot Shop sells slot machines for home entertainment only.
          We highly encourage having freeplay set up for credit input on the
          machine(s). Coin handling can be sold to select states only. We do not
          condone any illegal activity with the gaming devices.
        </p>
        <p>
          Used Slot Shop reserves the right to cancel an order at our
          discretion.
        </p>

        <h2>Terms and Conditions for Purchasing Used Parts</h2>
        <p>
          This Buyer&rsquo;s Agreement outlines the terms and conditions for the
          purchase of used slot machine parts from Used Slot Shop. By
          making a purchase, you agree to the following:
        </p>

        <ol className="list-decimal space-y-6 pl-6 text-ink-200 marker:font-semibold marker:text-brand-300">
          <li>
            <strong>Condition of Parts.</strong> All parts are tested for
            functionality unless explicitly specified as &ldquo;untested&rdquo; in
            the product description.
          </li>
          <li>
            Parts are sold &ldquo;as-is,&rdquo; and Used Slot Shop
            makes no additional guarantees or warranties beyond the provided
            condition statement.
          </li>
          <li>
            <strong>Technical Support.</strong> Used Slot Shop does not
            provide troubleshooting assistance or support for installation of
            purchased parts. It is the buyer&rsquo;s sole responsibility to ensure
            compatibility and perform any required setup or repairs. If you are
            outside of your machine warranty period, tech support is available at $75
            per hour.
          </li>
          <li>
            <strong>Returns.</strong>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>Returns are accepted within 30 days of the purchase date.</li>
              <li>
                The buyer is responsible for both the cost of return shipping and a
                25% restocking fee.
              </li>
              <li>
                All returned parts must be in the same condition as received, and
                include all original components and packaging.
              </li>
              <li>
                Refunds will be issued after the returned items have been inspected
                and verified by Used Slot Shop.
              </li>
            </ul>
          </li>
          <li>
            <strong>Shipping and Risk of Loss.</strong>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>Shipping costs are non-refundable and borne by the buyer.</li>
              <li>
                Risk of loss or damage during shipping is the buyer&rsquo;s
                responsibility once the items leave our premises.
              </li>
            </ul>
          </li>
        </ol>

        <p>
          By completing your purchase, you acknowledge that you have read,
          understood, and agree to the terms and conditions of this Buyer&rsquo;s
          Agreement.
        </p>
      </div>
    </Section>
  );
}
