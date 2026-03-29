import type { MetadataRoute } from "next";
import publications from "@/data/publications.json";
import news from "@/data/news.json";

const BASE = "https://www.soilecology.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const pages = [
    { url: BASE, changeFrequency: "weekly" as const, priority: 1.0, lastModified: now },
    { url: `${BASE}/people`, changeFrequency: "monthly" as const, priority: 0.8, lastModified: now },
    { url: `${BASE}/research`, changeFrequency: "monthly" as const, priority: 0.8, lastModified: now },
    { url: `${BASE}/publications`, changeFrequency: "weekly" as const, priority: 0.9, lastModified: now },
    { url: `${BASE}/projects`, changeFrequency: "monthly" as const, priority: 0.7, lastModified: now },
    { url: `${BASE}/news`, changeFrequency: "weekly" as const, priority: 0.7, lastModified: now },
    { url: `${BASE}/resources`, changeFrequency: "monthly" as const, priority: 0.6, lastModified: now },
    { url: `${BASE}/joinus`, changeFrequency: "monthly" as const, priority: 0.6, lastModified: now },
    { url: `${BASE}/contact`, changeFrequency: "monthly" as const, priority: 0.5, lastModified: now },
  ];

  const pubPages = publications.map((p) => ({
    url: `${BASE}/publications/${p.id}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
    lastModified: `${p.year}-01-01`,
  }));

  const newsPages = (news as any[]).map((n) => ({
    url: `${BASE}/news/${n.id}`,
    changeFrequency: "yearly" as const,
    priority: 0.4,
    lastModified: n.date.length <= 7 ? `${n.date}-01` : n.date,
  }));

  return [...pages, ...pubPages, ...newsPages];
}
