"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Machine } from "@/data/machines";

interface Props {
  machines: Machine[];
}

export default function HomeSearch({ machines }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return machines
      .filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.brand.toLowerCase().includes(q) ||
          (m.type && m.type.toLowerCase().includes(q)) ||
          (m.tagline && m.tagline.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [query, machines]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
  };

  const handleClear = () => {
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleSelect = () => {
    setOpen(false);
    setQuery("");
  };

  const showDropdown = open && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Input */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-ink-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => query.trim() && setOpen(true)}
          placeholder="Search by name, brand, or type…"
          className="w-full rounded-full border border-ink-600 bg-ink-900/80 backdrop-blur-sm pl-11 pr-10 py-3.5 text-sm text-white placeholder-ink-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 transition"
          aria-label="Search slot machines"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          role="combobox"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 text-ink-400 hover:text-white transition"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-ink-700 bg-ink-900/95 backdrop-blur-md shadow-2xl overflow-hidden z-50">
          {results.length > 0 ? (
            <>
              <ul role="listbox">
                {results.map((m) => (
                  <li key={m.slug} role="option">
                    <Link
                      href={`/machines/${m.slug}`}
                      onClick={handleSelect}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-ink-800 transition group"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-14 w-11 flex-shrink-0 rounded-lg overflow-hidden bg-ink-800 border border-ink-700">
                        <Image
                          src={m.image}
                          alt={m.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white group-hover:text-brand-300 transition text-sm leading-snug truncate">
                          {m.name}
                        </div>
                        <div className="text-xs text-ink-400 mt-0.5 capitalize">
                          {m.brandLabel} · {m.type}
                        </div>
                      </div>
                      {/* Price */}
                      <div className="flex-shrink-0 text-sm font-bold text-white">
                        ${m.price.toLocaleString()}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              {/* View all results link */}
              <div className="border-t border-ink-700 px-4 py-2.5">
                <Link
                  href={`/shop`}
                  onClick={handleSelect}
                  className="text-xs text-brand-400 hover:text-brand-300 font-semibold transition"
                >
                  Browse all {machines.length} machines →
                </Link>
              </div>
            </>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-ink-400">No machines found for &ldquo;{query}&rdquo;</p>
              <Link
                href="/shop"
                onClick={handleSelect}
                className="mt-2 inline-block text-xs text-brand-400 hover:text-brand-300 font-semibold"
              >
                Browse all machines →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
