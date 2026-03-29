import type { Metadata } from "next";
import news from "@/data/news.json";
import NewsDetailClient from "./client-page";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = news.find((n: any) => n.id === id) as any;
  if (!item) {
    return { title: "新闻未找到 | News Not Found" };
  }
  return {
    title: `${item.title.zh} | ${item.title.en}`,
    description: item.content?.zh || item.title.zh,
    alternates: { canonical: `/news/${id}` },
    openGraph: {
      title: item.title.zh,
      description: item.content?.en || item.title.en,
      type: "article",
      publishedTime: item.date,
    },
  };
}

export async function generateStaticParams() {
  return (news as any[]).map((n) => ({ id: n.id }));
}

export default function NewsDetailPage() {
  return <NewsDetailClient />;
}
