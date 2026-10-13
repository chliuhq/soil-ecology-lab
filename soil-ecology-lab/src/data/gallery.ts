/* ── 画廊共享数据：gallery 页与首页照片墙共用 ── */
export interface GalleryPhoto {
  src: string;
  caption: { zh: string; en: string };
}
export interface GalleryAlbum {
  id: string;
  title: { zh: string; en: string };
  date: string;
  newsHref: string;
  photos: GalleryPhoto[];
}

export const ALBUMS: GalleryAlbum[] = [
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

export const ALL_PHOTOS = ALBUMS.flatMap((a) => a.photos.map((p) => ({ ...p, album: a })));
