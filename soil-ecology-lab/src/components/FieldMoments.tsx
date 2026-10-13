"use client";
import Link from "next/link";
import Image from "next/image";
import { useLocaleText } from "@/lib/i18n-context";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { ALBUMS } from "@/data/gallery";

/** 首页照片墙：每个相册取前 2 张代表图，点击跳转 /gallery 对应相册 */
export default function FieldMoments() {
  const lt = useLocaleText();

  // 每相册取 2 张，拼成 6 张精选
  const picks = ALBUMS.flatMap((album) =>
    album.photos.slice(0, 2).map((photo) => ({ photo, album }))
  );

  return (
    <section className="py-14 bg-bg-light dark:bg-dark-bg">
      <div className="container-main">
        <FadeInOnScroll>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100">
                {lt({ zh: "田野瞬间", en: "Field Moments" })}
              </h2>
              <div className="h-1 w-12 bg-primary rounded mt-2" />
            </div>
            <Link href="/gallery" className="text-sm text-primary hover:underline font-medium shrink-0">
              {lt({ zh: "照片画廊 →", en: "Photo Gallery →" })}
            </Link>
          </div>
        </FadeInOnScroll>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {picks.map(({ photo, album }, i) => (
            <FadeInOnScroll key={photo.src} delay={i * 60} className="h-full">
              <Link
                href={`/gallery#${album.id}`}
                className="group relative block aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800"
                aria-label={`${lt(album.title)} · ${lt(photo.caption)}`}
              >
                <Image
                  src={photo.src}
                  alt={lt(photo.caption)}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-2 left-2.5 right-2.5 text-[11px] text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                  {lt(album.title)}
                </span>
              </Link>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
