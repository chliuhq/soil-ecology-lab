#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""新闻/内容图片压缩脚本（规则见 .clinerules/soilecology rules.md）。

用法（仓库根目录）：
    python -X utf8 soil-ecology-lab/scripts/compress_images.py <图片目录>

行为：
- 扫描目录下 *.jpg / *.jpeg / *.JPG / *.png
- 最长边缩放至 1280 px（LANCZOS），EXIF 方向校正，转 RGB
- 输出同名 .webp（quality=80, method=6），不删除原图
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

MAX_SIDE = 1280
QUALITY = 80
METHOD = 6


def compress_one(src: Path) -> tuple[int, int]:
    """压缩单张图片，返回 (原大小, 压缩后大小) 字节。"""
    dst = src.with_suffix(".webp")
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)
        im.thumbnail((MAX_SIDE, MAX_SIDE), Image.Resampling.LANCZOS)
        im = im.convert("RGB")
        im.save(dst, "WEBP", quality=QUALITY, method=METHOD)
    return src.stat().st_size, dst.stat().st_size


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 1

    folder = Path(sys.argv[1])
    if not folder.is_dir():
        print(f"目录不存在: {folder}")
        return 1

    files = sorted(
        p for p in folder.iterdir()
        if p.suffix.lower() in {".jpg", ".jpeg", ".png"}
    )
    if not files:
        print(f"未找到图片文件: {folder}")
        return 0

    for src in files:
        before, after = compress_one(src)
        ratio = (1 - after / before) * 100 if before else 0
        print(f"{src.name}: {before/1024:.0f} KB -> {after/1024:.0f} KB (-{ratio:.0f}%)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())