"use client";
import Link from "next/link";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import members from "@/data/members.json";

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function SproutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 22V9" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9C12 5.2 9.6 2.5 4 2.5c0 5.6 2.6 8 8 6.5Z" fill="rgba(227,201,160,0.2)" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9c0-3.8 2.4-6.5 8-6.5 0 5.6-2.6 8-8 6.5Z" fill="rgba(227,201,160,0.2)" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useI18n();
  const lt = useLocaleText();
  const year = new Date().getFullYear();
  const pi = members.pi[0];

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.people, href: "/people" },
    { label: t.nav.research, href: "/research" },
    { label: t.nav.publications, href: "/publications" },
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.joinus, href: "/joinus" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="relative z-[2] bg-gray-900 text-gray-300 mt-20">
      {/* 土壤层理顶部条带 */}
      <div className="soil-strata h-[6px] w-full" aria-hidden="true" />
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 课题组信息 */}
          <div>
            <h3 className="text-gray-50 font-serif font-bold text-lg mb-3 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark text-accent-soft">
                <SproutIcon className="w-4 h-4" />
              </span>
              {t.common.copyright}
            </h3>
            <p className="text-sm leading-relaxed mb-3">
              {lt({ zh: "广西大学林学院 / 农学院", en: "College of Forestry / Agriculture, Guangxi University" })}
            </p>
            <p className="text-sm leading-relaxed flex items-start gap-2">
              <PinIcon className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
              <span>{lt({ zh: "广西壮族自治区南宁市西乡塘区大学东路100号", en: "100 Daxue East Rd, Xixiangtang, Nanning, Guangxi, China" })}</span>
            </p>
            <p className="text-sm mt-2 flex items-center gap-2">
              <MailIcon className="w-4 h-4 shrink-0 text-accent" />
              <a href={`mailto:${pi.email}`} className="hover:text-accent-soft transition-colors">{pi.email}</a>
            </p>
          </div>

          {/* 快速导航 */}
          <div>
            <h3 className="text-gray-50 font-semibold mb-3 flex items-center gap-2">
              {lt({ zh: "快速导航", en: "Quick Links" })}
              <span className="soil-strata h-[3px] w-8 rounded" aria-hidden="true" />
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-accent-soft transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 学术主页 */}
          <div>
            <h3 className="text-gray-50 font-semibold mb-3 flex items-center gap-2">
              {lt({ zh: "学术主页", en: "Academic Profiles" })}
              <span className="soil-strata h-[3px] w-8 rounded" aria-hidden="true" />
            </h3>
            <ul className="space-y-3">
              {members.pi.map((m) => (
                <li key={m.id}>
                  <p className="text-xs text-gray-400 mb-1">{lt(m.name)}</p>
                  {m.researchgate && (
                    <a href={m.researchgate} target="_blank" rel="noopener noreferrer"
                       className="text-sm hover:text-accent-soft transition-colors block">
                      🔬 ResearchGate
                    </a>
                  )}
                  {m.googlescholar && (
                    <a href={m.googlescholar} target="_blank" rel="noopener noreferrer"
                       className="text-sm hover:text-accent-soft transition-colors block">
                      🎓 Google Scholar
                    </a>
                  )}
                  {(m as any).homepage && (
                    <a href={(m as any).homepage} target="_blank" rel="noopener noreferrer"
                       className="text-sm hover:text-accent-soft transition-colors block">
                      🏫 {lt({ zh: "学校主页", en: "University Profile" })}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <h3 className="text-gray-50 font-semibold mt-6 mb-3 flex items-center gap-2">
              {lt({ zh: "友情链接", en: "Links" })}
              <span className="soil-strata h-[3px] w-8 rounded" aria-hidden="true" />
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.gxu.edu.cn/" target="_blank" rel="noopener noreferrer"
                   className="text-sm hover:text-accent-soft transition-colors">
                  {lt({ zh: "广西大学", en: "Guangxi University" })}
                </a>
              </li>
              <li>
                <a href="https://lxy.gxu.edu.cn/" target="_blank" rel="noopener noreferrer"
                   className="text-sm hover:text-accent-soft transition-colors">
                  {lt({ zh: "林学院", en: "College of Forestry" })}
                </a>
              </li>
              <li>
                <a href="https://nxy.gxu.edu.cn/" target="_blank" rel="noopener noreferrer"
                   className="text-sm hover:text-accent-soft transition-colors">
                  {lt({ zh: "农学院", en: "College of Agriculture" })}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="border-t border-gray-700/50 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {year} {t.common.copyright}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
