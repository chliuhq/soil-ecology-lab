import type { Metadata } from "next";
import publications from "@/data/publications.json";
import PublicationDetailClient from "./client-page";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const pub = publications.find((p) => String(p.id) === id);
  if (!pub) {
    return { title: "论文未找到 | Publication Not Found" };
  }
  const desc = `${pub.authors} (${pub.year}). ${pub.journal}${pub.volume ? `, ${pub.volume}` : ""}${pub.pages ? `: ${pub.pages}` : ""}`;
  return {
    title: pub.title,
    description: desc,
    alternates: { canonical: `/publications/${id}` },
    openGraph: {
      title: pub.title,
      description: desc,
      type: "article",
      authors: pub.authors.split(",").map((a) => a.trim().replace(/\*/g, "")),
    },
  };
}

export async function generateStaticParams() {
  return publications.map((p) => ({ id: String(p.id) }));
}

export default function PublicationDetailPage() {
  return <PublicationDetailClient />;
}
