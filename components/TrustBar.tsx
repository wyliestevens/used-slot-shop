import { ShieldCheck, Truck, Wrench, Award } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "1-Year Warranty", blurb: "Home-use coverage on every machine", tone: "brand" as const },
  { icon: Truck, title: "Nationwide Freight", blurb: "Insured pallet delivery, liftgate available", tone: "accent" as const },
  { icon: Wrench, title: "Free Lifetime Support", blurb: "Phone + video tech support, forever", tone: "brand" as const },
  { icon: Award, title: "33+ Years Experience", blurb: "Trusted by collectors since 1992", tone: "accent" as const },
];

const TONE: Record<"brand" | "accent", { bg: string; text: string }> = {
  brand: { bg: "bg-brand-500", text: "text-white" },
  accent: { bg: "bg-accent-500", text: "text-ink-950" },
};

export default function TrustBar() {
  return (
    <div className="border-y border-ink-800 bg-ink-900/40">
      <div className="container-wide grid grid-cols-2 lg:grid-cols-4 gap-6 py-8">
        {items.map((i) => {
          const t = TONE[i.tone];
          return (
            <div key={i.title} className="flex items-center gap-3">
              <div className={`grid h-12 w-12 place-items-center rounded-xl ${t.bg}`}>
                <i.icon className={`h-6 w-6 ${t.text}`} strokeWidth={2.25} />
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
