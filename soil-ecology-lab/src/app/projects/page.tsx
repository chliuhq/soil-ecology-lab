"use client";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import projects from "@/data/projects.json";
import members from "@/data/members.json";

export default function ProjectsPage() {
  const { t } = useI18n();
  const lt = useLocaleText();

  const sortByPeriodDesc = (a: (typeof projects)[0], b: (typeof projects)[0]) =>
    b.period.localeCompare(a.period);
  const ongoing = projects.filter((p) => p.status === "ongoing").sort(sortByPeriodDesc);
  const completed = projects.filter((p) => p.status === "completed").sort(sortByPeriodDesc);

  const getMemberName = (id: string) => {
    const m = members.pi.find((m) => m.id === id);
    return m ? lt(m.name) : id;
  };

  const renderProject = (p: (typeof projects)[0], i: number) => (
    <div key={i} className={`pub-item bg-white dark:bg-dark-surface rounded-lg p-5 border ${p.status === "completed" ? "border-gray-200 dark:border-gray-600 opacity-80" : "border-gray-100 dark:border-gray-700"}`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">{lt(p.title)}</h3>
        {p.status === "completed" && (
          <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
            {t.projects.completed}
          </span>
        )}
      </div>
      <p className="text-base text-text-light dark:text-gray-400 mb-2">{lt(p.funding)}</p>
      <div className="flex flex-wrap gap-3 text-sm">
        <span className="tag tag-primary">{p.period}</span>
        <span className={`tag ${p.role === "pi" ? "tag-accent" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
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
          <h2 className="text-2xl font-serif font-semibold text-gray-800 dark:text-gray-200 mb-6 border-b dark:border-gray-700 pb-2">
            {t.projects.ongoing}
          </h2>
          <div className="space-y-4">{ongoing.map(renderProject)}</div>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif font-semibold text-gray-800 dark:text-gray-200 mb-6 border-b dark:border-gray-700 pb-2">
            {t.projects.completed}
          </h2>
          <div className="space-y-4">{completed.map(renderProject)}</div>
        </section>
      )}
    </div>
  );
}
