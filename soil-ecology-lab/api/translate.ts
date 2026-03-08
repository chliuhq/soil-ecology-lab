import type { VercelRequest, VercelResponse } from "@vercel/node";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const MODEL = process.env.CHAT_MODEL || "claude-sonnet-4-20250514";

const LANG_NAMES: Record<string, string> = {
  ja: "Japanese", ko: "Korean", fr: "French", de: "German", es: "Spanish", ru: "Russian",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!ANTHROPIC_API_KEY) return res.status(500).json({ error: "API key not configured" });

  const { texts, targetLang } = req.body;
  if (!texts || !targetLang || !LANG_NAMES[targetLang]) {
    return res.status(400).json({ error: "Invalid request" });
  }

  // texts is a JSON object with keys and Chinese values to translate
  const prompt = `Translate the following JSON values from Chinese to ${LANG_NAMES[targetLang]}. Keep the JSON keys unchanged. Only output the translated JSON, no explanation.\n\n${JSON.stringify(texts, null, 2)}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 4096,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || "{}";
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const translated = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    return res.status(200).json({ translated });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}

