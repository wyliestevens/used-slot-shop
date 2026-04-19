import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { machines } from "@/data/machines";
import { states } from "@/data/states";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    "",
    "/shop",
    "/buying-guide",
    "/state-legality",
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
  return [...staticPages, ...brandPages, ...machinePages, ...statePages];
}
