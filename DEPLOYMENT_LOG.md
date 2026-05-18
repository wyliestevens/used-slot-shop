# Used Slot Shop — Deployment Log

A running record of every build, deploy, and meaningful change to the site. Newest entries at the top.

---

## v0.7.3 — Admin activity (IGT S2000 Double Diamond publish + image uploads)
**Date:** 2026-05-18
**Status:** ✅ Live
**Headline commits:**
- `c05521b` admin: publish igt-s2000-double-diamond
- `13bf461` admin: update igt-s2000-double-diamond
- `0d6270b` / `1e5babe` upload: image for unsorted

### What changed
Owner used the admin to publish and update `igt-s2000-double-diamond` and upload two more images to the library. Caught up at first session resume.

---

## v0.7.2 — AI Peak Biz credit + AI model switch
**Date:** 2026-04-28
**Status:** ✅ Live
**Headline commits:**
- `bd4fb28` chore(admin): switch admin AI model from Opus 4.7 → Sonnet 4.6
- `595a5ce` feat(footer): "Built and powered by AI Peak Biz" credit with backlink

### What changed
- **Admin AI model swap.** Cost/latency optimization — the admin chat agent and AI research tools now run on Claude Sonnet 4.6 instead of Opus 4.7. Same tool surface, faster + cheaper per edit.
- **Footer attribution.** Public site footer now carries a "Built and powered by AI Peak Biz" credit linking back to aipeakbiz.com — converts every served page into a soft marketing impression.

### Admin AI activity (~22 machine overrides this batch)
Owner used the admin chat agent to edit copy/specs/pricing on individual machines: `igt-game-king-31-games-17-lcd`, `igt-game-king-31-games-9-top`, `igt-double-top-dollar-barcrest`, `igt-quack-shot-barcrest`, `igt-money-mad-martians-barcrest`, `igt-triple-double-diamond-deluxe-barcrest`, `igt-cleopatra-video`, `igt-lucky-larry-lobster-mania`, `igt-hexbreaker`, `igt-money-storm` (x2), `igt-monster-mansion`, `igt-my-rich-uncle`, `igt-moolah`, `igt-mystical-mermaid`, `igt-nurse-follies`, `igt-super-cherry`, `igt-super-sally-shrimp-mania` (x2), `igt-pharaohs-fortune`.

Every edit was a separate commit via the GitHub Contents API — full audit trail in git log.

---

## v0.7.1 — Nested Shop menu + chat-driven FAQ polish
**Date:** 2026-04-27
**Status:** ✅ Live
**Headline commits:**
- `cb85b18` feat(shop): nested Shop menu with brand → series fly-out + series routes
- `9db3364` / `d7b8ad6` chat: update FAQ copy (via admin agent)

### What changed
- **Two-level navigation.** Shop menu now expands to brand → series fly-outs (e.g. IGT → Game King, S2000 5-Reel, Barcrest, etc.). New series-level routes ship along with it. Cuts the path from homepage to a specific machine model.
- **FAQ rewrites.** Owner used the admin chat agent to edit FAQ copy directly — no engineer in the loop.

### Admin AI activity (~25 machine overrides this batch)
Across IGT S2000 5-Reel series (`cleopatra-5reel`, `double-diamond-run`, `double-diamond-free-spin`, `double-dollars-free-spin`, `leopard-claw`, `five-times-pay-5reel`, `penny-barn`, `triple-red-hot-sevens-5reel`, `triple-lucky-sevens-5reel`, `triple-butterfly-sevens`, `triple-strike-5reel`, `black-pearl-sevens`), Barcrest titles, Game King variants, and several themed I+ machines.

---

## v0.7.0 — Contact form goes live + real user accounts
**Date:** 2026-04-23
**Status:** ✅ Live
**Headline commits:**
- `ae0bb4f` feat: wire contact form to Resend — owner notification + customer auto-reply
- `f4dd32d` feat: email+password login, forced first-time change, self-service account page
- `47ac0e6` fix: contact form fallback to resend.dev when custom domain unverified
- `474dbba` fix(contact): split owner + customer sends, degrade gracefully on auto-reply failure
- `c8b0b43` style: swap homepage hero image to a fuller casino-floor shot
- `ac6c654` style(contact): collapse email block to a single address

