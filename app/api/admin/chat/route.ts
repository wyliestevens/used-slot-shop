import { NextResponse } from "next/server";
import { toolSchemas, toolExecutors, CHAT_SYSTEM_PROMPT } from "@/lib/chat-tools";

export const runtime = "nodejs";
export const maxDuration = 60;

type Msg = { role: "user" | "assistant"; content: any };

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured in Vercel env vars." },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const inMsgs = Array.isArray(body.messages) ? (body.messages as Msg[]) : [];
  if (inMsgs.length === 0) {
    return NextResponse.json({ error: "messages required" }, { status: 400 });
  }

  const hdrs = req.headers;
  const host = hdrs.get("x-forwarded-host") || hdrs.get("host") || "used-slot-shop.vercel.app";
  const proto = hdrs.get("x-forwarded-proto") || "https";
  const siteBaseUrl = `${proto}://${host}`;
  const toolCtx = { siteBaseUrl, anthropicKey: apiKey };

  // Conversation loop. Each iteration: call Claude. If it emits tool_use, execute, then loop.
  const conversation: Msg[] = [...inMsgs];
  const toolTranscript: Array<{ name: string; input: any; output: any; error?: string }> = [];
  const MAX_ROUNDS = 8;

  for (let round = 0; round < MAX_ROUNDS; round++) {
    const reqBody = {
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: CHAT_SYSTEM_PROMPT,
      tools: toolSchemas,
      messages: conversation,
    };

    const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    if (!apiRes.ok) {
      const text = await apiRes.text();
      return NextResponse.json(
        { error: `Anthropic API error ${apiRes.status}: ${text.slice(0, 400)}` },
        { status: 502 }
      );
    }

    const data = await apiRes.json();
    const contentBlocks: any[] = data.content || [];
    // Push assistant response to history.
    conversation.push({ role: "assistant", content: contentBlocks });

    const toolUses = contentBlocks.filter((b) => b.type === "tool_use");
    if (toolUses.length === 0) {
      // Final assistant message. Return.
      const text = contentBlocks
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n\n")
        .trim();
      return NextResponse.json({
        ok: true,
        reply: text,
        messages: conversation,
        toolTranscript,
      });
    }

    // Execute each tool use in parallel, produce tool_result blocks.
    const results = await Promise.all(
      toolUses.map(async (tu) => {
        const name: string = tu.name;
        const input = tu.input;
        const exec = toolExecutors[name];
        if (!exec) {
          toolTranscript.push({ name, input, output: null, error: "unknown tool" });
          return {
            type: "tool_result",
            tool_use_id: tu.id,
            content: JSON.stringify({ error: "unknown tool", name }),
            is_error: true,
          };
        }
        try {
          const output = await exec(input, toolCtx);
          toolTranscript.push({ name, input, output });
          return {
            type: "tool_result",
            tool_use_id: tu.id,
            content: typeof output === "string" ? output : JSON.stringify(output),
          };
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          toolTranscript.push({ name, input, output: null, error: msg });
          return {
            type: "tool_result",
            tool_use_id: tu.id,
            content: JSON.stringify({ error: msg }),
            is_error: true,
          };
        }
      })
    );

    conversation.push({ role: "user", content: results });
  }

  return NextResponse.json({
    ok: false,
    error: "Hit max tool-loop iterations without completing",
    messages: conversation,
    toolTranscript,
  });
}
