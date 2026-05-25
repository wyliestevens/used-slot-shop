# GEO Analysis: usedslotshop.com

**Date:** 2026-05-25
**URL:** https://www.usedslotshop.com
**Framework:** Next.js (App Router, SSR)

---

## GEO Readiness Score: 72/100

| Dimension | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Citability | 25% | 78/100 | 19.5 |
| Structural Readability | 20% | 82/100 | 16.4 |
| Multi-Modal Content | 15% | 55/100 | 8.3 |
| Authority & Brand Signals | 20% | 58/100 | 11.6 |
| Technical Accessibility | 20% | 82/100 | 16.4 |
| **Total** | **100%** | | **72.2** |

---

## Platform-Specific Scores

| Platform | Score | Rationale |
|----------|-------|-----------|
| **Google AI Overviews** | 75/100 | Strong structured data, FAQ schema, product schema, SSR. Missing author credentials and update dates on key pages. |
| **ChatGPT** | 62/100 | No Wikipedia entity, no Reddit presence, no YouTube channel. ChatGPT heavily favors Wikipedia (47.9%) and Reddit (11.3%) as citation sources. |
| **Perplexity** | 60/100 | No Reddit presence (Perplexity sources 46.7% from Reddit). No community validation signals. Good factual density helps. |
| **Bing Copilot** | 68/100 | SSR content accessible, structured data present. No IndexNow implementation detected. |

---

## AI Crawler Access Status

| Crawler | Status | Notes |
|---------|--------|-------|
| GPTBot (OpenAI) | ALLOWED | Explicitly allowed in robots.txt |
| OAI-SearchBot (OpenAI) | ALLOWED | Explicitly allowed |
| PerplexityBot | ALLOWED | Explicitly allowed |
| ClaudeBot (Anthropic) | ALLOWED | Explicitly allowed |
| Google-Extended | ALLOWED | Explicitly allowed |
| ChatGPT-User | ALLOWED | Falls under wildcard `Allow: /` |
| CCBot (Common Crawl) | ALLOWED | Not explicitly blocked -- consider blocking if training-only crawlers are unwanted |
| Bytespider (ByteDance) | ALLOWED | Not explicitly blocked |
| `/api/` routes | BLOCKED | Correctly blocked for all crawlers |

**Verdict:** Excellent. All major AI search crawlers have full access. The site is maximally visible to AI search engines.

---

## llms.txt Status

**Status:** PRESENT and well-structured.

**Location:** `/llms.txt` (served from `public/llms.txt`)

**Assessment:**
- Business identity clearly stated (name, founding year, location, contact)
- All 7 brands carried are listed with model specifics
- Key pages linked with descriptions
- Pricing ranges included
- Warranty and shipping terms summarized
- Content licensing explicitly permits AI citation with attribution

**Issues found:**
- Email in llms.txt says `info@usedslotshop.com` but the actual site email is `usedslotshop@gmail.com` -- these should match
- No mention of key differentiators (33+ years, 18-40 tech hours per machine) that would make citations more specific
- Missing blog and individual machine page links

---

## Brand Mention Analysis

| Platform | Presence | Impact on AI Visibility |
|----------|----------|------------------------|
| Wikipedia | NOT PRESENT | High negative impact. Wikipedia is cited by ChatGPT in 47.9% of queries. |
| Reddit | NOT PRESENT | High negative impact. Reddit is cited by Perplexity in 46.7% of queries and ChatGPT in 11.3%. |
| YouTube | NOT PRESENT | Highest negative impact. YouTube mentions have ~0.737 correlation with AI citations (strongest signal). Social field is empty in site config. |
| LinkedIn | NOT PRESENT | Moderate negative impact. No company LinkedIn page linked. |
| Facebook | NOT PRESENT | Social field empty in site config. |
| Instagram | NOT PRESENT | Social field empty in site config. |

**This is the single biggest weakness.** Brand mentions correlate 3x more strongly with AI visibility than backlinks (Ahrefs December 2025 study). The site has zero presence on the platforms that AI engines cite most heavily.

---

## Passage-Level Citability Analysis

### Strong Citable Passages (already well-structured)

1. **FAQ: Legal ownership answer** -- 87 words, self-contained, includes specific state lists. Could be expanded to 134-167 optimal range with more detail.

2. **FAQ: Refurbished cost answer** -- 52 words with specific price ranges ($750, $1,000-$2,000, $4,000+, $2,500-$3,500 average). Excellent factual density but too short for optimal citation.

3. **FAQ: Warranty answer** -- 62 words, specific coverage details. Well-structured but below optimal length.

