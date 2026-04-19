import { NextResponse } from "next/server";
import { loadCustomMachines, saveCustomMachines, CustomMachine } from "@/lib/github";

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
  while (existing.has(slug)) slug = `${baseSlug}-${i++}`;

  const entry: CustomMachine = {
    slug,
    name,
    brand,
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

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const { slug, patch } = body as { slug?: string; patch?: Partial<CustomMachine> };
  if (!slug || !patch) {
    return NextResponse.json({ error: "slug + patch required" }, { status: 400 });
  }
  const { machines, sha } = await loadCustomMachines();
  const idx = machines.findIndex((m) => m.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = { ...machines[idx], ...patch, updatedAt: new Date().toISOString() };
  const next = [...machines];
  next[idx] = updated;
  await saveCustomMachines(next, `admin: update ${slug}`, sha);
  return NextResponse.json({ ok: true, machine: updated });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  const { machines, sha } = await loadCustomMachines();
  const next = machines.filter((m) => m.slug !== slug);
  if (next.length === machines.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await saveCustomMachines(next, `admin: delete ${slug}`, sha);
  return NextResponse.json({ ok: true });
}
