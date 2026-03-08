import { NextRequest, NextResponse } from "next/server";
import knowledgeBase from "@/data/knowledge-base.json";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const BASE_URL = (process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com").replace(/\/+$/, "");
const MODEL = process.env.CHAT_MODEL || "claude-sonnet-4-6";

const SYSTEM_PROMPT = `你是"土壤生态与水土保持课题组"（广西大学）的智能助手。请根据以下课题组信息回答访客的问题。
回答要求：
- 用中文回答中文问题，用英文回答英文问题
- 简洁、准确、友好
- 如果问题超出课题组信息范围，礼貌说明并建议联系导师邮箱
- 不要编造信息

课题组信息：
${knowledgeBase.content}`;

export async function POST(req: NextRequest) {
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const { message, history = [] } = await req.json();
  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const messages = [
    ...history.slice(-12).map((m: any) => ({ role: m.role, content: m.content })),
    { role: "user", content: message },
  ];

  try {
    const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ANTHROPIC_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err }, { status: response.status });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "抱歉，暂时无法回答。";
    return NextResponse.json({ reply });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

