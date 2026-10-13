"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocaleText } from "@/lib/i18n-context";

const STORAGE_KEY = "announcement-dismissed";

export default function AnnouncementBar() {
  const lt = useLocaleText();
  const [visible, setVisible] = useState(true);

  // 读取持久化状态：若用户已关闭过公告，则不再显示（避免 hydration 不一致，放在 effect 中）
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setVisible(false);
    } catch {
      // ignore
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable (e.g. private mode) — just hide for this session
    }
  };

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm py-2 px-4 relative z-50">
      <div className="container-main flex items-center justify-center gap-2">
        <span className="animate-pulse">🎓</span>
        <span>
          {lt({
            zh: "招收2027年研究生和2028年推免生",
            en: "Recruiting 2027 Graduate Students and 2028 Recommended-Admission Students",
          })}
        </span>
        <Link
          href="/joinus"
          className="ml-2 underline underline-offset-2 font-medium hover:text-green-200 transition-colors"
        >
          {lt({ zh: "了解详情 →", en: "Learn More →" })}
        </Link>
        <button
          onClick={dismiss}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors text-lg leading-none"
          aria-label="Close announcement"
        >
          ×
        </button>
      </div>
    </div>
  );
}

