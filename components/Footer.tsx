import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink-800 bg-ink-950">
      <div className="container-wide grid grid-cols-2 md:grid-cols-4 gap-8 py-14">
        <div className="col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Used Slot Shop"
              width={200}
              height={200}
              className="h-16 w-16 rounded-lg object-cover"
            />
            <div className="font-display text-xl font-bold">
              Used<span className="text-brand-400">Slot</span>Shop
            </div>
          </div>
          <p className="mt-4 text-sm text-ink-300 max-w-sm">
            America's trusted source for professionally refurbished casino slot machines.
            Serving home collectors, bars, and private game rooms since {site.founded}.
          </p>
          <div className="mt-5 space-y-2 text-sm text-ink-200">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-400" />
              <a href={site.phoneHref} className="hover:text-brand-300">{site.phone}</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-400" />
              <a href={`mailto:${site.email}`} className="hover:text-brand-300">{site.email}</a>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-brand-400 mt-0.5" />
              <span>
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Shop by Brand</h4>
          <ul className="space-y-2 text-sm text-ink-300">
            {site.brands.map((b) => (
              <li key={b.slug}>
                <Link href={`/shop/${b.slug}`} className="hover:text-brand-300">
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-ink-300">
            <li><Link href="/buying-guide" className="hover:text-brand-300">Buying Guide</Link></li>
            <li><Link href="/state-legality" className="hover:text-brand-300">State Legality</Link></li>
            <li><Link href="/blog" className="hover:text-brand-300">Blog</Link></li>
            <li><Link href="/faq" className="hover:text-brand-300">FAQ</Link></li>
            <li><Link href="/warranty" className="hover:text-brand-300">Warranty</Link></li>
            <li><Link href="/shipping" className="hover:text-brand-300">Shipping</Link></li>
            <li><Link href="/maintenance" className="hover:text-brand-300">Repair Service</Link></li>
            <li><Link href="/about" className="hover:text-brand-300">About</Link></li>
            <li><Link href="/contact" className="hover:text-brand-300">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-800">
        <div className="container-wide flex flex-col md:flex-row justify-between items-center gap-3 py-5 text-xs text-ink-400">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved. Machines
            sold for home amusement only. Laws vary by state — buyer is responsible for
            compliance.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand-300">Privacy</Link>
            <Link href="/terms" className="hover:text-brand-300">Terms</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-ink-800 bg-ink-950">
        <div className="container-wide py-4 text-center text-xs text-ink-400">
          Built and powered by{" "}
          <a
            href="https://www.aipeakbiz.com"
            target="_blank"
            rel="noopener"
            className="font-semibold text-brand-300 hover:text-brand-200"
          >
            AI Peak Biz
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
