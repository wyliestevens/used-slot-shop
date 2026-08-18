"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function SearchRedirector({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const submit = () => {
    const q = query.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
  };

  return (
    <div className="relative flex items-center w-full max-w-2xl">
      <Search className="absolute left-4 h-5 w-5 text-ink-400 pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Search by name, brand, or type…"
        className="w-full rounded-full border border-ink-600 bg-ink-900/80 backdrop-blur-sm pl-11 pr-28 py-3.5 text-sm text-white placeholder-ink-400 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 transition"
        aria-label="Search slot machines"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-[5.5rem] text-ink-400 hover:text-white transition"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      <button
        onClick={submit}
        className="absolute right-2 rounded-full bg-brand-500 hover:bg-brand-400 text-ink-950 px-4 py-2 text-sm font-semibold transition"
      >
        Search
      </button>
    </div>
  );
}