4. **FAQ: Shipping answer** -- 48 words with specific details (5-10 business days, Kingman AZ warehouse). Too short.

5. **Buying Guide: Refurbishment standards** -- "A good refurb takes 18-40 technician hours per machine" is a highly citable unique data point not found elsewhere.

### Weak Citable Passages (need improvement)

1. **Homepage hero:** "The casino floor, delivered home." -- Pure marketing copy. AI engines cannot cite this. Needs a factual definition sentence.

2. **Homepage meta description:** Good but missing from HTML head (the WebFetch extraction did not find an explicit meta description tag -- verify this is rendering correctly via Next.js Metadata API).

3. **Testimonials:** Not structured as Review schema. AI engines cannot parse these as verified customer reviews.

### Optimal Citation Block Gaps

The site lacks "What is [topic]?" definitional passages in the first 40-60 words of sections. For example, no page opens with:
- "Used Slot Shop is a Kingman, Arizona-based dealer specializing in..."
- "A refurbished slot machine is a casino-floor unit that has been..."

These definitional openers are the #1 pattern AI engines extract for citation.

---

## Server-Side Rendering Check

**Status:** EXCELLENT

- **Framework:** Next.js App Router with SSR
- **Static generation:** Most pages use static generation at build time (optimal)
- **Blog page:** Uses `force-dynamic` but still server-renders (not client-only)
- **Key content in HTML:** All product data, FAQ content, and page text is rendered server-side from JSON data files
- **No client-only content gates:** No login walls, no lazy-loaded critical content
- **JavaScript dependency:** Minimal -- core content is in the initial HTML payload

AI crawlers do NOT execute JavaScript, so this SSR approach ensures all content is visible to GPTBot, PerplexityBot, ClaudeBot, etc.

---

## Structured Data Assessment

### Present (Good)

| Schema Type | Location | Status |
|-------------|----------|--------|
| Organization + LocalBusiness | Root layout (every page) | Complete with address, geo, hours, phone |
| Product | Individual machine pages | Complete with price, availability, brand, condition |
| BreadcrumbList | FAQ, State Legality, About, and other subpages | Correct hierarchy |
| FAQPage | Homepage (6 items) + FAQ page (all items) | Well-implemented |
| Article | Blog posts | Complete with author, dates, publisher |

### Missing (Recommended)

| Schema Type | Recommendation | Priority |
|-------------|---------------|----------|
| **Review / AggregateRating** | Wrap testimonials in Review schema. AI engines use review data for trust signals. | HIGH |
| **Person (author)** | Blog articles have author name but no Person schema with credentials, sameAs links, or expertise indicators. | HIGH |
| **WebSite + SearchAction** | Add sitelinks search box schema for Google. | MEDIUM |
| **ItemList** | Wrap product grids in ItemList schema for carousel eligibility in AI Overviews. | MEDIUM |
| **HowTo** | The Buying Guide is a step-by-step process -- HowTo schema would make it extractable. | MEDIUM |
| **Service** | Add Service schema for repair/maintenance offerings. | LOW |

### Issues

- `sameAs` array in Organization schema is empty because all social URLs are blank strings (filtered out by `.filter(Boolean)`). This means the entity graph has no external connections.

---

## Top 5 Highest-Impact Changes

### 1. Create YouTube Channel and Post Content (Impact: CRITICAL)

**Effort:** Medium (ongoing)
**Why:** YouTube mentions have the highest correlation (~0.737) with AI citations of any signal. Even 5-10 videos showing refurbishment process, machine demos, or buyer walkthroughs would dramatically increase AI visibility.
**Action:**
- Create "Used Slot Shop" YouTube channel
- Post: machine teardown/refurbishment videos, buyer guides, slot machine comparisons
- Add channel URL to `site.json` socials.youtube
- This populates the `sameAs` field in Organization schema

### 2. Build Reddit and Wikipedia Presence (Impact: CRITICAL)

**Effort:** Medium-High
**Why:** ChatGPT cites Wikipedia 47.9% of the time. Perplexity cites Reddit 46.7%. Zero presence on both platforms is the #1 reason for low ChatGPT/Perplexity scores.
**Action:**
- Participate authentically in r/SlotMachines, r/Arcade, r/mancave, r/hometheater subreddits
- Consider creating a Wikipedia article for the business (33+ years of operation, verifiable through business registration, establishes notability)
- Share expert knowledge about slot machine refurbishment, legality, maintenance

### 3. Add Definitional Opening Passages to Every Key Page (Impact: HIGH)

