import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 45;

// Calls Claude to research a slot machine from a photo + brand + model number.
// Returns a structured guess that the admin form merges into unfilled fields.
export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured in Vercel env vars." },
      { status: 503 }
    );
  }
  const body = await req.json().catch(() => ({} as any));
  const image: string = body.image || "";
  const hint: string = body.hint || "";
  const brand: string | undefined = body.brand;
  const model: string | undefined = body.model;
  if (!image && !hint && !brand && !model) {
    return NextResponse.json({ error: "Provide image, hint, brand, or model" }, { status: 400 });
  }

  const brandKnowledge: Record<string, string> = {
    igt: `IGT model families: S2000 (3-reel mechanical, coin/hopper or TITO), S+ (older 3-reel), Game King (video poker multi-game, 17"/19" LCD, 31 or 118 games), I+ 3902 (9-line video round-top), I+ 044 (9/20/40-line video, 17"/19"), AVP (modern video, 22" LCD), G20/G22 (modern video), Axxis (large curved video), Barcrest S2000 (UK-sourced bonus reels on S2000 hardware).`,
    bally: `Bally model families: S9000 (3-reel mechanical, LCD top box, Alpha platform), M9000 (video upright, Alpha 1 OS, 19" LCD), V32 (widescreen video 32"), V22 (video 22"), Alpha 2 Pro (modern dual-screen video), Pro V32 (dual 23" HD).`,
    aristocrat: `Aristocrat model families: MK5 (older coinless video, no topper), MK6 (iconic video upright, 22" widescreen LCD — used for Buffalo Gold, Lightning Link, 50 Dragons, Tiki Torch, Wicked Winnings), MK7 (rare, newer), Viridian (modern video), Helix (widescreen), A-Star (Ainsworth branding).`,
    williams: `WMS/Williams model families: Bluebird (BB1) — 22" CRT/LCD with bonus top box, used for Jackpot Party, Zeus, Reel 'Em In. Bluebird 2 (BB2) — 22" LCD main + LCD topper, used for Zeus II, Wizard of Oz. Bluebird 3 (BB3) — HD widescreen. Gamefield XD — modern widescreen. BB1 is the classic home-collector pick.`,
    konami: `Konami model families: Podium (classic upright, 22" LCD), K2V (newer upright, 19"-22" LCD + topper), K2V Dual Screen (stacked dual LCDs, "Extra Rewards" feature), Selexion (older), Concerto (modern widescreen), Rapid Revolver.`,
    ainsworth: `Ainsworth model families: A560 (upright, 22" widescreen LCD), A600 (successor to A560), A-Star (portrait HD cabinet — King of Africa, Three Amigos themes). Australian-built.`,
    aruze: `Aruze model families: Innovator (classic upright), Muso (dual-screen, sold at Gen2 Muso), Helix (widescreen).`,
  };

  const knowledge = brand && brandKnowledge[brand] ? brandKnowledge[brand] : "";

  const systemPrompt = `You are an expert slot machine merchandiser at Used Slot Shop, a dealer of refurbished casino slot machines. You're given a photo, brand, model number, and/or text hint. Return a single JSON object with these keys:
{
  "name": string,            // clear product title, e.g. "IGT Buffalo Gold MK6"
  "brand": "igt"|"bally"|"aristocrat"|"williams"|"konami"|"ainsworth"|"aruze",
  "model": string|null,      // e.g. "S2000", "MK6", "M9000", "Bluebird 2", "K2V" — null if unknown
  "type": "reel"|"video"|"video-poker"|"vintage",
  "cabinet": string|null,    // specific cabinet variant if identifiable (e.g. "S2000 9-inch top", "MK6 Upright")
  "priceSuggestion": number, // USD, realistic refurbished retail
  "description": string,     // 2-4 sentences, factual, home-collector tone, mention cabinet + standout features
  "highlights": string[]     // 3-5 bullets: game features, screen size, TITO, bonus rounds, warranty
}

${knowledge ? `Brand context for ${brand?.toUpperCase()}:\n${knowledge}\n` : ""}
Rules:
- When brand + model are supplied by the owner, USE THEM. Don't second-guess — write the description specific to that platform's real features.
- Do not fabricate part numbers or firmware versions you can't verify.
- Pricing anchors (refurbished retail):
  - IGT S2000 3-reel $750–$1150, IGT S2000 bonus-reel $899–$1150, IGT I+ 3902 video $1650, IGT I+ 044 video $1850–$1950, IGT Game King poker $1350–$1850, IGT Barcrest $3150–$5000.
  - Bally S9000 $850–$950, Bally M9000 (Alpha 1) $1050, Bally Alpha 2 Pro V32 $2500–$3500.
  - Aristocrat MK5 $1050–$1250, MK6 (Buffalo/Tiki/50 Dragons) $1150–$3500 (Buffalo Gold ~$2500–$3500).
  - WMS BB1 video $1099, Gold Fish BB1 $1799, BB2 $1500–$2500, BB3 $2000–$3500.
  - Konami K2V $950–$1250 (dual-screen $1250), Podium $1100–$1400.
  - Ainsworth A560 $950–$1100, A-Star $1800–$2800.
  - Aruze Innovator $1200–$1800, Muso $1800–$2500.
  Adjust up for rare titles, dual-screen variants, and premium themes.
- Output ONLY the JSON object, no prose, no markdown.`;

  const userContent: Array<{ type: string; [k: string]: any }> = [];
  const hintLines: string[] = [];
  if (brand) hintLines.push(`Brand: ${brand.toUpperCase()}`);
  if (model) hintLines.push(`Model: ${model}`);
  if (hint) hintLines.push(`Owner note: ${hint}`);
  if (hintLines.length) userContent.push({ type: "text", text: hintLines.join("\n") });
  if (image) {
    const imageUrl = image.startsWith("/")
      ? `${process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "https://used-slot-shop.vercel.app"}${image}`
      : image;
    userContent.push({ type: "image", source: { type: "url", url: imageUrl } });
  }
  userContent.push({
    type: "text",
    text:
      "Identify and describe this slot machine for our catalog. Respond with only the JSON object. Be specific to the brand+model when provided — don't give generic content.",
  });

  const payload = {
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
    body: JSON.stringify(payload),
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
