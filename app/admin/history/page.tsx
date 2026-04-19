import { listCommits } from "@/lib/github";
import { History } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  let commits: Awaited<ReturnType<typeof listCommits>> = [];
  let err: string | null = null;
  try {
    commits = await listCommits("data/machines-custom.json", 50);
  } catch (e) {
    err = e instanceof Error ? e.message : String(e);
  }
  return (
    <div className="container-wide py-8 max-w-3xl">
      <div className="flex items-center gap-2 mb-2">
        <History className="h-5 w-5 text-brand-400" />
        <h1 className="font-display text-3xl font-bold text-white">Change History</h1>
      </div>
      <p className="text-ink-400 text-sm mb-8">Every inventory change. Click a commit on GitHub to see the diff.</p>
      {err ? (
        <div className="card p-5 border-red-500/40 bg-red-500/10 text-red-200 text-sm">{err}</div>
      ) : commits.length === 0 ? (
        <div className="card p-5 text-ink-400 text-sm">No changes yet.</div>
      ) : (
        <div className="card divide-y divide-ink-700">
          {commits.map((c) => (
            <a
              key={c.sha}
              href={`https://github.com/wyliestevens/used-slot-shop/commit/${c.sha}`}
              target="_blank"
              rel="noopener"
              className="block p-4 hover:bg-ink-800/60"
            >
              <div className="text-sm font-medium text-white">{c.message.split("\n")[0]}</div>
              <div className="text-xs text-ink-400 mt-1">
                {c.author} · {new Date(c.date || "").toLocaleString()} · <code>{c.sha.slice(0, 7)}</code>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
