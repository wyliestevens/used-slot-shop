"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Upload, Sparkles } from "lucide-react";

const brands = [
  { v: "igt", l: "IGT" },
  { v: "bally", l: "Bally" },
  { v: "aristocrat", l: "Aristocrat" },
  { v: "williams", l: "WMS (Williams)" },
  { v: "konami", l: "Konami" },
  { v: "ainsworth", l: "Ainsworth" },
  { v: "aruze", l: "Aruze" },
];

const types = [
  { v: "reel", l: "Mechanical reel" },
  { v: "video", l: "Video slot" },
  { v: "video-poker", l: "Video poker" },
  { v: "vintage", l: "Vintage / antique" },
];

type FormState = {
  name: string;
  brand: string;
  type: string;
  price: string;
  image: string;
  description: string;
  cabinet: string;
  condition: string;
  inStock: string;
  highlights: string;
};

const empty: FormState = {
  name: "",
  brand: "igt",
  type: "reel",
  price: "",
  image: "",
  description: "",
  cabinet: "",
  condition: "Professionally Refurbished",
  inStock: "1",
  highlights: "",
};

function slugGuess(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function MachineForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(empty);
  const [localPreview, setLocalPreview] = useState<string>(""); // object URL for instant feedback
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);
  const [err, setErr] = useState("");
  const [researching, setResearching] = useState(false);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Revoke previous preview so we don't leak object URLs.
    if (localPreview) URL.revokeObjectURL(localPreview);
    setLocalPreview(URL.createObjectURL(file));
    setUploading(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("slug", slugGuess(form.name || "unsorted"));
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.json()).error || "Upload failed");
      const data = await res.json();
      update("image", data.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function research() {
    if (!form.image && !form.name) {
      setErr("Add an image or a name first for AI research");
      return;
    }
    setResearching(true);
    setErr("");
    try {
      const res = await fetch("/api/admin/research", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          image: form.image,
          hint: form.name,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Research failed");
      // Fill only the blanks — don't clobber user input.
      setForm((f) => ({
        ...f,
        name: f.name || data.name || "",
        brand: data.brand || f.brand,
        type: data.type || f.type,
        price: f.price || (data.priceSuggestion ? String(data.priceSuggestion) : ""),
        description: f.description || data.description || "",
        cabinet: f.cabinet || data.cabinet || "",
        highlights: f.highlights || (data.highlights || []).join("\n"),
      }));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Research failed");
    } finally {
      setResearching(false);
    }
  }

  async function save(status: "draft" | "published") {
    if (!form.name || !form.image || !form.price) {
      setErr("Name, image, and price are required");
      return;
    }
    setSaving(status === "published" ? "publish" : "draft");
    setErr("");
    try {
      const payload = {
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
        status,
      };
      const res = await fetch("/api/admin/machines", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      router.push("/admin");
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
      setSaving(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="text-sm font-semibold text-white mb-3">Product photo</div>
        <div className="flex items-center gap-4">
          <div className="relative h-40 w-32 rounded border border-ink-700 bg-ink-900 overflow-hidden flex-shrink-0">
            {localPreview || form.image ? (
              // Plain <img> so the browser can render local object URLs and
              // freshly-committed GitHub raw URLs without the Next optimizer.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={localPreview || form.image}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full grid place-items-center text-xs text-ink-500">No photo yet</div>
            )}
          </div>
          <div className="flex-1">
            <label className="btn-ghost cursor-pointer">
              <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : "Upload photo"}
              <input type="file" accept="image/*" onChange={onFile} disabled={uploading} className="hidden" />
            </label>
            <p className="text-xs text-ink-400 mt-2">JPG / PNG, under 8 MB. Mobile camera roll works too.</p>
            {form.image && (
              <p className="text-xs text-ink-400 mt-1 break-all">
                Saved: {form.image.length > 80 ? form.image.slice(0, 77) + "…" : form.image}
              </p>
            )}
            {uploading && !form.image && (
              <p className="text-xs text-brand-300 mt-1">Uploading to GitHub…</p>
            )}
          </div>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-white">Product details</div>
          <button
            type="button"
            onClick={research}
            disabled={researching}
            className="btn-outline !py-2 !px-4 text-xs"
          >
            <Sparkles className="h-3.5 w-3.5" /> {researching ? "Researching…" : "AI research + fill"}
          </button>
        </div>

        <Field label="Name" required>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} className={inp} placeholder="e.g. IGT Buffalo Gold MK6" />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Brand">
            <select value={form.brand} onChange={(e) => update("brand", e.target.value)} className={inp}>
              {brands.map((b) => <option key={b.v} value={b.v}>{b.l}</option>)}
            </select>
          </Field>
          <Field label="Type">
            <select value={form.type} onChange={(e) => update("type", e.target.value)} className={inp}>
              {types.map((b) => <option key={b.v} value={b.v}>{b.l}</option>)}
            </select>
          </Field>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Price (USD)" required>
            <input type="number" value={form.price} onChange={(e) => update("price", e.target.value)} className={inp} placeholder="1200" />
          </Field>
          <Field label="Cabinet">
            <input value={form.cabinet} onChange={(e) => update("cabinet", e.target.value)} className={inp} placeholder="MK6" />
          </Field>
          <Field label="In Stock">
            <input type="number" value={form.inStock} onChange={(e) => update("inStock", e.target.value)} className={inp} placeholder="1" />
          </Field>
        </div>
        <Field label="Condition">
          <select value={form.condition} onChange={(e) => update("condition", e.target.value)} className={inp}>
            <option>Professionally Refurbished</option>
            <option>Collector Grade</option>
            <option>Like New</option>
          </select>
        </Field>
        <Field label="Description">
          <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={5} className={inp} placeholder="What makes this machine special..." />
        </Field>
        <Field label="Highlights (one per line)">
          <textarea value={form.highlights} onChange={(e) => update("highlights", e.target.value)} rows={4} className={inp} placeholder="Free spins bonus&#10;Stacked wilds&#10;Bill validator $1-$100" />
        </Field>
      </div>

      {err && <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{err}</div>}

      <div className="flex items-center justify-between gap-3">
        <button onClick={() => save("draft")} disabled={!!saving} className="btn-ghost">
          <Save className="h-4 w-4" /> {saving === "draft" ? "Saving…" : "Save draft"}
        </button>
        <button onClick={() => save("published")} disabled={!!saving} className="btn-primary">
          <Upload className="h-4 w-4" /> {saving === "publish" ? "Publishing…" : "Publish live"}
        </button>
      </div>
    </div>
  );
}

const inp =
  "w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink-200 block mb-1.5">
        {label} {required && <span className="text-brand-400">*</span>}
      </label>
      {children}
    </div>
  );
}
