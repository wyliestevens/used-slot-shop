"use client";
import { useState } from "react";
import { KeyRound } from "lucide-react";

export default function ChangePasswordForm({ forced = false }: { forced?: boolean }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error" | "ok">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (next.length < 8) {
      setErr("New password must be at least 8 characters.");
      setState("error");
      return;
    }
    if (next !== confirm) {
      setErr("New password and confirmation do not match.");
      setState("error");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/admin/account", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
        credentials: "same-origin",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Password change failed");
      setState("ok");
      // Give the cookie a tick to land, then go to the dashboard.
      setTimeout(() => {
        window.location.href = "/admin";
      }, 600);
    } catch (e) {
      setState("error");
      setErr(e instanceof Error ? e.message : "Password change failed");
    }
  }

  return (
    <form onSubmit={submit} className="card p-6 space-y-4">
      <div>
        <label className="text-sm font-medium text-ink-200 block mb-1.5">
          {forced ? "Current (default) password" : "Current password"}
        </label>
        <input
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          required
          autoComplete="current-password"
          autoFocus
          className="w-full rounded-lg border border-ink-600 bg-ink-900 px-4 py-3 text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-ink-200 block mb-1.5">New password</label>
        <input
          type="password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          required
          autoComplete="new-password"
          minLength={8}
          className="w-full rounded-lg border border-ink-600 bg-ink-900 px-4 py-3 text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-ink-200 block mb-1.5">Confirm new password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          autoComplete="new-password"
          minLength={8}
          className="w-full rounded-lg border border-ink-600 bg-ink-900 px-4 py-3 text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        />
      </div>
      {state === "error" && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-200">
          {err}
        </div>
      )}
      {state === "ok" && (
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-200">
          Password updated. Redirecting…
        </div>
      )}
      <button type="submit" disabled={state === "loading"} className="btn-primary w-full">
        {state === "loading" ? "Saving…" : <>Update password <KeyRound className="h-4 w-4" /></>}
      </button>
    </form>
  );
}
