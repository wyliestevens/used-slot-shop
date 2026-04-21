import Link from "next/link";
import { loadCustomMachines, loadMachineOverrides } from "@/lib/github";
import { seedMachines } from "@/data/machines";
import { Plus, MessageSquare, CheckCircle2, Clock, AlertTriangle, Package } from "lucide-react";
import MachineRow from "./MachineRow";
import SeedSearch from "./SeedSearch";

export const dynamic = "force-dynamic";

function envStatus() {
  return {
    ADMIN_PASSWORD: Boolean(process.env.ADMIN_PASSWORD),
    ADMIN_SESSION_SECRET: Boolean(process.env.ADMIN_SESSION_SECRET),
    GITHUB_TOKEN: Boolean(process.env.GITHUB_TOKEN),
    ANTHROPIC_API_KEY: Boolean(process.env.ANTHROPIC_API_KEY),
  };
}

export default async function AdminHome() {
  const env = envStatus();
  let customMachines: Awaited<ReturnType<typeof loadCustomMachines>>["machines"] = [];
  let overrides: Awaited<ReturnType<typeof loadMachineOverrides>>["overrides"] = [];
  let loadError: string | null = null;
  try {
    const res = await loadCustomMachines();
    customMachines = res.machines;
    const ov = await loadMachineOverrides();
    overrides = ov.overrides;
  } catch (e) {
    loadError = e instanceof Error ? e.message : String(e);
  }
  const drafts = customMachines.filter((m) => m.status === "draft");
  const published = customMachines.filter((m) => m.status === "published");
  const overrideMap = new Map(overrides.map((o) => [o.slug, o]));

  // Shape all 280+ seed machines (with any override applied) into a lightweight list
  // for the client search component.
  const seedRows = seedMachines.map((m) => {
    const o = overrideMap.get(m.slug);
    const merged = { ...m, ...(o?.patch || {}) };
    return {
      slug: m.slug,
      name: merged.name,
      brand: merged.brand,
      brandLabel: merged.brandLabel,
      type: merged.type,
      price: merged.price,
      image: merged.image,
      hidden: o?.hidden === true,
      hasOverride: Boolean(o && (o.patch || o.hidden)),
    };
  });
  const overriddenCount = seedRows.filter((r) => r.hasOverride).length;
  const hiddenCount = seedRows.filter((r) => r.hidden).length;

  return (
    <div className="container-wide py-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-ink-400 mt-1 text-sm">
            Manage inventory. Changes publish to the live site on review.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/chat" className="btn-ghost">
            <MessageSquare className="h-4 w-4" /> Chat with AI
          </Link>
          <Link href="/admin/new" className="btn-primary">
            <Plus className="h-4 w-4" /> Add Machine
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        <Stat label="Drafts" value={drafts.length} icon={Clock} accent="text-yellow-300" />
        <Stat label="Published (admin)" value={published.length} icon={CheckCircle2} accent="text-accent-300" />
        <Stat label="Inventory (seeds)" value={seedRows.length} icon={Package} accent="text-brand-300" />
        <Stat label="Overridden" value={overriddenCount} icon={CheckCircle2} accent="text-purple-300" />
      </div>

      <EnvPanel env={env} />

      {loadError && (
        <div className="card p-6 border border-red-500/40 bg-red-500/10 text-red-200 mb-6">
          <div className="font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> Couldn't load machines from GitHub
          </div>
          <div className="mt-2 text-sm">{loadError}</div>
          <div className="mt-2 text-sm">
            Set <code>GITHUB_TOKEN</code> in Vercel env vars and redeploy.
          </div>
        </div>
      )}

      <Section title="Drafts" empty="No drafts. Add a machine or chat with the AI to create one.">
        {drafts.map((m) => (
          <MachineRow key={m.slug} m={m} />
        ))}
      </Section>

      <Section
        title="Published (admin-added)"
        empty="Nothing admin-added yet. These are machines you create via 'Add Machine' or chat — separate from your 280-piece inventory below."
      >
        {published.map((m) => (
          <MachineRow key={m.slug} m={m} />
        ))}
      </Section>

      {/* Inventory: all 280+ seed machines, searchable, editable */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h2 className="font-display text-xl font-bold text-white">Inventory</h2>
          <div className="text-xs text-ink-400">
            {seedRows.length} machines · {overriddenCount} edited · {hiddenCount} hidden
          </div>
        </div>
        <SeedSearch rows={seedRows} />
      </div>
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
      <div className={`grid h-11 w-11 place-items-center rounded-lg bg-ink-900/70 border border-ink-700 ${accent}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs text-ink-400">{label}</div>
      </div>
    </div>
  );
}

function Section({ title, empty, children }: { title: string; empty: string; children: React.ReactNode }) {
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

function EnvPanel({ env }: { env: Record<string, boolean> }) {
  const missing = Object.entries(env).filter(([, v]) => !v);
  if (missing.length === 0) return null;
  return (
    <div className="card p-5 mb-6 border-yellow-500/30 bg-yellow-500/5">
      <div className="font-semibold text-yellow-300 flex items-center gap-2 mb-2">
        <AlertTriangle className="h-4 w-4" /> Missing environment variables
      </div>
      <div className="text-sm text-ink-300 mb-3">
        Set these in Vercel → Project → Settings → Environment Variables, then redeploy:
      </div>
      <ul className="text-sm space-y-1 text-ink-200">
        {missing.map(([k]) => (
          <li key={k}>
            <code className="text-brand-300">{k}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}
