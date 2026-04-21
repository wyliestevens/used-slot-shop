// Thin wrapper around the GitHub REST API for reading/writing files in the
// repo. Used by /api/admin/* routes to persist machines + images without a DB.

const OWNER = process.env.GITHUB_OWNER || "wyliestevens";
const REPO = process.env.GITHUB_REPO || "used-slot-shop";
const BRANCH = process.env.GITHUB_BRANCH || "main";

function token() {
  const t = process.env.GITHUB_TOKEN;
  if (!t) throw new Error("GITHUB_TOKEN is not set");
  return t;
}

const base = `https://api.github.com/repos/${OWNER}/${REPO}`;

async function gh(path: string, init: RequestInit = {}) {
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token()}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  const text = await res.text();
  let body: unknown = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!res.ok) {
    throw new Error(`GitHub ${res.status} ${path}: ${typeof body === "string" ? body : JSON.stringify(body)}`);
  }
  return body as any;
}

export type FileInfo = { content: string; sha: string };

export async function readFile(path: string): Promise<FileInfo | null> {
  try {
    const data = await gh(`/contents/${encodeURI(path)}?ref=${BRANCH}`);
    const content = Buffer.from(data.content, "base64").toString("utf8");
    return { content, sha: data.sha };
  } catch (err) {
    if (String(err).includes("404")) return null;
    throw err;
  }
}

export async function writeFile(opts: {
  path: string;
  contentBase64: string;
  message: string;
  sha?: string;
}) {
  return gh(`/contents/${encodeURI(opts.path)}`, {
    method: "PUT",
    body: JSON.stringify({
      message: opts.message,
      content: opts.contentBase64,
      branch: BRANCH,
      ...(opts.sha ? { sha: opts.sha } : {}),
    }),
  });
}

export async function listCommits(path: string, limit = 20) {
  const data = await gh(
    `/commits?path=${encodeURIComponent(path)}&sha=${BRANCH}&per_page=${limit}`
  );
  return (data as any[]).map((c) => ({
    sha: c.sha,
    date: c.commit?.author?.date,
    message: c.commit?.message,
    author: c.commit?.author?.name,
  }));
}

export async function readFileAtCommit(path: string, sha: string): Promise<string | null> {
  try {
    const data = await gh(`/contents/${encodeURI(path)}?ref=${sha}`);
    return Buffer.from(data.content, "base64").toString("utf8");
  } catch (err) {
    if (String(err).includes("404")) return null;
    throw err;
  }
}

export type CustomMachine = {
  slug: string;
  name: string;
  brand: "igt" | "bally" | "aristocrat" | "williams" | "konami" | "ainsworth" | "aruze";
  type: "reel" | "video" | "video-poker" | "vintage";
  price: number;
  image: string;
  description: string;
  highlights?: string[];
  specs?: Record<string, string>;
  cabinet?: string;
  condition?: "Professionally Refurbished" | "Collector Grade" | "Like New";
  inStock?: number;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
};

const CUSTOM_PATH = "data/machines-custom.json";

export async function loadCustomMachines(): Promise<{ machines: CustomMachine[]; sha: string | null }> {
  const file = await readFile(CUSTOM_PATH);
  if (!file) return { machines: [], sha: null };
  const parsed = JSON.parse(file.content || "[]") as CustomMachine[];
  return { machines: Array.isArray(parsed) ? parsed : [], sha: file.sha };
}

export async function saveCustomMachines(machines: CustomMachine[], message: string, sha: string | null) {
  const content = JSON.stringify(machines, null, 2) + "\n";
  const b64 = Buffer.from(content, "utf8").toString("base64");
  return writeFile({
    path: CUSTOM_PATH,
    contentBase64: b64,
    message,
    sha: sha ?? undefined,
  });
}

// ─── Seed machine overrides ──────────────────────────────────────────────────
// Admin edits to the 280 static seed machines don't modify the TS source —
// they live in this overlay file. Each entry is a slug + partial patch
// (price, description, image, etc.), plus an optional `hidden` flag for
// unpublishing a seed without deleting its record. `data/machines.ts` merges
// seeds with overrides at build time.
export type MachineOverride = {
  slug: string;
  patch?: Record<string, any>;
  hidden?: boolean;
  updatedAt: string;
};

const OVERRIDES_PATH = "data/machines-overrides.json";

export async function loadMachineOverrides(): Promise<{ overrides: MachineOverride[]; sha: string | null }> {
  const file = await readFile(OVERRIDES_PATH);
  if (!file) return { overrides: [], sha: null };
  const parsed = JSON.parse(file.content || "[]") as MachineOverride[];
  return { overrides: Array.isArray(parsed) ? parsed : [], sha: file.sha };
}

export async function saveMachineOverrides(
  overrides: MachineOverride[],
  message: string,
  sha: string | null
) {
  const content = JSON.stringify(overrides, null, 2) + "\n";
  const b64 = Buffer.from(content, "utf8").toString("base64");
  return writeFile({
    path: OVERRIDES_PATH,
    contentBase64: b64,
    message,
    sha: sha ?? undefined,
  });
}

export type UploadedImage = {
  path: string;
  name: string;
  url: string;
  size: number;
  sha: string;
};

// Walks `public/uploads/` recursively via the Contents API and returns every
// file in it. URLs point at the branch tip (not a pinned commit) so the
// library always reflects the latest version of a file if it was overwritten.
export async function listUploads(): Promise<UploadedImage[]> {
  const root = "public/uploads";
  const out: UploadedImage[] = [];

  async function walk(path: string) {
    let entries: any[];
    try {
      entries = await gh(`/contents/${encodeURI(path)}?ref=${BRANCH}`);
    } catch (err) {
      // Missing directory = empty library, not an error.
      if (String(err).includes("404")) return;
      throw err;
    }
    if (!Array.isArray(entries)) return;
    // Kick off dir walks in parallel so large libraries don't crawl serially.
    const dirJobs: Promise<void>[] = [];
    for (const entry of entries) {
      if (entry.type === "dir") {
        dirJobs.push(walk(entry.path));
      } else if (entry.type === "file") {
        out.push({
          path: entry.path,
          name: entry.name,
          size: Number(entry.size) || 0,
          sha: entry.sha,
          url: `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${entry.path}`,
        });
      }
    }
    await Promise.all(dirJobs);
  }

  await walk(root);
  return out;
}

export async function deleteFile(path: string, sha: string, message: string) {
  return gh(`/contents/${encodeURI(path)}`, {
    method: "DELETE",
    body: JSON.stringify({
      message,
      sha,
      branch: BRANCH,
    }),
  });
}

export async function uploadImage(opts: { slug: string; filename: string; base64: string }) {
  const safeName = opts.filename.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `public/uploads/${opts.slug}/${safeName}`;
  const existing = await readFile(path);
  const result = await writeFile({
    path,
    contentBase64: opts.base64,
    message: `upload: image for ${opts.slug}`,
    sha: existing?.sha,
  });
  // Pin to the exact commit SHA so the URL works immediately and is cache-safe
  // (avoids the ~60s wait for Vercel to rebuild and publish /uploads/... files).
  const commitSha: string | undefined = (result as any)?.commit?.sha;
  if (commitSha) {
    return `https://raw.githubusercontent.com/${OWNER}/${REPO}/${commitSha}/${path}`;
  }
  // Fallback: raw on the branch tip. Works once GitHub's CDN invalidates (~seconds).
  return `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path}`;
}
