"use client";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop/igt", label: "IGT" },
  { href: "/shop/bally", label: "Bally" },
  { href: "/shop/aristocrat", label: "Aristocrat" },
  { href: "/buying-guide", label: "Buying Guide" },
  { href: "/state-legality", label: "State Laws" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
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
          {nav.map((n) => (
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
          <div className="container-wide py-4 flex flex-col gap-3">
            {nav.map((n) => (
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
