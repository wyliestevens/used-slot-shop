# Used Slot Shop Website Clone — CLAUDE.md

## Project Overview
- **What:** Next.js 16 e-commerce site for Used Slot Shop (usedslotshop.com)
- **Stack:** Next.js 16, React 19, Tailwind CSS 3, TypeScript
- **Hosting:** Vercel
- **Repo:** github.com/wyliestevens/used-slot-shop
- **Domain:** www.usedslotshop.com

## Last Session: 2026-06-10

### What Was Done
- **Blog auto-publish system built:**
  - Added `scheduledAt` field to BlogPost type
  - Created `/api/cron/publish` endpoint (auto-publishes drafts when scheduledAt passes)
  - Configured `vercel.json` with cron: Mon/Wed/Fri at 10am UTC
  - Scheduled all 29 draft posts on Mon/Wed/Fri from Jun 12 → Aug 17, 2026
  - Posts prioritized by keyword search volume (cluster plan research)
- **Scheduled remote agent created:**
  - Trigger ID: `trig_0142QhHZTZFvdLMnUp7wfz6y`
  - Runs every Monday at 8am Phoenix time (3pm UTC)
  - Writes 3 new SEO blog posts per week with web research
  - Commits directly to main branch → Vercel auto-deploys
  - Manage at: https://claude.ai/code/scheduled/trig_0142QhHZTZFvdLMnUp7wfz6y
- **SERP-based keyword cluster plan created:**
  - 5 content clusters, 13 hub+spoke posts planned
  - 4 critical content gaps identified (video poker, pachislo, vintage, Bally)
  - Full internal link matrix in `cluster-plan.md` and `cluster-plan.json`
- **Removed aipeakbiz.com link from footer** (replaced with copyright)
- Build verified — all changes compile successfully

### Previous Session: 2026-05-25
- Initial SEO audit and 20+ code-level fixes
- Blog system built with 32 posts (3 published, 29 drafts)
- Shop pagination, image compression, schema improvements

### Blog Publishing Pipeline
- **3 published** (live now)
- **29 drafts scheduled** (Jun 12 → Aug 17, auto-publish via Vercel cron)
- **New posts** written weekly by remote agent (starts Jun 15, ongoing)
- **Target:** 100,000 monthly visitors via content strategy

### What's Next
1. **External:** Set up Google Business Profile, social media, domain email
2. **Favicon:** Generate proper favicon.ico + apple-touch-icon set
3. **Google Merchant Center:** Create product feed for Shopping results
4. **State pages:** Expand from 150 words to 400-600 words each
5. **Vercel env:** Add `CRON_SECRET` environment variable for cron endpoint security

## Key Files
- `lib/seo.ts` — All schema generation (Organization, Product, WebSite, FAQ, Article, Breadcrumb)
- `lib/site.ts` — Site config (URL, NAP, brands)
- `lib/blog.ts` — Blog post type (includes scheduledAt field), load/save via GitHub API
- `data/content/blog-posts.json` — All blog posts (published, draft, scheduled)
- `data/content/site.json` — Admin-editable site settings
- `data/machines.ts` — Product seed data (334 machines)
- `app/api/cron/publish/route.ts` — Auto-publish cron endpoint
- `vercel.json` — Cron schedule config (Mon/Wed/Fri 10am UTC)
- `cluster-plan.md` — SEO keyword cluster strategy
- `cluster-plan.json` — Full SERP overlap matrix and internal link data
- `next.config.ts` — Headers, image config, AVIF
- `app/sitemap.ts` — Dynamic sitemap generation
- `SEO-MASTER-REPORT.md` — Full audit results and remaining work checklist
