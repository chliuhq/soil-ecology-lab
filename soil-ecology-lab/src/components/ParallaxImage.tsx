"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  height?: string;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.3,
  height = "h-64 md:h-80",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${height} ${className}`}>
      <motion.div style={{ y }} className="absolute inset-[-20%] w-full h-[140%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
