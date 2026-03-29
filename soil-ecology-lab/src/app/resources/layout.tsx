import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "学术资源 | Resources",
  description: "课题组学术资源推荐：GXUAI智慧平台、数字教材、学术工具。Academic resources: GXUAI platform, digital textbooks, and research tools.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
