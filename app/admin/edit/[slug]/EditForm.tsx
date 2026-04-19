"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CustomMachine } from "@/lib/github";
import { Save, Upload, Trash2 } from "lucide-react";

export default function EditForm({ initial }: { initial: CustomMachine }) {
  const router = useRouter();
  const [form, setForm] = useState(() => ({
    name: initial.name,
    brand: initial.brand,
    type: initial.type,
    price: String(initial.price),
    image: initial.image,
    description: initial.description,
    cabinet: initial.cabinet || "",
    condition: initial.condition || "Professionally Refurbished",
    inStock: String(initial.inStock ?? 1),
    highlights: (initial.highlights || []).join("\n"),
    status: initial.status,
  }));
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  function up<K extends keyof typeof form>(k: K, v: typeof form[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
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
      const payload = {
        slug: initial.slug,
        patch: {
          name: form.name,
          brand: form.brand,
          type: form.type,
          price: Number(form.price),
          image: form.image,
          description: form.description,
          cabinet: form.cabinet || undefined,
          condition: form.condition as any,
          inStock: form.inStock ? Number(form.inStock) : 1,
          highlights: form.highlights ? form.highlights.split("\n").map((s) => s.trim()).filter(Boolean) : undefined,
          status: form.status,
        },
      };
      const res = await fetch("/api/admin/machines", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
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
    if (!confirm(`Delete "${initial.name}"?`)) return;
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

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="text-sm font-semibold text-white mb-3">Photo</div>
        <div className="flex items-center gap-4">
          <div className="relative h-40 w-32 rounded border border-ink-700 bg-ink-900 overflow-hidden">
            {form.image && <Image src={form.image} alt="" fill sizes="128px" className="object-cover" />}
          </div>
          <label className="btn-ghost cursor-pointer">
            <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : "Replace photo"}
            <input type="file" accept="image/*" onChange={onFile} disabled={uploading} className="hidden" />
          </label>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <Field label="Name"><input className={inp} value={form.name} onChange={(e) => up("name", e.target.value)} /></Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Brand">
            <select className={inp} value={form.brand} onChange={(e) => up("brand", e.target.value as typeof form.brand)}>
              {["igt","bally","aristocrat","williams","konami","ainsworth","aruze"].map((v) => <option key={v} value={v}>{v.toUpperCase()}</option>)}
            </select>
          </Field>
          <Field label="Type">
            <select className={inp} value={form.type} onChange={(e) => up("type", e.target.value as typeof form.type)}>
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
          <select className={inp} value={form.condition} onChange={(e) => up("condition", e.target.value as typeof form.condition)}>
            <option>Professionally Refurbished</option>
            <option>Collector Grade</option>
            <option>Like New</option>
          </select>
        </Field>
        <Field label="Description"><textarea className={inp} rows={5} value={form.description} onChange={(e) => up("description", e.target.value)} /></Field>
        <Field label="Highlights (one per line)"><textarea className={inp} rows={4} value={form.highlights} onChange={(e) => up("highlights", e.target.value)} /></Field>
        <Field label="Status">
          <select className={inp} value={form.status} onChange={(e) => up("status", e.target.value as typeof form.status)}>
            <option value="draft">Draft</option>
            <option value="published">Published (live)</option>
          </select>
        </Field>
      </div>

      {err && <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{err}</div>}

      <div className="flex items-center justify-between gap-3">
        <button onClick={del} className="btn-ghost !border-red-500/40 !text-red-300 hover:!bg-red-500/10">
          <Trash2 className="h-4 w-4" /> Delete
        </button>
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
