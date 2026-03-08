import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "土壤生态与水土保持课题组 | Soil Ecology & Conservation Lab",
  description: "广西大学土壤生态与水土保持课题组 — 聚焦植物多样性与土壤水碳耦合、土壤有机碳动态、土壤侵蚀与水土保持、遥感监测",
  keywords: ["soil ecology", "soil erosion", "water conservation", "Guangxi University", "土壤生态", "水土保持", "广西大学"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
