import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { states, StateLegality } from "@/data/states";

export const metadata = buildMetadata({
  title: "Slot Machine Ownership Laws by State — Is It Legal Where You Live?",
  description:
    "State-by-state guide to private slot machine ownership in the United States. Find the legal rules for your state — allowed, age-restricted, or prohibited.",
  path: "/state-legality",
});

const badge: Record<StateLegality, { label: string; className: string }> = {
  "allowed-all": { label: "All allowed", className: "bg-green-500/20 text-green-300 border-green-500/40" },
  "age-restricted": { label: "Antique only", className: "bg-brand-500/20 text-brand-300 border-brand-500/40" },
  "class-ii-only": { label: "Class II only", className: "bg-blue-500/20 text-blue-300 border-blue-500/40" },
  restricted: { label: "Restricted", className: "bg-orange-500/20 text-orange-300 border-orange-500/40" },
  prohibited: { label: "Prohibited", className: "bg-red-500/20 text-red-300 border-red-500/40" },
};

export default function StatesIndex() {
  const sorted = [...states].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "State Legality", path: "/state-legality" },
        ])}
      />
      <Section
        eyebrow="State-by-State"
        title="Slot machine ownership laws in all 50 states"
        subtitle="We sell nationwide, but every buyer is responsible for their state's rules. This is a general reference only — when in doubt, consult a local attorney."
      >
        <div className="mb-8 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          {(Object.keys(badge) as StateLegality[]).map((k) => (
            <div key={k} className={`rounded-lg border ${badge[k].className} px-3 py-2 font-semibold text-center`}>
              {badge[k].label}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((s) => (
            <Link
              key={s.slug}
              href={`/state-legality/${s.slug}`}
              className="card p-5 flex items-start justify-between gap-3 hover:-translate-y-0.5 transition"
            >
              <div>
                <div className="font-display font-bold text-white">{s.name}</div>
                <div className="text-sm text-ink-300 mt-1">{s.rule}</div>
              </div>
              <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase whitespace-nowrap ${badge[s.status].className}`}>
                {badge[s.status].label}
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
