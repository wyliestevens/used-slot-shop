"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CustomMachine } from "@/lib/github";
import { Eye, Pencil, Trash2, Upload } from "lucide-react";

export default function MachineRow({ m }: { m: CustomMachine }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function action(label: string, patch: Partial<CustomMachine>) {
    setBusy(label);
    const res = await fetch("/api/admin/machines", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug: m.slug, patch }),
    });
    setBusy(null);
    if (res.ok) router.refresh();
    else alert((await res.json().catch(() => ({}))).error || "Failed");
  }

  async function del() {
    if (!confirm(`Delete "${m.name}"? This is logged in git history.`)) return;
    setBusy("delete");
    const res = await fetch(`/api/admin/machines?slug=${encodeURIComponent(m.slug)}`, {
      method: "DELETE",
    });
    setBusy(null);
    if (res.ok) router.refresh();
    else alert((await res.json().catch(() => ({}))).error || "Failed");
  }

  return (
    <div className="flex items-center gap-4 p-4">
      <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden bg-ink-900 border border-ink-700">
        {m.image && (
          <Image src={m.image} alt={m.name} fill sizes="64px" className="object-cover" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-white truncate">{m.name}</div>
        <div className="text-xs text-ink-400 truncate">
          {m.brand.toUpperCase()} · {m.type} · ${m.price.toLocaleString()} · <span className={m.status === "published" ? "text-green-300" : "text-yellow-300"}>{m.status}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {m.status === "published" && (
          <Link href={`/machines/${m.slug}`} target="_blank" className="btn-ghost !px-3 !py-1.5 text-xs" title="View live">
            <Eye className="h-3.5 w-3.5" />
          </Link>
        )}
        <Link href={`/admin/edit/${m.slug}`} className="btn-ghost !px-3 !py-1.5 text-xs">
          <Pencil className="h-3.5 w-3.5" />
        </Link>
        {m.status === "draft" ? (
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
            Unpublish
          </button>
        )}
        <button onClick={del} disabled={!!busy} className="btn-ghost !px-3 !py-1.5 text-xs !border-red-500/40 !text-red-300 hover:!bg-red-500/10">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
