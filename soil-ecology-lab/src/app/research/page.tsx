"use client";
import { useState } from "react";
import Link from "next/link";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import research from "@/data/research.json";
import publications from "@/data/publications.json";

export default function ResearchPage() {
  const { t } = useI18n();
  const lt = useLocaleText();
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? research : research.filter((r) => r.id === filter);

  return (
    <div className="container-main py-16">
      <h1 className="section-title text-center">{t.research.title}</h1>
      <div className="h-1 w-12 bg-primary mx-auto mb-8 rounded" />

      {/* 研究方向筛选标签 */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1.5 rounded-full text-base transition-colors ${
            filter === "all" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {lt({ zh: "全部方向", en: "All" })}
        </button>
        {research.map((r) => (
          <button
            key={r.id}
            onClick={() => setFilter(r.id)}
            className={`px-4 py-1.5 rounded-full text-base transition-colors ${
              filter === r.id ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {lt(r.title)}
          </button>
        ))}
      </div>

      {/* 研究方向列表 */}
      <div className="space-y-16">
        {filtered.map((r) => {
          const relatedPubs = publications
            .filter((p) => p.category.includes(r.id))
            .sort((a, b) => b.year - a.year)
            .slice(0, 5);

          const rAny = r as any;
          const methods = String(lt(rAny.methods || { zh: "", en: "" }) || "");
          const methodList = methods ? methods.split(/、|,\s*/).map((m: string) => m.trim()).filter(Boolean) : [];
          const bodyHtml = rAny.bodyHtml || "";

          return (
            <section key={r.id} id={r.id} className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">
                  {r.icon === "leaf" && "🌿"}
                  {r.icon === "layers" && "🧱"}
                  {r.icon === "mountain" && "⛰️"}
                  {r.icon === "satellite" && "🛰️"}
                </span>
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  {lt(r.title)}
                </h2>
              </div>
              <p className="text-text-light leading-relaxed mb-4 max-w-3xl">
                {lt(r.description)}
              </p>

              {/* 研究方法标签 */}
              {methodList.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {methodList.map((m: string, i: number) => (
                    <span key={i} className="tag tag-primary">{m}</span>
                  ))}
                </div>
              )}

              {/* 研究详细内容（研究方法 + 研究特点） */}
              {bodyHtml && (
                <div
                  className="research-content bg-gray-50 rounded-xl p-6 mb-6"
                  dangerouslySetInnerHTML={{ __html: bodyHtml }}
                />
              )}

              {/* 代表性论文 */}
              {relatedPubs.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    {t.research.relatedPubs}
                  </h3>
                  <div className="space-y-3">
                    {relatedPubs.map((pub) => (
                      <Link key={pub.id} href={`/publications#pub-${pub.id}`}
                        className="pub-item text-base block hover:bg-green-50/50">
                        <p className="font-medium text-gray-800 hover:text-primary transition-colors">{pub.title}</p>
                        <p className="text-text-light">
                          {pub.authors} — <span className="text-primary">{pub.journal}</span>, {pub.year}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <hr className="mt-10 border-gray-100" />
            </section>
          );
        })}
      </div>
    </div>
  );
}
