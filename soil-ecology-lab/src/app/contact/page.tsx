"use client";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import members from "@/data/members.json";

export default function ContactPage() {
  const { t } = useI18n();
  const lt = useLocaleText();

  return (
    <div className="container-main py-16">
      <h1 className="section-title text-center">{t.contact.title}</h1>
      <div className="h-1 w-12 bg-primary mx-auto mb-12 rounded" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {members.pi.map((m) => (
          <div key={m.id} className="bg-white border border-gray-100 rounded-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                {m.id === "huaqing-liu" ? "👨‍🔬" : "👩‍🔬"}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{lt(m.name)}</h2>
                <p className="text-base text-primary">{lt(m.title)}</p>
              </div>
            </div>

            <div className="space-y-3 text-base">
              <div>
                <span className="font-semibold text-gray-700">{t.contact.address}:</span>
                <p className="text-text-light mt-1">{lt(m.department)}</p>
                <p className="text-text-light">{lt({
                  zh: "广西南宁市大学东路100号",
                  en: "100 Daxue East Road, Nanning, Guangxi, China"
                })}</p>
              </div>

              <div>
                <span className="font-semibold text-gray-700">{t.contact.email}:</span>
                <p className="mt-1">
                  <a href={`mailto:${m.email}`} className="text-primary hover:underline">{m.email}</a>
                </p>
              </div>

              <div>
                <span className="font-semibold text-gray-700">{t.contact.profiles}:</span>
                <div className="flex gap-3 mt-2">
                  {m.researchgate && (
                    <a href={m.researchgate} target="_blank" rel="noopener noreferrer"
                       className="tag tag-primary">ResearchGate</a>
                  )}
                  {m.googlescholar && (
                    <a href={m.googlescholar} target="_blank" rel="noopener noreferrer"
                       className="tag tag-accent">Google Scholar</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
