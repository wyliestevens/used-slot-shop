import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { loadContent, ContentFile, PAGE_CONTENT_FILES } from "@/lib/content";
import { PAGE_META } from "@/lib/pages";
import PageForm from "./PageForm";
import FaqForm from "./FaqForm";

export const dynamic = "force-dynamic";

export default async function AdminPageEditor({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!PAGE_CONTENT_FILES.includes(slug as ContentFile)) {
    notFound();
  }
  const file = slug as ContentFile;
  const meta = PAGE_META[slug as keyof typeof PAGE_META];
  const { content } = await loadContent<any>(file);

  return (
    <div className="container-wide py-8 max-w-3xl">
      <Link href="/admin/pages" className="text-sm text-ink-400 hover:text-brand-300 inline-flex items-center gap-1 mb-4">
        <ArrowLeft className="h-4 w-4" /> All pages
      </Link>
      <div className="flex items-baseline justify-between mb-1 flex-wrap gap-x-4">
        <h1 className="font-display text-3xl font-bold text-white">{meta.label}</h1>
        <Link
          href={meta.path}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-brand-300 hover:underline"
        >
          View live page {meta.path} →
        </Link>
      </div>
      <p className="text-ink-400 text-sm mb-8">
        Edit the copy for this page. Save & redeploy to push changes live (~60 seconds).
      </p>

      {slug === "faq" ? (
        <FaqForm initial={content} />
      ) : (
        <PageForm slug={slug} initial={content} />
      )}
    </div>
  );
}
