"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search, Pencil, Eye, EyeOff, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 80;

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
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (brand !== "all" && r.brand !== brand) return false;
      if (onlyOverridden && !r.hasOverride) return false;
      if (!needle) return true;
      return r.name.toLowerCase().includes(needle) || r.slug.toLowerCase().includes(needle);
    });
  }, [rows, q, brand, onlyOverridden]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  // Snap page back into range when filters shrink the result set.
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);
  // Reset to first page whenever the search/filter changes.
  useEffect(() => {
    setPage(1);
  }, [q, brand, onlyOverridden]);

  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = Math.min(startIdx + PAGE_SIZE, filtered.length);
  const shown = filtered.slice(startIdx, endIdx);

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
        <>
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
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            startIdx={startIdx}
            endIdx={endIdx}
            total={filtered.length}
            onPage={setPage}
          />
        </>
      )}
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  startIdx,
  endIdx,
  total,
  onPage,
}: {
  page: number;
  totalPages: number;
  startIdx: number;
  endIdx: number;
  total: number;
  onPage: (p: number) => void;
}) {
  // Build a short page-number list: always show first, last, current ±1, ellipsis for gaps.
  const pages: (number | "…")[] = [];
  const push = (n: number | "…") => {
    if (n === "…" || !pages.includes(n)) pages.push(n);
  };
  const window = new Set<number>();
  window.add(1);
  window.add(totalPages);
  for (let i = page - 1; i <= page + 1; i++) if (i >= 1 && i <= totalPages) window.add(i);
  const sorted = [...window].sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i++) {
    push(sorted[i]);
    if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) push("…");
  }

  return (
    <div className="flex items-center justify-between gap-3 flex-wrap pt-3">
      <div className="text-xs text-ink-400">
        Showing <span className="text-ink-100 font-semibold">{startIdx + 1}</span>–
        <span className="text-ink-100 font-semibold">{endIdx}</span> of{" "}
        <span className="text-ink-100 font-semibold">{total}</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="inline-flex items-center gap-1 rounded-lg border border-ink-600 bg-ink-800/50 px-3 py-1.5 text-xs font-medium text-ink-200 disabled:opacity-40 disabled:cursor-not-allowed hover:border-brand-500 hover:text-brand-300"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Prev
        </button>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} className="px-2 text-ink-500 text-xs">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPage(p)}
              className={
                "min-w-[36px] rounded-lg border px-3 py-1.5 text-xs font-semibold " +
                (p === page
                  ? "border-brand-500 bg-brand-500 text-ink-950"
                  : "border-ink-600 bg-ink-800/50 text-ink-200 hover:border-brand-500 hover:text-brand-300")
              }
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="inline-flex items-center gap-1 rounded-lg border border-ink-600 bg-ink-800/50 px-3 py-1.5 text-xs font-medium text-ink-200 disabled:opacity-40 disabled:cursor-not-allowed hover:border-brand-500 hover:text-brand-300"
        >
          Next <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
