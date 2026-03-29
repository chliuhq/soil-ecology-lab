import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "新闻动态 | News",
  description: "课题组最新动态、学术会议、科研进展。Latest news, academic conferences, and research updates from the Soil Ecology Lab.",
  alternates: { canonical: "/news" },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
