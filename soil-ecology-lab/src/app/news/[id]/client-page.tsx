"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import news from "@/data/news.json";

// 从 markdown 内容中提取所有图片（markdown 语法）
function extractImages(content: string): string[] {
  const regex = /!\[(.*?)\]\((.*?)\)/g;
  const images: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    images.push(match[2]);
  }
  return images;
}

// 将 markdown 图片语法转为 HTML
function renderImages(content: string): string {
  return content.replace(/!\[(.*?)\]\((.*?)\)/g, (_match: string, alt: string, src: string) => {
    return `<figure style="margin:1.5rem 0;text-align:center;"><img src="${src}" alt="${alt}" style="max-width:640px;width:100%;border-radius:8px;" loading="lazy" /><figcaption style="font-size:0.875rem;color:#666;margin-top:0.5rem;">${alt}</figcaption></figure>`;
  });
}

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
          <div
            className="text-base text-text-main leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderImages(String(lt(n.content))) }}
          />
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

