import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const BASE_URL = (process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com").replace(/\/+$/, "");
const MODEL = process.env.CHAT_MODEL || "claude-sonnet-4-6";

export async function GET() {
  const keyPreview = ANTHROPIC_API_KEY ? `${ANTHROPIC_API_KEY.slice(0, 8)}...${ANTHROPIC_API_KEY.slice(-4)}` : "NOT SET";
  const results: any[] = [];

  // 测试不同的认证方式和路径组合
  const tests: { label: string; url: string; headers: Record<string, string> }[] = [
    { label: "x-api-key + /v1/messages", url: `${BASE_URL}/v1/messages`, headers: { "Content-Type": "application/json", "x-api-key": ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" } },
    { label: "Bearer + /v1/messages", url: `${BASE_URL}/v1/messages`, headers: { "Content-Type": "application/json", "Authorization": `Bearer ${ANTHROPIC_API_KEY}`, "anthropic-version": "2023-06-01" } },
    { label: "Bearer + /v1/messages (no version)", url: `${BASE_URL}/v1/messages`, headers: { "Content-Type": "application/json", "Authorization": `Bearer ${ANTHROPIC_API_KEY}` } },
    { label: "x-api-key + /messages", url: `${BASE_URL}/messages`, headers: { "Content-Type": "application/json", "x-api-key": ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" } },
  ];

  for (const test of tests) {
    try {
      const response = await fetch(test.url, {
        method: "POST",
        headers: test.headers,
        body: JSON.stringify({ model: MODEL, max_tokens: 20, messages: [{ role: "user", content: "say hi" }] }),
      });
      const bodyText = await response.text();
      results.push({ label: test.label, url: test.url, status: response.status, body: bodyText.slice(0, 300) });
      if (response.ok) break;
    } catch (e: any) {
      results.push({ label: test.label, url: test.url, error: e.message });
    }
  }

  return NextResponse.json({ config: { baseUrl: BASE_URL, model: MODEL, apiKey: keyPreview }, results });
}

