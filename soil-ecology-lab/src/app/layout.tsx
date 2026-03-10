import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "./client-layout";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

const siteUrl = "https://www.soilecology.online";
const siteTitle = "土壤生态与水土保持课题组 | Soil Ecology & Conservation Lab";
const siteDescription = "广西大学土壤生态与水土保持课题组 — 聚焦植物多样性与土壤水碳耦合、土壤有机碳动态、土壤侵蚀与水土保持、遥感监测";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: ["soil ecology", "soil erosion", "water conservation", "Guangxi University", "土壤生态", "水土保持", "广西大学"],
  openGraph: {
    title: siteTitle,
    description: "Guangxi University — Research on plant diversity–soil water-carbon coupling, SOC dynamics, soil erosion & conservation, remote sensing monitoring",
    url: siteUrl,
    siteName: siteTitle,
    locale: "zh_CN",
    alternateLocale: "en_US",
    type: "website",
    images: [{ url: `${siteUrl}/images/og-cover.jpg`, width: 1200, height: 630, alt: siteTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  metadataBase: new URL(siteUrl),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  name: siteTitle,
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  description: siteDescription,
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "Guangxi University",
    url: "https://www.gxu.edu.cn/",
    address: {
      "@type": "PostalAddress",
      streetAddress: "100 Daxue East Road",
      addressLocality: "Nanning",
      addressRegion: "Guangxi",
      addressCountry: "CN",
    },
  },
  member: [
    {
      "@type": "Person",
      name: "Huaqing Liu",
      jobTitle: "Assistant Professor",
      email: "huaqingliu@gxu.edu.cn",
      url: "https://scholar.google.com/citations?user=AyQBphkAAAAJ",
    },
    {
      "@type": "Person",
      name: "Jiahui Yang",
      jobTitle: "Assistant Professor",
      email: "yangjiahui@gxu.edu.cn",
      url: "https://scholar.google.com/citations?user=spXTiCIAAAAJ",
    },
  ],
  knowsAbout: ["Soil Ecology", "Soil Erosion", "Water Conservation", "Remote Sensing", "Soil Organic Carbon"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
