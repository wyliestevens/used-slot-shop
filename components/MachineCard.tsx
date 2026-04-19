import Link from "next/link";
import Image from "next/image";
import { Machine } from "@/data/machines";

export default function MachineCard({ m }: { m: Machine }) {
  const off =
    m.compareAtPrice && m.compareAtPrice > m.price
      ? Math.round(((m.compareAtPrice - m.price) / m.compareAtPrice) * 100)
      : 0;
  return (
    <Link href={`/machines/${m.slug}`} className="card group block overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-900">
        <Image
          src={m.image}
          alt={m.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className="rounded-full bg-ink-950/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-300 border border-brand-500/40">
            {m.brandLabel}
          </span>
          {off > 0 && (
            <span className="rounded-full bg-brand-500 px-3 py-1 text-[11px] font-bold text-ink-950">
              Save {off}%
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="rounded-full bg-green-500/20 border border-green-500/40 px-3 py-1 text-[11px] font-semibold text-green-300">
            {m.inStock > 0 ? `${m.inStock} in stock` : "Made to order"}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="text-xs uppercase tracking-wider text-ink-400 mb-1">
          {m.condition}
        </div>
        <h3 className="font-display text-lg font-bold text-white group-hover:text-brand-300 transition leading-tight">
          {m.name}
        </h3>
        <p className="mt-1 text-sm text-ink-300 line-clamp-2">{m.tagline}</p>
        <div className="mt-4 flex items-end justify-between">
          <div>
            {m.compareAtPrice && (
              <div className="text-xs text-ink-400 line-through">
                ${m.compareAtPrice.toLocaleString()}
              </div>
            )}
            <div className="text-2xl font-bold text-white">
              ${m.price.toLocaleString()}
            </div>
          </div>
          <span className="text-xs font-semibold text-brand-300 group-hover:underline">
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}
