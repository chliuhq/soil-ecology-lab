"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import news from "@/data/news.json";

export default function NewsDetailClient() {
  const params = useParams();
  const { t } = useI18n();
  const lt = useLocaleText();

  const item = news.find((n: any) => n.id === params.id);
  if (!item) {
    return (
      <div className="container-main py-16 text-center">
        <p className="text-xl text-text-light">{lt({ zh: "新闻未找到", en: "News not found" })}</p>
        <Link href="/news" className="text-primary hover:underline mt-4 inline-block">
          ← {lt({ zh: "返回新闻列表", en: "Back to news" })}
        </Link>
      </div>
    );
  }

  const n = item as any;

  return (
    <div className="container-main py-16 max-w-3xl mx-auto">
      <Link href="/news" className="text-primary hover:underline text-sm mb-6 inline-block">
        ← {lt({ zh: "返回新闻列表", en: "Back to news" })}
      </Link>

      <article>
        <div className="mb-4">
          <span className="text-sm text-white bg-primary px-3 py-1 rounded">{n.date}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
          {lt(n.title)}
        </h1>
        {n.content && (
          <div className="text-base text-text-main leading-relaxed">
            <p>{String(lt(n.content))}</p>
          </div>
        )}
        {n.link && n.link !== `/news/${n.id}` && (
          <div className="mt-8">
            <Link href={n.link} className="text-primary hover:underline font-medium">
              {lt({ zh: "查看相关页面", en: "View related page" })} →
            </Link>
          </div>
        )}
      </article>
    </div>
  );
}

