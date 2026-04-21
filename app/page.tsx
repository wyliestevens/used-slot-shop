import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, CheckCircle2, Phone, Shield, Truck, Wrench } from "lucide-react";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import TrustBar from "@/components/TrustBar";
import MachineCard from "@/components/MachineCard";
import Faq from "@/components/Faq";
import { machines, featuredMachines, machineOfTheDay } from "@/data/machines";
import { faqs } from "@/lib/faq";
import { site } from "@/lib/site";
import homepage from "@/data/content/homepage.json";

export const metadata = buildMetadata({
  title: "Refurbished Casino Slot Machines for Sale — Shipped Nationwide",
  description:
    "Used Slot Shop sells fully refurbished IGT, Bally, Aristocrat, WMS, Konami and Aruze slot machines with a 1-year warranty and free lifetime tech support. 33+ years. Nationwide shipping.",
  path: "/",
});

// Re-pick the "machine of the day" at least once an hour so the rotation
// actually kicks over when the UTC date rolls, even without a deploy.
export const revalidate = 3600;

const featured = featuredMachines(8);
const spotlight = machineOfTheDay();

const testimonials = [
  {
    name: "Rob D.",
    location: "Phoenix, AZ",
    rating: 5,
    text: "Bought an IGT S2000 for my garage bar. Arrived on a pallet in perfect condition, fired up first try. The techs walked me through setup over FaceTime. Easiest purchase I've ever made.",
  },
  {
    name: "Jen M.",
    location: "Austin, TX",
    rating: 5,
    text: "I'm not technical at all. They recommended a Buffalo Gold MK6, set everything to penny denomination, and it's been the centerpiece of our basement for two years. Zero issues.",
  },
  {
    name: "Curtis L.",
    location: "Reno, NV",
    rating: 5,
    text: "I run a private members club and bought 4 machines. Refurb quality is honestly better than some stuff I've seen on active casino floors. Will absolutely buy again.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs.slice(0, 6))} />

      {/* HERO — backdrop glow is now the fixed AmbientGlow in the root layout */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/30 to-ink-950/60" aria-hidden />
        <div className="container-wide relative pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-300 uppercase">
                <Star className="h-3.5 w-3.5 fill-brand-400 text-brand-400" />
                {homepage.hero.eyebrow}
              </div>
              <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight">
                {homepage.hero.titleTop}
                <br />
                <span className="hl-gold">{homepage.hero.titleBottom}</span>
              </h1>
              <p className="mt-6 text-lg text-ink-200 max-w-xl leading-relaxed">
                {homepage.hero.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href={homepage.hero.primaryCtaHref} className="btn-primary">
                  {homepage.hero.primaryCtaText} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={homepage.hero.secondaryCtaHref} className="btn-ghost">
                  {homepage.hero.secondaryCtaText}
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-5 text-sm text-ink-200">
                {[
                  { t: "1-Year Warranty", c: "text-brand-400" },
                  { t: "Free Tech Support", c: "text-accent-300" },
                  { t: "Nationwide Freight", c: "text-brand-400" },
                ].map(({ t, c }) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle2 className={`h-4 w-4 ${c}`} /> {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-glow border border-brand-500/30">
                <Image
                  src={homepage.hero.image}
                  alt="Featured slot machine"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
              {spotlight && (
                <Link
                  href={`/machines/${spotlight.slug}`}
                  className="absolute -bottom-6 -left-6 block rounded-2xl bg-accent-500 text-ink-950 p-5 shadow-mint max-w-[240px] hover:-translate-y-0.5 transition"
                >
                  <div className="text-[11px] uppercase text-ink-950/70 font-bold mb-1 tracking-widest">
                    {homepage.hero.sidebarProductLabel}
                  </div>
                  <div className="font-display text-lg font-bold text-ink-950 leading-tight line-clamp-2">
                    {spotlight.name}
                  </div>
                  <div className="mt-2 text-2xl font-black text-ink-950">
                    ${spotlight.price.toLocaleString()}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* FEATURED MACHINES */}
      <Section
        eyebrow="Featured Inventory"
        title="In-stock, tested, and ready to ship."
        subtitle="Every machine is stripped, cleaned, bench-tested, and warrantied. No surprises, no guesswork."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((m) => (
            <MachineCard key={m.slug} m={m} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-accent-500 px-6 py-3 text-sm font-semibold text-accent-300 transition hover:bg-accent-500 hover:text-ink-950"
          >
            View All {machines.length} Machines <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* SHOP BY BRAND */}
      <Section
        eyebrow="Shop by Brand"
        title="Seven manufacturers. One trusted source."
        subtitle="IGT reels. Bally classics. Aristocrat blockbusters. Whatever you're chasing, we stock it — or we'll find it."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {site.brands.map((b, i) => {
            const hover =
              i % 2 === 0
                ? "hover:border-brand-500/60 hover:shadow-glow"
                : "hover:border-accent-500/60 hover:shadow-mint";
            return (
              <Link
                key={b.slug}
                href={`/shop/${b.slug}`}
                className={`card p-6 text-center hover:-translate-y-1 transition ${hover}`}
              >
                <div className="font-display font-bold text-lg text-white">{b.name}</div>
                <div className="mt-2 text-xs text-ink-300 leading-snug">{b.blurb}</div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* WHY US */}
      <Section
        eyebrow="The Difference"
        title="Refurbishment you can actually inspect."
        subtitle="Average 18–40 technician hours per machine. Full diagnostic reports on request."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              tone: "brand" as const,
              title: "Casino-grade compliance",
              text: "Every board, RAM chip, bill validator, RNG, and hopper is tested against casino-floor spec before it leaves our bay.",
            },
            {
              icon: Wrench,
              tone: "accent" as const,
              title: "Certified technicians",
              text: "Our bench techs average 12+ years in the industry — IGT, Bally, and Aristocrat factory-trained.",
            },
            {
              icon: Truck,
              tone: "brand" as const,
              title: "Logistics that just work",
              text: "Insured pallet freight with liftgate residential available. Tracking, photos, and a real phone number if anything goes sideways.",
            },
          ].map((f) => {
            const iconCls =
              f.tone === "accent" ? "bg-accent-500 text-ink-950" : "bg-brand-500 text-white";
            return (
              <div key={f.title} className="card p-7">
                <div className={`grid h-14 w-14 place-items-center rounded-xl ${iconCls}`}>
                  <f.icon className="h-7 w-7" strokeWidth={2.25} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-ink-300">{f.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* TESTIMONIALS — sits on a mint wash to anchor the accent in the page */}
      <div className="bg-accent-500/10 border-y border-accent-500/30">
        <Section eyebrow="Real Customers" title="Built on word of mouth.">
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-7">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-400 text-brand-400" />
                  ))}
                </div>
                <p className="mt-4 text-ink-100 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-5 text-sm">
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-ink-400">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* FAQ */}
      <Section
        eyebrow="Common Questions"
        title="Everything buyers ask, answered."
        subtitle="Not finding what you need? Call us — we've been doing this since 1992."
      >
        <div className="max-w-3xl mx-auto">
          <Faq items={faqs} limit={6} />
          <div className="mt-6 text-center">
            <Link href="/faq" className="btn-ghost">
              See all {faqs.length} questions
            </Link>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="relative py-20 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800">
        <div className="container-wide text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
            Talk to a slot machine expert.
          </h2>
          <p className="mt-4 text-lg text-brand-50 max-w-2xl mx-auto">
            Free consultation. No pushy sales. We'll help you pick the right machine for
            your space, your state, and your budget.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-brand-50">
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20">
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
