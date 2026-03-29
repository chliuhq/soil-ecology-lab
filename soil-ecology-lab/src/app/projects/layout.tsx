import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "科研项目 | Projects",
  description: "课题组承担的科研项目，包括国家自然科学基金、广西自然科学基金等。Research projects funded by NSFC, Guangxi NSF, and more.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
