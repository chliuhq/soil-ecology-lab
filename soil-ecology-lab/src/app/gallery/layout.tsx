import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "照片画廊 | Gallery",
  description: "课题组野外调查、学术交流与获奖瞬间。Lab fieldwork, academic events, and award moments.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
