import type { MetadataRoute } from "next";
import publications from "@/data/publications.json";
import news from "@/data/news.json";

const BASE = "https://www.soilecology.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { url: BASE, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE}/people`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/research`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/publications`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE}/projects`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE}/news`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE}/joinus`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/contact`, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const pubPages = publications.map((p) => ({
    url: `${BASE}/publications/${p.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const newsPages = (news as any[]).map((n) => ({
    url: `${BASE}/news/${n.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...pages, ...pubPages, ...newsPages].map((p) => ({
    ...p,
    lastModified: new Date(),
  }));
}

