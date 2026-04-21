"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/blog";
import { Save, Upload, Trash2 } from "lucide-react";

export default function EditForm({ initial }: { initial: BlogPost }) {
  const router = useRouter();
  const [form, setForm] = useState(() => ({
    title: initial.title,
    excerpt: initial.excerpt,
    body: initial.body,
    coverImage: initial.coverImage,
    author: initial.author,
    tags: (initial.tags || []).join(", "),
    status: initial.status,
  }));
  const [localPreview, setLocalPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [err, setErr] = useState("");

  function up<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
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
      fd.append("slug", `blog-${initial.slug}`);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.json()).error || "Upload failed");
      const data = await res.json();
      up("coverImage", data.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    if (!form.title || !form.coverImage || !form.author) {
      setErr("Title, cover image, and author are required");
      return;
    }
    setSaving(true);
    setErr("");
    try {
      const payload = {
        slug: initial.slug,
        patch: {
          title: form.title,
          excerpt: form.excerpt,
          body: form.body,
          coverImage: form.coverImage,
          author: form.author,
          tags: form.tags
            ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
            : [],
          status: form.status,
        },
      };
      const res = await fetch("/api/admin/blog", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      router.push("/admin/blog");
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
      setSaving(false);
    }
  }

  async function del() {
    if (!confirm(`Delete "${initial.title}"?`)) return;
    setDeleting(true);
    setErr("");
    const res = await fetch(`/api/admin/blog?slug=${encodeURIComponent(initial.slug)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/admin/blog");
      router.refresh();
    } else {
      setErr((await res.json().catch(() => ({}))).error || "Delete failed");
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="text-sm font-semibold text-white mb-3">Cover image</div>
        <div className="flex items-center gap-4">
          <div className="relative h-32 w-52 rounded border border-ink-700 bg-ink-900 overflow-hidden">
            {(localPreview || form.coverImage) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={localPreview || form.coverImage}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <label className="btn-ghost cursor-pointer">
            <Upload className="h-4 w-4" /> {uploading ? "Uploading…" : "Replace cover"}
            <input
              type="file"
              accept="image/*"
              onChange={onFile}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <Field label="Title">
          <input
            className={inp}
            value={form.title}
            onChange={(e) => up("title", e.target.value)}
          />
        </Field>
        <Field label="Excerpt">
          <textarea
            className={inp}
            rows={2}
            value={form.excerpt}
            onChange={(e) => up("excerpt", e.target.value)}
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Author">
            <input
              className={inp}
              value={form.author}
              onChange={(e) => up("author", e.target.value)}
            />
          </Field>
          <Field label="Tags (comma separated)">
            <input
              className={inp}
              value={form.tags}
              onChange={(e) => up("tags", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Body (Markdown-lite — blank lines between paragraphs, ## for headings)">
          <textarea
            className={`${inp} font-mono text-sm`}
            rows={18}
            value={form.body}
            onChange={(e) => up("body", e.target.value)}
          />
        </Field>
        <Field label="Status">
          <select
            className={inp}
            value={form.status}
            onChange={(e) => up("status", e.target.value as typeof form.status)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published (live)</option>
          </select>
        </Field>
      </div>

      {err && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {err}
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={del}
          disabled={deleting || saving}
          className="btn-ghost !border-red-500/40 !text-red-300 hover:!bg-red-500/10"
        >
          <Trash2 className="h-4 w-4" /> {deleting ? "Deleting…" : "Delete"}
        </button>
        <button onClick={save} disabled={saving || deleting} className="btn-primary">
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

const inp =
  "w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink-200 block mb-1.5">{label}</label>
      {children}
    </div>
  );
}
