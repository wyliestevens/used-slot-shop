// Blog post persistence. Data lives at data/content/blog-posts.json in the
// git repo; read/write goes through the GitHub Contents API so the admin UI
// can mutate the file and Vercel rebuilds automatically.

import { readFile, writeFile } from "./github";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string; // Markdown-lite. Render paragraphs and simple headers.
  coverImage: string; // URL (may be /uploads/... or https://raw.githubusercontent.com/...)
  author: string;
  tags: string[];
  status: "draft" | "published";
  createdAt: string; // ISO
  updatedAt: string;
  publishedAt?: string;
};

const BLOG_PATH = "data/content/blog-posts.json";

export async function loadPosts(): Promise<{ posts: BlogPost[]; sha: string | null }> {
  const file = await readFile(BLOG_PATH);
  if (!file) return { posts: [], sha: null };
  const parsed = JSON.parse(file.content || "[]") as BlogPost[];
  return { posts: Array.isArray(parsed) ? parsed : [], sha: file.sha };
}

export async function savePosts(posts: BlogPost[], message: string, sha: string | null) {
  const content = JSON.stringify(posts, null, 2) + "\n";
  const b64 = Buffer.from(content, "utf8").toString("base64");
  return writeFile({
    path: BLOG_PATH,
    contentBase64: b64,
    message,
    sha: sha ?? undefined,
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { posts } = await loadPosts();
  return posts.find((p) => p.slug === slug) || null;
}
