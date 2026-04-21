import { History } from "lucide-react";
import HistoryList from "./HistoryList";

export const dynamic = "force-dynamic";

const OWNER = process.env.GITHUB_OWNER || "wyliestevens";
const REPO = process.env.GITHUB_REPO || "used-slot-shop";
const BRANCH = process.env.GITHUB_BRANCH || "main";

async function loadCommits(limit: number) {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/commits?sha=${BRANCH}&per_page=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as any[];
  return data.map((c) => ({
    sha: c.sha as string,
    date: c.commit?.author?.date as string,
    message: (c.commit?.message as string) || "",
    author: (c.commit?.author?.name as string) || "",
  }));
}

export default async function HistoryPage() {
  let commits: Awaited<ReturnType<typeof loadCommits>> = [];
  let err: string | null = null;
  try {
    commits = await loadCommits(50);
  } catch (e) {
    err = e instanceof Error ? e.message : String(e);
  }
  return (
    <div className="container-wide py-8 max-w-3xl">
      <div className="flex items-center gap-2 mb-2">
        <History className="h-5 w-5 text-brand-400" />
        <h1 className="font-display text-3xl font-bold text-white">Change History</h1>
      </div>
      <p className="text-ink-400 text-sm mb-8">
        Every change ever made to the site. Click <strong>Restore</strong> on any row to roll the whole site back to that point — a new commit is created that reverses everything after. Nothing is lost.
      </p>
      {err ? (
        <div className="card p-5 border-red-500/40 bg-red-500/10 text-red-200 text-sm">{err}</div>
      ) : (
        <HistoryList commits={commits} />
      )}
    </div>
  );
}
