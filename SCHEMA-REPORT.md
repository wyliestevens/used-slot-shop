# Schema / Structured Data Audit — usedslotshop.com

**Audit date:** 2026-05-25
**Live URL:** https://www.usedslotshop.com
**Codebase:** `/Users/wylie/Claude/used-slot-shop-website-clone`
**Format detected:** JSON-LD only (no Microdata, no RDFa) -- this is correct per Google preference

---

## 1. Existing Schema Detection

### Global (root layout — every page)

| Schema Type | Location | Status |
|---|---|---|
| Organization + LocalBusiness | `app/layout.tsx` via `organizationJsonLd()` | Present on every page |

### Per-Page Schema

| Page | BreadcrumbList | Product | Article | FAQPage | WebSite | Other |
|---|---|---|---|---|---|---|
| `/` (homepage) | -- | -- | -- | YES (6 items) | -- | -- |
| `/shop` | YES | -- | -- | -- | -- | -- |
| `/shop/[brand]` | YES | -- | -- | -- | -- | -- |
| `/shop/[brand]/[series]` | YES | -- | -- | -- | -- | -- |
| `/machines/[slug]` | YES | YES | -- | -- | -- | -- |
| `/blog` | -- | -- | -- | -- | -- | -- |
| `/blog/[slug]` | YES | -- | YES | -- | -- | -- |
| `/faq` | YES | -- | -- | YES (all items) | -- | -- |
| `/about` | YES | -- | -- | -- | -- | -- |
| `/contact` | YES | -- | -- | -- | -- | -- |
| `/buying-guide` | YES | -- | -- | -- | -- | -- |
| `/shipping` | YES | -- | -- | -- | -- | -- |
| `/warranty` | YES | -- | -- | -- | -- | -- |
| `/maintenance` | YES | -- | -- | -- | -- | -- |
| `/state-legality` | YES | -- | -- | -- | -- | -- |
| `/state-legality/[state]` | YES | -- | -- | -- | -- | -- |
| `/privacy` | -- | -- | -- | -- | -- | -- |
| `/terms` | -- | -- | -- | -- | -- | -- |

---

## 2. Validation Results

### Organization / LocalBusiness (Global)

| Check | Result | Notes |
|---|---|---|
| @context is `https://schema.org` | PASS | |
| @type valid | PASS | Multi-type array `["Organization", "LocalBusiness"]` is valid |
| @id present | PASS | `https://usedslotshop.com/#organization` |
| name | PASS | "Used Slot Shop" |
| legalName | PASS | "Used Slot Shop LLC" |
| url | PASS | Absolute URL |
| telephone | PASS | "928-418-5549" |
| email | PASS | |
| foundingDate | PASS | ISO 8601 format "1992-01-01" |
| address | PASS | Full PostalAddress with all fields |
| geo | PASS | GeoCoordinates present |
| openingHoursSpecification | PASS | Weekday + Saturday specs |
| sameAs | WARNING | Empty array `[]` on live site. Social URLs should be populated or the property removed. |
| logo | MISSING | **Required for Google Knowledge Panel.** The `logo` property is not set despite `site.logoUrl` being available. |
| image | MISSING | Recommended for LocalBusiness. |

### BreadcrumbList (Multiple pages)

| Check | Result |
|---|---|
| @context | PASS |
| @type | PASS |
| itemListElement positions sequential | PASS |
| All item URLs absolute | PASS |
| ListItem names present | PASS |

### Product (Machine detail pages)

| Check | Result | Notes |
|---|---|---|
| @context | PASS | |
| @type | PASS | |
| name | PASS | |
| description | PASS | |
| image | PASS | Absolute URL (GitHub raw) |
| sku | PASS | Uses slug |
| brand | PASS | Brand object |
| itemCondition | PASS | `RefurbishedCondition` -- correct |
| offers.url | PASS | Absolute URL |
| offers.priceCurrency | PASS | "USD" |
| offers.price | PASS | Numeric value |
| offers.availability | PASS | Correct InStock/OutOfStock logic |
| offers.seller | PASS | Organization name |
| **offers.priceValidUntil** | MISSING | Recommended by Google for Product rich results |
| **review / aggregateRating** | MISSING | Not required, but enables star ratings in SERPs |
| **gtin / mpn** | MISSING | Not applicable for refurbished slot machines -- acceptable to omit |

### Article (Blog posts)

| Check | Result | Notes |
|---|---|---|
| @context | PASS | |
| @type | PASS | "Article" |
| mainEntityOfPage | PASS | |
| headline | PASS | |
| description | PASS | |
| image | PASS | Handles relative-to-absolute conversion |
| datePublished | PASS | Falls back to createdAt |
| dateModified | PASS | |
| author | PASS | Person type |
| publisher | PASS | Organization with logo ImageObject |

### FAQPage (Homepage + /faq)

| Check | Result | Notes |
|---|---|---|
| @context | PASS | |
| @type | PASS | |
| mainEntity | PASS | Array of Question/Answer pairs |
| Question.name | PASS | |
| Answer.text | PASS | |
| **Restriction note** | INFO | Google restricted FAQPage rich results to government/healthcare sites (August 2023). This schema will NOT generate rich results for a commercial site. However, it still aids AI/LLM discoverability (GEO benefit). Keep it if AI citations matter; otherwise, it is inert from a Google SERP perspective. |

---

## 3. Missing Schema Opportunities

### CRITICAL (high impact, currently absent)

