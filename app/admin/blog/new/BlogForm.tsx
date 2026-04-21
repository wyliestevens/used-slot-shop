"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Upload } from "lucide-react";

type FormState = {
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  author: string;
  tags: string;
};

const empty: FormState = {
  title: "",
  excerpt: "",
  body: "",
  coverImage: "",
  author: "",
  tags: "",
};

function slugGuess(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(empty);
  const [localPreview, setLocalPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState<"draft" | "publish" | null>(null);
  const [err, setErr] = useState("");

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (localPreview) URL.revokeObjectURL(localPreview);
    setLocalPreview(URL.createObjectURL(file));
    setUploading(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("slug", `blog-${slugGuess(form.title || "unsorted")}`);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.json()).error || "Upload failed");
      const data = await res.json();
      update("coverImage", data.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function save(status: "draft" | "published") {
    if (!form.title || !form.coverImage || !form.author) {
      setErr("Title, cover image, and author are required");
      return;
    }
    setSaving(status === "published" ? "publish" : "draft");
    setErr("");
    try {
      const payload = {
        title: form.title,
        excerpt: form.excerpt,
        body: form.body,
        coverImage: form.coverImage,
        author: form.author,
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        status,
      };
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      router.push("/admin/blog");
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
      setSaving(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="text-sm font-semibold text-white mb-3">Cover image</div>
        <div className="flex items-center gap-4">
          <div className="relative h-32 w-52 rounded border border-ink-700 bg-ink-900 overflow-hidden flex-shrink-0">
            {localPreview || form.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={localPreview || form.coverImage}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full grid place-items-center text-xs text-ink-500">
                No cover yet
              </div>
            )}
          </div>
          <div className="flex-1">
            <label className="btn-ghost cursor-pointer">
              <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : "Upload cover"}
              <input
                type="file"
                accept="image/*"
                onChange={onFile}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <p className="text-xs text-ink-400 mt-2">JPG / PNG, under 8 MB. 1600x900 or wider works best.</p>
            {form.coverImage && (
              <p className="text-xs text-ink-400 mt-1 break-all">
                Saved: {form.coverImage.length > 80 ? form.coverImage.slice(0, 77) + "…" : form.coverImage}
              </p>
            )}
            {uploading && !form.coverImage && (
              <p className="text-xs text-brand-300 mt-1">Uploading to GitHub…</p>
            )}
          </div>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <div className="text-sm font-semibold text-white">Post details</div>

        <Field label="Title" required>
          <input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className={inp}
            placeholder="e.g. How to Pick Your First Home Slot Machine"
          />
        </Field>

        <Field label="Excerpt (short summary, 1–2 sentences)">
          <textarea
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            rows={2}
            className={inp}
            placeholder="A quick hook shown on the blog index and in search results."
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Author" required>
            <input
              value={form.author}
              onChange={(e) => update("author", e.target.value)}
              className={inp}
              placeholder="Your name"
            />
          </Field>
          <Field label="Tags (comma separated)">
            <input
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
              className={inp}
              placeholder="buying guide, maintenance"
            />
          </Field>
        </div>

        <Field label="Body (Markdown-lite — blank lines between paragraphs, ## for headings)">
          <textarea
            value={form.body}
            onChange={(e) => update("body", e.target.value)}
            rows={18}
            className={`${inp} font-mono text-sm`}
            placeholder={`## Intro\n\nStart with a hook about who this post is for.\n\n## The main point\n\nWrite in short paragraphs. Leave blank lines between them.`}
          />
        </Field>
      </div>

      {err && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {err}
        </div>
      )}

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

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-ink-200 block mb-1.5">
        {label} {required && <span className="text-brand-400">*</span>}
      </label>
      {children}
    </div>
  );
}
