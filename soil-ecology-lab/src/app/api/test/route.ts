import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const BASE_URL = (process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com").replace(/\/+$/, "");
const MODEL = process.env.CHAT_MODEL || "claude-sonnet-4-6";

export async function GET() {
  const keyPreview = ANTHROPIC_API_KEY ? `${ANTHROPIC_API_KEY.slice(0, 8)}...${ANTHROPIC_API_KEY.slice(-4)}` : "NOT SET";
  const testUrl = `${BASE_URL}/v1/messages`;

  // 尝试多个模型名
  const modelsToTry = [MODEL, "claude-sonnet-4-20250514", "claude-3-5-sonnet-20241022"];
  const results: any[] = [];

  for (const model of modelsToTry) {
    try {
      const response = await fetch(testUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model,
          max_tokens: 20,
          messages: [{ role: "user", content: "say hi" }],
        }),
      });
      const bodyText = await response.text();
      results.push({ model, status: response.status, body: bodyText.slice(0, 500) });
      if (response.ok) break; // 找到了可用的模型就停
    } catch (e: any) {
      results.push({ model, error: e.message });
    }
  }

  return NextResponse.json({
    config: { baseUrl: BASE_URL, envModel: MODEL, apiKey: keyPreview, fullUrl: testUrl },
    results,
  });
}

