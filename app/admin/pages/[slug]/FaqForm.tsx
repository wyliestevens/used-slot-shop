"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import type { FaqItem } from "@/lib/faq";

export default function FaqForm({ initial }: { initial: FaqItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState<FaqItem[]>(() =>
    Array.isArray(initial) ? initial.map((i) => ({ q: i?.q ?? "", a: i?.a ?? "" })) : []
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  function update(i: number, patch: Partial<FaqItem>) {
    setItems(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  }

  function add() {
    setItems([...items, { q: "", a: "" }]);
  }

  function remove(i: number) {
    if (!confirm("Delete this FAQ?")) return;
    setItems(items.filter((_, idx) => idx !== i));
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
  }

  async function save() {
    setSaving(true);
    setErr("");
    try {
      // FAQ is a top-level JSON array — the API replaces the file wholesale
      // when it sees an array, so deletes and reorders stick.
      const res = await fetch("/api/admin/content/faq", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ patch: items }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      router.refresh();
      alert("Saved. FAQ page will update in ~60 seconds.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-white">Questions</div>
        <div className="text-xs text-ink-500">{items.length} item{items.length === 1 ? "" : "s"}</div>
      </div>

      {items.map((item, i) => (
        <div key={i} className="card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wide text-ink-500">Q {i + 1}</div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className={iconBtn}
                aria-label="Move up"
                title="Move up"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === items.length - 1}
                className={iconBtn}
                aria-label="Move down"
                title="Move down"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className={`${iconBtn} text-red-300 hover:text-red-200`}
                aria-label="Delete FAQ"
                title="Delete FAQ"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <Field label="Question">
            <input className={inp} value={item.q} onChange={(e) => update(i, { q: e.target.value })} />
          </Field>
          <Field label="Answer">
            <textarea className={inp} rows={4} value={item.a} onChange={(e) => update(i, { a: e.target.value })} />
          </Field>
        </div>
      ))}

      <button type="button" onClick={add} className="btn-ghost w-full justify-center">
        <Plus className="h-4 w-4" /> Add FAQ
      </button>

      {err && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{err}</div>
      )}

      <div className="flex justify-end sticky bottom-4 pt-2">
        <button onClick={save} disabled={saving} className="btn-primary shadow-xl">
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save & redeploy"}
        </button>
      </div>
    </div>
  );
}

const inp =
  "w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40";

const iconBtn =
  "inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-ink-700 bg-ink-900/60 text-ink-300 hover:border-brand-500 hover:text-brand-300 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-ink-700 disabled:hover:text-ink-300";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink-200 block mb-1.5">{label}</label>
      {children}
    </div>
  );
}
