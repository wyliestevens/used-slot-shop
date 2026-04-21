"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2, ArrowUp, ArrowDown, X } from "lucide-react";
import type { PageContent, PageSection } from "@/lib/pages";

export default function PageForm({ slug, initial }: { slug: string; initial: PageContent }) {
  const router = useRouter();
  const [form, setForm] = useState<PageContent>(() => normalize(initial));
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  function setTop<K extends keyof PageContent>(key: K, value: PageContent[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function mutateSections(fn: (sections: PageSection[]) => PageSection[]) {
    setForm((f) => ({ ...f, sections: fn(f.sections) }));
  }

  function updateSection(i: number, patch: Partial<PageSection>) {
    mutateSections((ss) => ss.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  function addSection() {
    mutateSections((ss) => [...ss, { heading: "", paragraphs: [""], bullets: [] }]);
  }

  function removeSection(i: number) {
    if (!confirm("Delete this section?")) return;
    mutateSections((ss) => ss.filter((_, idx) => idx !== i));
  }

  function moveSection(i: number, dir: -1 | 1) {
    mutateSections((ss) => {
      const j = i + dir;
      if (j < 0 || j >= ss.length) return ss;
      const next = [...ss];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function setParagraph(sectionIdx: number, pIdx: number, value: string) {
    mutateSections((ss) =>
      ss.map((s, idx) => {
        if (idx !== sectionIdx) return s;
        const paragraphs = [...(s.paragraphs ?? [])];
        paragraphs[pIdx] = value;
        return { ...s, paragraphs };
      })
    );
  }

  function addParagraph(sectionIdx: number) {
    mutateSections((ss) =>
      ss.map((s, idx) => (idx === sectionIdx ? { ...s, paragraphs: [...(s.paragraphs ?? []), ""] } : s))
    );
  }

  function removeParagraph(sectionIdx: number, pIdx: number) {
    mutateSections((ss) =>
      ss.map((s, idx) => {
        if (idx !== sectionIdx) return s;
        return { ...s, paragraphs: (s.paragraphs ?? []).filter((_, i) => i !== pIdx) };
      })
    );
  }

  function setBullet(sectionIdx: number, bIdx: number, value: string) {
    mutateSections((ss) =>
      ss.map((s, idx) => {
        if (idx !== sectionIdx) return s;
        const bullets = [...(s.bullets ?? [])];
        bullets[bIdx] = value;
        return { ...s, bullets };
      })
    );
  }

  function addBullet(sectionIdx: number) {
    mutateSections((ss) =>
      ss.map((s, idx) => (idx === sectionIdx ? { ...s, bullets: [...(s.bullets ?? []), ""] } : s))
    );
  }

  function removeBullet(sectionIdx: number, bIdx: number) {
    mutateSections((ss) =>
      ss.map((s, idx) => {
        if (idx !== sectionIdx) return s;
        return { ...s, bullets: (s.bullets ?? []).filter((_, i) => i !== bIdx) };
      })
    );
  }

  async function save() {
    setSaving(true);
    setErr("");
    try {
      // Straight PATCH — server replaces the arrays wholesale, so deletes stick.
      const res = await fetch(`/api/admin/content/${slug}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ patch: form }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      router.refresh();
      alert("Saved. Page will update in ~60 seconds.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="card p-6 space-y-4">
        <div className="text-sm font-semibold text-white">SEO metadata</div>
        <Field label="Meta title (browser tab + search results)">
          <input className={inp} value={form.metaTitle || ""} onChange={(e) => setTop("metaTitle", e.target.value)} />
        </Field>
        <Field label="Meta description (1-2 sentences, shown in search results)">
          <textarea className={inp} rows={3} value={form.metaDescription || ""} onChange={(e) => setTop("metaDescription", e.target.value)} />
        </Field>
      </div>

      <div className="card p-6 space-y-4">
        <div className="text-sm font-semibold text-white">Page header</div>
        <Field label="Eyebrow (small caps above title)">
          <input className={inp} value={form.eyebrow || ""} onChange={(e) => setTop("eyebrow", e.target.value)} />
        </Field>
        <Field label="Title (main headline)">
          <input className={inp} value={form.title || ""} onChange={(e) => setTop("title", e.target.value)} />
        </Field>
        <Field label="Subtitle (optional sentence under the title)">
          <textarea className={inp} rows={2} value={form.subtitle || ""} onChange={(e) => setTop("subtitle", e.target.value)} />
        </Field>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-white">Content sections</div>
          <div className="text-xs text-ink-500">{form.sections.length} section{form.sections.length === 1 ? "" : "s"}</div>
        </div>

        {form.sections.map((section, i) => (
          <div key={i} className="card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wide text-ink-500">Section {i + 1}</div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveSection(i, -1)}
                  disabled={i === 0}
                  className={iconBtn}
                  aria-label="Move up"
                  title="Move up"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(i, 1)}
                  disabled={i === form.sections.length - 1}
                  className={iconBtn}
                  aria-label="Move down"
                  title="Move down"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeSection(i)}
                  className={`${iconBtn} text-red-300 hover:text-red-200`}
                  aria-label="Delete section"
                  title="Delete section"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Field label="Heading (leave blank for intro section with no heading)">
              <input className={inp} value={section.heading || ""} onChange={(e) => updateSection(i, { heading: e.target.value })} />
            </Field>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-ink-200">Paragraphs</label>
                <button type="button" onClick={() => addParagraph(i)} className="text-xs text-brand-300 hover:text-brand-200 inline-flex items-center gap-1">
                  <Plus className="h-3 w-3" /> Add paragraph
                </button>
              </div>
              <div className="space-y-2">
                {(section.paragraphs ?? []).map((p, pi) => (
                  <div key={pi} className="flex items-start gap-2">
                    <textarea
                      className={inp}
                      rows={3}
                      value={p}
                      onChange={(e) => setParagraph(i, pi, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeParagraph(i, pi)}
                      className={`${iconBtn} text-ink-400 hover:text-red-300`}
                      aria-label="Remove paragraph"
                      title="Remove paragraph"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {(!section.paragraphs || section.paragraphs.length === 0) && (
                  <div className="text-xs text-ink-500 italic">No paragraphs.</div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-ink-200">Bullets</label>
                <button type="button" onClick={() => addBullet(i)} className="text-xs text-brand-300 hover:text-brand-200 inline-flex items-center gap-1">
                  <Plus className="h-3 w-3" /> Add bullet
                </button>
              </div>
              <div className="space-y-2">
                {(section.bullets ?? []).map((b, bi) => (
                  <div key={bi} className="flex items-start gap-2">
                    <input
                      className={inp}
                      value={b}
                      onChange={(e) => setBullet(i, bi, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeBullet(i, bi)}
                      className={`${iconBtn} text-ink-400 hover:text-red-300`}
                      aria-label="Remove bullet"
                      title="Remove bullet"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {(!section.bullets || section.bullets.length === 0) && (
                  <div className="text-xs text-ink-500 italic">No bullets.</div>
                )}
              </div>
            </div>
          </div>
        ))}

        <button type="button" onClick={addSection} className="btn-ghost w-full justify-center">
          <Plus className="h-4 w-4" /> Add section
        </button>
      </div>

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

function normalize(raw: any): PageContent {
  const base: PageContent = {
    metaTitle: raw?.metaTitle ?? "",
    metaDescription: raw?.metaDescription ?? "",
    eyebrow: raw?.eyebrow ?? "",
    title: raw?.title ?? "",
    subtitle: raw?.subtitle ?? "",
    sections: Array.isArray(raw?.sections)
      ? raw.sections.map((s: any) => ({
          heading: s?.heading ?? "",
          paragraphs: Array.isArray(s?.paragraphs) ? s.paragraphs : [],
          bullets: Array.isArray(s?.bullets) ? s.bullets : [],
        }))
      : [{ heading: "", paragraphs: [], bullets: [] }],
  };
  return base;
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
