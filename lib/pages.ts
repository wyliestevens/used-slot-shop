// Shared type + slug helpers for the generic "page copy" JSON files that back
// /about, /buying-guide, /shipping, /warranty, /maintenance. The FAQ page has
// its own shape and lives in lib/faq.ts.

export type PageSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  // When true, the bullets render as a numbered <ol> instead of a bulleted <ul>.
  ordered?: boolean;
};

export type PageContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  sections: PageSection[];
};

export type PageSlug =
  | "about"
  | "buying-guide"
  | "shipping"
  | "warranty"
  | "maintenance"
  | "terms"
  | "privacy";

// Friendly labels for admin UI listings.
export const PAGE_META: Record<PageSlug | "faq", { label: string; path: string; description: string }> = {
  about: {
    label: "About",
    path: "/about",
    description: "Shop story, refurbishment process, team bio.",
  },
  "buying-guide": {
    label: "Buying Guide",
    path: "/buying-guide",
    description: "Long-form guide for first-time buyers.",
  },
  faq: {
    label: "FAQ",
    path: "/faq",
    description: "Frequently asked questions. Drives FAQ JSON-LD for SEO.",
  },
  shipping: {
    label: "Shipping",
    path: "/shipping",
    description: "Freight details, transit times, delivery expectations.",
  },
  warranty: {
    label: "Warranty",
    path: "/warranty",
    description: "Coverage, exclusions, returns, lifetime support.",
  },
  maintenance: {
    label: "Maintenance",
    path: "/maintenance",
    description: "Repair services, parts, platforms we support.",
  },
  terms: {
    label: "Terms of Service",
    path: "/terms",
    description: "Purchase agreement, setup, shipping, tech support, used-parts terms.",
  },
  privacy: {
    label: "Privacy Policy",
    path: "/privacy",
    description: "What information we collect and how we use it.",
  },
};