### What changed
- **Contact form is now real.** `POST /api/contact` calls Resend twice — one notification to the owner, one auto-reply to the customer. Auto-reply failure no longer kills the owner notification.
- **Resend fallback.** If the custom sending domain isn't verified yet, falls back to `onboarding@resend.dev` so production never silently drops messages.
- **Real auth, not just password.** Admin login became email + password with a forced password change on first login. Added `/admin/account` page where the owner self-serves password rotation. Previously was a single shared password env var.
- **Hero refresh.** Homepage hero image swapped to a richer casino-floor photo.

### Storage note
User credentials now live alongside other content as JSON in the repo, hashed. Same git-backed, no-database model as the rest of the admin CMS.

### Quiet 2026-04-25 admin activity
- `000a0a1` admin: password updated (owner self-service via the new account page — proved end-to-end)
- `55c7cdf` admin: update site

---

## v0.6.1 — Editable seed inventory + brand palette
**Date:** 2026-04-21 (same-day follow-on to v0.6.0)
**Status:** ✅ Live
**Headline commits:**
- `2d37a19` feat(admin): editable seed machines — override layer, searchable dashboard, chat-tool updates
- `5566582` feat(admin): Model # field on Add/Edit Machine forms; AI research uses brand+model for accurate specs
- `f5da7f4` feat(admin): pagination on inventory list (80 per page, numbered nav)
- `fe48aa6` style: rebrand site palette to match logo (coral primary + sage mint accent, warm-dark backdrop)
- `7b2a7c5` style: boost mint prominence — green→accent everywhere, alternating coral/mint icons, mint hero tag + outline CTA, stronger mint in hero radial
- `c6d5ce7` style: fixed ambient glow (coral top-right, mint bottom-left) + solid-fill mint icons + mint testimonials band
- `569ad76` feat: daily-rotating 'Now Shipping' spotlight — picks a deterministic machine from live inventory, links to its page

### What changed
- **All 280 imported machines are now editable.** v0.6.0 only edited admin-created machines. The override layer means any seed machine (the originally-scraped catalog) can be patched via /admin or the chat agent. Dashboard now also searchable.
- **Model # field.** Add/Edit Machine forms gained a "Model #" input. AI research tool combines `brand + model` for more accurate spec lookups via Claude vision.
- **Pagination.** Inventory list paginated at 80/page with numbered nav — previous single-list view was unusable at 280 items.
- **Brand palette rebrand.** Three style commits dialed the site colors to match the new logo: coral primary, sage mint accent, warm-dark backdrop, ambient glow, alternating coral/mint icons, mint hero tag/outline CTA, mint testimonials band.
- **Daily spotlight.** Homepage now renders a "Now Shipping" tile that deterministically picks one live machine per day and links to its detail page — fresh content with zero owner effort.

### Admin shake-out activity
- Owner test-cycled `ainsworth-three-amigos-a-star-slot-machine` and `wms-keepin-up-with-jones` through draft → update → publish/override → delete to validate the override layer and chat tools end-to-end.

---

## v0.6.0 — Full no-code site editor
**Date:** 2026-04-21
**Status:** ✅ Live
**Commits shipped (5 parallel streams merged):**
- `cedc735` Phase 3.0 — site settings + homepage editor + one-click history restore
- `afe3f6a` Image library / media manager (agent 1)
- `7dc6e60` Blog system, public + admin (agent 2)
- `b9602de` Editable copy for About / Buying Guide / FAQ / Shipping / Warranty / Maintenance (agent 3)
- `01bbc14` Unified admin nav + chat tools for everything above

