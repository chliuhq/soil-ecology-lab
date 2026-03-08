"use client";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import projects from "@/data/projects.json";
import members from "@/data/members.json";

export default function ProjectsPage() {
  const { t } = useI18n();
  const lt = useLocaleText();

  const ongoing = projects.filter((p) => p.status === "ongoing");
  const completed = projects.filter((p) => p.status === "completed");

  const getMemberName = (id: string) => {
    const m = members.pi.find((m) => m.id === id);
    return m ? lt(m.name) : id;
  };

  const renderProject = (p: (typeof projects)[0], i: number) => (
    <div key={i} className="pub-item bg-white rounded-lg p-5 border border-gray-100">
      <h3 className="font-medium text-gray-900 mb-1">{lt(p.title)}</h3>
      <p className="text-base text-text-light mb-2">{lt(p.funding)}</p>
      <div className="flex flex-wrap gap-3 text-sm">
        <span className="tag tag-primary">{p.period}</span>
        <span className={`tag ${p.role === "pi" ? "tag-accent" : "bg-gray-100 text-gray-600"}`}>
          {p.role === "pi" ? t.projects.pi : t.projects.co}: {getMemberName(p.member)}
        </span>
      </div>
    </div>
  );

  return (
    <div className="container-main py-16">
      <h1 className="section-title text-center">{t.projects.title}</h1>
      <div className="h-1 w-12 bg-primary mx-auto mb-12 rounded" />

      {ongoing.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b pb-2">
            {t.projects.ongoing}
          </h2>
          <div className="space-y-4">{ongoing.map(renderProject)}</div>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 border-b pb-2">
            {t.projects.completed}
          </h2>
          <div className="space-y-4">{completed.map(renderProject)}</div>
        </section>
      )}
    </div>
  );
}
