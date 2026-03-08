"use client";
import { useState } from "react";
import { useI18n } from "@/lib/i18n-context";
import publications from "@/data/publications.json";

export default function PublicationsPage() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<string>("all");

  const sorted = [...publications].sort((a, b) => b.year - a.year);
  const years = [...new Set(sorted.map((p) => p.year))];

  const filtered = filter === "all" ? sorted : sorted.filter((p) => p.year === Number(filter));

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
                    <div key={pub.id} className="pub-item">
                      <h3 className="font-medium text-gray-900 mb-1">{pub.title}</h3>
                      <p className="text-sm text-text-light">{pub.authors}</p>
                      <p className="text-sm mt-1">
                        <span className="font-medium text-primary">{pub.journal}</span>
                        {pub.volume && <span className="text-text-light">, {pub.volume}</span>}
                        {pub.pages && <span className="text-text-light">: {pub.pages}</span>}
                      </p>
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-1 text-xs tag tag-primary"
                        >
                          DOI
                        </a>
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
