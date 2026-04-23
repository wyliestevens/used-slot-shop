"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";

export default function LoginForm() {
  const params = useSearchParams();
  const nextRaw = params.get("next") || "/admin";
  const next = nextRaw.startsWith("/") && !nextRaw.startsWith("//") ? nextRaw : "/admin";
  const [email, setEmail] = useState("usedslotshop@gmail.com");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setErr("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "same-origin",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Login failed");
      const target = data.mustChangePassword ? "/admin/change-password" : next;
      window.location.href = target;
    } catch (e) {
      setState("error");
      setErr(e instanceof Error ? e.message : "Login failed");
    }
  }

  return (
    <form onSubmit={submit} className="card p-6 space-y-4">
      <div>
        <label className="text-sm font-medium text-ink-200 block mb-1.5">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full rounded-lg border border-ink-600 bg-ink-900 px-4 py-3 text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-ink-200 block mb-1.5">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          autoComplete="current-password"
          className="w-full rounded-lg border border-ink-600 bg-ink-900 px-4 py-3 text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        />
      </div>
      {state === "error" && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-200">
          {err}
        </div>
      )}
      <button type="submit" disabled={state === "loading"} className="btn-primary w-full">
        {state === "loading" ? "Signing in…" : <>Sign in <LogIn className="h-4 w-4" /></>}
      </button>
    </form>
  );
}
