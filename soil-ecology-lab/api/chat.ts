import type { VercelRequest, VercelResponse } from "@vercel/node";
import knowledgeBase from "../src/data/knowledge-base.json";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const MODEL = process.env.CHAT_MODEL || "claude-sonnet-4-20250514";

const SYSTEM_PROMPT = `你是"土壤生态与水土保持课题组"（广西大学）的智能助手。请根据以下课题组信息回答访客的问题。
回答要求：
- 用中文回答中文问题，用英文回答英文问题
- 简洁、准确、友好
- 如果问题超出课题组信息范围，礼貌说明并建议联系导师邮箱
- 不要编造信息

课题组信息：
${knowledgeBase.content}`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const { message, history = [] } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  // 构建消息历史（最多保留最近6轮）
  const messages = [
    ...history.slice(-12).map((m: any) => ({
      role: m.role,
      content: m.content,
    })),
    { role: "user", content: message },
  ];

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
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || "抱歉，暂时无法回答。";
    return res.status(200).json({ reply });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}

