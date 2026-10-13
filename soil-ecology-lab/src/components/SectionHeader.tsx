"use client";
import Link from "next/link";
import { useLocaleText } from "@/lib/i18n-context";
import FadeInOnScroll from "@/components/FadeInOnScroll";

interface Props {
  /** 眉标（小字上标，英文显示） */
  eyebrow?: string;
  title: { zh: string; en: string } | string;
  /** "查看全部" 链接 */
  moreHref?: string;
  moreLabel?: { zh: string; en: string };
  className?: string;
  align?: "left" | "center";
}

/** 统一的 Section 标题：眉标 + 衬线标题 + 土壤层理短线 */
export default function SectionHeader({
  eyebrow,
  title,
  moreHref,
  moreLabel,
  className = "mb-8",
  align = "left",
}: Props) {
  const lt = useLocaleText();
  const centered = align === "center";

  return (
    <FadeInOnScroll>
      <div
        className={`${className} ${centered ? "text-center" : "flex items-end justify-between gap-4"}`}
      >
        <div className={centered ? "inline-block" : ""}>
          {eyebrow && (
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-accent mb-1.5">
              {eyebrow}
            </p>
          )}
          <h2 className="text-[26px] md:text-3xl font-serif font-bold text-gray-900 dark:text-gray-100 leading-tight">
            {typeof title === "string" ? title : lt(title)}
          </h2>
          <div
            className={`soil-strata h-[5px] w-16 rounded mt-2.5 ${centered ? "mx-auto" : ""}`}
          />
        </div>
        {moreHref && moreLabel && (
          <Link
            href={moreHref}
            className="group shrink-0 inline-flex items-center gap-1 text-sm text-primary dark:text-accent-soft hover:text-accent font-medium transition-colors"
          >
            {lt(moreLabel)}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>
    </FadeInOnScroll>
  );
}
