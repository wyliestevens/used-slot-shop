"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, Pencil, Eye, EyeOff, Sparkles } from "lucide-react";

type Row = {
  slug: string;
  name: string;
  brand: string;
  brandLabel: string;
  type: string;
  price: number;
  image: string;
  hidden: boolean;
  hasOverride: boolean;
};

const BRANDS = ["all", "igt", "bally", "aristocrat", "williams", "konami", "ainsworth", "aruze"];

export default function SeedSearch({ rows }: { rows: Row[] }) {
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("all");
  const [onlyOverridden, setOnlyOverridden] = useState(false);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (brand !== "all" && r.brand !== brand) return false;
      if (onlyOverridden && !r.hasOverride) return false;
      if (!needle) return true;
      return r.name.toLowerCase().includes(needle) || r.slug.toLowerCase().includes(needle);
    });
  }, [rows, q, brand, onlyOverridden]);

  const shown = filtered.slice(0, 80);

  return (
    <div className="space-y-4">
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or slug…"
            className="w-full rounded-lg border border-ink-600 bg-ink-900 pl-9 pr-3 py-2 text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none"
          />
        </div>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-ink-100 focus:border-brand-500 focus:outline-none"
        >
          {BRANDS.map((b) => (
            <option key={b} value={b}>
              {b === "all" ? "All brands" : b.toUpperCase()}
            </option>
          ))}
        </select>
        <label className="inline-flex items-center gap-2 text-sm text-ink-300 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyOverridden}
            onChange={(e) => setOnlyOverridden(e.target.checked)}
            className="accent-brand-500"
          />
          Only edited
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="card p-6 text-ink-400 text-sm">No machines match that filter.</div>
      ) : (
        <div className="card divide-y divide-ink-700">
          {shown.map((m) => (
            <Link
              key={m.slug}
              href={`/admin/edit/${m.slug}`}
              className="flex items-center gap-4 p-3 hover:bg-ink-800/60"
            >
              <div className="relative h-14 w-14 flex-shrink-0 rounded overflow-hidden bg-ink-900 border border-ink-700">
                {m.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.image} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-white truncate flex items-center gap-2">
                  {m.name}
                  {m.hasOverride && (
                    <span
                      title="Admin override active"
                      className="inline-flex items-center gap-1 rounded-full border border-purple-500/40 bg-purple-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-purple-300 uppercase"
                    >
                      <Sparkles className="h-2.5 w-2.5" /> edited
                    </span>
                  )}
                </div>
                <div className="text-xs text-ink-400 truncate">
                  {m.brandLabel} · {m.type} · ${m.price.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {m.hidden ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-red-500/40 bg-red-500/10 px-2 py-0.5 text-red-300">
                    <EyeOff className="h-3 w-3" /> Hidden
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full border border-green-500/40 bg-green-500/10 px-2 py-0.5 text-green-300">
                    <Eye className="h-3 w-3" /> Live
                  </span>
                )}
                <Pencil className="h-4 w-4 text-ink-400" />
              </div>
            </Link>
          ))}
          {filtered.length > shown.length && (
            <div className="p-3 text-center text-xs text-ink-400">
              Showing first {shown.length} of {filtered.length}. Narrow with search to find more.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
