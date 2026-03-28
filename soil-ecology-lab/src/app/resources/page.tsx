"use client";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import resources from "@/data/resources.json";

type LocaleText = { zh: string; en: string };

export default function ResourcesPage() {
  const { t } = useI18n();
  const lt = useLocaleText();

  const gxuai = resources.sections.find((s) => s.id === "gxuai")!;
  const textbook = resources.sections.find((s) => s.id === "textbook")!;
  const tools = resources.sections.find((s) => s.id === "tools")!;

  return (
    <div className="container-main py-16">
      <h1 className="section-title text-center">{t.resources.title}</h1>
      <p className="section-subtitle text-center">{t.resources.subtitle}</p>
      <div className="h-1 w-12 bg-primary mx-auto mb-12 rounded" />

      {/* GXUAI 智慧平台 */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b pb-2">
          {gxuai.icon} {lt(gxuai.title)}
        </h2>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8">
          <p className="text-text-main leading-relaxed mb-6">{lt(gxuai.description)}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {gxuai.features!.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-base text-text-main">
                <span className="text-primary">✓</span>
                <span>{lt(f)}</span>
              </div>
            ))}
          </div>
          <a
            href={gxuai.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            {lt(gxuai.linkText!)}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      {/* 数字教材 */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b pb-2">
          {textbook.icon} {lt(textbook.title)}
        </h2>
        <p className="text-text-light mb-6">{lt(textbook.description)}</p>
        <div className="space-y-4">
          {textbook.items!.map((item: any, i: number) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-primary/30 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">{lt(item.title)}</h3>
              <p className="text-base text-text-light mb-4">{lt(item.description)}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium"
              >
                {lt(item.linkText!)}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 学术工具推荐 */}
      <section>
        <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b pb-2">
          {tools.icon} {lt(tools.title)}
        </h2>
        <p className="text-text-light mb-6">{lt(tools.description)}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.items!.map((tool: any, i: number) => (
            <a
              key={i}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover bg-white border border-gray-100 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                  {lt(tool.category)}
                </span>
              </div>
              <p className="text-sm text-text-light">{lt(tool.description)}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
