import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const BASE_URL = (process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com").replace(/\/+$/, "");
const MODEL = process.env.CHAT_MODEL || "claude-sonnet-4-6";

export async function GET() {
  // 诊断信息（不泄露完整 key）
  const keyPreview = ANTHROPIC_API_KEY ? `${ANTHROPIC_API_KEY.slice(0, 8)}...${ANTHROPIC_API_KEY.slice(-4)}` : "NOT SET";
  const testUrl = `${BASE_URL}/v1/messages`;

  try {
    const response = await fetch(testUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 50,
        messages: [{ role: "user", content: "hello" }],
      }),
    });

    const bodyText = await response.text();

    return NextResponse.json({
      config: { baseUrl: BASE_URL, model: MODEL, apiKey: keyPreview, fullUrl: testUrl },
      response: { status: response.status, statusText: response.statusText, body: bodyText },
    });
  } catch (e: any) {
    return NextResponse.json({
      config: { baseUrl: BASE_URL, model: MODEL, apiKey: keyPreview, fullUrl: testUrl },
      error: e.message,
    });
  }
}