### What the owner can now do from /admin
| Area | Via form | Via chat |
|---|---|---|
| Add / edit / publish / delete machines | ✓ | ✓ |
| Research a machine from a photo (vision) | ✓ | ✓ |
| Change logo, phone, email, address, hours, socials | ✓ | ✓ |
| Edit homepage hero (image, headline, subtitle, CTAs) | ✓ | ✓ |
| Edit copy on About, Buying Guide, FAQ, Shipping, Warranty, Maintenance — add/remove/reorder sections, paragraphs, bullets | ✓ | ✓ |
| Add / edit / publish / delete blog posts (w/ cover photo + markdown body) | ✓ | ✓ |
| Browse image library, copy URLs, delete unused photos | ✓ | ✓ |
| Restore entire site to any prior commit | ✓ (one-click in History) | — |

### Admin chat tool count
**22 tools** wired: 8 machine, 2 site, 2 homepage, 2 page copy, 6 blog, 2 image library. Claude Opus 4.7 plans and executes autonomously.

### Data model
All content is JSON in the repo — zero database:
- `data/content/site.json` — branding, contact, hours
- `data/content/homepage.json` — hero config
- `data/content/pages/{about,buying-guide,shipping,warranty,maintenance}.json`
- `data/content/faq.json`
- `data/content/blog-posts.json`
- `data/machines-custom.json`
- `public/uploads/` — every photo ever uploaded

### Public-site wiring
- Navbar/Footer now read logo + contact info from `site.json`
- Homepage hero reads from `homepage.json`
- Six info pages render from their JSON (copy, meta, structure all editable)
- `/blog` index + `/blog/[slug]` detail, JSON-LD Article schema
- Sitemap includes every published blog post

### All smoke tests passing
- `/`, `/blog`, `/about`, `/buying-guide`, `/faq`, `/shipping`, `/warranty`, `/maintenance`, `/shop` → **200**
- `/admin`, `/admin/blog`, `/admin/pages`, `/admin/images`, `/admin/homepage`, `/admin/site-settings`, `/admin/chat` → **307** (redirect to login, correct)

---

## v0.5.0 — Phase 2: AI chat agent with Claude Opus 4.7 tool use
**Date:** 2026-04-20
**Status:** ✅ Live and verified end-to-end

### What shipped
A chat interface at `/admin/chat` where the owner types natural language and/or uploads photos, and Claude (with tool use) researches, drafts, edits, or publishes.

### How it works
1. Owner sends a message (optionally with attached images uploaded to `public/uploads/chat/`)
2. Server calls `claude-opus-4-7` with a specialized system prompt + 8 tools
3. Claude plans, calls tools, reads results, and iterates (up to 8 rounds)
4. Final text reply + tool transcript returned to the UI
5. Each tool mutation (create/update/delete) commits to GitHub; Vercel auto-rebuilds

### Tools exposed to Claude
| Tool | Does |
|---|---|
| `list_machines` | Lists admin-managed machines (filter by status) |
| `get_machine` | Fetch one by slug |
| `create_machine_draft` | Add a new machine as draft |
| `update_machine` | Patch any fields |
| `publish_machine` / `unpublish_machine` | Toggle live status |
| `delete_machine` | Remove permanently (still in git history) |
| `research_from_image` | Vision call on uploaded photo → structured fields |

### System prompt highlights
- Defaults to creating drafts, never publishes without explicit ask
- Baked-in pricing guidance per brand/platform from the scraped inventory
- "Concise, experienced-shop-hand" voice
- Reads image first, then creates draft when owner uploads without context

### End-to-end test (passed)
- `POST /api/admin/login` → cookie set
- `POST /api/admin/chat` with "list my drafts" → Claude called `list_machines`, got `[]`, replied "No admin-managed machines yet."

### Files added
- `lib/chat-tools.ts` — 8 tool schemas + executors, shared system prompt
- `app/api/admin/chat/route.ts` — tool-use loop (max 8 rounds)
- `app/admin/chat/ChatInterface.tsx` — message list, image attach, tool-call pills
- `app/admin/chat/page.tsx` — gated by `ANTHROPIC_API_KEY`

### Vercel env vars
All required keys now set:
- ✅ `ADMIN_PASSWORD`
- ✅ `ADMIN_SESSION_SECRET`
- ✅ `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`
- ✅ `ANTHROPIC_API_KEY`

### Try it
https://used-slot-shop.vercel.app/admin/login → password "Password" → **Chat** in nav.

