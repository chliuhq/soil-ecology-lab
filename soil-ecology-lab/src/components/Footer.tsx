"use client";
import Link from "next/link";
import { useI18n, useLocaleText } from "@/lib/i18n-context";
import members from "@/data/members.json";

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
    <footer className="relative bg-gray-900 text-gray-300 mt-20">
      {/* Subtle top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 课题组信息 */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-3">🌱 {t.common.copyright}</h3>
            <p className="text-sm leading-relaxed mb-3">
              {lt({ zh: "广西大学林学院 / 农学院", en: "College of Forestry / Agriculture, Guangxi University" })}
            </p>
            <p className="text-sm leading-relaxed">
              📍 {lt({ zh: "广西壮族自治区南宁市西乡塘区大学东路100号", en: "100 Daxue East Rd, Xixiangtang, Nanning, Guangxi, China" })}
            </p>
            <p className="text-sm mt-2">
              📧 <a href={`mailto:${pi.email}`} className="hover:text-white transition-colors">{pi.email}</a>
            </p>
          </div>

          {/* 快速导航 */}
          <div>
            <h3 className="text-white font-semibold mb-3">
              {lt({ zh: "快速导航", en: "Quick Links" })}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 学术主页 */}
          <div>
            <h3 className="text-white font-semibold mb-3">
              {lt({ zh: "学术主页", en: "Academic Profiles" })}
            </h3>
            <ul className="space-y-2">
              {pi.researchgate && (
                <li>
                  <a href={pi.researchgate} target="_blank" rel="noopener noreferrer"
                     className="text-sm hover:text-white transition-colors">
                    🔬 ResearchGate
                  </a>
                </li>
              )}
              {pi.googlescholar && (
                <li>
                  <a href={pi.googlescholar} target="_blank" rel="noopener noreferrer"
                     className="text-sm hover:text-white transition-colors">
                    🎓 Google Scholar
                  </a>
                </li>
              )}
              {(pi as any).homepage && (
                <li>
                  <a href={(pi as any).homepage} target="_blank" rel="noopener noreferrer"
                     className="text-sm hover:text-white transition-colors">
                    🏫 {lt({ zh: "学校主页", en: "University Profile" })}
                  </a>
                </li>
              )}
            </ul>

            <h3 className="text-white font-semibold mt-6 mb-3">
              {lt({ zh: "友情链接", en: "Links" })}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.gxu.edu.cn/" target="_blank" rel="noopener noreferrer"
                   className="text-sm hover:text-white transition-colors">
                  {lt({ zh: "广西大学", en: "Guangxi University" })}
                </a>
              </li>
              <li>
                <a href="https://lxy.gxu.edu.cn/" target="_blank" rel="noopener noreferrer"
                   className="text-sm hover:text-white transition-colors">
                  {lt({ zh: "林学院", en: "College of Forestry" })}
                </a>
              </li>
              <li>
                <a href="https://nxy.gxu.edu.cn/" target="_blank" rel="noopener noreferrer"
                   className="text-sm hover:text-white transition-colors">
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
