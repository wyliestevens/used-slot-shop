# Master SEO Audit Report: UsedSlotShop.com

**Date:** 2026-05-25
**Domain:** https://www.usedslotshop.com
**18 parallel SEO skills executed**

## Overall Score: 72/100 (pre-fix) -> ~85/100 (post-fix estimate)

| Skill | Score | Status |
|-------|-------|--------|
| Full Audit | 78/100 | Complete |
| Technical SEO | 82/100 | Complete |
| Content Analysis | 78/100 | Complete |
| Schema/Structured Data | 7/10 | Complete |
| Sitemap | Pass w/ issues | Complete |
| Local SEO | 32/100 | Complete |
| Homepage Page Analysis | 78/100 | Complete |
| GEO (AI Search) | 72/100 | Complete |
| Backlinks | Insufficient data | Complete |
| Keyword Clusters | 5 clusters, 13 spokes | Complete |
| SXO (Search Experience) | 78/100 | Complete |
| SEO Drift | 4 critical, 8 warnings | Complete |
| Competitor Pages | 7 competitors analyzed | Complete |
| Content Brief | 4 briefs generated | Complete |
| SEO Flow/Plan | 90-day strategy | Complete |
| Ecommerce SEO | 62/100 | Complete |
| Performance | 72/100 | Complete |
| Image/Visual SEO | Critical gaps found | Complete |

---

## Fixes Applied (20 total)

### Critical Fixes
1. **www canonical mismatch** - Changed `site.url` from `https://usedslotshop.com` to `https://www.usedslotshop.com` (lib/site.ts)
2. **OG default image** - Created dynamic OG image route at `/og-default.png` using Next.js ImageResponse
3. **Hours mismatch** - Fixed schema hours to match site.json (8-4 weekdays), fixed Saturday typo, fixed contact meta description
4. **Hero subtitle** - Rewrote broken grammar/keyword-stuffed text in homepage.json
5. **Product schema** - Fixed price to string, image to array, added @id, priceValidUntil, shippingDetails, hasMerchantReturnPolicy, MadeToOrder for out-of-stock

### High Priority Fixes
6. **Organization schema** - Added logo ImageObject, hasMap link, conditionally omit empty sameAs
7. **WebSite schema** - Added to global layout for sitelinks searchbox eligibility
8. **HSTS header** - Added Strict-Transport-Security to next.config.ts
9. **Blog ISR** - Changed both blog routes from force-dynamic to revalidate=3600
10. **Footer nofollow** - Added `rel="noopener noreferrer nofollow"` to AI Peak Biz link
11. **Sitemap** - Added /privacy and /terms to static pages
12. **Robots.txt** - Added /admin/ to disallow, removed deprecated host directive
13. **AVIF support** - Added `formats: ["image/avif", "image/webp"]` to images config
14. **Cache headers** - Added Cache-Control for /uploads/ and static assets
15. **Preconnect** - Added preconnect/dns-prefetch for images.leadconnectorhq.com

### Medium Priority Fixes
16. **About page H1** - Changed from H2 (Section component) to proper H1 tag
17. **FAQ page H1** - Added keyword-rich H1 replacing the H2 from Section component
18. **Homepage meta description** - Trimmed from 187 to 143 characters, front-loaded value
19. **Hero image alt** - Changed from generic "Featured slot machine" to keyword-rich descriptive text
20. **MachineCard alt** - Added "refurbished slot machine for sale" to all product card images
21. **Geo coordinates** - Increased precision from 3 to 5 decimal places
22. **Contact page hours** - Fixed meta description to show correct 8am-4pm hours

---

## Remaining Work (Cannot fix in code alone)

### Content Needs (Owner action required)
- [ ] Publish 10-15 blog posts (infrastructure ready, content needed)
- [ ] Expand state legality pages to 400-600 words each
- [ ] Expand about page with team bios and facility photos
- [ ] Expand maintenance page to 800+ words
- [ ] Create brand comparison page (/slot-machine-comparison)

### External Setup Needed
- [ ] Claim/optimize Google Business Profile
- [ ] Add real social media URLs to site.json
- [ ] Set up domain email (info@usedslotshop.com) vs gmail
- [ ] Generate proper favicon.ico and apple-touch-icon set
- [ ] Create a real branded OG image (replace the dynamic placeholder)
- [ ] Submit to BBB, Yelp, Apple Maps, Bing Places
- [ ] Set up Google Merchant Center product feed
- [ ] Start Google review solicitation

### Future Development
- [ ] Add pagination to /shop page (334 machines on one page)
- [ ] Add search/filter functionality to shop
- [ ] Compress /public/uploads/ images (26MB -> ~3-4MB)
- [ ] Resize logo.png (284KB -> <30KB)
- [ ] Add Google Maps embed to contact page
- [ ] Add ItemList schema to category pages
- [ ] Create parts/accessories store
- [ ] Create sell/trade-in page

---

## Keyword Cluster Strategy (from cluster analysis)

**Pillar:** "Used Slot Machines for Sale" (6,600/mo)
- Cluster 1: Refurbished & Home Use (3 posts)
- Cluster 2: Brands & Models (3 posts)
- Cluster 3: Legality & Ownership (2 posts)
- Cluster 4: Parts & Maintenance (3 posts)
- Cluster 5: Shipping & Collecting (2 posts)

**Total keyword volume targeted:** ~27,430/month

---

## Files Modified
- `lib/site.ts` - URL, geo coordinates
- `lib/seo.ts` - Organization schema, Product schema, WebSite schema
- `data/content/site.json` - Hours fix
- `data/content/homepage.json` - Hero subtitle rewrite
- `next.config.ts` - HSTS, AVIF, cache headers
- `app/robots.ts` - Admin disallow, remove host
- `app/sitemap.ts` - Add privacy/terms
- `app/layout.tsx` - WebSite schema, preconnect
- `app/page.tsx` - Meta description, hero alt, hero image alt
- `app/contact/page.tsx` - Hours meta description
- `app/blog/page.tsx` - ISR instead of force-dynamic
- `app/blog/[slug]/page.tsx` - ISR instead of force-dynamic
- `app/about/page.tsx` - H1 tag
- `app/faq/page.tsx` - H1 tag
- `app/og-default.png/route.tsx` - NEW: Dynamic OG image
- `components/Footer.tsx` - nofollow on external link
- `components/MachineCard.tsx` - Improved alt text
