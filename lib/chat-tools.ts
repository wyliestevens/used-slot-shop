import {
  loadCustomMachines,
  saveCustomMachines,
  uploadImage as ghUploadImage,
  CustomMachine,
} from "./github";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Tool schemas that Claude sees.
export const toolSchemas = [
  {
    name: "list_machines",
    description:
      "List admin-managed machines (drafts and/or published). Does not include the 280 seeded inventory machines — those are static and only edited via code.",
    input_schema: {
      type: "object",
      properties: {
        status: {
          type: "string",
          enum: ["draft", "published", "all"],
          description: "Filter by status. Default 'all'.",
        },
      },
    },
  },
  {
    name: "get_machine",
    description: "Fetch a single admin-managed machine by slug.",
    input_schema: {
      type: "object",
      properties: { slug: { type: "string" } },
      required: ["slug"],
    },
  },
  {
    name: "create_machine_draft",
    description:
      "Create a new machine listing as a DRAFT. Draft is NOT visible on the live site until published. Use this after researching a machine from a photo.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "e.g. 'IGT Buffalo Gold MK6'" },
        brand: {
          type: "string",
          enum: ["igt", "bally", "aristocrat", "williams", "konami", "ainsworth", "aruze"],
        },
        type: {
          type: "string",
          enum: ["reel", "video", "video-poker", "vintage"],
        },
        price: { type: "number", description: "USD" },
        image: {
          type: "string",
          description:
            "Image URL — typically a /uploads/... path from a recent upload, or an absolute URL.",
        },
        description: { type: "string", description: "2–4 sentences, home-collector tone" },
        highlights: {
          type: "array",
          items: { type: "string" },
          description: "3–5 bullet points",
        },
        cabinet: { type: "string", description: "e.g. 'MK6', 'S9000'" },
        condition: {
          type: "string",
          enum: ["Professionally Refurbished", "Collector Grade", "Like New"],
        },
        inStock: { type: "number" },
      },
      required: ["name", "brand", "type", "price", "image", "description"],
    },
  },
  {
    name: "update_machine",
    description:
      "Update fields on an existing admin-managed machine. Supply the slug and only the fields to change.",
    input_schema: {
      type: "object",
      properties: {
        slug: { type: "string" },
        patch: {
          type: "object",
          description:
            "Any subset of fields: name, brand, type, price, image, description, highlights, cabinet, condition, inStock, status",
        },
      },
      required: ["slug", "patch"],
    },
  },
  {
    name: "publish_machine",
    description: "Flip a draft to published. Commits to git. Site rebuilds in ~60 sec.",
    input_schema: {
      type: "object",
      properties: { slug: { type: "string" } },
      required: ["slug"],
    },
  },
  {
    name: "unpublish_machine",
    description: "Flip a published machine back to draft (removes it from the live site on next rebuild).",
    input_schema: {
      type: "object",
      properties: { slug: { type: "string" } },
      required: ["slug"],
    },
  },
  {
    name: "delete_machine",
    description:
      "Permanently remove an admin-managed machine. Still visible in git history if recovery is needed.",
    input_schema: {
      type: "object",
      properties: { slug: { type: "string" } },
      required: ["slug"],
    },
  },
  {
    name: "research_from_image",
    description:
      "Run Claude's vision on a product photo to identify the machine and suggest fields. Returns {name, brand, type, cabinet, priceSuggestion, description, highlights}. Call this BEFORE create_machine_draft when the owner uploads a photo without specifying details.",
    input_schema: {
      type: "object",
      properties: {
        imageUrl: {
          type: "string",
          description: "URL of the uploaded photo (e.g. /uploads/..)",
        },
        hint: {
          type: "string",
          description: "Any text clue from the owner (e.g. 'IGT, think it's Buffalo')",
        },
      },
      required: ["imageUrl"],
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
      model: "claude-opus-4-7",
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

// Tool executors: all return JSON-serializable values.
export const toolExecutors: Record<string, (input: any, ctx: ToolCtx) => Promise<any>> = {
  async list_machines(input) {
    const status = (input?.status as string) || "all";
    const { machines } = await loadCustomMachines();
    const filtered = status === "all" ? machines : machines.filter((m) => m.status === status);
    return filtered.map((m) => ({
      slug: m.slug,
      name: m.name,
      brand: m.brand,
      type: m.type,
      price: m.price,
      status: m.status,
      updatedAt: m.updatedAt,
    }));
  },

  async get_machine(input) {
    const { slug } = input as { slug: string };
    const { machines } = await loadCustomMachines();
    return machines.find((m) => m.slug === slug) || { error: "not found", slug };
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
      specs: input.specs,
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
    const { slug, patch } = input as { slug: string; patch: Partial<CustomMachine> };
    const { machines, sha } = await loadCustomMachines();
    const idx = machines.findIndex((m) => m.slug === slug);
    if (idx === -1) return { error: "not found", slug };
    const updated = { ...machines[idx], ...patch, updatedAt: new Date().toISOString() };
    const next = [...machines];
    next[idx] = updated;
    await saveCustomMachines(next, `chat: update ${slug}`, sha);
    return { ok: true, slug, status: updated.status };
  },

  async publish_machine(input, ctx) {
    return toolExecutors.update_machine({ slug: input.slug, patch: { status: "published" } }, ctx);
  },

  async unpublish_machine(input, ctx) {
    return toolExecutors.update_machine({ slug: input.slug, patch: { status: "draft" } }, ctx);
  },

  async delete_machine(input) {
    const { slug } = input as { slug: string };
    const { machines, sha } = await loadCustomMachines();
    const next = machines.filter((m) => m.slug !== slug);
    if (next.length === machines.length) return { error: "not found", slug };
    await saveCustomMachines(next, `chat: delete ${slug}`, sha);
    return { ok: true, slug };
  },

  async research_from_image(input, ctx) {
    const { imageUrl, hint } = input as { imageUrl: string; hint?: string };
    return researchFromImage(imageUrl, hint || "", ctx);
  },
};

export const CHAT_SYSTEM_PROMPT = `You are the Used Slot Shop owner's AI assistant, embedded in his admin dashboard.

Your job: help him run his inventory through natural conversation. You have tools to list, create, edit, publish, unpublish, and delete machines, plus research unknown machines from a photo.

## How to behave

**Defaults:**
- Create new machines as DRAFTS. The owner reviews drafts before they hit the live site.
- When an image is attached and the owner says "add this", first call research_from_image, then create_machine_draft using the research output.
- When the owner describes a machine in text alone, create the draft directly — but pick a sensible price from the guidance below.
- When asked to "publish X", find X by slug (use list_machines if needed) then call publish_machine.

**Pricing guidance (refurbished retail):**
- IGT S2000 3-reel: $750–$1150
- IGT S2000 bonus-reel: $899–$1150
- IGT I+ 3902 video: $1650
- IGT I+ 044 video: $1850–$1950
- IGT Game King video poker: $1350–$1850
- IGT Barcrest S2000: $3150–$5000
- Bally S9000: $850–$950
- Bally Alpha 1 (M9000): $1050
- Aristocrat MK5: $1050–$1250
- Aristocrat MK6 (Buffalo, Tiki, 50 Dragons): $1150–$3500
- WMS BB1 video reels: $1099 (Gold Fish premium $1799)
- Konami K2V: $950–$1250 (dual-screen $1250)
- Ainsworth A560: $950–$1100

**Style:**
- Be concise. One-sentence confirmations are fine. ("Draft created for Aristocrat Buffalo Gold at $1,200 — /admin/edit/aristocrat-buffalo-gold.")
- Use markdown lists when summarizing many items.
- Never fabricate specific cabinet model numbers or part numbers you can't verify. Say "likely an MK6" rather than "MK6-PV-3402".
- If the owner uploads an image without context, research it first and ask a quick clarifying question if anything's ambiguous (price range, condition).

**Available brands:** igt, bally, aristocrat, williams, konami, ainsworth, aruze
**Available types:** reel, video, video-poker, vintage

Keep a warm, competent, "experienced shop hand" tone. No fluff.`;
