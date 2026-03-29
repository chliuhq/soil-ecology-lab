import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "加入我们 | Join Us",
  description: "广西大学土壤生态课题组招收生态学学硕和林业专硕研究生。Graduate student recruitment in ecology and forestry at Guangxi University.",
  alternates: { canonical: "/joinus" },
};

export default function JoinUsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
