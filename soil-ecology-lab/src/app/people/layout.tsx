import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "团队成员 | People",
  description: "广西大学土壤生态课题组成员介绍：刘华清、杨佳慧及研究生团队。Meet our team: Huaqing Liu, Jiahui Yang, and graduate students.",
  alternates: { canonical: "/people" },
};

export default function PeopleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