#### 3a. WebSite with SearchAction
**Why:** Enables sitelinks searchbox in Google SERPs. Should be on the homepage.
**Impact:** High -- gives your brand a more prominent SERP presence.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://usedslotshop.com/#website",
  "name": "Used Slot Shop",
  "url": "https://usedslotshop.com",
  "publisher": { "@id": "https://usedslotshop.com/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://usedslotshop.com/shop?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

**Note:** This requires the `/shop` page to actually support a `?q=` query parameter for search. If on-site search is not implemented, omit the `potentialAction` and just use the basic WebSite schema.

#### 3b. Organization `logo` property
**Why:** Required for Google Knowledge Panel eligibility. Currently missing from the Organization schema despite `site.logoUrl` being defined.
**Fix:** Add `logo` to the `organizationJsonLd()` function in `lib/seo.ts`.

### HIGH (recommended, meaningful SEO benefit)

#### 3c. ContactPage schema on `/contact`
**Why:** Helps Google understand this is the contact page. Pairs well with the existing LocalBusiness.

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://usedslotshop.com/contact",
  "name": "Contact Used Slot Shop",
  "url": "https://usedslotshop.com/contact",
  "mainEntity": { "@id": "https://usedslotshop.com/#organization" }
}
```

#### 3d. BreadcrumbList on `/blog` index page
**Why:** Every other content page has breadcrumbs except the blog index. Inconsistency hurts structured data coverage.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://usedslotshop.com/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://usedslotshop.com/blog" }
  ]
}
```

#### 3e. BreadcrumbList on `/privacy` and `/terms`
**Why:** These legal pages have zero schema markup. Add breadcrumbs for consistency.

### MEDIUM (nice to have)

#### 3f. `sameAs` social links
**Why:** The `sameAs` array renders empty `[]` on the live site because social URLs are not configured in the site settings. Populate Facebook, Instagram, and YouTube URLs, or remove the empty array to avoid sending Google an empty signal.

#### 3g. Product `priceValidUntil`
**Why:** Google recommends this for Product Offer schema. Adding a date 90 days in the future (or end of year) is acceptable for refurbished inventory.

#### 3h. ItemList on `/shop` collection pages
**Why:** For the shop index, brand pages, and series pages, an `ItemList` schema wrapping the products can help Google understand the page is a product collection.

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "All Refurbished Slot Machines",
  "url": "https://usedslotshop.com/shop",
  "numberOfItems": 47,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://usedslotshop.com/machines/igt-s2000-double-diamond"
    }
  ]
}
```

### LOW / INFORMATIONAL

#### 3i. Review / AggregateRating on Products
**Why:** Enables star ratings in Google Product rich results. However, reviews must be real and verifiable. The homepage has hardcoded testimonials (Rob D., Jen M., Curtis L.) that are not tied to specific products. Do NOT fabricate per-product reviews. If a verified review system is added in the future, wire `AggregateRating` into the Product schema.

#### 3j. Service schema
**Why:** Used Slot Shop offers refurbishment/repair services and tech support. A `Service` schema could describe these offerings. Low priority since the primary business model is product sales.

---

## 4. Issues to Fix

| # | Priority | Issue | File | Fix |
|---|---|---|---|---|
| 1 | CRITICAL | Missing `logo` on Organization schema | `lib/seo.ts` line 47-85 | Add `logo: { "@type": "ImageObject", "url": new URL(site.logoUrl, site.url).toString() }` to the organizationJsonLd return object |
| 2 | CRITICAL | Missing WebSite schema | `app/page.tsx` or `app/layout.tsx` | Add WebSite JSON-LD (see 3a above) |
| 3 | HIGH | Empty `sameAs` array | `lib/site.ts` / admin site settings | Populate social media URLs in site config, or filter out the `sameAs` key when array is empty |
| 4 | HIGH | Missing BreadcrumbList on `/blog` | `app/blog/page.tsx` | Add breadcrumb JsonLd component |
| 5 | HIGH | Missing BreadcrumbList on `/privacy` | `app/privacy/page.tsx` | Add breadcrumb JsonLd component |
| 6 | HIGH | Missing BreadcrumbList on `/terms` | `app/terms/page.tsx` | Add breadcrumb JsonLd component |
| 7 | HIGH | No ContactPage schema on `/contact` | `app/contact/page.tsx` | Add ContactPage JSON-LD (see 3c above) |
| 8 | MEDIUM | No `priceValidUntil` on Product Offer | `lib/seo.ts` line 100-129 | Add `priceValidUntil` to offers object |
| 9 | MEDIUM | No ItemList on shop collection pages | `app/shop/page.tsx`, `app/shop/[brand]/page.tsx` | Add ItemList wrapping product URLs |
| 10 | INFO | FAQPage on commercial site | `app/page.tsx`, `app/faq/page.tsx` | No action needed. Google won't show rich results, but it aids AI discoverability. Keep as-is. |

---

## 5. Summary

**What's working well:**
- Organization/LocalBusiness schema is comprehensive and globally applied
- BreadcrumbList is implemented on 14 of 17 page types (82%)
- Product schema on machine detail pages is well-structured with correct `RefurbishedCondition`
- Article schema on blog posts includes all required and recommended properties
- All URLs are absolute
- All dates are ISO 8601
- JSON-LD is the sole format (correct per Google preference)
- Schema is server-rendered in Next.js (not client-side JS injected)

**What needs attention:**
- 2 critical gaps: missing `logo` on Organization and missing WebSite schema
- 3 pages lack any breadcrumb markup (`/blog`, `/privacy`, `/terms`)
- Empty `sameAs` array should be cleaned up
- Shop collection pages would benefit from ItemList schema
- Contact page should have ContactPage type

**Overall schema health: 7/10** -- solid foundation with a few gaps that are straightforward to close.
