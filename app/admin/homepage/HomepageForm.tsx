"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Upload } from "lucide-react";

export default function HomepageForm({ initial }: { initial: any }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [localHero, setLocalHero] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  function setHero<K extends string>(k: K, v: any) {
    setForm((f: any) => ({ ...f, hero: { ...f.hero, [k]: v } }));
  }

  async function onHero(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (localHero) URL.revokeObjectURL(localHero);
    setLocalHero(URL.createObjectURL(file));
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("slug", "homepage-hero");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.json()).error || "Upload failed");
      const data = await res.json();
      setHero("image", data.url);
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
      const res = await fetch("/api/admin/content/homepage", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ patch: form }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      router.refresh();
      alert("Saved. Homepage will update in ~60 seconds.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="text-sm font-semibold text-white mb-3">Hero photo</div>
        <div className="flex items-center gap-4">
          <div className="relative h-40 w-32 rounded border border-ink-700 bg-ink-900 overflow-hidden">
            {(localHero || form.hero?.image) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={localHero || form.hero.image} alt="" className="h-full w-full object-cover" />
            )}
          </div>
          <label className="btn-ghost cursor-pointer">
            <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : "Replace photo"}
            <input type="file" accept="image/*" onChange={onHero} disabled={uploading} className="hidden" />
          </label>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <div className="text-sm font-semibold text-white">Hero copy</div>
        <Field label="Eyebrow text (small caps above headline)"><input className={inp} value={form.hero?.eyebrow || ""} onChange={(e) => setHero("eyebrow", e.target.value)} /></Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Headline line 1"><input className={inp} value={form.hero?.titleTop || ""} onChange={(e) => setHero("titleTop", e.target.value)} /></Field>
          <Field label="Headline line 2 (gold)"><input className={inp} value={form.hero?.titleBottom || ""} onChange={(e) => setHero("titleBottom", e.target.value)} /></Field>
        </div>
        <Field label="Subtitle"><textarea className={inp} rows={3} value={form.hero?.subtitle || ""} onChange={(e) => setHero("subtitle", e.target.value)} /></Field>
      </div>

      <div className="card p-6 space-y-4">
        <div className="text-sm font-semibold text-white">Call-to-action buttons</div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Primary button text"><input className={inp} value={form.hero?.primaryCtaText || ""} onChange={(e) => setHero("primaryCtaText", e.target.value)} /></Field>
          <Field label="Primary button link"><input className={inp} value={form.hero?.primaryCtaHref || ""} onChange={(e) => setHero("primaryCtaHref", e.target.value)} /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Secondary button text"><input className={inp} value={form.hero?.secondaryCtaText || ""} onChange={(e) => setHero("secondaryCtaText", e.target.value)} /></Field>
          <Field label="Secondary button link"><input className={inp} value={form.hero?.secondaryCtaHref || ""} onChange={(e) => setHero("secondaryCtaHref", e.target.value)} /></Field>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <div className="text-sm font-semibold text-white">Featured product tag (the floating card next to the hero photo)</div>
        <Field label="Small label"><input className={inp} value={form.hero?.sidebarProductLabel || ""} onChange={(e) => setHero("sidebarProductLabel", e.target.value)} /></Field>
        <Field label="Product title"><input className={inp} value={form.hero?.sidebarProductTitle || ""} onChange={(e) => setHero("sidebarProductTitle", e.target.value)} /></Field>
        <Field label="Price"><input className={inp} value={form.hero?.sidebarProductPrice || ""} onChange={(e) => setHero("sidebarProductPrice", e.target.value)} /></Field>
      </div>

      {err && <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{err}</div>}

      <div className="flex justify-end">
        <button onClick={save} disabled={saving} className="btn-primary">
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save & redeploy"}
        </button>
      </div>
    </div>
  );
}

const inp = "w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="text-sm font-medium text-ink-200 block mb-1.5">{label}</label>{children}</div>;
}
