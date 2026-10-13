"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocaleText } from "@/lib/i18n-context";
import FadeInOnScroll from "@/components/FadeInOnScroll";

/* ── 画廊数据：按活动分组，图片与新闻页共用 ── */
interface GalleryPhoto {
  src: string;
  caption: { zh: string; en: string };
}
interface GalleryAlbum {
  id: string;
  title: { zh: string; en: string };
  date: string;
  newsHref: string;
  photos: GalleryPhoto[];
}

const ALBUMS: GalleryAlbum[] = [
  {
    id: "pingxiang-2026",
    title: { zh: "广西凭祥多树种混交林土壤调查", en: "Pingxiang Multi-Species Mixed Forest Soil Survey" },
    date: "2026.04",
    newsHref: "/news/010-pingxiang-fieldwork",
    photos: [
      { src: "/images/news/2026-04-08-01.webp", caption: { zh: "样地标志牌", en: "Site signboard" } },
      { src: "/images/news/2026-04-08-02.webp", caption: { zh: "样地调查", en: "Plot survey" } },
      { src: "/images/news/2026-04-08-03.webp", caption: { zh: "土壤剖面", en: "Soil profile" } },
    ],
  },
  {
    id: "forest-transect-2026",
    title: { zh: "中国东部森林样带调查", en: "Eastern China Forest Transect Survey" },
    date: "2026.07–09",
    newsHref: "/news/007-eastern-forest-transect",
    photos: [
      { src: "/images/news/2026-09-04/IMG_6186.webp", caption: { zh: "野外调查", en: "Field survey" } },
      { src: "/images/news/2026-09-04/IMG_6211.webp", caption: { zh: "样品采集", en: "Sample collection" } },
      { src: "/images/news/2026-09-04/IMG_6257.webp", caption: { zh: "森林样带", en: "Forest transect" } },
      { src: "/images/news/2026-09-04/IMG_6435.webp", caption: { zh: "样地工作", en: "Plot work" } },
      { src: "/images/news/2026-09-04/IMG_6681.webp", caption: { zh: "团队合影", en: "Team photo" } },
      { src: "/images/news/2026-09-04/IMG_6685.webp", caption: { zh: "野外路上", en: "On the way" } },
    ],
  },
  {
    id: "smart-agriculture-award-2026",
    title: { zh: "智慧农业创意大赛获奖", en: "Smart Agriculture Creative Competition Award" },
    date: "2026.09",
    newsHref: "/news/009-smart-agriculture-award",
    photos: [
      { src: "/images/news/009-smart-agriculture-award/01F23D5FDF718287AC19D10FCD33E841.webp", caption: { zh: "参赛现场", en: "Competition venue" } },
      { src: "/images/news/009-smart-agriculture-award/174DEF610D1FF76E05BBE72EC73A66E4.webp", caption: { zh: "项目展示", en: "Project presentation" } },
      { src: "/images/news/009-smart-agriculture-award/406CC0FF7CDC5ECA4228BF107C02378A.webp", caption: { zh: "获奖证书", en: "Award certificate" } },
      { src: "/images/news/009-smart-agriculture-award/D60E88B7935F89111AD72276ACA5753A.webp", caption: { zh: "团队合影", en: "Team photo" } },
    ],
  },
];

const ALL_PHOTOS = ALBUMS.flatMap((a) => a.photos.map((p) => ({ ...p, album: a })));

export default function GalleryPage() {
  const lt = useLocaleText();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length)),
    []
  );
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % ALL_PHOTOS.length)),
    []
  );

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, prev, next]);

  const openIndex = (albumIdx: number, photoIdx: number) => {
    let offset = 0;
    for (let i = 0; i < albumIdx; i++) offset += ALBUMS[i].photos.length;
    setLightbox(offset + photoIdx);
  };

  const current = lightbox !== null ? ALL_PHOTOS[lightbox] : null;

  return (
    <div className="container-main py-16">
      <h1 className="section-title text-center">{lt({ zh: "照片画廊", en: "Photo Gallery" })}</h1>
      <div className="h-1 w-12 bg-primary mx-auto mb-4 rounded" />
      <p className="text-center text-text-light dark:text-gray-400 text-sm mb-12 max-w-xl mx-auto">
        {lt({
          zh: "记录课题组的野外调查、学术交流与获奖瞬间",
          en: "Moments from our fieldwork, academic events, and awards",
        })}
      </p>

      {ALBUMS.map((album, ai) => (
        <FadeInOnScroll key={album.id}>
          <section className="mb-14">
            <div className="flex items-end justify-between mb-5">
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-gray-100">
                  {lt(album.title)}
                </h2>
                <p className="text-xs text-text-light dark:text-gray-400 mt-1">{album.date}</p>
                <div className="h-1 w-10 bg-primary rounded mt-2" />
              </div>
              <Link
                href={album.newsHref}
                className="text-sm text-primary hover:underline font-medium shrink-0"
              >
                {lt({ zh: "查看新闻 →", en: "View news →" })}
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {album.photos.map((photo, pi) => (
                <button
                  key={photo.src}
                  onClick={() => openIndex(ai, pi)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-zoom-in"
                  aria-label={lt(photo.caption)}
                >
                  <Image
                    src={photo.src}
                    alt={lt(photo.caption)}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-2 left-3 right-3 text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                    {lt(photo.caption)}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </FadeInOnScroll>
      ))}

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl leading-none p-2 z-10"
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>
          <button
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl p-3 z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl p-3 z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
          >
            ›
          </button>
          <div
            className="relative w-[90vw] h-[75vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={lt(current.caption)}
              fill
              sizes="90vw"
              className="object-contain"
            />
            <p className="absolute -bottom-8 left-0 right-0 text-center text-white/80 text-sm">
              {lt(current.caption)} · {lt(current.album.title)}（{lightbox! + 1}/{ALL_PHOTOS.length}）
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
