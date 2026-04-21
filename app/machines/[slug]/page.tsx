import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Phone, Shield, Truck, Star } from "lucide-react";
import { buildMetadata, breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import MachineCard from "@/components/MachineCard";
import { machines, getMachine, relatedMachines } from "@/data/machines";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return machines.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = getMachine(slug);
  if (!m) return {};
  return buildMetadata({
    title: `${m.name} — ${m.brandLabel} Refurbished Slot Machine`,
    description: `${m.tagline} $${m.price.toLocaleString()}. ${m.condition}. 1-year warranty, free lifetime tech support, nationwide freight.`,
    path: `/machines/${m.slug}`,
    image: m.image,
  });
}

export default async function MachinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = getMachine(slug);
  if (!m) notFound();
  const related = relatedMachines(m.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: m.brandLabel, path: `/shop/${m.brand}` },
            { name: m.name, path: `/machines/${m.slug}` },
          ]),
          productJsonLd(m),
        ]}
      />
      <div className="container-wide pt-10">
        <nav className="text-sm text-ink-400 mb-6 flex gap-2 flex-wrap">
          <Link href="/" className="hover:text-brand-300">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-brand-300">Shop</Link>
          <span>/</span>
          <Link href={`/shop/${m.brand}`} className="hover:text-brand-300">{m.brandLabel}</Link>
          <span>/</span>
          <span className="text-ink-200">{m.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-ink-700 bg-ink-900">
              <Image
                src={m.image}
                alt={`${m.name} refurbished slot machine`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="rounded-full bg-ink-950/85 backdrop-blur px-3 py-1 text-xs font-semibold text-brand-300 border border-brand-500/40">
                  {m.brandLabel}
                </span>
                <span className="rounded-full bg-accent-500/20 border border-accent-500/40 backdrop-blur px-3 py-1 text-xs font-semibold text-accent-300">
                  {m.inStock > 0 ? `${m.inStock} in stock` : "Made to order"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-brand-400 font-semibold">
              {m.condition} · {m.brandLabel}
            </div>
            <h1 className="mt-2 font-display text-4xl lg:text-5xl font-bold text-white leading-tight">
              {m.name}
            </h1>
            <p className="mt-3 text-lg text-ink-200">{m.tagline}</p>

            <div className="mt-5 flex items-center gap-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-400 text-brand-400" />
                ))}
              </div>
              <span className="text-sm text-ink-300">Trusted by collectors since 1992</span>
            </div>

            <div className="mt-6 flex items-end gap-4">
              {m.compareAtPrice && (
                <div className="text-xl text-ink-400 line-through">
                  ${m.compareAtPrice.toLocaleString()}
                </div>
              )}
              <div className="text-5xl font-bold text-white">${m.price.toLocaleString()}</div>
            </div>
            <div className="mt-1 text-sm text-ink-400">
              Free consultation · Insured freight quoted separately
            </div>

            <div className="mt-7 grid gap-2">
              {m.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2 text-ink-100">
                  <CheckCircle2 className="h-5 w-5 text-brand-400 mt-0.5 flex-shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.phoneHref} className="btn-primary">
                <Phone className="h-4 w-4" /> Call {site.phone}
              </a>
              <Link
                href={`/contact?machine=${encodeURIComponent(m.name)}`}
                className="btn-ghost"
              >
                Request a Quote
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="card p-4 flex items-center gap-3">
                <Shield className="h-5 w-5 text-brand-400" />
                <div className="text-sm">
                  <div className="font-semibold text-white">1-Year Warranty</div>
                  <div className="text-ink-400 text-xs">Home-use coverage</div>
                </div>
              </div>
              <div className="card p-4 flex items-center gap-3">
                <Truck className="h-5 w-5 text-brand-400" />
                <div className="text-sm">
                  <div className="font-semibold text-white">Insured Freight</div>
                  <div className="text-ink-400 text-xs">5–10 days nationwide</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-white mb-4">About this machine</h2>
            <p className="text-ink-200 leading-relaxed">{m.description}</p>
          </div>
          <div className="card p-6">
            <h3 className="font-display text-lg font-bold text-white mb-4">Specifications</h3>
            <dl className="divide-y divide-ink-700">
              {Object.entries(m.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2 text-sm">
                  <dt className="text-ink-400">{k}</dt>
                  <dd className="text-ink-100 text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {related.length > 0 && (
          <Section eyebrow="You may also like" title="Related machines" className="px-0 !py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <MachineCard key={r.slug} m={r} />
              ))}
            </div>
          </Section>
        )}
      </div>
    </>
  );
}
