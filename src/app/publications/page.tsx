"use client";
import { useState } from "react";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import publications from "@/data/publications.json";

export default function PublicationsPage() {
  const { t } = useI18n();
  const lt = useLocaleText();
  const [filter, setFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const sorted = [...publications].sort((a, b) => b.year - a.year);
  const years = [...new Set(sorted.map((p) => p.year))];
  const filtered = filter === "all" ? sorted : sorted.filter((p) => p.year === Number(filter));

  const toggleSummary = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="container-main py-16">
      <h1 className="section-title text-center">{t.publications.title}</h1>
      <div className="h-1 w-12 bg-primary mx-auto mb-8 rounded" />

      {/* 年份筛选 */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
            filter === "all" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {t.publications.all}
        </button>
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setFilter(String(y))}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              filter === String(y) ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* 论文列表 */}
      <div className="max-w-4xl mx-auto">
        {years
          .filter((y) => filter === "all" || y === Number(filter))
          .map((year) => (
            <div key={year} className="mb-10">
              <h2 className="text-xl font-serif font-bold text-gray-800 mb-4 border-b pb-2">
                {year}
              </h2>
              <div className="space-y-4">
                {filtered
                  .filter((p) => p.year === year)
                  .map((pub) => (
                    <div key={pub.id} id={`pub-${pub.id}`} className="pub-item scroll-mt-20">
                      <h3 className="font-medium text-gray-900 mb-1">{pub.title}</h3>
                      <p className="text-sm text-text-light">{pub.authors}</p>
                      <p className="text-sm mt-1">
                        <span className="font-medium text-primary">{pub.journal}</span>
                        {pub.volume && <span className="text-text-light">, {pub.volume}</span>}
                        {pub.pages && <span className="text-text-light">: {pub.pages}</span>}
                      </p>

                      {/* 按钮行 */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {pub.doi && (
                          <a
                            href={`https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                          >
                            <span>DOI</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                        {pub.summary && (
                          <button
                            onClick={() => toggleSummary(pub.id)}
                            className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full transition-colors ${
                              expandedId === pub.id
                                ? "bg-amber-200 text-amber-900"
                                : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                            }`}
                          >
                            <span>{expandedId === pub.id ? (t.publications as any).collapseSummary : (t.publications as any).summary}</span>
                            <svg className={`w-3 h-3 transition-transform ${expandedId === pub.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* 论文解读展开区 */}
                      {expandedId === pub.id && pub.summary && (
                        <div className="mt-3 p-4 bg-amber-50 rounded-lg border border-amber-100 text-sm text-text-main leading-relaxed">
                          <p>{lt(pub.summary)}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
