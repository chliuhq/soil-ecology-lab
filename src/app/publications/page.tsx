"use client";
import { useState } from "react";
import Image from "next/image";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import publications from "@/data/publications.json";

export default function PublicationsPage() {
  const { t } = useI18n();
  const lt = useLocaleText();
  const [filter, setFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const sorted = [...publications].sort((a, b) => b.year - a.year);
  const years = [...new Set(sorted.map((p) => p.year))];
  const filtered = filter === "all" ? sorted : sorted.filter((p) => p.year === Number(filter));

  const toggleSummary = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const pubs = t.publications as any;

  return (
    <div className="container-main py-16">
      <h1 className="section-title text-center">{t.publications.title}</h1>
      <div className="h-1 w-12 bg-primary mx-auto mb-8 rounded" />

      {/* 年份筛选 */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1.5 rounded-full text-base transition-colors ${
            filter === "all" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {t.publications.all}
        </button>
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setFilter(String(y))}
            className={`px-4 py-1.5 rounded-full text-base transition-colors ${
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
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4 border-b pb-2">
                {year}
              </h2>
              <div className="space-y-4">
                {filtered
                  .filter((p) => p.year === year)
                  .map((pub) => {
                    const summary = pub.summary as any;
                    const hasHighlights = summary?.highlights;
                    const hasImages = summary?.images?.length > 0;

                    return (
                      <div key={pub.id} id={`pub-${pub.id}`} className="pub-item scroll-mt-20">
                        <h3 className="font-medium text-gray-900 mb-1">{pub.title}</h3>
                        <p className="text-base text-text-light">{pub.authors}</p>
                        <p className="text-base mt-1">
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
                              className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                            >
                              <span>DOI</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                          {summary && (
                            <button
                              onClick={() => toggleSummary(pub.id)}
                              className={`inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full transition-colors ${
                                expandedId === pub.id
                                  ? "bg-amber-200 text-amber-900"
                                  : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              }`}
                            >
                              <span>{expandedId === pub.id ? pubs.collapseSummary : pubs.summary}</span>
                              <svg className={`w-3 h-3 transition-transform ${expandedId === pub.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          )}
                        </div>

                        {/* 论文解读展开区 - 图文并茂 */}
                        {expandedId === pub.id && summary && (
                          <div className="mt-3 p-5 bg-amber-50 rounded-lg border border-amber-100 text-base text-text-main leading-relaxed">
                            {/* 概述 */}
                            <p className="mb-4">{lt(summary)}</p>

                            {/* 图片区域 */}
                            {hasImages && (
                              <div className="mb-4">
                                {summary.images.map((img: any, idx: number) => (
                                  <figure key={idx} className="mb-3">
                                    <div
                                      className="relative w-full bg-white rounded-lg overflow-hidden border border-amber-100 cursor-pointer hover:shadow-md transition-shadow"
                                      onClick={() => setLightboxImg(img.src)}
                                    >
                                      <Image
                                        src={img.src}
                                        alt={lt(img.caption)}
                                        width={800}
                                        height={400}
                                        className="w-full h-auto object-contain"
                                        unoptimized
                                      />
                                    </div>
                                    <figcaption className="text-sm text-text-light mt-1.5 text-center italic">
                                      {lt(img.caption)}
                                    </figcaption>
                                  </figure>
                                ))}
                              </div>
                            )}

                            {/* 研究要点 */}
                            {hasHighlights && (
                              <div className="bg-white/60 rounded-lg p-4 border border-amber-100/50">
                                <h4 className="text-sm font-semibold text-amber-900 mb-2 uppercase tracking-wide">
                                  {pubs.keyFindings || "Research Highlights"}
                                </h4>
                                <ul className="space-y-1.5">
                                  {(lt(summary.highlights) as string[]).map((h: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm">
                                      <span className="text-primary mt-0.5 shrink-0">&#10003;</span>
                                      <span>{h}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
      </div>

      {/* 图片灯箱 */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <Image
              src={lightboxImg}
              alt="Paper figure"
              width={1200}
              height={800}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              unoptimized
            />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-lg"
              aria-label="Close"
            >
              &#10005;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
