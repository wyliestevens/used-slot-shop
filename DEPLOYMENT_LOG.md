# Used Slot Shop — Deployment Log

A running record of every build, deploy, and meaningful change to the site. Newest entries at the top.

---

## v0.1.0 — Initial scaffold, content & first production deploy
**Date:** 2026-04-19
**Status:** ✅ Live at https://used-slot-shop.vercel.app

### What was built
- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS
- **Fonts:** Inter (body) + Space Grotesk (display), self-hosted via `next/font`
- **Icons:** lucide-react
- **Project structure:** `/app` (routes), `/components`, `/data`, `/lib`, `/public`

### Core SEO infrastructure
- `app/layout.tsx` — global metadata, Open Graph, Twitter cards, Search Console placeholder
- `app/robots.ts` — allows GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended
- `app/sitemap.ts` — dynamic sitemap covering all pages, brands, machines, states
- `public/llms.txt` — LLM discovery file (GEO / AI search optimization)
- `public/manifest.webmanifest` — PWA manifest
- JSON-LD schema: Organization, LocalBusiness, BreadcrumbList, Product, FAQPage

### Data modeled
- `data/machines.ts` — 12 product entries across IGT, Bally, Aristocrat, WMS, Konami, Ainsworth, Aruze
- `data/states.ts` — all 50 U.S. states with slot-ownership legality classifications
- `data/faq.ts` — 12 high-intent buyer questions

### Business details captured from usedslotshop.com
- Phone: 928-418-5549
- Email: info@usedslotshop.com
- Address: 7252 E Concho Dr Ste B, Kingman, AZ 86401
- Years in business: 33+ (since 1992)
- Brands: IGT, Bally, Aristocrat, WMS, Konami, Ainsworth, Aruze

### Weaknesses found on original site (and fixed here)
- ❌ No pricing → ✅ transparent pricing on every product
- ❌ Broken menu links (`#new-menu-item`) → ✅ all links route cleanly
- ❌ No FAQ → ✅ 12-question FAQ page with schema
- ❌ No state legality guide → ✅ all-50-state hub + individual pages
- ❌ No trust badges → ✅ TrustBar component + testimonials
- ❌ No Google Search Console tag → ✅ placeholder wired in `layout.tsx`
- ❌ Limited SEO → ✅ full metadata API, dynamic sitemap, JSON-LD
- ❌ No AI/GEO optimization → ✅ llms.txt, AI-crawler-friendly robots.txt, FAQ schema

### Pages built
- `/` homepage
- `/shop` all-inventory catalog
- `/shop/[brand]` brand catalog (7 brands)
- `/machines/[slug]` product detail (12 products)
- `/buying-guide` long-form buyer's guide
- `/state-legality` + `/state-legality/[state]` (50 state pages)
- `/faq`
- `/warranty`, `/shipping`, `/maintenance`, `/about`, `/contact`
- `/api/contact` — form submission endpoint

### Deployment
- **GitHub repo:** https://github.com/wyliestevens/used-slot-shop
- **Vercel project:** `prj_35CpsSpEm4pti3vQsmizv9Yx5Wa3` (team `wylies-projects-5e343842`)
- **Production URL:** https://used-slot-shop.vercel.app
- **Aliases:** `used-slot-shop-wylies-projects-5e343842.vercel.app`, `used-slot-shop-git-main-wylies-projects-5e343842.vercel.app`
- **Deployment ID (current prod):** `dpl_5gJAF2Xh1RKWAnxT6xFNP4uTEVwz`
- **Commits shipped:**
  - `4450aa0` Initial scaffold: Next.js 15 + content + SEO
  - `9adea43` Bump Next.js to 15.4.0 (CVE-2025-29927 patch)
  - `1f...` Bump Next.js to 16.2 for latest security patches → build succeeded
- **Deployment protection:** disabled (public access)

### Smoke test (all returned 200)
- `/` home
- `/shop` catalog
- `/machines/igt-s2000-double-diamond` product
- `/state-legality` hub
- `/sitemap.xml`, `/robots.txt`, `/llms.txt`

### Build issues encountered & resolved
1. Vercel blocked Next.js 15.1.6 as vulnerable → bumped to 15.4.0.
2. Vercel still flagged 15.4.0 → bumped to `^16.2.0` which passed.
3. First deploy returned 401 (Vercel Hobby deployment protection) → disabled via API PATCH on `ssoProtection`.

---

## How to read this log
- `v0.x.y` — minor feature or content change
- `v1.x.y` — post-launch milestone
- Each entry should record: what changed, why, commit hashes, and the live URL after deploy.
