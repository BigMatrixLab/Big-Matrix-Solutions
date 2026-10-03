"""
Builds the link-preview image for each blog post.

Facebook, LinkedIn and X show a 1.91:1 card and do not all accept WebP or
animated images, so each post gets a 1200x630 JPEG cut from its cover:
public/assets/images/og/<slug>.jpg. scripts/generate-og-manifest.js prefers
that file and falls back to the cover itself when it is missing.

Run after adding posts (needs Pillow):  python scripts/make-og-images.py
Existing files are kept; pass --force to rebuild them all.
"""
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BLOGS = ROOT / "src" / "content" / "blogs"
PUBLIC = ROOT / "public"
OUT = PUBLIC / "assets" / "images" / "og"
W, H = 1200, 630


def field(text, name):
    match = re.search(rf'^{name}:\s*"?([^"\r\n]+)"?', text, re.M)
    return match.group(1).strip() if match else None


def card(cover):
    """Scale to cover 1200x630 and centre-crop: covers are 16:9, so the crop
    only trims about 7% top and bottom."""
    with Image.open(cover) as im:
        im.seek(0)
        im = im.convert("RGBA")
        flat = Image.new("RGB", im.size, (255, 255, 255))
        flat.paste(im, mask=im.split()[-1])
    scale = max(W / flat.width, H / flat.height)
    flat = flat.resize((round(flat.width * scale), round(flat.height * scale)), Image.LANCZOS)
    left, top = (flat.width - W) // 2, (flat.height - H) // 2
    return flat.crop((left, top, left + W, top + H))


def main():
    force = "--force" in sys.argv
    OUT.mkdir(parents=True, exist_ok=True)
    made = skipped = missing = 0
    for md in sorted(BLOGS.glob("*.md")):
        text = md.read_text(encoding="utf-8")
        slug, image = field(text, "slug"), field(text, "image")
        if not slug or not image or not image.startswith("/") or image.endswith(".svg"):
            missing += 1
            continue
        target = OUT / f"{slug}.jpg"
        if target.exists() and not force:
            skipped += 1
            continue
        cover = PUBLIC / image.lstrip("/")
        if not cover.exists():
            print(f"missing cover: {md.name} -> {image}")
            missing += 1
            continue
        card(cover).save(target, "JPEG", quality=84, optimize=True, progressive=True)
        made += 1
    print(f"og images: {made} made, {skipped} kept, {missing} without a usable cover")


if __name__ == "__main__":
    main()
