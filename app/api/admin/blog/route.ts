import { NextResponse } from "next/server";
import { loadPosts, savePosts, type BlogPost } from "@/lib/blog";

export const runtime = "nodejs";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  const { posts } = await loadPosts();
  return NextResponse.json({ posts });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const {
    title,
    excerpt = "",
    body: postBody = "",
    coverImage = "",
    author = "",
    tags,
    status = "draft",
  } = body as Partial<BlogPost> & { title?: string };

  if (!title || !coverImage || !author) {
    return NextResponse.json(
      { error: "Missing required fields: title, coverImage, author." },
      { status: 400 }
    );
  }

  const { posts, sha } = await loadPosts();
  const now = new Date().toISOString();
  const baseSlug = slugify(title);
  let slug = baseSlug || `post-${Date.now()}`;
  let i = 2;
  const existing = new Set(posts.map((p) => p.slug));
  while (existing.has(slug)) slug = `${baseSlug}-${i++}`;

  const tagList = Array.isArray(tags)
    ? (tags as string[]).map((t) => t.trim()).filter(Boolean)
    : [];

  const entry: BlogPost = {
    slug,
    title,
    excerpt,
    body: postBody,
    coverImage,
    author,
    tags: tagList,
    status: status === "published" ? "published" : "draft",
    createdAt: now,
    updatedAt: now,
    ...(status === "published" ? { publishedAt: now } : {}),
  };

  const next = [entry, ...posts];
  await savePosts(next, `admin: ${entry.status} ${slug}`, sha);
  return NextResponse.json({ ok: true, post: entry });
}

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const { slug, patch } = body as { slug?: string; patch?: Partial<BlogPost> };
  if (!slug || !patch) {
    return NextResponse.json({ error: "slug + patch required" }, { status: 400 });
  }
  const { posts, sha } = await loadPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const now = new Date().toISOString();
  const prev = posts[idx];
  const nextStatus = (patch.status as BlogPost["status"]) || prev.status;
  const publishedAt =
    nextStatus === "published"
      ? prev.publishedAt || now
      : undefined;
  const updated: BlogPost = {
    ...prev,
    ...patch,
    tags: Array.isArray(patch.tags)
      ? (patch.tags as string[]).map((t) => t.trim()).filter(Boolean)
      : prev.tags,
    slug: prev.slug, // slug is immutable via PATCH
    status: nextStatus,
    publishedAt,
    updatedAt: now,
  };
  const next = [...posts];
  next[idx] = updated;
  await savePosts(next, `admin: ${updated.status} ${slug}`, sha);
  return NextResponse.json({ ok: true, post: updated });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  const { posts, sha } = await loadPosts();
  const next = posts.filter((p) => p.slug !== slug);
  if (next.length === posts.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await savePosts(next, `admin: delete ${slug}`, sha);
  return NextResponse.json({ ok: true });
}
