import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { loadPosts, getPostBySlug, type BlogPost } from "@/lib/blog";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const { posts } = await loadPosts();
    return posts
      .filter((p) => p.status === "published")
      .map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post || post.status !== "published") {
    return buildMetadata({
      title: "Post not found",
      description: "This post does not exist or has been unpublished.",
      path: `/blog/${slug}`,
      noindex: true,
    });
  }
  return buildMetadata({
    title: `${post.title} — Used Slot Shop Blog`,
    description: post.excerpt || post.title,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
  });
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

// Tiny markdown-lite renderer. Supports:
//   - blank-line separated paragraphs
//   - lines starting with `## ` as h2
//   - lines starting with `### ` as h3
//   - lines starting with `- ` grouped as unordered lists
function renderBody(body: string) {
  const blocks = body
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((block, i) => {
    if (block.startsWith("### ")) {
      return <h3 key={i}>{block.slice(4)}</h3>;
    }
    if (block.startsWith("## ")) {
      return <h2 key={i}>{block.slice(3)}</h2>;
    }
    if (block.startsWith("# ")) {
      return <h2 key={i}>{block.slice(2)}</h2>;
    }
    const lines = block.split("\n");
    if (lines.every((l) => l.startsWith("- "))) {
      return (
        <ul key={i}>
          {lines.map((l, j) => (
            <li key={j}>{l.slice(2)}</li>
          ))}
        </ul>
      );
    }
    // Paragraph: join inner newlines with spaces.
    return <p key={i}>{block.replace(/\n/g, " ")}</p>;
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post: BlogPost | null = null;
  try {
    post = await getPostBySlug(slug);
  } catch {
    post = null;
  }
  if (!post || post.status !== "published") notFound();

  const published = post.publishedAt || post.createdAt;

  return (
    <div className="container-wide py-10 max-w-3xl">
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <div className="mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-brand-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
      </div>

      <article>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-ink-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-300 border border-brand-500/40"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
          {post.title}
        </h1>

        <div className="text-sm text-ink-400 mb-8">
          By <span className="text-ink-200">{post.author}</span> · {formatDate(published)}
        </div>

        {post.coverImage && (
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-ink-700 bg-ink-900 mb-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              priority
              className="object-cover"
            />
          </div>
        )}

        {post.excerpt && (
          <p className="text-lg text-ink-200 leading-relaxed mb-8 border-l-2 border-brand-500/60 pl-4 italic">
            {post.excerpt}
          </p>
        )}

        <div className="prose-slot">{renderBody(post.body)}</div>
      </article>

      <div className="mt-14 pt-8 border-t border-ink-800">
        <Link href="/blog" className="btn-ghost">
          <ArrowLeft className="h-4 w-4" /> All posts
        </Link>
      </div>
    </div>
  );
}
