// FAQ loader. The canonical data lives in data/content/faq.json so the admin
// can edit it at runtime; this module statically imports the JSON so build-time
// pages stay statically generated and the JSON-LD schema in lib/seo.ts has a
// concrete list to serialize.

import faqData from "@/data/content/faq.json";

export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = faqData as FaqItem[];
