"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Upload, Trash2, RotateCcw, EyeOff, Eye } from "lucide-react";

type InitialMachine = {
  slug: string;
  name: string;
  brand: string;
  model?: string;
  type: string;
  price: number;
  image: string;
  description: string;
  cabinet?: string;
  condition?: string;
  inStock?: number;
  highlights?: string[];
  status: "draft" | "published";
};

type Props = {
  source: "custom" | "seed";
  initial: InitialMachine;
  hidden: boolean;
  hasOverride: boolean;
  seedDefaults?: { name: string; price: number; image: string; description: string };
};

export default function EditForm({ source, initial, hidden, hasOverride, seedDefaults }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(() => ({
    name: initial.name,
    brand: initial.brand,
    model: initial.model || "",
    type: initial.type,
    price: String(initial.price),
    image: initial.image,
    description: initial.description,
    cabinet: initial.cabinet || "",
    condition: initial.condition || "Professionally Refurbished",
    inStock: String(initial.inStock ?? 1),
    highlights: (initial.highlights || []).join("\n"),
    status: initial.status,
    hidden,
  }));
  const [localPreview, setLocalPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [err, setErr] = useState("");

  function up<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (localPreview) URL.revokeObjectURL(localPreview);
    setLocalPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("slug", initial.slug);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.json()).error || "Upload failed");
      const data = await res.json();
      up("image", data.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    setSaving(true);
    setErr("");
    try {
      // Only send changed fields for a seed override — keeps the override JSON minimal
      // and easy to reason about. For custom machines, send the full patch (the
      // custom file stores the full record anyway).
      let patch: any;
      if (source === "seed" && seedDefaults) {
        patch = {};
        if (form.name !== seedDefaults.name) patch.name = form.name;
        if (Number(form.price) !== seedDefaults.price) patch.price = Number(form.price);
        if (form.image !== seedDefaults.image) patch.image = form.image;
        if (form.description !== seedDefaults.description) patch.description = form.description;
        // brand/type/cabinet/condition/inStock/highlights always included if diff-checking
        // is complex — for simplicity send them; the backend merges.
        patch.brand = form.brand;
        if (form.model) patch.model = form.model;
        patch.type = form.type;
        patch.cabinet = form.cabinet || undefined;
        patch.condition = form.condition;
        patch.inStock = form.inStock ? Number(form.inStock) : 1;
        patch.highlights = form.highlights
          ? form.highlights.split("\n").map((s) => s.trim()).filter(Boolean)
          : undefined;
        patch.hidden = form.hidden;
      } else {
        patch = {
          name: form.name,
          brand: form.brand,
          model: form.model || undefined,
          type: form.type,
          price: Number(form.price),
          image: form.image,
          description: form.description,
          cabinet: form.cabinet || undefined,
          condition: form.condition,
          inStock: form.inStock ? Number(form.inStock) : 1,
          highlights: form.highlights
            ? form.highlights.split("\n").map((s) => s.trim()).filter(Boolean)
            : undefined,
          status: form.status,
        };
      }
      const res = await fetch("/api/admin/machines", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug: initial.slug, patch }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      router.push("/admin");
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
      setSaving(false);
    }
  }

  async function del() {
    const msg =
      source === "seed"
        ? `Hide "${initial.name}" from the site? The record stays in git history and can be restored later.`
        : `Delete "${initial.name}"? This is logged in git history.`;
    if (!confirm(msg)) return;
    const res = await fetch(`/api/admin/machines?slug=${encodeURIComponent(initial.slug)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setErr((await res.json().catch(() => ({}))).error || "Delete failed");
    }
  }

  async function resetToDefault() {
    if (!confirm(`Reset "${initial.name}" to its original inventory values? Your override is discarded.`)) return;
    setResetting(true);
    try {
      const res = await fetch("/api/admin/machines", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug: initial.slug, reset: true }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Reset failed");
      router.push("/admin");
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Reset failed");
      setResetting(false);
    }
  }

  return (
    <div className="space-y-6">
      {source === "seed" && (
        <div className="card p-4 border-brand-500/30 bg-brand-500/5 text-sm text-brand-100">
          <div className="font-semibold text-brand-300 mb-1">Inventory machine (seed)</div>
          <div>
            Edits here save to <code className="text-brand-300">data/machines-overrides.json</code> —
            a clean layer on top of the original scrape.{" "}
            {hasOverride ? (
              <>Override is currently active. Click <strong>Reset to default</strong> below to clear it.</>
            ) : (
              <>No override yet. Change anything and hit Save to create one.</>
            )}
          </div>
        </div>
      )}

      <div className="card p-6">
        <div className="text-sm font-semibold text-white mb-3">Photo</div>
        <div className="flex items-center gap-4">
          <div className="relative h-40 w-32 rounded border border-ink-700 bg-ink-900 overflow-hidden">
            {(localPreview || form.image) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={localPreview || form.image} alt="" className="h-full w-full object-cover" />
            )}
          </div>
          <label className="btn-ghost cursor-pointer">
            <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : "Replace photo"}
            <input type="file" accept="image/*" onChange={onFile} disabled={uploading} className="hidden" />
          </label>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <Field label="Name"><input className={inp} value={form.name} onChange={(e) => up("name", e.target.value)} /></Field>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Brand">
            <select className={inp} value={form.brand} onChange={(e) => up("brand", e.target.value)}>
              {["igt","bally","aristocrat","williams","konami","ainsworth","aruze"].map((v) => <option key={v} value={v}>{v.toUpperCase()}</option>)}
            </select>
          </Field>
          <Field label="Model #">
            <input
              className={inp}
              value={form.model}
              onChange={(e) => up("model", e.target.value)}
              placeholder="e.g. S2000, MK6"
            />
          </Field>
          <Field label="Type">
            <select className={inp} value={form.type} onChange={(e) => up("type", e.target.value)}>
              {["reel","video","video-poker","vintage"].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </Field>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Price"><input className={inp} type="number" value={form.price} onChange={(e) => up("price", e.target.value)} /></Field>
          <Field label="Cabinet"><input className={inp} value={form.cabinet} onChange={(e) => up("cabinet", e.target.value)} /></Field>
          <Field label="In stock"><input className={inp} type="number" value={form.inStock} onChange={(e) => up("inStock", e.target.value)} /></Field>
        </div>
        <Field label="Condition">
          <select className={inp} value={form.condition} onChange={(e) => up("condition", e.target.value)}>
            <option>Professionally Refurbished</option>
            <option>Collector Grade</option>
            <option>Like New</option>
          </select>
        </Field>
        <Field label="Description"><textarea className={inp} rows={5} value={form.description} onChange={(e) => up("description", e.target.value)} /></Field>
        <Field label="Highlights (one per line)"><textarea className={inp} rows={4} value={form.highlights} onChange={(e) => up("highlights", e.target.value)} /></Field>

        {source === "custom" && (
          <Field label="Status">
            <select className={inp} value={form.status} onChange={(e) => up("status", e.target.value as "draft" | "published")}>
              <option value="draft">Draft (hidden from site)</option>
              <option value="published">Published (live on site)</option>
            </select>
          </Field>
        )}

        {source === "seed" && (
          <Field label="Visibility">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => up("hidden", !form.hidden)}
                className={`btn-ghost !py-2 !px-4 text-sm ${form.hidden ? "!border-red-500/40 !text-red-300" : ""}`}
              >
                {form.hidden ? <><EyeOff className="h-4 w-4" /> Hidden from site</> : <><Eye className="h-4 w-4" /> Live on site</>}
              </button>
              <span className="text-xs text-ink-400">
                {form.hidden ? "Customers will not see this machine." : "Customers can see and buy this machine."}
              </span>
            </div>
          </Field>
        )}
      </div>

      {err && <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{err}</div>}

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {source === "seed" && hasOverride && (
            <button
              onClick={resetToDefault}
              disabled={resetting}
              className="btn-ghost !border-yellow-500/40 !text-yellow-300 hover:!bg-yellow-500/10"
            >
              <RotateCcw className="h-4 w-4" /> {resetting ? "Resetting…" : "Reset to default"}
            </button>
          )}
          <button onClick={del} className="btn-ghost !border-red-500/40 !text-red-300 hover:!bg-red-500/10">
            <Trash2 className="h-4 w-4" /> {source === "seed" ? "Hide from site" : "Delete"}
          </button>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary">
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

const inp = "w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="text-sm font-medium text-ink-200 block mb-1.5">{label}</label>{children}</div>;
}
