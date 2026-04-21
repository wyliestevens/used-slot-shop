"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Upload } from "lucide-react";

export default function SettingsForm({ initial }: { initial: any }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [localLogo, setLocalLogo] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  function update(path: string[], value: any) {
    setForm((f: any) => {
      const next = { ...f };
      let cursor = next;
      for (let i = 0; i < path.length - 1; i++) {
        cursor[path[i]] = { ...(cursor[path[i]] || {}) };
        cursor = cursor[path[i]];
      }
      cursor[path[path.length - 1]] = value;
      return next;
    });
  }

  async function onLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (localLogo) URL.revokeObjectURL(localLogo);
    setLocalLogo(URL.createObjectURL(file));
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("slug", "site");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.json()).error || "Upload failed");
      const data = await res.json();
      update(["logoUrl"], data.url);
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
      const res = await fetch("/api/admin/content/site", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ patch: form }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      router.refresh();
      alert("Saved. Site is rebuilding — live in ~60 seconds.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="text-sm font-semibold text-white mb-3">Logo</div>
        <div className="flex items-center gap-4">
          <div className="relative h-24 w-24 rounded-xl border border-ink-700 bg-ink-900 overflow-hidden">
            {(localLogo || form.logoUrl) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={localLogo || form.logoUrl} alt="" className="h-full w-full object-cover" />
            )}
          </div>
          <label className="btn-ghost cursor-pointer">
            <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : "Upload new logo"}
            <input type="file" accept="image/*" onChange={onLogo} disabled={uploading} className="hidden" />
          </label>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <div className="text-sm font-semibold text-white">Business info</div>
        <Field label="Shop name"><input className={inp} value={form.name || ""} onChange={(e) => update(["name"], e.target.value)} /></Field>
        <Field label="Tagline"><textarea className={inp} rows={2} value={form.tagline || ""} onChange={(e) => update(["tagline"], e.target.value)} /></Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Phone"><input className={inp} value={form.phone || ""} onChange={(e) => update(["phone"], e.target.value)} /></Field>
          <Field label="General email"><input className={inp} type="email" value={form.email || ""} onChange={(e) => update(["email"], e.target.value)} /></Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Sales email"><input className={inp} type="email" value={form.salesEmail || ""} onChange={(e) => update(["salesEmail"], e.target.value)} /></Field>
          <Field label="Service email"><input className={inp} type="email" value={form.serviceEmail || ""} onChange={(e) => update(["serviceEmail"], e.target.value)} /></Field>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <div className="text-sm font-semibold text-white">Address</div>
        <Field label="Street"><input className={inp} value={form.address?.street || ""} onChange={(e) => update(["address", "street"], e.target.value)} /></Field>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="City"><input className={inp} value={form.address?.city || ""} onChange={(e) => update(["address", "city"], e.target.value)} /></Field>
          <Field label="State"><input className={inp} value={form.address?.region || ""} onChange={(e) => update(["address", "region"], e.target.value)} /></Field>
          <Field label="ZIP"><input className={inp} value={form.address?.postalCode || ""} onChange={(e) => update(["address", "postalCode"], e.target.value)} /></Field>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <div className="text-sm font-semibold text-white">Hours</div>
        <Field label="Weekdays"><input className={inp} value={form.hours?.weekdays || ""} onChange={(e) => update(["hours", "weekdays"], e.target.value)} /></Field>
        <Field label="Saturday"><input className={inp} value={form.hours?.saturday || ""} onChange={(e) => update(["hours", "saturday"], e.target.value)} /></Field>
        <Field label="Sunday"><input className={inp} value={form.hours?.sunday || ""} onChange={(e) => update(["hours", "sunday"], e.target.value)} /></Field>
      </div>

      <div className="card p-6 space-y-4">
        <div className="text-sm font-semibold text-white">Social (optional)</div>
        <Field label="Facebook URL"><input className={inp} value={form.socials?.facebook || ""} onChange={(e) => update(["socials", "facebook"], e.target.value)} /></Field>
        <Field label="Instagram URL"><input className={inp} value={form.socials?.instagram || ""} onChange={(e) => update(["socials", "instagram"], e.target.value)} /></Field>
        <Field label="YouTube URL"><input className={inp} value={form.socials?.youtube || ""} onChange={(e) => update(["socials", "youtube"], e.target.value)} /></Field>
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
