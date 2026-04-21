import { NextResponse } from "next/server";
import { loadContent, saveContent, ContentFile } from "@/lib/content";

export const runtime = "nodejs";

const ALLOWED: ContentFile[] = ["site", "homepage"];

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ file: string }> }
) {
  const { file } = await ctx.params;
  if (!ALLOWED.includes(file as ContentFile)) {
    return NextResponse.json({ error: "Unknown content file" }, { status: 400 });
  }
  const { content, sha } = await loadContent(file as ContentFile);
  return NextResponse.json({ content, sha });
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ file: string }> }
) {
  const { file } = await ctx.params;
  if (!ALLOWED.includes(file as ContentFile)) {
    return NextResponse.json({ error: "Unknown content file" }, { status: 400 });
  }
  const body = await req.json().catch(() => ({}));
  const patch = body.patch || body.content;
  if (!patch || typeof patch !== "object") {
    return NextResponse.json({ error: "patch object required" }, { status: 400 });
  }
  const current = await loadContent(file as ContentFile);
  // Deep-merge one level: preserve unchanged keys, overwrite supplied ones.
  const next = deepMerge(current.content as Record<string, any>, patch);
  await saveContent(file as ContentFile, next, current.sha, `admin: update ${file}`);
  return NextResponse.json({ ok: true, content: next });
}

function deepMerge(a: any, b: any): any {
  if (Array.isArray(b)) return b; // arrays are replaced wholesale
  if (b && typeof b === "object") {
    const out: any = { ...(a && typeof a === "object" ? a : {}) };
    for (const k of Object.keys(b)) {
      out[k] = deepMerge(a?.[k], b[k]);
    }
    return out;
  }
  return b === undefined ? a : b;
}
