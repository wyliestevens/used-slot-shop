import { NextResponse } from "next/server";
import {
  loadCustomMachines,
  saveCustomMachines,
  loadMachineOverrides,
  saveMachineOverrides,
  CustomMachine,
  MachineOverride,
} from "@/lib/github";
import { isSeedSlug } from "@/data/machines";

export const runtime = "nodejs";

export async function GET() {
  const { machines } = await loadCustomMachines();
  return NextResponse.json({ machines });
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const {
    name,
    brand,
    model,
    type,
    price,
    image,
    description,
    highlights,
    specs,
    cabinet,
    condition,
    inStock,
    status = "draft",
  } = body;

  if (!name || !brand || !type || !image || typeof price !== "number") {
    return NextResponse.json(
      { error: "Missing required fields: name, brand, type, price, image." },
      { status: 400 }
    );
  }

  const { machines, sha } = await loadCustomMachines();
  const now = new Date().toISOString();
  const baseSlug = slugify(name);
  let slug = baseSlug;
  let i = 2;
  const existing = new Set([...machines.map((m) => m.slug)]);
  while (existing.has(slug) || isSeedSlug(slug)) slug = `${baseSlug}-${i++}`;

  const entry: CustomMachine = {
    slug,
    name,
    brand,
    model: model || undefined,
    type,
    price: Number(price),
    image,
    description,
    highlights,
    specs,
    cabinet,
    condition,
    inStock,
    status,
    createdAt: now,
    updatedAt: now,
  };

  const next = [entry, ...machines];
  await saveCustomMachines(
    next,
    `admin: ${status === "published" ? "publish" : "draft"} ${slug}`,
    sha
  );
  return NextResponse.json({ ok: true, machine: entry });
}

// PATCH routes updates to the right file:
//   - If slug is in machines-custom.json → patch that file directly.
//   - If slug is a seed → upsert into machines-overrides.json.
// Special: patch = {} with no keys + reset=true clears any override for a seed.
export async function PATCH(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const { slug, patch, reset } = body as {
    slug?: string;
    patch?: Partial<CustomMachine> & { hidden?: boolean };
    reset?: boolean;
  };
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  // 1) Custom machine path
  const { machines, sha } = await loadCustomMachines();
  const customIdx = machines.findIndex((m) => m.slug === slug);
  if (customIdx !== -1) {
    if (!patch) return NextResponse.json({ error: "patch required" }, { status: 400 });
    const updated = { ...machines[customIdx], ...patch, updatedAt: new Date().toISOString() };
    const next = [...machines];
    next[customIdx] = updated;
    await saveCustomMachines(next, `admin: update ${slug}`, sha);
    return NextResponse.json({ ok: true, machine: updated, source: "custom" });
  }

  // 2) Seed override path
  if (!isSeedSlug(slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const { overrides, sha: ovSha } = await loadMachineOverrides();
  const ovIdx = overrides.findIndex((o) => o.slug === slug);

  // Reset: remove existing override so the seed defaults reappear.
  if (reset) {
    if (ovIdx === -1) return NextResponse.json({ ok: true, note: "No override to reset" });
    const next = overrides.filter((_, i) => i !== ovIdx);
    await saveMachineOverrides(next, `admin: reset override ${slug}`, ovSha);
    return NextResponse.json({ ok: true, slug, source: "seed", reset: true });
  }

  if (!patch) return NextResponse.json({ error: "patch required" }, { status: 400 });

  const now = new Date().toISOString();
  let next: MachineOverride[];
  if (ovIdx === -1) {
    // Normalize: the `hidden` flag lives at the top of the override, not in patch.
    const { hidden, ...rest } = patch as any;
    const entry: MachineOverride = {
      slug,
      patch: Object.keys(rest).length ? rest : undefined,
      hidden: hidden === true ? true : undefined,
      updatedAt: now,
    };
    next = [...overrides, entry];
  } else {
    const existing = overrides[ovIdx];
    const { hidden, ...rest } = patch as any;
    const mergedPatch = { ...(existing.patch || {}), ...rest };
    const entry: MachineOverride = {
      slug,
      patch: Object.keys(mergedPatch).length ? mergedPatch : undefined,
      hidden: hidden === true ? true : hidden === false ? undefined : existing.hidden,
      updatedAt: now,
    };
    next = [...overrides];
    next[ovIdx] = entry;
  }

  await saveMachineOverrides(next, `admin: override ${slug}`, ovSha);
  return NextResponse.json({ ok: true, slug, source: "seed" });
}

// DELETE:
//   - Custom slug → physically removed from machines-custom.json.
//   - Seed slug → hidden:true override (record stays in git; site drops it).
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const { machines, sha } = await loadCustomMachines();
  const customIdx = machines.findIndex((m) => m.slug === slug);
  if (customIdx !== -1) {
    const next = machines.filter((m) => m.slug !== slug);
    await saveCustomMachines(next, `admin: delete ${slug}`, sha);
    return NextResponse.json({ ok: true, source: "custom" });
  }

  if (!isSeedSlug(slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const { overrides, sha: ovSha } = await loadMachineOverrides();
  const idx = overrides.findIndex((o) => o.slug === slug);
  const now = new Date().toISOString();
  let next: MachineOverride[];
  if (idx === -1) {
    next = [...overrides, { slug, hidden: true, updatedAt: now }];
  } else {
    next = [...overrides];
    next[idx] = { ...overrides[idx], hidden: true, updatedAt: now };
  }
  await saveMachineOverrides(next, `admin: hide ${slug}`, ovSha);
  return NextResponse.json({ ok: true, source: "seed", hidden: true });
}
