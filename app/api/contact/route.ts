import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const OWNER_EMAIL = "usedslotshop@gmail.com";
// Resend requires a verified domain. Until usedslotmachineshop.com is verified
// in Resend, we fall back to their shared test sender.
const FROM_VERIFIED = "Used Slot Shop <noreply@usedslotmachineshop.com>";
const FROM_FALLBACK = "Used Slot Shop <onboarding@resend.dev>";

function esc(s: string) {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );
}

function ownerHtml(d: Record<string, string>) {
  const row = (k: string, v?: string) =>
    v ? `<tr><td style="padding:6px 12px 6px 0;color:#666;font-size:13px;">${k}</td><td style="padding:6px 0;font-size:14px;">${esc(v)}</td></tr>` : "";
  return `<!doctype html><html><body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#111;">
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <h2 style="margin:0 0 16px;font-size:18px;">New contact form submission</h2>
    <table style="border-collapse:collapse;">
      ${row("Name", d.name)}
      ${row("Email", d.email)}
      ${row("Phone", d.phone)}
      ${row("State", d.state)}
      ${row("Machine of interest", d.machine)}
    </table>
    <div style="margin-top:16px;padding:16px;background:#f6f6f6;border-radius:6px;white-space:pre-wrap;font-size:14px;">${esc(d.message)}</div>
    <p style="margin-top:16px;color:#666;font-size:12px;">Reply directly to this email to respond to ${esc(d.name)}.</p>
  </div>
</body></html>`;
}

function customerHtml(name: string) {
  return `<!doctype html><html><body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#111;">
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <h2 style="margin:0 0 12px;font-size:20px;">Thanks for reaching out, ${esc(name)}.</h2>
    <p style="font-size:15px;line-height:1.6;">We got your message and someone from Used Slot Shop will be in touch with you very soon.</p>
    <p style="font-size:15px;line-height:1.6;">In the meantime, if you need us right away:</p>
    <ul style="font-size:15px;line-height:1.7;">
      <li><strong>Call:</strong> 928-418-5549</li>
      <li><strong>Email:</strong> usedslotshop@gmail.com</li>
      <li><strong>Hours:</strong> Mon–Fri 8a–6p MST · Sat 9a–3p MST</li>
    </ul>
    <p style="font-size:15px;line-height:1.6;margin-top:20px;">— The Used Slot Shop team</p>
  </div>
</body></html>`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, state, machine, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.log("[contact]", { name, email, phone, state, machine, message });
      return NextResponse.json({ ok: true, delivered: false, note: "Logged only — RESEND_API_KEY not set" });
    }

    const resend = new Resend(apiKey);
    const fields = { name, email, phone, state, machine, message };

    async function trySend(from: string) {
      const owner = await resend.emails.send({
        from,
        to: [OWNER_EMAIL],
        replyTo: email,
        subject: `New inquiry from ${name}${machine ? ` — ${machine}` : ""}`,
        html: ownerHtml(fields),
      });
      const customer = await resend.emails.send({
        from,
        to: [email],
        replyTo: OWNER_EMAIL,
        subject: "Thanks for reaching out to Used Slot Shop",
        html: customerHtml(name),
      });
      return { owner, customer };
    }

    let result;
    try {
      result = await trySend(FROM_VERIFIED);
    } catch {
      result = await trySend(FROM_FALLBACK);
    }

    const failed = [result.owner?.error, result.customer?.error].filter(Boolean);
    if (failed.length) {
      console.error("[contact] send errors", failed);
      return NextResponse.json(
        { ok: false, delivered: false, errors: failed.map((e: any) => e?.message ?? String(e)) },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      delivered: true,
      ownerId: result.owner?.data?.id,
      customerId: result.customer?.data?.id,
    });
  } catch (err: any) {
    console.error("[contact] failure", err);
    return NextResponse.json({ ok: false, error: err?.message || "Invalid request" }, { status: 400 });
  }
}
