"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FaqItem } from "@/lib/faq";

export default function Faq({ items, limit }: { items: FaqItem[]; limit?: number }) {
  const [open, setOpen] = useState<number | null>(0);
  const data = limit ? items.slice(0, limit) : items;
  return (
    <div className="divide-y divide-ink-700 rounded-2xl border border-ink-700 bg-ink-800/50">
      {data.map((item, i) => {
        const isOpen = open === i;
        return (
          <button
            key={item.q}
            onClick={() => setOpen(isOpen ? null : i)}
            className="w-full text-left px-6 py-5 focus:outline-none focus:ring-2 focus:ring-brand-400 transition"
            aria-expanded={isOpen}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display font-semibold text-white text-base sm:text-lg">
                {item.q}
              </h3>
              {isOpen ? (
                <Minus className="h-5 w-5 text-brand-400 flex-shrink-0 mt-1" />
              ) : (
                <Plus className="h-5 w-5 text-ink-300 flex-shrink-0 mt-1" />
              )}
            </div>
            {isOpen && <p className="mt-3 text-ink-200 leading-relaxed">{item.a}</p>}
          </button>
        );
      })}
    </div>
  );
}
