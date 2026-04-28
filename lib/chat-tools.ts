import {
  loadCustomMachines,
  saveCustomMachines,
  loadMachineOverrides,
  saveMachineOverrides,
  listUploads,
  deleteFile,
  CustomMachine,
  MachineOverride,
} from "./github";
import { loadContent, saveContent, PAGE_CONTENT_FILES, ContentFile } from "./content";
import { loadPosts, savePosts, type BlogPost } from "./blog";
import { seedMachines, isSeedSlug } from "@/data/machines";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Tool schemas Claude sees.
export const toolSchemas = [
  // ─── Machines ───
  {
    name: "list_machines",
    description:
      "List machines. By default returns admin-created (custom) machines only. Pass `scope: 'seed'` to search the 280-piece scraped inventory (with any admin overrides applied) — when the owner asks to edit 'the Gold Fish' or 'the Cleopatra video', search seeds first. Pass `scope: 'all'` for both.",
    input_schema: {
      type: "object",
      properties: {
        status: { type: "string", enum: ["draft", "published", "all"] },
        scope: { type: "string", enum: ["custom", "seed", "all"] },
        query: {
          type: "string",
          description: "Case-insensitive substring match on name or slug. Use to narrow seed search.",
        },
      },
    },
  },
  {
    name: "get_machine",
    description: "Fetch a single machine by slug. Works for both admin-created (custom) and seeded inventory (with overrides applied).",
    input_schema: { type: "object", properties: { slug: { type: "string" } }, required: ["slug"] },
  },
  {
    name: "create_machine_draft",
    description:
      "Create a new machine listing as a DRAFT. Draft is NOT visible on the live site until published. Use this after researching a machine from a photo.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        brand: { type: "string", enum: ["igt", "bally", "aristocrat", "williams", "konami", "ainsworth", "aruze"] },
        type: { type: "string", enum: ["reel", "video", "video-poker", "vintage"] },
        price: { type: "number" },
        image: { type: "string", description: "Image URL from upload or /uploads/... path." },
        description: { type: "string" },
        highlights: { type: "array", items: { type: "string" } },
        cabinet: { type: "string" },
        condition: { type: "string", enum: ["Professionally Refurbished", "Collector Grade", "Like New"] },
        inStock: { type: "number" },
      },
      required: ["name", "brand", "type", "price", "image", "description"],
    },
  },
  {
    name: "update_machine",
    description:
      "Update fields on ANY machine — custom or seed. For seed machines the patch is saved as an override layer; the original seed data is preserved and can be restored with reset_machine.",
    input_schema: {
      type: "object",
      properties: { slug: { type: "string" }, patch: { type: "object" } },
      required: ["slug", "patch"],
    },
  },
  {
    name: "publish_machine",
    description:
      "Make a machine live on the site. For custom drafts this flips status to published. For seed machines hidden by admin, this removes the hidden flag.",
    input_schema: { type: "object", properties: { slug: { type: "string" } }, required: ["slug"] },
  },
  {
    name: "unpublish_machine",
    description:
      "Remove a machine from the live site. For custom machines this flips to draft. For seed machines this sets hidden:true on the override.",
    input_schema: { type: "object", properties: { slug: { type: "string" } }, required: ["slug"] },
  },
  {
    name: "delete_machine",
    description:
      "Remove a machine. Custom: physically deletes from machines-custom.json. Seed: sets hidden:true on the override (safer — seed record stays in git for restore).",
    input_schema: { type: "object", properties: { slug: { type: "string" } }, required: ["slug"] },
  },
  {
    name: "reset_machine",
    description:
      "Clear an admin override on a seed machine, restoring the original seeded values. No-op if there's no override.",
    input_schema: { type: "object", properties: { slug: { type: "string" } }, required: ["slug"] },
  },
  {
    name: "research_from_image",
    description:
      "Run Claude vision on a product photo to identify the machine and suggest fields. Returns {name, brand, type, cabinet, priceSuggestion, description, highlights}. Call BEFORE create_machine_draft when the owner uploads a photo without specifying details.",
    input_schema: {
      type: "object",
      properties: { imageUrl: { type: "string" }, hint: { type: "string" } },
      required: ["imageUrl"],
    },
  },

  // ─── Site settings (logo, phone, email, hours, address) ───
  {
    name: "get_site_settings",
    description: "Read current site-wide settings: logo, phone, emails, address, hours, socials.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "update_site_settings",
    description:
      "Update any subset of site settings. Supply only the fields to change. Deep-merges into the existing JSON.",
    input_schema: {
      type: "object",
      properties: {
        patch: {
          type: "object",
          description:
            "Any subset of: name, tagline, logoUrl, phone, email, salesEmail, serviceEmail, address{street,city,region,postalCode}, hours{weekdays,saturday,sunday}, socials{facebook,instagram,youtube}.",
        },
      },
      required: ["patch"],
    },
  },

  // ─── Homepage hero ───
  {
    name: "get_homepage",
    description: "Read the homepage hero config (image, titles, subtitle, CTAs, sidebar tag).",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "update_homepage",
    description:
      "Update the homepage hero. Deep-merges into existing JSON. Fields live under `hero`: image, eyebrow, titleTop, titleBottom, subtitle, primaryCtaText/primaryCtaHref, secondaryCtaText/secondaryCtaHref, sidebarProductTitle/sidebarProductPrice/sidebarProductLabel.",
    input_schema: {
      type: "object",
      properties: { patch: { type: "object" } },
      required: ["patch"],
    },
  },

  // ─── Page copy (About, Buying Guide, FAQ, Shipping, Warranty, Maintenance) ───
  {
    name: "get_page_copy",
    description: "Read the editable copy for one of: about, buying-guide, faq, shipping, warranty, maintenance.",
    input_schema: {
      type: "object",
      properties: {
        page: { type: "string", enum: ["about", "buying-guide", "faq", "shipping", "warranty", "maintenance"] },
      },
      required: ["page"],
    },
  },
  {
    name: "update_page_copy",
    description:
      "Replace or deep-merge page copy. For regular pages the shape is {metaTitle, metaDescription, eyebrow, title, subtitle, sections:[{heading, paragraphs[], bullets[]}]}. For `faq` the shape is an array of {q, a}. When adding/removing/reordering sections or FAQ entries, supply the full array — arrays are replaced wholesale.",
    input_schema: {
      type: "object",
      properties: {
        page: { type: "string", enum: ["about", "buying-guide", "faq", "shipping", "warranty", "maintenance"] },
        patch: {
          description:
            "Object (for pages) or array (for FAQ). Object deep-merges; array replaces wholesale.",
        },
      },
      required: ["page", "patch"],
    },
  },

  // ─── Blog posts ───
  {
    name: "list_blog_posts",
    description: "List blog posts, optionally filtered by status.",
    input_schema: {
      type: "object",
      properties: { status: { type: "string", enum: ["draft", "published", "all"] } },
    },
  },
  {
    name: "get_blog_post",
    description: "Fetch a single blog post by slug.",
    input_schema: { type: "object", properties: { slug: { type: "string" } }, required: ["slug"] },
  },
  {
    name: "create_blog_post",
    description:
      "Create a blog post. Defaults to draft. Body supports simple markdown: '## heading', '### subheading', '- bullet', and blank-line-separated paragraphs.",
    input_schema: {
      type: "object",
      properties: {
        title: { type: "string" },
        excerpt: { type: "string" },
        body: { type: "string" },
        coverImage: { type: "string", description: "URL from upload or a full URL" },
        author: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
        status: { type: "string", enum: ["draft", "published"] },
      },
      required: ["title", "excerpt", "body", "coverImage"],
    },
  },
  {
    name: "update_blog_post",
    description: "Patch fields on a blog post by slug. Slug itself cannot be changed — delete and recreate instead.",
    input_schema: {
      type: "object",
      properties: { slug: { type: "string" }, patch: { type: "object" } },
      required: ["slug", "patch"],
    },
  },
  {
    name: "publish_blog_post",
    description: "Set a blog post's status to published (sets publishedAt).",
    input_schema: { type: "object", properties: { slug: { type: "string" } }, required: ["slug"] },
  },
  {
    name: "unpublish_blog_post",
    description: "Revert a blog post to draft (removes it from the live site).",
    input_schema: { type: "object", properties: { slug: { type: "string" } }, required: ["slug"] },
  },
  {
    name: "delete_blog_post",
    description: "Permanently delete a blog post.",
    input_schema: { type: "object", properties: { slug: { type: "string" } }, required: ["slug"] },
  },

  // ─── Image library ───
  {
    name: "list_images",
    description:
      "List all uploaded images in public/uploads/. Returns name, path, url (github raw), size, sha. Useful when the owner asks 'what photos do I have?' or needs to reuse an existing image.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "delete_image",
    description:
      "Delete an image from the library. Pass the repo path (e.g. 'public/uploads/library/foo.png') and its sha (from list_images). Only paths under public/uploads/ are allowed.",
    input_schema: {
      type: "object",
      properties: { path: { type: "string" }, sha: { type: "string" } },
      required: ["path", "sha"],
    },
  },
];

