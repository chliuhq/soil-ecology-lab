import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const BASE_URL = (process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com").replace(/\/+$/, "");
const MODEL = process.env.CHAT_MODEL || "claude-sonnet-4-6";

const LANG_NAMES: Record<string, string> = {
  ja: "Japanese", ko: "Korean", fr: "French", de: "German", es: "Spanish", ru: "Russian",
};

export async function POST(req: NextRequest) {
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const { texts, targetLang } = await req.json();
  if (!texts || !targetLang || !LANG_NAMES[targetLang]) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const prompt = `Translate the following JSON values from Chinese to ${LANG_NAMES[targetLang]}. Keep the JSON keys unchanged. Only output the translated JSON, no explanation.\n\n${JSON.stringify(texts, null, 2)}`;

  try {
    const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ANTHROPIC_API_KEY}`,
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 4096, messages: [{ role: "user", content: prompt }] }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err }, { status: response.status });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const translated = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    return NextResponse.json({ translated });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

