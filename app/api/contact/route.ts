import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const OWNER_EMAIL = "usedslotshop@gmail.com";
// Resend requires a verified domain to send to arbitrary recipients. Until
// usedslotmachineshop.com is verified, we fall back to their shared sender
// — which can only email the Resend account owner. In that case the
// customer auto-reply is best-effort and we don't block the submission.
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

function isDomainError(r: any) {
  const msg: string = r?.error?.message || "";
  return /domain is not verified|not verified/i.test(msg);
}

function isRecipientRestrictionError(r: any) {
  const msg: string = r?.error?.message || "";
  return /testing emails to your own/i.test(msg);
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

    // Try the verified domain first; fall back to shared sender on domain error.
    async function sendOne(to: string, subject: string, html: string, replyTo: string) {
      let r = await resend.emails.send({ from: FROM_VERIFIED, to: [to], replyTo, subject, html });
      let fromUsed = FROM_VERIFIED;
      if (isDomainError(r)) {
        r = await resend.emails.send({ from: FROM_FALLBACK, to: [to], replyTo, subject, html });
        fromUsed = FROM_FALLBACK;
      }
      return { r, fromUsed };
    }

    // Owner notification — critical. If this fails, the form fails.
    const ownerResult = await sendOne(
      OWNER_EMAIL,
      `New inquiry from ${name}${machine ? ` — ${machine}` : ""}`,
      ownerHtml(fields),
      email
    );
    if (ownerResult.r.error) {
      console.error("[contact] owner send failed", ownerResult.r.error);
      return NextResponse.json(
        { ok: false, delivered: false, error: "We couldn't deliver your message. Please call 928-418-5549." },
        { status: 502 }
      );
    }

    // Customer auto-reply — best-effort. If it fails (e.g. because the
    // shared Resend sender can't email non-owner addresses), log and move on.
    // Once the domain is verified in Resend, this path will succeed automatically.
    const customerResult = await sendOne(
      email,
      "Thanks for reaching out to Used Slot Shop",
      customerHtml(name),
      OWNER_EMAIL
    );
    let autoReplySent = true;
    if (customerResult.r.error) {
      autoReplySent = false;
      if (isRecipientRestrictionError(customerResult.r)) {
        console.warn(
          "[contact] auto-reply skipped — domain not verified in Resend, using shared sender which can't email non-owner addresses. Verify usedslotmachineshop.com at resend.com/domains to enable auto-replies."
        );
      } else {
        console.error("[contact] customer auto-reply failed", customerResult.r.error);
      }
    }

    return NextResponse.json({
      ok: true,
      delivered: true,
      autoReplySent,
      ownerFrom: ownerResult.fromUsed,
    });
  } catch (err: any) {
    console.error("[contact] failure", err);
    return NextResponse.json({ ok: false, error: err?.message || "Invalid request" }, { status: 400 });
  }
}
