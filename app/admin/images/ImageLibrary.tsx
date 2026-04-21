"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Upload,
  Search,
  X,
  Copy,
  Check,
  Trash2,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import type { UploadedImage } from "@/lib/github";

// Matches the server-side cap in /api/admin/upload.
const MAX_BYTES = 8 * 1024 * 1024;

type PendingUpload = {
  id: string; // stable key for the grid while in-flight
  file: File;
  previewUrl: string; // object URL
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
  uploadedUrl?: string;
};

// Dates in `public/uploads/{slug}/{filename}` aren't structured, but the
// /api/admin/upload route often slugs things by name and we sometimes embed a
// Date.now() fallback. Extract the timestamp if present — otherwise show the
// containing folder name as a weak "when" hint.
function inferDate(path: string): string {
  const m = path.match(/(\d{13})/);
  if (m) {
    const d = new Date(Number(m[1]));
    if (!Number.isNaN(d.getTime())) return d.toLocaleString();
  }
  const parts = path.split("/");
  // public / uploads / {slug} / {file}
  if (parts.length >= 4) return parts[2];
  return "—";
}

function bytesToKB(n: number) {
  return `${(n / 1024).toFixed(1)} KB`;
}

export default function ImageLibrary({ initial }: { initial: UploadedImage[] }) {
  const [images, setImages] = useState<UploadedImage[]>(initial);
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [pageError, setPageError] = useState<string>("");
  const [pending, setPending] = useState<PendingUpload[]>([]);
  const [selected, setSelected] = useState<UploadedImage | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Revoke any stray object URLs when unmounting so the browser can free them.
  useEffect(() => {
    return () => {
      pending.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    };
    // We intentionally only run on unmount — per-upload cleanup happens in the
    // upload flow itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return images;
    return images.filter(
      (i) => i.name.toLowerCase().includes(q) || i.path.toLowerCase().includes(q)
    );
  }, [images, query]);

  async function refresh() {
    setRefreshing(true);
    setPageError("");
    try {
      const res = await fetch("/api/admin/images", { cache: "no-store" });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Refresh failed");
      const data = (await res.json()) as { images: UploadedImage[] };
      setImages(data.images || []);
    } catch (e) {
      setPageError(e instanceof Error ? e.message : "Refresh failed");
    } finally {
      setRefreshing(false);
    }
  }

  async function uploadOne(p: PendingUpload): Promise<void> {
    setPending((list) =>
      list.map((x) => (x.id === p.id ? { ...x, status: "uploading" } : x))
    );
    try {
      if (p.file.size > MAX_BYTES) {
        throw new Error("File exceeds 8 MB limit");
      }
      const fd = new FormData();
      fd.append("file", p.file);
      fd.append("slug", "library");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Upload failed (${res.status})`);
      }
      const data = (await res.json()) as { url: string };
      setPending((list) =>
        list.map((x) =>
          x.id === p.id ? { ...x, status: "done", uploadedUrl: data.url } : x
        )
      );
    } catch (e) {
      setPending((list) =>
        list.map((x) =>
          x.id === p.id
            ? { ...x, status: "error", error: e instanceof Error ? e.message : "Upload failed" }
            : x
        )
      );
    }
  }

  async function handleFiles(files: FileList | File[]) {
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (arr.length === 0) return;
    const newPending: PendingUpload[] = arr.map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      previewUrl: URL.createObjectURL(file),
      status: "pending",
    }));
    setPending((list) => [...newPending, ...list]);
    // Run in parallel; Promise.all resolves when all settle (uploadOne never throws).
    await Promise.all(newPending.map(uploadOne));
    // Refresh the main grid so freshly-committed files show up with real shas.
    await refresh();
    // Revoke previews for any that finished OK — keep errored ones visible.
    setPending((list) => {
      const stillPending = list.filter((p) => {
        const match = newPending.find((n) => n.id === p.id);
        if (!match) return true; // not one we just processed
        if (p.status === "done") {
          URL.revokeObjectURL(p.previewUrl);
          return false;
        }
        return true;
      });
      return stillPending;
    });
  }

  function onPickFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const fl = e.target.files;
    if (!fl || fl.length === 0) return;
    void handleFiles(fl);
    // Reset so picking the same file again re-triggers onChange.
    e.target.value = "";
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer?.files?.length) {
      void handleFiles(e.dataTransfer.files);
    }
  }

  async function doDelete(img: UploadedImage) {
    if (!confirm(`Delete ${img.name}? This commits to GitHub and cannot be undone via this UI.`)) return;
    try {
      const res = await fetch("/api/admin/images", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ path: img.path, sha: img.sha }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Delete failed");
      }
      setImages((list) => list.filter((x) => x.path !== img.path));
      if (selected?.path === img.path) setSelected(null);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  }

  return (
    <div className="space-y-6">
      {/* Drop zone + picker */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`card p-6 border-2 border-dashed transition ${
          dragOver ? "border-brand-400 bg-brand-500/5" : "border-ink-600"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <div className="text-sm font-semibold text-white mb-1">Upload new images</div>
            <p className="text-xs text-ink-400">
              Drag + drop here, or use the button. JPG / PNG, 8 MB max per file. Saved to{" "}
              <code className="text-brand-300">public/uploads/library/</code>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary !py-2 !px-4 text-xs"
            >
              <Upload className="h-4 w-4" /> Choose images
            </button>
            <button
              type="button"
              onClick={refresh}
              disabled={refreshing}
              className="btn-ghost !py-2 !px-4 text-xs"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? "Refreshing" : "Refresh"}
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={onPickFiles}
            className="hidden"
          />
        </div>

        {pending.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {pending.map((p) => (
              <PendingTile
                key={p.id}
                p={p}
                onRetry={() => uploadOne(p)}
                onDismiss={() => {
                  URL.revokeObjectURL(p.previewUrl);
                  setPending((list) => list.filter((x) => x.id !== p.id));
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Search + counts */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by filename or folder…"
            className="w-full rounded-lg border border-ink-600 bg-ink-900 pl-9 pr-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
          />
        </div>
        <div className="text-xs text-ink-400">
          {filtered.length} of {images.length} image{images.length === 1 ? "" : "s"}
        </div>
      </div>

      {pageError && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" /> {pageError}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="card p-10 text-center text-ink-400 text-sm">
          {images.length === 0
            ? "No images yet. Upload something above to get started."
            : "No images match that filter."}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((img) => (
            <button
              key={img.path}
              type="button"
              onClick={() => setSelected(img)}
              className="card p-0 overflow-hidden aspect-square group relative text-left"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.name}
                loading="lazy"
                className="h-full w-full object-cover transition group-hover:scale-[1.02]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5">
                <div className="text-[11px] text-white truncate">{img.name}</div>
                <div className="text-[10px] text-ink-300">{bytesToKB(img.size)}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <DetailModal
          img={selected}
          onClose={() => setSelected(null)}
          onDelete={() => doDelete(selected)}
        />
      )}
    </div>
  );
}

function PendingTile({
  p,
  onRetry,
  onDismiss,
}: {
  p: PendingUpload;
  onRetry: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="card p-0 overflow-hidden aspect-square relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.previewUrl} alt={p.file.name} className="h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50">
        {p.status === "uploading" || p.status === "pending" ? (
          <>
            <Loader2 className="h-5 w-5 text-brand-300 animate-spin" />
            <div className="text-[11px] text-white">Uploading…</div>
          </>
        ) : p.status === "done" ? (
          <>
            <Check className="h-5 w-5 text-accent-300" />
            <div className="text-[11px] text-white">Done</div>
          </>
        ) : (
          <>
            <AlertCircle className="h-5 w-5 text-red-300" />
            <div className="text-[10px] text-red-200 text-center px-2 line-clamp-2">
              {p.error || "Upload failed"}
            </div>
            <div className="flex gap-1">
              <button
                onClick={onRetry}
                className="text-[10px] px-2 py-0.5 rounded bg-brand-500 text-ink-950 font-semibold"
              >
                Retry
              </button>
              <button
                onClick={onDismiss}
                className="text-[10px] px-2 py-0.5 rounded bg-ink-700 text-ink-100"
              >
                Dismiss
              </button>
            </div>
          </>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1 pointer-events-none">
        <div className="text-[10px] text-white truncate">{p.file.name}</div>
      </div>
    </div>
  );
}

function DetailModal({
  img,
  onClose,
  onDelete,
}: {
  img: UploadedImage;
  onClose: () => void;
  onDelete: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(img.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
      // If clipboard is unavailable (older browsers, insecure contexts), fail
      // silently per spec — the URL is still visible + selectable in the input.
    } catch {
      // Same — no-op, user can still manually copy from the field.
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-ink-900 border border-ink-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-ink-700 sticky top-0 bg-ink-900">
          <div className="font-semibold text-white truncate pr-4">{img.name}</div>
          <button onClick={onClose} className="text-ink-400 hover:text-white p-1">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div className="rounded-lg overflow-hidden bg-ink-950 border border-ink-700 grid place-items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.name} className="max-h-[60vh] w-auto object-contain" />
          </div>

          <div className="grid sm:grid-cols-3 gap-3 text-xs">
            <Meta label="Size" value={bytesToKB(img.size)} />
            <Meta label="Folder / date" value={inferDate(img.path)} />
            <Meta label="Path" value={img.path} mono />
          </div>

          <div>
            <div className="text-xs font-medium text-ink-300 mb-1.5">Public URL</div>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={img.url}
                onFocus={(e) => e.currentTarget.select()}
                className="flex-1 rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-xs text-ink-100 font-mono focus:border-brand-500 focus:outline-none"
              />
              <button onClick={copy} className="btn-ghost !py-2 !px-3 text-xs flex-shrink-0">
                {copied ? <Check className="h-4 w-4 text-accent-300" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-ink-700">
            <a
              href={img.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-brand-300 hover:text-brand-200 underline"
            >
              Open raw
            </a>
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-2 rounded-full border border-red-500/60 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-200 hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4" /> Delete file
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-ink-400 uppercase tracking-wide text-[10px] mb-1">{label}</div>
      <div
        className={`text-ink-100 break-all ${mono ? "font-mono text-[11px]" : ""}`}
        title={value}
      >
        {value}
      </div>
    </div>
  );
}
