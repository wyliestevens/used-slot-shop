// Generic admin-managed JSON content files (site settings, homepage, etc.)
// Each file lives in data/content/<name>.json. Read/write via the GitHub API
// so the admin UI + chat agent can mutate them and Vercel auto-rebuilds.

import { readFile, writeFile } from "./github";

export type ContentFile =
  | "site"
  | "homepage"
  | "about"
  | "buying-guide"
  | "faq"
  | "shipping"
  | "warranty"
  | "maintenance";

const FILE_PATHS: Record<ContentFile, string> = {
  site: "data/content/site.json",
  homepage: "data/content/homepage.json",
  about: "data/content/pages/about.json",
  "buying-guide": "data/content/pages/buying-guide.json",
  faq: "data/content/faq.json",
  shipping: "data/content/pages/shipping.json",
  warranty: "data/content/pages/warranty.json",
  maintenance: "data/content/pages/maintenance.json",
};

// Editable copy pages surfaced by the /admin/pages editor (excludes site + homepage,
// which have bespoke forms).
export const PAGE_CONTENT_FILES: ContentFile[] = [
  "about",
  "buying-guide",
  "faq",
  "shipping",
  "warranty",
  "maintenance",
];

export async function loadContent<T = any>(
  file: ContentFile
): Promise<{ content: T; sha: string | null }> {
  const path = FILE_PATHS[file];
  const res = await readFile(path);
  if (!res) throw new Error(`Content file ${path} not found`);
  return { content: JSON.parse(res.content), sha: res.sha };
}

export async function saveContent<T = any>(
  file: ContentFile,
  content: T,
  sha: string | null,
  message: string
) {
  const path = FILE_PATHS[file];
  const b64 = Buffer.from(JSON.stringify(content, null, 2) + "\n", "utf8").toString("base64");
  return writeFile({
    path,
    contentBase64: b64,
    message,
    sha: sha ?? undefined,
  });
}
