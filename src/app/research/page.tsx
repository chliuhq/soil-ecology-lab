"use client";
import Link from "next/link";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import research from "@/data/research.json";
import publications from "@/data/publications.json";

export default function ResearchPage() {
  const { t } = useI18n();
  const lt = useLocaleText();

  return (
    <div className="container-main py-16">
      <h1 className="section-title text-center">{t.research.title}</h1>
      <div className="h-1 w-12 bg-primary mx-auto mb-12 rounded" />

      <div className="space-y-16">
        {research.map((r) => {
          const relatedPubs = publications
            .filter((p) => p.category.includes(r.id))
            .sort((a, b) => b.year - a.year)
            .slice(0, 5);

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
              <p className="text-text-light leading-relaxed mb-6 max-w-3xl">
                {lt(r.description)}
              </p>

              {relatedPubs.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    {t.research.relatedPubs}
                  </h3>
                  <div className="space-y-3">
                    {relatedPubs.map((pub) => (
                      <Link key={pub.id} href={`/publications#pub-${pub.id}`}
                        className="pub-item text-sm block hover:bg-green-50/50">
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
