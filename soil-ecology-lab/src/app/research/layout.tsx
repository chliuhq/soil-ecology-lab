import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "研究方向 | Research",
  description: "广西大学土壤生态课题组研究方向：植物多样性与土壤水碳耦合、土壤有机碳动态、土壤侵蚀与水土保持、遥感监测。Research areas: plant diversity–soil carbon coupling, SOC dynamics, soil erosion, remote sensing.",
  alternates: { canonical: "/research" },
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
