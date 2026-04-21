import Link from "next/link";
import Image from "next/image";
import { loadPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Blog — Used Slot Shop",
  description:
    "Buying guides, maintenance tips, machine history, and owner stories from Used Slot Shop — America's trusted source for professionally refurbished casino slot machines.",
  path: "/blog",
});

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default async function BlogIndexPage() {
  let posts: Awaited<ReturnType<typeof loadPosts>>["posts"] = [];
  try {
    const res = await loadPosts();
    posts = res.posts;
  } catch {
    posts = [];
  }
  const published = posts
    .filter((p) => p.status === "published")
    .sort((a, b) => {
      const ad = a.publishedAt || a.createdAt;
      const bd = b.publishedAt || b.createdAt;
      return bd.localeCompare(ad);
    });

  return (
    <div className="container-wide py-12">
      <header className="max-w-2xl mb-12">
        <div className="text-xs uppercase tracking-[0.2em] text-brand-300 mb-3">The Blog</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white">
          Stories, tips & <span className="hl-gold">guides</span> from the shop floor
        </h1>
        <p className="mt-4 text-ink-300 text-lg">
          Buying guides, maintenance walkthroughs, machine history, and the occasional behind-the-scenes
          from the Used Slot Shop workshop.
        </p>
      </header>

      {published.length === 0 ? (
        <div className="card p-10 text-center text-ink-300">
          <p>No posts yet — check back soon.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {published.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card group block overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
                {p.coverImage && (
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
                {p.tags && p.tags.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {p.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-ink-950/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-300 border border-brand-500/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider text-ink-400 mb-1">
                  {formatDate(p.publishedAt || p.createdAt)} · {p.author}
                </div>
                <h2 className="font-display text-lg font-bold text-white group-hover:text-brand-300 transition leading-tight">
                  {p.title}
                </h2>
                {p.excerpt && (
                  <p className="mt-2 text-sm text-ink-300 line-clamp-3">{p.excerpt}</p>
                )}
                <div className="mt-4 flex items-center justify-end">
                  <span className="text-xs font-semibold text-brand-300 group-hover:underline">
                    Read post →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
