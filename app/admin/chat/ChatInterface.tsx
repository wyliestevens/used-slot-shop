"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Send, Paperclip, Sparkles, X, Loader2, Wrench, CheckCircle2, AlertTriangle } from "lucide-react";

type TextBlock = { type: "text"; text: string };
type ImageBlock = { type: "image"; source: { type: "url"; url: string } };
type ToolUseBlock = { type: "tool_use"; id: string; name: string; input: any };
type ToolResultBlock = { type: "tool_result"; tool_use_id: string; content: string; is_error?: boolean };
type ContentBlock = TextBlock | ImageBlock | ToolUseBlock | ToolResultBlock;
type Msg = { role: "user" | "assistant"; content: ContentBlock[] | string };

type Attachment = { url: string; filename: string };

const SUGGESTIONS = [
  "Upload a photo and I'll research it for a draft",
  "List my current drafts",
  "Change the price on igt-cleopatra-video to $1,495",
  "Publish the most recent draft",
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function attach(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setErr("");
    try {
      const next: Attachment[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("slug", "chat");
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Upload failed");
        const data = await res.json();
        next.push({ url: data.url, filename: file.name });
      }
      setAttachments((a) => [...a, ...next]);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function send(overrideText?: string) {
    const text = (overrideText ?? input).trim();
    if (!text && attachments.length === 0) return;

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const abs = (p: string) => (p.startsWith("http") ? p : origin + p);

    const content: ContentBlock[] = [];
    for (const a of attachments) {
      content.push({ type: "image", source: { type: "url", url: abs(a.url) } });
    }
    if (text) content.push({ type: "text", text });

    const userMsg: Msg = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setAttachments([]);
    setSending(true);
    setErr("");

    try {
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Chat failed");
      // The server returns the full updated conversation. Use it.
      setMessages(data.messages);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Chat failed");
    } finally {
      setSending(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="space-y-4">
      <div className="card p-4 min-h-[420px] max-h-[65vh] overflow-y-auto space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-10">
            <Sparkles className="h-8 w-8 text-brand-400 mx-auto mb-3" />
            <div className="text-ink-100 font-semibold mb-1">Ready when you are.</div>
            <div className="text-ink-400 text-sm mb-5">Upload a photo or just type what you need.</div>
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-ink-600 bg-ink-800/60 px-3 py-1.5 text-xs text-ink-200 hover:border-brand-500 hover:text-brand-300"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <MessageBubble key={i} m={m} />
        ))}

        {sending && (
          <div className="flex items-center gap-2 text-sm text-ink-400">
            <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
          </div>
        )}
        <div ref={endRef} />
      </div>

      {err && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-200">
          {err}
        </div>
      )}

      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachments.map((a, i) => (
            <div key={i} className="relative">
              <Image
                src={a.url}
                alt={a.filename}
                width={72}
                height={72}
                className="h-18 w-18 rounded-lg border border-ink-700 object-cover"
              />
              <button
                onClick={() => setAttachments((arr) => arr.filter((_, j) => j !== i))}
                className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-ink-900 border border-ink-700 text-ink-200 hover:text-red-300"
                aria-label="Remove"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="card p-3 flex items-end gap-2">
        <label className="p-2 rounded-lg hover:bg-ink-800/70 cursor-pointer text-ink-300 hover:text-brand-300" title="Attach image">
          <Paperclip className={`h-5 w-5 ${uploading ? "opacity-50" : ""}`} />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              attach(e.target.files);
              e.target.value = "";
            }}
            disabled={uploading}
            className="hidden"
          />
        </label>
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Add a new Buffalo Gold, here's the photo, around $1,200…"
          className="flex-1 resize-none bg-transparent px-2 py-2 text-ink-100 placeholder:text-ink-500 focus:outline-none text-sm"
          disabled={sending}
        />
        <button
          onClick={() => send()}
          disabled={sending || (!input.trim() && attachments.length === 0)}
          className="btn-primary !px-4 !py-2 text-sm"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function MessageBubble({ m }: { m: Msg }) {
  const blocks = Array.isArray(m.content)
    ? m.content
    : [{ type: "text", text: m.content } as TextBlock];

  if (m.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-brand-500/15 border border-brand-500/30 p-3 space-y-2">
          {blocks.map((b, i) => {
            if (b.type === "text") {
              return (
                <div key={i} className="text-ink-100 text-sm whitespace-pre-wrap">
                  {b.text}
                </div>
              );
            }
            if (b.type === "image") {
              return (
                <Image
                  key={i}
                  src={b.source.url}
                  alt=""
                  width={240}
                  height={240}
                  className="rounded-lg border border-ink-700 object-cover"
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }

  // Assistant: may include text + tool_use. Tool results live in the subsequent user message.
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] space-y-2">
        {blocks.map((b, i) => {
          if (b.type === "text") {
            return (
              <div key={i} className="rounded-2xl rounded-tl-sm bg-ink-800/70 border border-ink-700 p-3">
                <div className="text-ink-100 text-sm whitespace-pre-wrap prose-sm">{b.text}</div>
              </div>
            );
          }
          if (b.type === "tool_use") {
            return <ToolUsePill key={i} name={b.name} input={b.input} />;
          }
          if (b.type === "tool_result") {
            return <ToolResultPill key={i} content={b.content} error={b.is_error} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}

function ToolUsePill({ name, input }: { name: string; input: any }) {
  return (
    <div className="inline-flex items-start gap-2 rounded-lg bg-ink-900/80 border border-ink-700 px-3 py-1.5 text-xs text-ink-200">
      <Wrench className="h-3.5 w-3.5 text-brand-400 mt-0.5" />
      <div className="font-mono">
        <span className="text-brand-300">{name}</span>
        <span className="text-ink-400"> · {shortInput(input)}</span>
      </div>
    </div>
  );
}

function ToolResultPill({ content, error }: { content: string; error?: boolean }) {
  let parsed: any = null;
  try { parsed = JSON.parse(content); } catch { parsed = content; }
  // Link to created/updated machine when present
  const slug = parsed && typeof parsed === "object" ? parsed.slug : null;
  const editUrl = parsed && typeof parsed === "object" ? parsed.editUrl : null;
  return (
    <div className={`inline-flex items-start gap-2 rounded-lg px-3 py-1.5 text-xs ${error ? "bg-red-500/10 border border-red-500/30 text-red-200" : "bg-accent-500/10 border border-accent-500/30 text-accent-200"}`}>
      {error ? <AlertTriangle className="h-3.5 w-3.5 mt-0.5" /> : <CheckCircle2 className="h-3.5 w-3.5 mt-0.5" />}
      <div className="font-mono max-w-[60ch] truncate">
        {typeof parsed === "string" ? parsed : JSON.stringify(parsed).slice(0, 120)}
      </div>
      {slug && (
        <Link href={editUrl || `/admin/edit/${slug}`} className="underline hover:text-white">
          open
        </Link>
      )}
    </div>
  );
}

function shortInput(input: any): string {
  if (!input || typeof input !== "object") return String(input || "");
  const s = JSON.stringify(input);
  return s.length > 80 ? s.slice(0, 77) + "…" : s;
}
