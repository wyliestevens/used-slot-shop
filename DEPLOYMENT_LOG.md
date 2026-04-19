# Used Slot Shop — Deployment Log

A running record of every build, deploy, and meaningful change to the site. Newest entries at the top.

---

## v0.2.1 — Google Analytics 4
**Date:** 2026-04-19
**Status:** ✅ Live
**Commit:** `0515397` — "Add Google Analytics 4 (G-NE8NPQ4R7N) via next/script"
**Deployment ID:** `dpl_4AkmdQ4tXqXqpVuQdGV6mdMchUZZ`

### Change
- Added GA4 measurement ID `G-NE8NPQ4R7N` to `app/layout.tsx` via `next/script` with `strategy="afterInteractive"`.
- Loads once in the root layout, which means GA4 fires on every page automatically.
- Two `<Script>` tags: one for `gtag.js` (async), one inline for `window.dataLayer` + `gtag('config', ...)`.

### Verified live on
- `/` ✓
- `/shop` ✓
- `/machines/wms-gold-fish` ✓
- `/state-legality/arizona` ✓

### Next step for you
- Open GA4 → Reports → Realtime. Load https://used-slot-shop.vercel.app/ in a browser, confirm your visit appears.
- If you want event tracking (e.g. "Request a Quote" clicks, phone-number taps), let me know and I'll add those `gtag('event', ...)` calls.

---

## v0.2.0 — Full inventory import + real images
**Date:** 2026-04-19
**Status:** ✅ Live
**Commit:** `15c0f07` — "feat: import full inventory (~174 machines) with real product images"
**Deployment ID:** `dpl_DkT3tobrEsTejfbESX4BDsC6T1Jo`

### Change
- Scraped usedslotshop.com sitemap + 15+ category pages and extracted every product card
- Replaced 12 placeholder products with **~168 real machines** (167 unique slugs in sitemap)
- Every machine now uses the **real product image** from usedslotshop.com's CDN (leadconnectorhq.com → assets.cdn.filesafe.space)
- Added image CDN hosts to `next.config.ts` `images.remotePatterns` so `next/image` optimizes them
- Introduced `featuredMachines(n)` helper that spreads homepage picks across every brand (not just IGT)
- Improved `relatedMachines()` to prioritize same-brand matches before same-type

### Inventory by brand
| Brand | Count |
|---|---|
| IGT (Barcrest S2000, I+ 3902 video, S2000 reel + bonus, Game King) | ~100 |
| Bally (Alpha 1 M9000, S9000 mechanical) | 17 |
| Konami (K2V video, including dual-screen Extra Rewards) | 14 |
| WMS / Williams (BB1 video) | 26 |
| Aristocrat / Ainsworth / Aruze | 0 (pages remain; SPA scraping missed these — retry in a future pass) |

### Sitemap now contains
- 167 `/machines/*` product URLs
- 7 `/shop/*` brand pages
- 50 `/state-legality/*` state pages
- 10 static pages
- **234 total indexed URLs**

### Known limitations (to address)
- Some usedslotshop.com pages (bluebird-2, innovator, cube-x, xd, blubird-3, s23, s32) are client-rendered SPAs that WebFetch couldn't render — missed approximately 150–300 additional machines including Bluebird 2 / 3, Aruze Innovator, Konami Cube X / S23 / S32, WMS XD. Can be captured in a future pass with a headless-browser scraping approach.
- Images are hot-linked through their CDN; if usedslotshop.com ever takes those URLs down, we lose imagery. Worth downloading + self-hosting if this becomes a real business.
- Prices, descriptions, and specs are sourced directly from their site — if they update, we need to re-sync.

---

## v0.1.1 — Google Search Console verification
**Date:** 2026-04-19
**Status:** ✅ Live
**Commit:** `a5bfdfd` — "Add Google Search Console verification token"
**Deployment ID:** `dpl_oDEwcoRjjbB1sK2ZL8qYHP9adD7e`

### Change
- Set `verification.google` in `app/layout.tsx` to `y3L6r7e-sN4GGbNWsXadOrcSa84qikHhsojKosjBh60`.
- Next.js Metadata API emits `<meta name="google-site-verification" ...>` into `<head>` on every route automatically.

### Verified on production
- `/` ✓
- `/shop` ✓
- `/machines/igt-s2000-double-diamond` ✓
- `/state-legality/arizona` ✓

### Next step for you
- In Google Search Console, click "Verify" on the HTML-tag method for `used-slot-shop.vercel.app` (or your custom domain once pointed).
- Submit `/sitemap.xml` inside GSC once verified.

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
