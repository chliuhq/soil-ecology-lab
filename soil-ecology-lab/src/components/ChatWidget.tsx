"use client";
import { useState, useRef, useEffect } from "react";
import { useLocaleText } from "@/lib/i18n-context";

interface Msg { role: "user" | "assistant"; content: string }

export default function ChatWidget() {
  const lt = useLocaleText();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: q };
    setMsgs((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q, history: msgs }),
      });
      const data = await res.json();
      if (data.reply) {
        setMsgs((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMsgs((prev) => [...prev, { role: "assistant", content: data.error || "抱歉，出了点问题。" }]);
      }
    } catch {
      setMsgs((prev) => [...prev, { role: "assistant", content: "网络错误，请稍后再试。" }]);
    }
    setLoading(false);
  };

  const greeting = String(lt({ zh: "你好！我是课题组智能助手，有什么可以帮你的？", en: "Hi! I'm the lab's AI assistant. How can I help you?" }));

  return (
    <>
      {/* 浮动按钮 */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark transition-all flex items-center justify-center text-2xl"
        aria-label="Chat"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* 聊天窗口 */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[28rem] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* 头部 */}
          <div className="bg-primary text-white px-4 py-3 text-sm font-medium flex items-center gap-2">
            <span>🤖</span>
            <span>{String(lt({ zh: "智能助手", en: "AI Assistant" }))}</span>
          </div>

          {/* 消息区 */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {/* 欢迎语 */}
            {msgs.length === 0 && (
              <div className="bg-white rounded-lg p-3 text-sm text-text-light shadow-sm">{greeting}</div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-800 shadow-sm"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg px-3 py-2 text-sm text-gray-400 shadow-sm">
                  {String(lt({ zh: "思考中...", en: "Thinking..." }))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* 输入区 */}
          <div className="border-t border-gray-200 p-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
              placeholder={String(lt({ zh: "输入你的问题...", en: "Ask a question..." }))}
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
              disabled={loading}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="px-3 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark disabled:opacity-50 transition-colors"
            >
              {String(lt({ zh: "发送", en: "Send" }))}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

