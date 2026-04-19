# Used Slot Shop

A conversion-optimized, SEO-first website for Used Slot Shop — America's trusted source for refurbished casino slot machines since 1992.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** strict
- **Tailwind CSS** v3
- **lucide-react** icons
- Deployed on **Vercel**

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Project structure

```
app/              # App Router pages + API routes
components/       # Shared React components
data/             # Typed data (machines, states, FAQ)
lib/              # site config + SEO helpers
public/           # Static assets (favicon, llms.txt, manifest)
```

## SEO features built-in

- `app/layout.tsx` — Metadata API, Open Graph, Twitter cards, Google Search Console placeholder
- `app/sitemap.ts` — Dynamic sitemap covering every route
- `app/robots.ts` — Allows GPTBot, PerplexityBot, ClaudeBot, Google-Extended
- `public/llms.txt` — LLM discovery file for Generative Engine Optimization (GEO)
- JSON-LD: `Organization`, `LocalBusiness`, `Product`, `FAQPage`, `BreadcrumbList`
- Core Web Vitals primitives: `next/image`, `next/font`, route prefetching

## Post-deploy TODO

1. Replace `ADD-GOOGLE-SEARCH-CONSOLE-VERIFICATION-HERE` in `app/layout.tsx` with the real Search Console token.
2. Add `RESEND_API_KEY` (or similar) env var in Vercel and wire `app/api/contact/route.ts` to a real mailer.
3. Replace Unsplash placeholder images in `data/machines.ts` with real product photos.
4. Add Google Analytics 4 tag when you have a measurement ID.
5. Point the custom domain at the Vercel deployment.

See `DEPLOYMENT_LOG.md` for a running record of every deployment.