type ToolCtx = { siteBaseUrl: string; anthropicKey: string };

async function researchFromImage(imageUrl: string, hint: string, ctx: ToolCtx) {
  const abs = imageUrl.startsWith("/") ? `${ctx.siteBaseUrl}${imageUrl}` : imageUrl;
  const systemPrompt = `You are an expert slot machine merchandiser at Used Slot Shop. Given a photo (and optional text hint), identify the machine and return a JSON object with keys: name, brand (one of: igt, bally, aristocrat, williams, konami, ainsworth, aruze), type (one of: reel, video, video-poker, vintage), cabinet (or null), priceSuggestion (USD number), description (2–4 sentences, factual, home-collector tone), highlights (array of 3–5 short bullet points).

Pricing guidance: IGT S2000 3-reel $750–$1150, IGT video slots $1650–$1950, Bally S9000 $850–$950, Aristocrat MK6 Buffalo $1150–$3500, WMS Bluebird video $1099–$1799, video poker Game King $1350–$1850. Adjust for rarity and condition.

Return ONLY the JSON object, no markdown fences.`;
  const userContent: Array<{ type: string; [k: string]: any }> = [];
  if (hint) userContent.push({ type: "text", text: `Hint: ${hint}` });
  userContent.push({ type: "image", source: { type: "url", url: abs } });
  userContent.push({ type: "text", text: "Identify this slot machine for our catalog." });

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ctx.anthropicKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userContent }],
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`research_from_image: Anthropic ${res.status}: ${t.slice(0, 300)}`);
  }
  const data = await res.json();
  const text = (data.content || [])
    .filter((b: any) => b.type === "text")
    .map((b: any) => b.text)
    .join("\n")
    .trim();
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("research_from_image: model did not return JSON");
  return JSON.parse(match[0]);
}