Example prompts:
- "Here's a photo of a machine that just came in — add it as a draft" *(attach photo)*
- "Show me my drafts"
- "Change the price on the Buffalo Gold draft to $1,395 and publish it"
- "Delete the draft you just created"

### Known follow-ups
- Add rate-limiting on `/api/admin/login` (brute-force defense)
- Mobile: test image attach from iOS camera roll
- Persist chat history across sessions (currently per-tab state)
- Add "undo last action" shortcut

---

## v0.4.0 — Owner admin CMS, Phase 1 (forms + draft/publish/history)
**Date:** 2026-04-19
**Status:** ✅ Live, awaiting ADMIN_PASSWORD to unlock
**Commit:** "feat: Phase 1 admin CMS…" + "fix: wrap LoginForm in Suspense"

### What shipped
- **Auth:** `/admin/login` with password + signed HTTP-only cookie (7-day session)
- **Middleware:** guards `/admin/*` and `/api/admin/*` on the edge
- **Dashboard:** `/admin` shows drafts + admin-published machines with stats + env-health panel
- **Add:** `/admin/new` form with photo upload, all fields, AI-research button (Phase 2)
- **Edit:** `/admin/edit/[slug]` full editor + delete
- **History:** `/admin/history` shows last 50 commits to `data/machines-custom.json` with links to GitHub diffs
- **Chat placeholder:** `/admin/chat` (wired in Phase 2 once Anthropic key is set)

### API routes (Node runtime, auth-guarded)
- `POST /api/admin/login` — verify password, set cookie
- `POST /api/admin/logout` — clear cookie
- `GET/POST/PATCH/DELETE /api/admin/machines` — CRUD via GitHub Contents API
- `POST /api/admin/upload` — image upload, commits to `public/uploads/{slug}/`
- `GET /api/admin/history` — commit log
- `POST /api/admin/research` — Claude vision + text → structured machine data (needs ANTHROPIC_API_KEY)

### Storage
- **No database.** Everything is git-backed.
- New machines: `data/machines-custom.json`
- Images: `public/uploads/{slug}/{filename}`
- Version history: git log
- Rollback: git revert

### How it works end-to-end
1. Owner logs in → cookie set
2. Uploads photo → API commits to `public/uploads/` via GitHub API
3. Fills form (or clicks "AI research" — Phase 2)
4. Saves as draft → commits `machines-custom.json`
5. Reviews, clicks "Publish live" → status changes to "published" + commit
6. Vercel auto-redeploys → live in ~60 seconds

### Vercel env vars set by build agent
- ✅ `ADMIN_SESSION_SECRET` (random 256-bit hex)
- ✅ `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`

### Vercel env vars still needed (user must set)
- ❌ `ADMIN_PASSWORD` — owner picks this. Until set, the login page will report "Admin not configured yet"
- ❌ `ANTHROPIC_API_KEY` — for Phase 2 chat agent + AI research button on the form. Not required for Phase 1 operation

### Sanity checks (all green)
- `/admin/login` → 200
- `/admin` → 307 (redirects to login, correct)
- `/api/admin/machines` → 401 (correctly blocked)
- `/` → 200 (main site unaffected)

---

## v0.3.1 — Inventory completeness verified via headless-browser scrape
**Date:** 2026-04-19
**Status:** ✅ No redeploy needed — inventory already complete

### What happened
User asked me to render the 7 remaining "missing" categories with a real browser to be 100% sure no machines were missed. I installed Node 22 + Playwright + headless Chromium locally (~150 MB, into `.tools/` — gitignored), wrote a scraper, and opened each URL in a real Chromium instance.

### Key finding
Those 7 URLs (**bluebird-2, blubird-3, xd, innovator, cube-x, s23, s32**) are **not in the current site navigation** on usedslotshop.com. They are orphaned pages from a previous site version — the Nuxt preview container renders completely empty. The site owner removed them from the menu at some point.

### Real site navigation (verified by scraping the homepage menu)
Only **14 product categories exist in the live menu**, and we have **100% of them**:

