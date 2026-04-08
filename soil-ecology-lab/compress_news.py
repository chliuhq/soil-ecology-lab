from PIL import Image
import os

src_dir = r"E:\Claude\Github_SoilEcoloy\soil-ecology-lab\public\images\news"
out_dir = src_dir
target_size_kb = 800  # max KB per image

for fname in os.listdir(src_dir):
    if not fname.endswith(('.jpg', '.jpeg', '.png')):
        continue
    fpath = os.path.join(src_dir, fname)
    img = Image.open(fpath)
    w, h = img.size
    print(f"{fname}: {w}x{h}, ", end="")

    # Resize if too large (max 1920px on long side)
    max_px = 1920
    if max(w, h) > max_px:
        ratio = max_px / max(w, h)
        new_w, new_h = int(w * ratio), int(h * ratio)
        img = img.resize((new_w, new_h), Image.LANCZOS)
        print(f"resized to {new_w}x{new_h}, ", end="")

    # Save as JPEG with quality 80
    out_path = os.path.join(out_dir, fname)
    img = img.convert('RGB')
    img.save(out_path, 'JPEG', quality=80, optimize=True)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"saved: {size_kb:.0f} KB")