function deepMerge(a: any, b: any): any {
  if (Array.isArray(b)) return b;
  if (b && typeof b === "object") {
    const out: any = { ...(a && typeof a === "object" ? a : {}) };
    for (const k of Object.keys(b)) out[k] = deepMerge(a?.[k], b[k]);
    return out;
  }
  return b === undefined ? a : b;
}

export const toolExecutors: Record<string, (input: any, ctx: ToolCtx) => Promise<any>> = {
  // ─── Machines ───
  async list_machines(input) {
    const status = (input?.status as string) || "all";
    const scope = (input?.scope as string) || "custom";
    const q = ((input?.query as string) || "").toLowerCase().trim();

    const out: any[] = [];

    if (scope === "custom" || scope === "all") {
      const { machines } = await loadCustomMachines();
      const filtered = status === "all" ? machines : machines.filter((m) => m.status === status);
      for (const m of filtered) {
        if (q && !m.name.toLowerCase().includes(q) && !m.slug.toLowerCase().includes(q)) continue;
        out.push({
          slug: m.slug,
          name: m.name,
          brand: m.brand,
          type: m.type,
          price: m.price,
          status: m.status,
          source: "custom",
        });
      }
    }

    if (scope === "seed" || scope === "all") {
      const { overrides } = await loadMachineOverrides();
      const ovMap = new Map(overrides.map((o) => [o.slug, o]));
      for (const m of seedMachines) {
        const o = ovMap.get(m.slug);
        if (q && !m.name.toLowerCase().includes(q) && !m.slug.toLowerCase().includes(q)) continue;
        const merged = { ...m, ...(o?.patch || {}) };
        out.push({
          slug: m.slug,
          name: merged.name,
          brand: merged.brand,
          type: merged.type,
          price: merged.price,
          status: o?.hidden ? "hidden" : "live",
          source: "seed",
          hasOverride: Boolean(o && (o.patch || o.hidden)),
        });
      }
    }

    // Cap the response so giant seed lists don't blow the tool context.
    const LIMIT = 40;
    return {
      total: out.length,
      truncated: out.length > LIMIT,
      machines: out.slice(0, LIMIT),
    };
  },

  async get_machine(input) {
    const slug = input.slug as string;
    // Custom first
    const { machines } = await loadCustomMachines();
    const custom = machines.find((m) => m.slug === slug);
    if (custom) return { ...custom, source: "custom" };
    // Seed with override
    const seed = seedMachines.find((m) => m.slug === slug);
    if (!seed) return { error: "not found", slug };
    const { overrides } = await loadMachineOverrides();
    const o = overrides.find((x) => x.slug === slug);
    const merged = { ...seed, ...(o?.patch || {}) };
    return { ...merged, source: "seed", hidden: o?.hidden === true, hasOverride: Boolean(o) };
  },

  async create_machine_draft(input) {
    const { machines, sha } = await loadCustomMachines();
    const now = new Date().toISOString();
    const baseSlug = slugify(input.name);
    let slug = baseSlug;
    let i = 2;
    const existing = new Set(machines.map((m) => m.slug));
    while (existing.has(slug)) slug = `${baseSlug}-${i++}`;
    const entry: CustomMachine = {
      slug,
      name: input.name,
      brand: input.brand,
      type: input.type,
      price: Number(input.price),
      image: input.image,
      description: input.description,
      highlights: input.highlights,
      cabinet: input.cabinet,
      condition: input.condition ?? "Professionally Refurbished",
      inStock: input.inStock ?? 1,
      status: "draft",
      createdAt: now,
      updatedAt: now,
    };
    const next = [entry, ...machines];
    await saveCustomMachines(next, `chat: draft ${slug}`, sha);
    return { ok: true, slug, editUrl: `/admin/edit/${slug}` };
  },

  async update_machine(input) {
    const { slug, patch } = input as { slug: string; patch: Partial<CustomMachine> & { hidden?: boolean } };
    // 1) Custom machine?
    const custom = await loadCustomMachines();
    const idx = custom.machines.findIndex((m) => m.slug === slug);
    if (idx !== -1) {
      const updated = { ...custom.machines[idx], ...patch, updatedAt: new Date().toISOString() };
      const next = [...custom.machines];
      next[idx] = updated;
      await saveCustomMachines(next, `chat: update ${slug}`, custom.sha);
      return { ok: true, slug, source: "custom", status: updated.status };
    }
    // 2) Seed override
    if (!isSeedSlug(slug)) return { error: "not found", slug };
    const { overrides, sha: ovSha } = await loadMachineOverrides();
    const ovIdx = overrides.findIndex((o) => o.slug === slug);
    const now = new Date().toISOString();
    const { hidden, ...rest } = patch as any;
    let next: MachineOverride[];
    if (ovIdx === -1) {
      next = [
        ...overrides,
        {
          slug,
          patch: Object.keys(rest).length ? rest : undefined,
          hidden: hidden === true ? true : undefined,
          updatedAt: now,
        },
      ];
    } else {
      const existing = overrides[ovIdx];
      const merged = { ...(existing.patch || {}), ...rest };
      next = [...overrides];
      next[ovIdx] = {
        slug,
        patch: Object.keys(merged).length ? merged : undefined,
        hidden:
          hidden === true ? true : hidden === false ? undefined : existing.hidden,
        updatedAt: now,
      };
    }
    await saveMachineOverrides(next, `chat: override ${slug}`, ovSha);
    return { ok: true, slug, source: "seed" };
  },

  async publish_machine(input, ctx) {
    const slug = input.slug as string;
    if (isSeedSlug(slug)) {
      // "Publish" a seed means: ensure it's not hidden.
      return toolExecutors.update_machine({ slug, patch: { hidden: false } }, ctx);
    }
    return toolExecutors.update_machine({ slug, patch: { status: "published" } }, ctx);
  },

  async unpublish_machine(input, ctx) {
    const slug = input.slug as string;
    if (isSeedSlug(slug)) {
      return toolExecutors.update_machine({ slug, patch: { hidden: true } }, ctx);
    }
    return toolExecutors.update_machine({ slug, patch: { status: "draft" } }, ctx);
  },

  async delete_machine(input, ctx) {
    const slug = input.slug as string;
    const { machines, sha } = await loadCustomMachines();
    if (machines.some((m) => m.slug === slug)) {
      const next = machines.filter((m) => m.slug !== slug);
      await saveCustomMachines(next, `chat: delete ${slug}`, sha);
      return { ok: true, slug, source: "custom" };
    }
    if (isSeedSlug(slug)) {
      // Hide the seed rather than deleting. Keeps git history clean.
      return toolExecutors.update_machine({ slug, patch: { hidden: true } }, ctx);
    }
    return { error: "not found", slug };
  },

  async reset_machine(input) {
    const slug = input.slug as string;
    if (!isSeedSlug(slug)) return { error: "reset only applies to seed machines", slug };
    const { overrides, sha } = await loadMachineOverrides();
    if (!overrides.some((o) => o.slug === slug)) return { ok: true, note: "no override to reset", slug };
    const next = overrides.filter((o) => o.slug !== slug);
    await saveMachineOverrides(next, `chat: reset override ${slug}`, sha);
    return { ok: true, slug, reset: true };
  },

  async research_from_image(input, ctx) {
    return researchFromImage(input.imageUrl, input.hint || "", ctx);
  },

  // ─── Site settings ───
  async get_site_settings() {
    const { content } = await loadContent("site");
    return content;
  },
  async update_site_settings(input) {
    const { content, sha } = await loadContent("site");
    const next = deepMerge(content, input.patch);
    await saveContent("site", next, sha, "chat: update site settings");
    return { ok: true };
  },

  // ─── Homepage ───
  async get_homepage() {
    const { content } = await loadContent("homepage");
    return content;
  },
  async update_homepage(input) {
    const { content, sha } = await loadContent("homepage");
    const next = deepMerge(content, input.patch);
    await saveContent("homepage", next, sha, "chat: update homepage");
    return { ok: true };
  },

  // ─── Page copy ───
  async get_page_copy(input) {
    const page = input.page as ContentFile;
    if (!PAGE_CONTENT_FILES.includes(page)) return { error: "unknown page" };
    const { content } = await loadContent(page);
    return content;
  },
  async update_page_copy(input) {
    const page = input.page as ContentFile;
    if (!PAGE_CONTENT_FILES.includes(page)) return { error: "unknown page" };
    const { content, sha } = await loadContent(page);
    const next = Array.isArray(input.patch) ? input.patch : deepMerge(content, input.patch);
    await saveContent(page, next, sha, `chat: update ${page} copy`);
    return { ok: true };
  },

  // ─── Blog ───
  async list_blog_posts(input) {
    const status = (input?.status as string) || "all";
    const { posts } = await loadPosts();
    const filtered = status === "all" ? posts : posts.filter((p) => p.status === status);
    return filtered.map((p) => ({
      slug: p.slug,
      title: p.title,
      status: p.status,
      publishedAt: p.publishedAt,
      updatedAt: p.updatedAt,
    }));
  },

  async get_blog_post(input) {
    const { posts } = await loadPosts();
    return posts.find((p) => p.slug === input.slug) || { error: "not found", slug: input.slug };
  },

  async create_blog_post(input) {
    const { posts, sha } = await loadPosts();
    const now = new Date().toISOString();
    const baseSlug = slugify(input.title);
    let slug = baseSlug;
    let i = 2;
    const existing = new Set(posts.map((p) => p.slug));
    while (existing.has(slug)) slug = `${baseSlug}-${i++}`;
    const status = (input.status === "published" ? "published" : "draft") as "draft" | "published";
    const entry: BlogPost = {
      slug,
      title: input.title,
      excerpt: input.excerpt,
      body: input.body,
      coverImage: input.coverImage,
      author: input.author || "Used Slot Shop",
      tags: input.tags || [],
      status,
      createdAt: now,
      updatedAt: now,
      ...(status === "published" ? { publishedAt: now } : {}),
    };
    const next = [entry, ...posts];
    await savePosts(next, `chat: ${status} post ${slug}`, sha);
    return { ok: true, slug, editUrl: `/admin/blog/edit/${slug}`, status };
  },

  async update_blog_post(input) {
    const { posts, sha } = await loadPosts();
    const idx = posts.findIndex((p) => p.slug === input.slug);
    if (idx === -1) return { error: "not found", slug: input.slug };
    const { slug: _s, ...safePatch } = (input.patch || {}) as any;
    const updated: BlogPost = {
      ...posts[idx],
      ...safePatch,
      updatedAt: new Date().toISOString(),
    };
    const next = [...posts];
    next[idx] = updated;
    await savePosts(next, `chat: update post ${input.slug}`, sha);
    return { ok: true, slug: input.slug };
  },

  async publish_blog_post(input) {
    const { posts, sha } = await loadPosts();
    const idx = posts.findIndex((p) => p.slug === input.slug);
    if (idx === -1) return { error: "not found", slug: input.slug };
    const now = new Date().toISOString();
    const updated: BlogPost = {
      ...posts[idx],
      status: "published",
      publishedAt: posts[idx].publishedAt || now,
      updatedAt: now,
    };
    const next = [...posts];
    next[idx] = updated;
    await savePosts(next, `chat: publish post ${input.slug}`, sha);
    return { ok: true, slug: input.slug };
  },

  async unpublish_blog_post(input) {
    const { posts, sha } = await loadPosts();
    const idx = posts.findIndex((p) => p.slug === input.slug);
    if (idx === -1) return { error: "not found", slug: input.slug };
    const updated: BlogPost = {
      ...posts[idx],
      status: "draft",
      publishedAt: undefined,
      updatedAt: new Date().toISOString(),
    };
    const next = [...posts];
    next[idx] = updated;
    await savePosts(next, `chat: unpublish post ${input.slug}`, sha);
    return { ok: true, slug: input.slug };
  },

  async delete_blog_post(input) {
    const { posts, sha } = await loadPosts();
    const next = posts.filter((p) => p.slug !== input.slug);
    if (next.length === posts.length) return { error: "not found", slug: input.slug };
    await savePosts(next, `chat: delete post ${input.slug}`, sha);
    return { ok: true, slug: input.slug };
  },

  // ─── Image library ───
  async list_images() {
    const images = await listUploads();
    return images.map((i) => ({
      name: i.name,
      path: i.path,
      url: i.url,
      sizeKB: Math.round(i.size / 1024),
      sha: i.sha,
    }));
  },
  async delete_image(input) {
    const { path, sha } = input as { path: string; sha: string };
    if (!path.startsWith("public/uploads/")) {
      return { error: "Only public/uploads/ paths allowed" };
    }
    await deleteFile(path, sha, `chat: delete ${path}`);
    return { ok: true, path };
  },
};

