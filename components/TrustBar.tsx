import { ShieldCheck, Truck, Wrench, Award } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "1-Year Warranty", blurb: "Home-use coverage on every machine", tone: "brand" as const },
  { icon: Truck, title: "Nationwide Freight", blurb: "Insured pallet delivery, liftgate available", tone: "accent" as const },
  { icon: Wrench, title: "Free Lifetime Support", blurb: "Phone + video tech support, forever", tone: "brand" as const },
  { icon: Award, title: "33+ Years Experience", blurb: "Trusted by collectors since 1992", tone: "accent" as const },
];

const TONE: Record<"brand" | "accent", { bg: string; border: string; text: string }> = {
  brand: { bg: "bg-brand-500/10", border: "border-brand-500/30", text: "text-brand-400" },
  accent: { bg: "bg-accent-500/15", border: "border-accent-500/40", text: "text-accent-300" },
};

export default function TrustBar() {
  return (
    <div className="border-y border-ink-800 bg-ink-900/40">
      <div className="container-wide grid grid-cols-2 lg:grid-cols-4 gap-6 py-8">
        {items.map((i) => {
          const t = TONE[i.tone];
          return (
            <div key={i.title} className="flex items-center gap-3">
              <div className={`grid h-11 w-11 place-items-center rounded-lg border ${t.bg} ${t.border}`}>
                <i.icon className={`h-5 w-5 ${t.text}`} />
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{i.title}</div>
                <div className="text-xs text-ink-400">{i.blurb}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