| # | Menu label | URL | Scraped |
|---|---|---|---|
| 1 | Aristocrat | `/aristocrat-mark-v` | ✓ |
| 2 | Bally S9000 | `/bally-s9000` | ✓ |
| 3 | Bally M9000 | `/bally-m9000` | ✓ |
| 4 | IGT Video | `/igt-video-044-games` | ✓ |
| 5 | IGT GameKings | `/igt-gamekings` | ✓ |
| 6 | IGT Video Slot 9" Top | `/igtvideoslots9` | ✓ |
| 7 | IGT Video Slot Round Top | `/igt-video-slots-round-top` | ✓ |
| 8 | IGT S2000 5 Reel | `/igt5reels` | ✓ |
| 9 | IGT S2000 9" Top | `/igts2000-9-top` | ✓ |
| 10 | IGT S2000 16'' Top | `/igt-s2000-16` | ✓ |
| 11 | IGT S2000 Round Top | `/igt-s2000-round-top` | ✓ |
| 12 | S2000 Bonus Games | `/s2000bonusgames` | ✓ |
| 13 | IGT Barcrest | `/igt-barcrest` | ✓ |
| 14 | Williams | `/williamsvideoreels` | ✓ |
| 15 | Konami | `/konamivideo-494511` | ✓ |

### Conclusion
**We have parity with usedslotshop.com's current live inventory: ~280 machines, every one with its real product photo.** The site is a complete mirror plus the SEO/GEO/conversion infrastructure on top.

### Local tooling
- `.tools/node-v22.11.0-darwin-arm64` — Node runtime
- `.tools/scraper/` — Playwright scraper scripts (`scrape.mjs`, `inspect.mjs`, `find-links.mjs`)
- `.tools/` is gitignored — not pushed to repo

---

## v0.3.0 — Inventory expansion: +113 machines (280 total)
**Date:** 2026-04-19
**Status:** ✅ Live
**Commit:** "feat: add 109 more machines (Aristocrat Mark V, IGT I+ 044, IGT I+ 3902 9-line, IGT S2000 9-top)"

### What was added
After the user pointed me at additional category URLs, I retried the WebFetch scrape and four pages rendered this time:
- `/aristocrat-mark-v` → **3** machines (50 Dragons, Buffalo, Tiki Torch) — first Aristocrats!
- `/igt-video-044-games` → **17** I+ 044 video slots (Cleopatra 2, Wolf Run, Davinci Diamonds, White Orchid, Treasures of Troy, Nefertiti, Coyote Moon, Cats, Bombay, etc.)
- `/igtvideoslots9` → **20** I+ 3902 9-line video slots (Cleopatra, Cops & Donuts, Creature of the Black Lagoon, Dragons Gold, Enchanted Unicorn, Evel Knievel, Ghost Island, Kingpin Bowling, Wild Taxi, etc.)
- `/igts2000-9-top` → **69** IGT S2000 9-inch-top mechanical reels (Triple Diamond, Double R/W/B, Wild Thing Devil, Five Times Pay variants, Tabasco, Phantom of the Opera, Jekyl & Hyde, etc.)

### Totals now
- **280** `/machines/*` URLs in sitemap (was 167)
- Aristocrat brand page now has real inventory
- Every product uses its real photo from usedslotshop.com's CDN

### Still missing (same SPA rendering issue)
- WMS Bluebird 2, Bluebird 3, Gamefield XD
- Aruze Innovator, Muso
- Konami Cube X, S23, S32
These pages still return empty under WebFetch. Getting them requires a headless-browser scrape (Playwright) which needs Node installed locally.

### Verified live
- `/shop` — 280 products
- `/shop/aristocrat` — 200
- `/machines/aristocrat-mark-v-buffalo` — 200
- `/machines/igt-video-044-wolf-run` — 200

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

### GA4 reference info
- Measurement ID (in use): `G-NE8NPQ4R7N`
- Stream ID (for future Measurement Protocol / server-side events): `14398470828`
- API Secret: not yet generated — create one in GA4 → Admin → Data Streams → Measurement Protocol if we add server-side tracking

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
