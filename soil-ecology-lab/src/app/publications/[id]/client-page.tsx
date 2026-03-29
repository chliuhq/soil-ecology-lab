"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import publications from "@/data/publications.json";

function genBibtex(pub: any) {
  const key = `${pub.authors.split(",")[0].trim().split(" ").pop()}${pub.year}`;
  return `@article{${key},
  author    = {${pub.authors.replace(/\*/g, "")}},
  title     = {${pub.title}},
  journal   = {${pub.journal}},
  year      = {${pub.year}},${pub.volume ? `\n  volume    = {${pub.volume}},` : ""}${pub.pages ? `\n  pages     = {${pub.pages}},` : ""}${pub.doi ? `\n  doi       = {${pub.doi}},` : ""}
}`;
}

function genApa(pub: any) {
  const authors = pub.authors.replace(/\*/g, "");
  return `${authors} (${pub.year}). ${pub.title}. ${pub.journal}${pub.volume ? `, ${pub.volume}` : ""}${pub.pages ? `, ${pub.pages}` : ""}.${pub.doi ? ` https://doi.org/${pub.doi}` : ""}`;
}

export default function PublicationDetailClient() {
  const params = useParams();
  const { t } = useI18n();
  const lt = useLocaleText();
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [copied, setCopied] = useState("");

  const pub = publications.find((p) => String(p.id) === params.id);
  if (!pub) {
    return (
      <div className="container-main py-16 text-center">
        <p className="text-xl text-text-light">{lt({ zh: "论文未找到", en: "Publication not found" })}</p>
        <Link href="/publications" className="text-primary hover:underline mt-4 inline-block">
          ← {lt({ zh: "返回论文列表", en: "Back to publications" })}
        </Link>
      </div>
    );
  }

  const summary = pub.summary as any;
  const hasHighlights = summary?.highlights;
  const hasImages = summary?.images?.length > 0;
  const pubs = t.publications as any;

  return (
    <div className="container-main py-16 max-w-4xl mx-auto">
      {/* 返回链接 */}
      <Link href="/publications" className="text-primary hover:underline text-sm mb-6 inline-block">
        ← {lt({ zh: "返回论文列表", en: "Back to publications" })}
      </Link>

      {/* 标题 */}
      <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4 leading-tight">{pub.title}</h1>

      {/* 作者 */}
      <p className="text-base text-text-light mb-3">{pub.authors}</p>

      {/* 期刊信息 */}
      <p className="text-base mb-4">
        <span className="font-medium text-primary">{pub.journal}</span>
        {pub.volume && <span className="text-text-light">, {pub.volume}</span>}
        {pub.pages && <span className="text-text-light">: {pub.pages}</span>}
        <span className="text-text-light"> ({pub.year})</span>
      </p>

      {/* 按钮行 */}
      <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-200">
        {pub.doi && (
          <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm px-4 py-1.5 rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition-colors">
            DOI ↗
          </a>
        )}
        {(pub as any).pdf && (
          <a href={(pub as any).pdf} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
            PDF ↓
          </a>
        )}
      </div>

      {/* 论文解读 */}
      {summary && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {lt({ zh: "论文解读", en: "Paper Summary" })}
          </h2>
          <div className="pub-summary text-base text-text-main leading-relaxed"
            dangerouslySetInnerHTML={{ __html: lt(summary) as string }} />
        </section>
      )}

      {/* 图片 */}
      {hasImages && (
        <section className="mb-8">
          {summary.images.map((img: any, idx: number) => (
            <figure key={idx} className="mb-4">
              <div className="relative w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setLightboxImg(img.src)}>
                <Image src={img.src} alt={lt(img.caption)} width={800} height={400}
                  className="w-full h-auto object-contain" />
              </div>
              <figcaption className="text-sm text-text-light mt-1.5 text-center italic">{lt(img.caption)}</figcaption>
            </figure>
          ))}
        </section>
      )}

      {/* 研究亮点 */}
      {hasHighlights && (
        <section className="mb-8 bg-green-50 rounded-lg p-5 border border-green-100">
          <h3 className="text-sm font-semibold text-green-900 mb-3 uppercase tracking-wide">
            {pubs.keyFindings || "Research Highlights"}
          </h3>
          <ul className="space-y-2">
            {(lt(summary.highlights) as string[]).map((h: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5 shrink-0">✓</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 引用 */}
      <section className="bg-gray-50 rounded-lg p-5 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">{lt({ zh: "引用格式", en: "Citation" })}</h3>
        <div className="space-y-3 text-sm">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">APA</span>
              <button onClick={() => { navigator.clipboard.writeText(genApa(pub)); setCopied("apa"); }}
                className="text-xs text-primary hover:underline">
                {copied === "apa" ? "✓ Copied" : lt({ zh: "复制", en: "Copy" })}
              </button>
            </div>
            <p className="bg-white rounded p-2 text-text-light break-all">{genApa(pub)}</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">BibTeX</span>
              <button onClick={() => { navigator.clipboard.writeText(genBibtex(pub)); setCopied("bib"); }}
                className="text-xs text-primary hover:underline">
                {copied === "bib" ? "✓ Copied" : lt({ zh: "复制", en: "Copy" })}
              </button>
            </div>
            <pre className="bg-white rounded p-2 text-text-light overflow-x-auto whitespace-pre-wrap text-xs">{genBibtex(pub)}</pre>
          </div>
        </div>
      </section>

      {/* 图片灯箱 */}
      {lightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}>
          <div className="relative max-w-5xl max-h-[90vh]">
            <Image src={lightboxImg} alt="Paper figure" width={1200} height={800}
              className="max-w-full max-h-[85vh] object-contain rounded-lg" />
            <button onClick={() => setLightboxImg(null)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-lg"
              aria-label="Close">&#10005;</button>
          </div>
        </div>
      )}
    </div>
  );
}
