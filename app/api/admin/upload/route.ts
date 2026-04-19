import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/github";

export const runtime = "nodejs";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Max ~8 MB per image. GitHub Contents API caps ~100 MB; we keep it sane.
const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 });
  }
  const form = await req.formData();
  const file = form.get("file");
  const slugIn = (form.get("slug") as string) || "";
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 8 MB)" }, { status: 413 });
  }
  const slug = slugIn ? slugify(slugIn) : `unsorted-${Date.now()}`;
  const filename = file.name || `image-${Date.now()}.jpg`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const base64 = bytes.toString("base64");
  const url = await uploadImage({ slug, filename, base64 });
  return NextResponse.json({ ok: true, url });
}
