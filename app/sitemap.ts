import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { machines, seriesByBrand } from "@/data/machines";
import { states } from "@/data/states";
import { loadPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages = [
    "",
    "/shop",
    "/buying-guide",
    "/state-legality",
    "/blog",
    "/faq",
    "/warranty",
    "/shipping",
    "/maintenance",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const brandPages = site.brands.map((b) => ({
    url: `${site.url}/shop/${b.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  const seriesPages = site.brands.flatMap((b) =>
    seriesByBrand(b.slug).map((s) => ({
      url: `${site.url}/shop/${b.slug}/${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );
  const machinePages = machines.map((m) => ({
    url: `${site.url}/machines/${m.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));
  const statePages = states.map((s) => ({
    url: `${site.url}/state-legality/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const { posts } = await loadPosts();
    blogPages = posts
      .filter((p) => p.status === "published")
      .map((p) => ({
        url: `${site.url}/blog/${p.slug}`,
        lastModified: new Date(p.updatedAt || p.publishedAt || p.createdAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch {
    blogPages = [];
  }

  return [...staticPages, ...brandPages, ...seriesPages, ...machinePages, ...statePages, ...blogPages];
}
