"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/blog";
import { Eye, Pencil, Trash2, Upload } from "lucide-react";

export default function PostRow({ p }: { p: BlogPost }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function action(label: string, patch: Partial<BlogPost>) {
    setBusy(label);
    setErr(null);
    const res = await fetch("/api/admin/blog", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug: p.slug, patch }),
    });
    setBusy(null);
    if (res.ok) router.refresh();
    else setErr((await res.json().catch(() => ({}))).error || "Failed");
  }

  async function del() {
    if (!confirm(`Delete "${p.title}"? This is logged in git history.`)) return;
    setBusy("delete");
    setErr(null);
    const res = await fetch(`/api/admin/blog?slug=${encodeURIComponent(p.slug)}`, {
      method: "DELETE",
    });
    setBusy(null);
    if (res.ok) router.refresh();
    else setErr((await res.json().catch(() => ({}))).error || "Failed");
  }

  return (
    <div className="flex items-center gap-4 p-4">
      <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden bg-ink-900 border border-ink-700">
        {p.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.coverImage} alt={p.title} className="h-full w-full object-cover" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-white truncate">{p.title}</div>
        <div className="text-xs text-ink-400 truncate">
          {p.author} · {new Date(p.updatedAt).toLocaleDateString()} ·{" "}
          <span className={p.status === "published" ? "text-green-300" : "text-yellow-300"}>
            {p.status}
          </span>
          {p.tags.length > 0 && <> · {p.tags.join(", ")}</>}
        </div>
        {err && <div className="text-xs text-red-300 mt-1">{err}</div>}
      </div>
      <div className="flex items-center gap-2">
        {p.status === "published" && (
          <Link
            href={`/blog/${p.slug}`}
            target="_blank"
            className="btn-ghost !px-3 !py-1.5 text-xs"
            title="View live"
          >
            <Eye className="h-3.5 w-3.5" />
          </Link>
        )}
        <Link href={`/admin/blog/edit/${p.slug}`} className="btn-ghost !px-3 !py-1.5 text-xs">
          <Pencil className="h-3.5 w-3.5" />
        </Link>
        {p.status === "draft" ? (
          <button
            onClick={() => action("publish", { status: "published" })}
            disabled={!!busy}
            className="btn-primary !px-3 !py-1.5 text-xs"
          >
            <Upload className="h-3.5 w-3.5" />
            {busy === "publish" ? "Publishing…" : "Publish"}
          </button>
        ) : (
          <button
            onClick={() => action("unpublish", { status: "draft" })}
            disabled={!!busy}
            className="btn-ghost !px-3 !py-1.5 text-xs"
          >
            {busy === "unpublish" ? "…" : "Unpublish"}
          </button>
        )}
        <button
          onClick={del}
          disabled={!!busy}
          className="btn-ghost !px-3 !py-1.5 text-xs !border-red-500/40 !text-red-300 hover:!bg-red-500/10"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
