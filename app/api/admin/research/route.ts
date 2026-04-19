import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Calls Claude to research a slot machine from a photo and/or a text hint.
// Returns a best-effort structured guess that the admin form merges in.
export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured in Vercel env vars." },
      { status: 503 }
    );
  }
  const { image, hint } = await req.json().catch(() => ({ image: "", hint: "" }));
  if (!image && !hint) {
    return NextResponse.json({ error: "Provide image url and/or hint" }, { status: 400 });
  }

  const systemPrompt = `You are an expert slot machine merchandiser at Used Slot Shop, a dealer of refurbished casino slot machines. You're given a photo and/or a text hint about a machine on the lot. Return a single JSON object with these keys:
{
  "name": string,            // clear product title, e.g. "IGT Buffalo Gold MK6"
  "brand": "igt"|"bally"|"aristocrat"|"williams"|"konami"|"ainsworth"|"aruze",
  "type": "reel"|"video"|"video-poker"|"vintage",
  "cabinet": string|null,    // e.g. "MK6", "S9000", null if unknown
  "priceSuggestion": number, // USD, typical refurbished retail for a home buyer
  "description": string,     // 2-4 sentences, concrete and factual, home-collector tone
  "highlights": string[]     // 3-5 bullets: game features, screen size, TITO, warranty
}
Rules:
- If unsure about brand/type from the image alone, make your best inference but set confidence through the description.
- Never fabricate specific IGT/Bally part numbers you cannot verify.
- Prices should be realistic for refurbished units: IGT S2000 3-reel $750–$1150, IGT video slots $1650–$1950, Bally S9000 $850–$950, Aristocrat MK6 Buffalo $1150–$3500, WMS Bluebird video $1099–$1799. Adjust up for rare titles.
- Output ONLY the JSON object, no prose, no markdown.`;

  const userContent: Array<{ type: string; [k: string]: any }> = [];
  if (hint) userContent.push({ type: "text", text: `Owner hint: ${hint}` });
  if (image) {
    // If it's a local path under /uploads, build an absolute URL using host.
    const imageUrl = image.startsWith("/")
      ? `${process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "https://used-slot-shop.vercel.app"}${image}`
      : image;
    userContent.push({ type: "image", source: { type: "url", url: imageUrl } });
  }
  userContent.push({ type: "text", text: "Identify and describe this slot machine for our catalog. Respond with only the JSON object." });

  const body = {
    model: "claude-opus-4-7",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: userContent }],
  };

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const t = await res.text();
    return NextResponse.json({ error: `Anthropic ${res.status}: ${t.slice(0, 400)}` }, { status: 502 });
  }

  const data = await res.json();
  const text = (data.content || [])
    .filter((b: any) => b.type === "text")
    .map((b: any) => b.text)
    .join("\n")
    .trim();

  // Claude may wrap JSON in ```json fences. Strip.
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "Model did not return JSON", raw: text }, { status: 502 });
  }
  let parsed: any;
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch (e) {
    return NextResponse.json({ error: "JSON parse failed", raw: text }, { status: 502 });
  }
  return NextResponse.json(parsed);
}
