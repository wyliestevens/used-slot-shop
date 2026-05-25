# Used Slot Shop Website Clone — CLAUDE.md

## Project Overview
- **What:** Next.js 16 e-commerce site for Used Slot Shop (usedslotshop.com)
- **Stack:** Next.js 16, React 19, Tailwind CSS 3, TypeScript
- **Hosting:** Vercel
- **Repo:** github.com/wyliestevens/used-slot-shop
- **Domain:** www.usedslotshop.com

## Last Session: 2026-05-25

### What Was Done
- Cloned repo from GitHub into this working directory
- Ran comprehensive 18-skill SEO audit using claude-seo
- Applied 20+ code-level SEO fixes (see SEO-MASTER-REPORT.md for full list)
- Key fixes: www canonical, OG image, schema improvements, hours consistency, HSTS, AVIF, blog ISR, H1 tags, alt text, sitemap, robots.txt
- Build verified — all changes compile successfully

### Additional Fixes Applied (same session, later)
- Added shop page pagination (24 per page with numbered navigation)
- Added ItemList schema to shop page
- Compressed /public/uploads/ images (26MB -> 20MB)
- Compressed logo.png (284KB -> 66KB)
- Fixed years inconsistency ("36+ Years" -> "Since 1992")
- Added Google Maps embed to contact page
- Upgraded blog renderer (now supports images, bold, italic, links, blockquotes)
- Wrote and published 20 blog posts (3 published, 17 on Mon/Wed/Fri schedule)
- Blog targets ~38,000 words of content covering 20 high-intent keywords

### What's Next
1. **Blog:** Continue writing 3 posts/week (Mon/Wed/Fri) — ongoing
2. **External:** Set up Google Business Profile, social media, domain email
3. **Favicon:** Generate proper favicon.ico + apple-touch-icon set
4. **Google Merchant Center:** Create product feed for Shopping results
5. **State pages:** Expand from 150 words to 400-600 words each

## Key Files
- `lib/seo.ts` — All schema generation (Organization, Product, WebSite, FAQ, Article, Breadcrumb)
- `lib/site.ts` — Site config (URL, NAP, brands)
- `data/content/site.json` — Admin-editable site settings
- `data/machines.ts` — Product seed data (334 machines)
- `next.config.ts` — Headers, image config, AVIF
- `app/sitemap.ts` — Dynamic sitemap generation
- `SEO-MASTER-REPORT.md` — Full audit results and remaining work checklist
