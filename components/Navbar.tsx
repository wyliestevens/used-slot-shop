"use client";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";
import type { Series } from "@/data/machines";

type Brand = { slug: string; name: string; series: Series[] };

const staticNav = [
  { href: "/buying-guide", label: "Buying Guide" },
  { href: "/state-legality", label: "State Laws" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar({ brands }: { brands: Brand[] }) {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [hoverBrand, setHoverBrand] = useState<string | null>(null);
  const [mobileShop, setMobileShop] = useState(false);
  const [mobileBrand, setMobileBrand] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-800 bg-ink-950/85 backdrop-blur-xl">
      <div className="container-wide flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Used Slot Shop — home">
          <Image
            src="/logo.png"
            alt="Used Slot Shop"
            width={160}
            height={160}
            priority
            className="h-12 w-12 rounded-lg object-cover"
          />
          <span className="hidden sm:inline font-display text-lg font-bold tracking-tight text-white">
            Used<span className="text-brand-400">Slot</span>Shop
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm text-ink-200">
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => {
              setShopOpen(false);
              setHoverBrand(null);
            }}
          >
            <Link
              href="/shop"
              className="flex items-center gap-1 py-5 hover:text-brand-300 transition"
            >
              Shop <ChevronDown className="h-3.5 w-3.5" />
            </Link>
            {shopOpen && (
              <div className="absolute left-0 top-full min-w-[220px] rounded-xl border border-ink-700 bg-ink-950/95 backdrop-blur-xl shadow-xl py-2">
                {brands.map((b) => (
                  <div
                    key={b.slug}
                    className="relative"
                    onMouseEnter={() => setHoverBrand(b.slug)}
                  >
                    <Link
                      href={`/shop/${b.slug}`}
                      className={`flex items-center justify-between gap-4 px-4 py-2 text-sm ${
                        hoverBrand === b.slug
                          ? "bg-ink-800 text-brand-300"
                          : "text-ink-100 hover:bg-ink-800 hover:text-brand-300"
                      }`}
                    >
                      {b.name}
                      {b.series.length > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                    </Link>
                    {hoverBrand === b.slug && b.series.length > 0 && (
                      <div className="absolute left-full top-0 min-w-[260px] rounded-xl border border-ink-700 bg-ink-950/95 backdrop-blur-xl shadow-xl py-2">
                        <Link
                          href={`/shop/${b.slug}`}
                          className="block px-4 py-2 text-sm font-semibold text-brand-300 hover:bg-ink-800"
                        >
                          All {b.name} machines
                        </Link>
                        <div className="my-1 border-t border-ink-800" />
                        {b.series.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/shop/${b.slug}/${s.slug}`}
                            className="flex items-center justify-between gap-4 px-4 py-2 text-sm text-ink-100 hover:bg-ink-800 hover:text-brand-300"
                          >
                            <span>{s.name}</span>
                            <span className="text-xs text-ink-400">{s.count}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {staticNav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-brand-300 transition">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={site.phoneHref} className="flex items-center gap-2 text-sm text-ink-200 hover:text-brand-300">
            <Phone className="h-4 w-4" /> {site.phone}
          </a>
          <Link href="/contact" className="btn-primary">
            Get a Quote
          </Link>
        </div>
        <button
          className="lg:hidden text-ink-100"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink-800 bg-ink-950">
          <div className="container-wide py-4 flex flex-col">
            <button
              className="flex items-center justify-between py-2 text-ink-100 hover:text-brand-300"
              onClick={() => setMobileShop(!mobileShop)}
              aria-expanded={mobileShop}
            >
              <span>Shop</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${mobileShop ? "rotate-180" : ""}`}
              />
            </button>
            {mobileShop && (
              <div className="ml-3 border-l border-ink-800 pl-3 flex flex-col">
                <Link
                  href="/shop"
                  className="py-2 text-sm text-brand-300"
                  onClick={() => setOpen(false)}
                >
                  All machines
                </Link>
                {brands.map((b) => (
                  <div key={b.slug}>
                    <button
                      className="w-full flex items-center justify-between py-2 text-sm text-ink-100"
                      onClick={() =>
                        setMobileBrand(mobileBrand === b.slug ? null : b.slug)
                      }
                      aria-expanded={mobileBrand === b.slug}
                    >
                      <span>{b.name}</span>
                      {b.series.length > 0 && (
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform ${
                            mobileBrand === b.slug ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                    {mobileBrand === b.slug && (
                      <div className="ml-3 border-l border-ink-800 pl-3 flex flex-col pb-2">
                        <Link
                          href={`/shop/${b.slug}`}
                          className="py-1.5 text-sm text-brand-300"
                          onClick={() => setOpen(false)}
                        >
                          All {b.name}
                        </Link>
                        {b.series.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/shop/${b.slug}/${s.slug}`}
                            className="py-1.5 text-sm text-ink-200 hover:text-brand-300"
                            onClick={() => setOpen(false)}
                          >
                            {s.name}{" "}
                            <span className="text-xs text-ink-400">({s.count})</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {staticNav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="py-2 text-ink-100 hover:text-brand-300"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="pt-2 text-brand-300 font-semibold">
              {site.phone}
            </a>
            <Link href="/contact" className="btn-primary mt-2" onClick={() => setOpen(false)}>
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