**Effort:** Low (1-2 hours of content editing)
**Why:** AI engines extract "X is..." and "X refers to..." patterns as primary citation blocks. The site currently opens pages with marketing copy instead of factual definitions.
**Action:**
- Homepage: Add "Used Slot Shop is a Kingman, Arizona-based dealer that has professionally refurbished and sold casino-grade slot machines since 1992, delivering over 12,000 machines to homes, bars, and private game rooms across the United States." (first 40 words visible)
- Buying Guide: Open with "A refurbished slot machine is a decommissioned casino-floor unit that has undergone 18-40 hours of professional reconditioning including..."
- FAQ page: Add an introductory paragraph defining the business and its expertise
- Each passage should be 134-167 words, self-contained, and packed with specific facts

### 4. Add Review Schema to Testimonials (Impact: HIGH)

**Effort:** Low (1-2 hours of code)
**Why:** The site has 3 strong testimonials with names, locations, and ratings but they are not structured as schema.org Review objects. AI engines cannot parse them as verified reviews without schema markup.
**Action:**
- Add `Review` schema with `reviewRating` for each testimonial
- Wrap in `AggregateRating` on the Organization schema
- Consider collecting more reviews and displaying count/average rating

### 5. Expand FAQ Answers to Optimal Citation Length (Impact: MEDIUM-HIGH)

**Effort:** Low (2-3 hours of content editing)
**Why:** Current FAQ answers range from 48-87 words. The optimal length for AI citation is 134-167 words. Expanding answers with more specific details, statistics, and examples will increase the probability of being cited.
**Action:**
- Legal ownership answer: Expand from 87 words to ~150 words by adding more detail about age restrictions by state
- Cost answer: Expand from 52 words to ~150 words with breakdown by machine type
- Warranty answer: Expand from 62 words to ~150 words with process details
- Shipping answer: Expand from 48 words to ~150 words with packaging and delivery specifics
- Each answer should start with a direct, quotable sentence

---

## Additional Recommendations

### Quick Wins (< 1 hour each)

- **Fix llms.txt email mismatch:** Change `info@usedslotshop.com` to `usedslotshop@gmail.com` (or vice versa -- pick one canonical email)
- **Add publication dates to all pages:** The Buying Guide and State Legality pages have no visible "last updated" dates. AI engines use dates as freshness signals.
- **Add author bylines to blog posts with credentials:** Currently just a name -- add "by [Name], Certified Slot Machine Technician with 12+ years experience" pattern
- **Block training-only crawlers:** Add `Disallow: /` for CCBot, Bytespider, and cohere-ai in robots.txt if you don't want content used for model training (distinct from AI search)

### Medium Effort (1-5 hours each)

- **Implement IndexNow:** Submit URLs to Bing/Yandex immediately when content changes. Helps Bing Copilot visibility.
- **Add comparison tables:** "IGT S2000 vs Bally S9000" or "Reel Slots vs Video Slots" comparison tables are highly citable by AI engines
- **Create a "Slot Machine Glossary" page:** Definitional content ("What is an RNG?", "What is a bill validator?") is the most-cited content type in AI search
- **Add Person schema for team members:** Link to LinkedIn profiles, establish expertise signals

### Content Gaps for AI Citation

The following queries likely trigger AI Overviews but the site lacks optimized content for them:

1. "how much does a slot machine cost" -- Buying Guide has pricing but not in a format optimized for AI extraction
2. "is it legal to own a slot machine" -- State Legality page is excellent but needs a 150-word summary passage at the top
3. "how to buy a used slot machine" -- Buying Guide exists but opens with marketing copy instead of a direct answer
4. "slot machine for man cave" -- No content targeting this specific use case
5. "refurbished slot machine warranty" -- Warranty page exists but may lack the definitional opener

---

## Summary

Used Slot Shop has a strong technical foundation for AI search optimization -- SSR via Next.js, comprehensive structured data, AI crawlers explicitly allowed, and an llms.txt file. The content is factually dense with specific statistics, pricing, and detailed FAQ answers.

The critical gap is **off-site brand presence**. With zero presence on YouTube (0.737 correlation), Reddit (top source for Perplexity), and Wikipedia (top source for ChatGPT), the site is invisible to the platforms where AI engines source their citations. Fixing this is the single highest-leverage action.

The secondary gap is **passage-level optimization**. The content reads well for humans but is not formatted for AI extraction. Adding definitional opening sentences, expanding passages to 134-167 words, and structuring content as self-contained answer blocks will significantly increase citation probability.

**Current state:** The site is well-positioned for Google AI Overviews (which favors top-10 ranking pages with structured data) but poorly positioned for ChatGPT and Perplexity (which favor brand mentions across platforms).
