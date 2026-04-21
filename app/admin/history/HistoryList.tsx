"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Undo2, ExternalLink } from "lucide-react";

type Commit = { sha: string; date: string; message: string; author: string };

export default function HistoryList({ commits }: { commits: Commit[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  async function restore(sha: string) {
    if (
      !confirm(
        `Restore the entire site to commit ${sha.slice(0, 7)}? Everything after this point will be reverted. A new commit is created so nothing is lost — you can undo this too.`
      )
    )
      return;
    setBusy(sha);
    try {
      const res = await fetch("/api/admin/restore", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ targetSha: sha }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Restore failed");
      setDone(data.newSha);
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Restore failed");
    } finally {
      setBusy(null);
    }
  }

  if (commits.length === 0) {
    return <div className="card p-5 text-ink-400 text-sm">No changes yet.</div>;
  }

  return (
    <div className="space-y-3">
      {done && (
        <div className="card p-4 border-green-500/40 bg-green-500/10 text-sm text-green-200">
          Restore commit <code>{done.slice(0, 7)}</code> pushed. Site is rebuilding — live in ~60
          seconds.
        </div>
      )}
      <div className="card divide-y divide-ink-700">
        {commits.map((c) => (
          <div key={c.sha} className="flex items-start gap-3 p-4">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                {c.message.split("\n")[0]}
              </div>
              <div className="text-xs text-ink-400 mt-1">
                {c.author} · {new Date(c.date).toLocaleString()} ·{" "}
                <a
                  href={`https://github.com/wyliestevens/used-slot-shop/commit/${c.sha}`}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-brand-300 inline-flex items-center gap-0.5"
                >
                  <code>{c.sha.slice(0, 7)}</code>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <button
              onClick={() => restore(c.sha)}
              disabled={busy === c.sha}
              className="btn-ghost !px-3 !py-1.5 text-xs whitespace-nowrap"
              title="Restore the whole site to this point"
            >
              <Undo2 className="h-3.5 w-3.5" />
              {busy === c.sha ? "Restoring…" : "Restore"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
