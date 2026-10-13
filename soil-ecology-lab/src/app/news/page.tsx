"use client";
import Link from "next/link";
import Image from "next/image";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import news from "@/data/news.json";

// 提取 markdown 内容里的前 N 张图片（仅本地图片路径）
function extractImages(content: string, limit: number): string[] {
  const regex = /!\[(.*?)\]\((.*?)\)/g;
  const images: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (match[2].startsWith("/")) images.push(match[2]);
    if (images.length >= limit) break;
  }
  return images;
}

// 去除 markdown 语法，得到纯文本摘要（图片/链接/强调标记等）
function toPlainText(content: string): string {
  return content
    .replace(/!\[.*?\]\(.*?\)/g, "") // 图片
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // 链接 -> 文字
    .replace(/[#>*`_~-]/g, "") // 常见标记符号
    .replace(/\s+/g, " ")
    .trim();
}

export default function NewsPage() {
  const { t } = useI18n();
  const lt = useLocaleText();

  const sorted = [...news].sort((a: any, b: any) => b.date.localeCompare(a.date));

  return (
    <div className="container-main py-16">
      <h1 className="section-title text-center">{t.news.title}</h1>
      <div className="h-1 w-12 bg-primary mx-auto mb-10 rounded" />

      <div className="max-w-3xl mx-auto space-y-8">
        {sorted.map((n: any) => {
          const content = n.content ? String(lt(n.content)) : "";
          const images = extractImages(content, 2);
          const excerpt = toPlainText(content);
          return (
            <article key={n.id} id={`news-${n.id}`} className="scroll-mt-20 border-b border-gray-100 dark:border-gray-700 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-white bg-primary px-2.5 py-0.5 rounded">{n.date}</span>
                <Link href={`/news/${n.id}`} className="text-xs text-primary hover:underline">
                  {t.news.readMore} →
                </Link>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                <Link href={`/news/${n.id}`} className="hover:text-primary transition-colors">
                  {lt(n.title)}
                </Link>
              </h2>
              {n.content ? (
                <p className="text-base text-text-main leading-relaxed line-clamp-2">{excerpt}</p>
              ) : null}
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-3 max-w-md">
                  {images.map((src) => (
                    <Link key={src} href={`/news/${n.id}`} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 50vw, 200px"
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

