import ChatInterface from "./ChatInterface";

export const dynamic = "force-dynamic";

export default function ChatPage() {
  const anthropicConfigured = Boolean(process.env.ANTHROPIC_API_KEY);
  return (
    <div className="container-wide py-8 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-white mb-1">Chat with AI</h1>
      <p className="text-ink-400 text-sm mb-6">
        Tell the AI what to do. It'll research, draft, and await your review before publishing.
      </p>
      {!anthropicConfigured ? (
        <div className="card p-6 border-yellow-500/30 bg-yellow-500/5">
          <div className="font-semibold text-yellow-300 mb-2">Anthropic API key required</div>
          <div className="text-sm text-ink-300">
            Set <code className="text-brand-300">ANTHROPIC_API_KEY</code> in Vercel → Project →
            Settings → Environment Variables and redeploy.
          </div>
        </div>
      ) : (
        <ChatInterface />
      )}
    </div>
  );
}
