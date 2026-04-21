import Link from "next/link";
import { loadPosts } from "@/lib/blog";
import { Plus, CheckCircle2, Clock, AlertTriangle, FileText } from "lucide-react";
import PostRow from "./PostRow";

export const dynamic = "force-dynamic";

export default async function AdminBlogHome() {
  let posts: Awaited<ReturnType<typeof loadPosts>>["posts"] = [];
  let loadError: string | null = null;
  try {
    const res = await loadPosts();
    posts = res.posts;
  } catch (e) {
    loadError = e instanceof Error ? e.message : String(e);
  }
  const drafts = posts.filter((p) => p.status === "draft");
  const published = posts.filter((p) => p.status === "published");

  return (
    <div className="container-wide py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Blog</h1>
          <p className="text-ink-400 mt-1 text-sm">
            Write, edit, and publish posts. Saves commit to git; the live site rebuilds automatically.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/blog/new" className="btn-primary">
            <Plus className="h-4 w-4" /> New post
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Stat label="Drafts" value={drafts.length} icon={Clock} accent="text-yellow-300" />
        <Stat label="Published" value={published.length} icon={CheckCircle2} accent="text-green-300" />
        <Stat label="Total posts" value={posts.length} icon={FileText} accent="text-brand-300" />
      </div>

      {loadError && (
        <div className="card p-6 border border-red-500/40 bg-red-500/10 text-red-200 mb-6">
          <div className="font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> Couldn't load posts from GitHub
          </div>
          <div className="mt-2 text-sm">{loadError}</div>
          <div className="mt-2 text-sm">
            Set <code>GITHUB_TOKEN</code> in Vercel env vars and redeploy.
          </div>
        </div>
      )}

      <Section title="Drafts" empty="No drafts yet. Click “New post” to start one.">
        {drafts.map((p) => (
          <PostRow key={p.slug} p={p} />
        ))}
      </Section>

      <Section title="Published" empty="Nothing published yet.">
        {published.map((p) => (
          <PostRow key={p.slug} p={p} />
        ))}
      </Section>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div
        className={`grid h-11 w-11 place-items-center rounded-lg bg-ink-900/70 border border-ink-700 ${accent}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs text-ink-400">{label}</div>
      </div>
    </div>
  );
}

function Section({
  title,
  empty,
  children,
}: {
  title: string;
  empty: string;
  children: React.ReactNode;
}) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <div className="mb-10">
      <h2 className="font-display text-xl font-bold text-white mb-3">{title}</h2>
      {items.length === 0 ? (
        <div className="card p-6 text-ink-400 text-sm">{empty}</div>
      ) : (
        <div className="card divide-y divide-ink-700">{children}</div>
      )}
    </div>
  );
}
