import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { PAGE_META } from "@/lib/pages";

export const dynamic = "force-dynamic";

const SLUGS = ["about", "buying-guide", "faq", "shipping", "warranty", "maintenance"] as const;

export default function AdminPagesIndex() {
  return (
    <div className="container-wide py-8 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-white mb-1">Pages</h1>
      <p className="text-ink-400 text-sm mb-8">
        Edit the copy on your public info pages — no code required. Saves commit to git and redeploy the public site.
      </p>

      <div className="card divide-y divide-ink-700">
        {SLUGS.map((slug) => {
          const meta = PAGE_META[slug];
          return (
            <Link
              key={slug}
              href={`/admin/pages/${slug}`}
              className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-ink-900/40 transition"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-ink-900/70 border border-ink-700 text-brand-300 flex-shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-white flex items-center gap-2">
                    {meta.label}
                    <span className="text-xs font-normal text-ink-500">{meta.path}</span>
                  </div>
                  <div className="text-sm text-ink-400 mt-0.5">{meta.description}</div>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-ink-500 flex-shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
