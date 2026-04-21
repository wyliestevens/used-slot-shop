// Back-compat shim. The canonical FAQ data now lives in
// data/content/faq.json (admin-editable). The lib/faq.ts module is the real
// loader; this file re-exports from it so existing `@/data/faq` imports keep
// working without churn.

export { faqs, type FaqItem } from "@/lib/faq";