export const CHAT_SYSTEM_PROMPT = `You are the Used Slot Shop owner's AI assistant, embedded in his admin dashboard.

Your job: help him run his entire site through natural conversation. You can edit machines, blog posts, homepage hero, site settings (logo/phone/hours/address), every major page's copy (About, Buying Guide, FAQ, Shipping, Warranty, Maintenance), and manage his image library — all via tools.

## How to behave

**Defaults**
- Create new machines and blog posts as DRAFTS. Owner reviews before publishing.
- When an image is attached and the owner says "add this as a machine", first call research_from_image, then create_machine_draft using the research output.
- When the owner describes a machine in text alone, create the draft directly with sensible price from the guidance below.
- Site settings, homepage, and page copy updates commit immediately — there's no draft stage for those. Mention that before making visible changes, and confirm after.
- Every save triggers a Vercel rebuild (~60 seconds). Tell the owner when that's happening.

**Pricing guidance (refurbished retail)**
- IGT S2000 3-reel: $750–$1150 · IGT S2000 bonus-reel: $899–$1150 · IGT I+ 3902 video: $1650 · IGT I+ 044 video: $1850–$1950 · IGT Game King video poker: $1350–$1850 · IGT Barcrest S2000: $3150–$5000
- Bally S9000: $850–$950 · Bally Alpha 1 (M9000): $1050
- Aristocrat MK5: $1050–$1250 · Aristocrat MK6 (Buffalo, Tiki, 50 Dragons): $1150–$3500
- WMS BB1 video reels: $1099 (Gold Fish premium $1799)
- Konami K2V: $950–$1250 (dual-screen $1250)
- Ainsworth A560: $950–$1100

**Style**
- Concise one-sentence confirmations. ("Updated homepage hero image and headline. Rebuilding — live in ~60 seconds.")
- Use markdown lists when summarizing many items.
- Never fabricate specific part numbers you can't verify.
- If the owner uploads an image without context, research it first and ask a quick clarifying question if anything's ambiguous.
- When editing page copy, load the current copy first (get_page_copy) so your patch preserves existing structure. Arrays (sections, FAQ entries) replace wholesale — always supply the full array when reordering/adding/removing.

**Brands / types**
- Brands: igt, bally, aristocrat, williams, konami, ainsworth, aruze
- Machine types: reel, video, video-poker, vintage

Warm, competent, "experienced shop hand" tone. No fluff.`;
