import { NextResponse } from "next/server";
import { listCommits, readFileAtCommit } from "@/lib/github";

export const runtime = "nodejs";

const PATH = "data/machines-custom.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sha = searchParams.get("sha");
  if (sha) {
    const content = await readFileAtCommit(PATH, sha);
    return NextResponse.json({ sha, content: content ? JSON.parse(content) : [] });
  }
  const history = await listCommits(PATH, 30);
  return NextResponse.json({ history });
}
