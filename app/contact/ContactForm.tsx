"use client";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "sent") {
    return (
      <div className="card p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand-400 mx-auto" />
        <h3 className="mt-4 font-display text-2xl font-bold text-white">Message received.</h3>
        <p className="mt-2 text-ink-300">
          A slot machine expert will be in touch within one business day. For urgent help,
          call 928-418-5549.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="name" label="Full name" required />
        <Field name="email" label="Email" type="email" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="phone" label="Phone (optional)" type="tel" />
        <Field name="state" label="State" placeholder="e.g. Arizona" />
      </div>
      <Field name="machine" label="Machine you're interested in" placeholder="e.g. IGT S2000 Double Diamond" />
      <div>
        <label className="text-sm font-medium text-ink-200 block mb-1.5">
          How can we help?
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-ink-600 bg-ink-900 px-4 py-3 text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
          placeholder="Tell us a bit about your space, budget, or questions..."
        />
      </div>
      {status === "error" && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error || "Something went wrong. Call us at 928-418-5549 instead."}
        </div>
      )}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
        {status === "sending" ? "Sending…" : <>Send message <Send className="h-4 w-4" /></>}
      </button>
      <p className="text-xs text-ink-400">
        We'll respond within one business day. We never share your info.
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-ink-200 block mb-1.5">
        {label} {required && <span className="text-brand-400">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-ink-600 bg-ink-900 px-4 py-3 text-ink-100 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
      />
    </div>
  );
}
