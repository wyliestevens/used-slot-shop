import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { machines } from "@/data/machines";
import MachineCard from "@/components/MachineCard";

export const metadata = buildMetadata({
  title: "How to Buy a Used Slot Machine — The 2026 Buyer's Guide",
  description:
    "The complete guide to buying a refurbished slot machine for your home, bar, or game room. Brands, types, pricing, shipping, legality, and what separates a great dealer from a bad one.",
  path: "/buying-guide",
});

export default function BuyingGuide() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Buying Guide", path: "/buying-guide" },
        ])}
      />
      <Section
        eyebrow="Buyer's Guide"
        title="How to buy a slot machine (the right way)"
        subtitle="Written by our service team — 33+ years of refurbishing, repairing, and delivering casino-grade slots."
      >
        <div className="prose-slot max-w-3xl">
          <p>
            Buying a slot machine for your home shouldn't feel like buying a used car. It
            should feel like investing in a piece of American entertainment history. This
            guide covers everything we wish every buyer knew before picking up the phone.
          </p>

          <h2>1. Is it legal where you live?</h2>
          <p>
            Slot machine ownership laws vary significantly by state. 13 states (Alaska,
            Arizona, Arkansas, Kentucky, Maine, Minnesota, Nevada, Ohio, Rhode Island, Texas,
            Utah, Virginia, and West Virginia) allow any slot machine with no age
            restriction. Most other states allow machines that are 20 to 30+ years old for
            home amusement use. Nine states currently prohibit private ownership.
          </p>
          <p>
            <Link href="/state-legality">→ See the full state-by-state legality guide</Link>
          </p>

          <h2>2. Reel vs. video vs. video poker — what's right for you?</h2>
          <h3>Classic reel slots (like the IGT S2000)</h3>
          <p>
            Mechanical reels, classic casino feel, simple paytables. The IGT S2000 is the
            single best-selling platform in home ownership and for good reason: it's bomb-
            proof, parts are everywhere, and it's easy to service. Typically $2,000–$3,000
            refurbished.
          </p>
          <h3>Video slots (like Aristocrat Buffalo Gold)</h3>
          <p>
            5-reel LCD displays, multi-line bets, bonus rounds, and flashy animations. If
            you want the casino floor experience, this is it. Typically $2,700–$4,000+.
          </p>
          <h3>Video poker (like IGT Game King)</h3>
          <p>
            If you prefer strategy, Game King multi-game video poker is unbeatable. 31
            preloaded poker variants from Jacks or Better to Deuces Wild. Runs $2,300–$3,000.
          </p>

          <h2>3. Set a realistic budget</h2>
          <p>
            Most home buyers land between $2,500 and $3,500 all-in, including freight.
            Budget machines below $2,000 are out there but usually mean older cabinets,
            smaller screens, or lighter refurbishment. Premium cabinets (Bally Alpha 2 Pro,
            Aruze Innovator) can cross $4,000.
          </p>

          <h2>4. Choose a dealer with a warranty (and a phone number)</h2>
          <p>
            This is the single biggest differentiator. A direct dealer with a warehouse will
            offer a warranty, telephone support, and access to parts. An eBay seller or
            Craigslist flipper almost certainly won't. Ask these questions before you buy:
          </p>
          <ul>
            <li>Do you offer a written warranty? For how long? What does it cover?</li>
            <li>Do you have a physical shop I can visit?</li>
            <li>Are your techs factory-trained, and on which platforms?</li>
            <li>What's your return policy if the machine arrives damaged?</li>
            <li>Can I get a phone walkthrough during setup?</li>
          </ul>

          <h2>5. Verify the refurbishment process</h2>
          <p>
            A good refurb takes 18–40 technician hours per machine. The process should
            include: complete disassembly, cleaning, electronic bench testing of main boards
            and RAM, bill validator testing, RNG and paytable verification, re-lamping with
            LEDs, reel strip replacement if faded, and final burn-in testing. If a seller
            can't walk you through this, walk away.
          </p>

          <h2>6. Understand the real cost of shipping</h2>
          <p>
            A slot machine weighs 200–320 lbs and has to ship freight on a pallet. Average
            shipping costs $250–$600 depending on distance and whether you need a liftgate.
            Machines arrive in a wooden crate or shrink-wrapped pallet. A quality dealer
            will handle freight for you, provide tracking, and insure the shipment.
          </p>

          <h2>7. Plan your space (before the truck shows up)</h2>
          <p>
            Most machines stand 40 to 70 inches tall and need at least a 30"x30" footprint.
            Make sure you have a standard 3-prong 110V outlet within reach — slot machines
            don't need special wiring. Upstairs delivery is possible but usually means you
            and a friend carrying ~250 lbs up the stairs. Ground floor, garage, basement
            (with an accessible door), or bar area is ideal.
          </p>

          <h2>8. Understand that home-use means entertainment only</h2>
          <p>
            Every legitimate dealer will tell you this: slot machines for home use are
            entertainment devices. They do not pay out real cash. Bill acceptance adds
            credits to the machine's internal counter, and payouts accumulate as credits or
            ticket prints. Using a slot machine for gambling-for-profit is illegal in every
            state unless you're a licensed operator.
          </p>

          <h2>Ready to shop?</h2>
          <p>
            Browse our full inventory below, or call us at{" "}
            <a href="tel:+19284185549">928-418-5549</a> and tell us about your space — we'll
            recommend three machines to consider.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-white mb-6">Popular picks right now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {machines.slice(0, 3).map((m) => (
              <MachineCard key={m.slug} m={m} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
