export const dynamic = "force-dynamic";

export default function ChatPage() {
  const anthropicConfigured = Boolean(process.env.ANTHROPIC_API_KEY);
  return (
    <div className="container-wide py-8 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-white mb-2">Chat with AI</h1>
      <p className="text-ink-400 text-sm mb-8">Tell the AI what to do. It'll research, draft, and publish on your review.</p>
      {!anthropicConfigured ? (
        <div className="card p-6 border-yellow-500/30 bg-yellow-500/5">
          <div className="font-semibold text-yellow-300 mb-2">Anthropic API key required</div>
          <div className="text-sm text-ink-300 mb-3">
            Set <code className="text-brand-300">ANTHROPIC_API_KEY</code> in Vercel → Project → Settings → Environment Variables and redeploy.
            Get a key at <a className="underline text-brand-300" href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener">console.anthropic.com/settings/keys</a>.
          </div>
          <div className="text-xs text-ink-400">Until then, use <a className="underline text-brand-300" href="/admin/new">Add Machine</a> for form-based entry.</div>
        </div>
      ) : (
        <div className="card p-6">
          <div className="text-sm text-ink-300">Chat interface coming in the next deploy. Owner-chat agent is wired but the UI is being polished.</div>
        </div>
      )}
    </div>
  );
}
