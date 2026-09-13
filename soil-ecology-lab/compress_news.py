from pathlib import Path

from PIL import Image, ImageOps


PROJECT_ROOT = Path(__file__).resolve().parent
IMAGE_DIR = PROJECT_ROOT / "public" / "images" / "news" / "2026-09-04"
IMAGE_NAMES = (
    "IMG_6186.JPG",
    "IMG_6211.JPG",
    "IMG_6257.JPG",
    "IMG_6435.JPG",
    "IMG_6681.JPG",
    "IMG_6685.JPG",
)
MAX_SIDE = 1280
WEBP_QUALITY = 80


def optimize_image(source: Path) -> tuple[Path, int, int, tuple[int, int], tuple[int, int]]:
    """Create a resized WebP beside one source image without modifying the source."""
    output = source.with_suffix(".webp")
    source_size = source.stat().st_size

    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        original_dimensions = image.size
        image.thumbnail((MAX_SIDE, MAX_SIDE), Image.Resampling.LANCZOS)
        optimized_dimensions = image.size
        image = image.convert("RGB")
        image.save(
            output,
            format="WEBP",
            quality=WEBP_QUALITY,
            method=6,
        )

    return (
        output,
        source_size,
        output.stat().st_size,
        original_dimensions,
        optimized_dimensions,
    )


def main() -> None:
    missing = [name for name in IMAGE_NAMES if not (IMAGE_DIR / name).is_file()]
    if missing:
        missing_files = ", ".join(missing)
        raise FileNotFoundError(f"Missing source image(s): {missing_files}")

    total_source_size = 0
    total_output_size = 0

    for name in IMAGE_NAMES:
        output, source_size, output_size, original_dimensions, optimized_dimensions = (
            optimize_image(IMAGE_DIR / name)
        )
        total_source_size += source_size
        total_output_size += output_size
        reduction = 1 - output_size / source_size
        print(
            f"{name} -> {output.name} | "
            f"{original_dimensions[0]}x{original_dimensions[1]} -> "
            f"{optimized_dimensions[0]}x{optimized_dimensions[1]} | "
            f"{source_size:,} -> {output_size:,} bytes | "
            f"reduced {reduction:.1%}"
        )

    total_reduction = 1 - total_output_size / total_source_size
    print(
        f"Total | {total_source_size:,} -> {total_output_size:,} bytes | "
        f"reduced {total_reduction:.1%}"
    )


if __name__ == "__main__":
    main()