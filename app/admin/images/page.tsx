import { listUploads, type UploadedImage } from "@/lib/github";
import { AlertTriangle } from "lucide-react";
import ImageLibrary from "./ImageLibrary";

export const dynamic = "force-dynamic";

export default async function AdminImagesPage() {
  let initial: UploadedImage[] = [];
  let loadError: string | null = null;
  try {
    initial = await listUploads();
    initial.sort((a, b) => b.path.localeCompare(a.path));
  } catch (e) {
    loadError = e instanceof Error ? e.message : String(e);
  }

  return (
    <div className="container-wide py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-white">Image library</h1>
        <p className="text-ink-400 mt-1 text-sm">
          Every file under <code className="text-brand-300">public/uploads/</code>. Click any image for the full URL + delete.
        </p>
      </div>

      {loadError && (
        <div className="card p-6 border border-red-500/40 bg-red-500/10 text-red-200 mb-6">
          <div className="font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> Couldn't load images from GitHub
          </div>
          <div className="mt-2 text-sm">{loadError}</div>
        </div>
      )}

      <ImageLibrary initial={initial} />
    </div>
  );
}
