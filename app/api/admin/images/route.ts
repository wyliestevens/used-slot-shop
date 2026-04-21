import { NextResponse } from "next/server";
import { listUploads, deleteFile } from "@/lib/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const images = await listUploads();
    // Newest first by path (uploads usually include timestamped slugs) — keeps
    // recent edits at the top of the grid without extra commit lookups.
    images.sort((a, b) => b.path.localeCompare(a.path));
    return NextResponse.json({ images });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { path?: string; sha?: string }
      | null;
    const path = body?.path;
    const sha = body?.sha;
    if (!path || !sha) {
      return NextResponse.json({ error: "Missing path or sha" }, { status: 400 });
    }
    if (!path.startsWith("public/uploads/")) {
      return NextResponse.json({ error: "Refusing to delete outside public/uploads/" }, { status: 400 });
    }
    await deleteFile(path, sha, `admin: delete ${path}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
