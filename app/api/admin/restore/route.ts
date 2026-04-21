import { NextResponse } from "next/server";

export const runtime = "nodejs";

const OWNER = process.env.GITHUB_OWNER || "wyliestevens";
const REPO = process.env.GITHUB_REPO || "used-slot-shop";
const BRANCH = process.env.GITHUB_BRANCH || "main";

async function gh(path: string, init: RequestInit = {}) {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers || {}),
    },
  });
  const t = await res.text();
  const body = t ? JSON.parse(t) : null;
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${JSON.stringify(body).slice(0, 300)}`);
  return body;
}

// Restore repo state to a prior commit by creating a NEW commit whose tree
// matches the target commit, parented to current HEAD. Preserves history —
// no force-push, fully reversible.
export async function POST(req: Request) {
  if (!process.env.GITHUB_TOKEN) {
    return NextResponse.json({ error: "GITHUB_TOKEN not set" }, { status: 503 });
  }
  const { targetSha } = await req.json().catch(() => ({}));
  if (!targetSha || typeof targetSha !== "string" || !/^[0-9a-f]{7,40}$/.test(targetSha)) {
    return NextResponse.json({ error: "Valid targetSha required" }, { status: 400 });
  }

  try {
    const target = await gh(`/git/commits/${targetSha}`);
    const head = await gh(`/git/refs/heads/${BRANCH}`);
    const headSha = head.object.sha;
    if (headSha === targetSha) {
      return NextResponse.json({ ok: true, note: "Already at that commit", newSha: headSha });
    }
    const newCommit = await gh(`/git/commits`, {
      method: "POST",
      body: JSON.stringify({
        message: `admin: restore to ${targetSha.slice(0, 7)} (was ${headSha.slice(0, 7)})`,
        tree: target.tree.sha,
        parents: [headSha],
      }),
    });
    await gh(`/git/refs/heads/${BRANCH}`, {
      method: "PATCH",
      body: JSON.stringify({ sha: newCommit.sha, force: false }),
    });
    return NextResponse.json({ ok: true, newSha: newCommit.sha });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
