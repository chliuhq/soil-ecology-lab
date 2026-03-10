"use client";
import Link from "next/link";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import news from "@/data/news.json";

export default function NewsPage() {
  const { t } = useI18n();
  const lt = useLocaleText();

  return (
    <div className="container-main py-16">
      <h1 className="section-title text-center">{t.news.title}</h1>
      <div className="h-1 w-12 bg-primary mx-auto mb-10 rounded" />

      <div className="max-w-3xl mx-auto space-y-8">
        {news.map((n: any) => (
          <article key={n.id} id={`news-${n.id}`} className="scroll-mt-20 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-white bg-primary px-2.5 py-0.5 rounded">{n.date}</span>
              {n.link && (
                <Link href={n.link} className="text-xs text-primary hover:underline">
                  {t.news.readMore} →
                </Link>
              )}
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              <Link href={`/news/${n.id}`} className="hover:text-primary transition-colors">
                {lt(n.title)}
              </Link>
            </h2>
            {n.content ? (
              <p className="text-base text-text-main leading-relaxed">{String(lt(n.content))}</p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

