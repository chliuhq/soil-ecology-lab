import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "学术论文 | Publications",
  description: "课题组发表的学术论文列表，涵盖土壤生态学、植物多样性、土壤有机碳、水土保持等领域。Published papers on soil ecology, plant diversity, soil organic carbon, and conservation.",
  alternates: { canonical: "/publications" },
};

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
