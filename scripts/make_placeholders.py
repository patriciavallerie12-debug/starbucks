#!/usr/bin/env python3
"""Generate placeholder images for catalog entries whose photos are missing.

Reads src/menuData.json + src/merchData.json, finds every referenced
/assets/... path that does not exist in public/, and renders a branded
placeholder at that exact path so the UI has no broken images.

Safe to re-run: existing files are never overwritten, and once the real
photos are uploaded the script simply has nothing left to do.
"""

from __future__ import annotations

import json
import pathlib
import sys
import textwrap

from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SRC = ROOT / "src"

FONT_REGULAR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

CREAM = (244, 241, 235)
CREAM_DEEP = (232, 227, 216)
GREEN = (0, 98, 65)
GREEN_BRIGHT = (0, 117, 74)
INK = (31, 31, 31)
MUTED = (110, 113, 110)
GOLD = (188, 152, 98)


def load(path: pathlib.Path):
    with path.open(encoding="utf-8") as fh:
        return json.load(fh)


def exists(asset_path: str) -> bool:
    return (PUBLIC / asset_path.lstrip("/")).exists()


def collect() -> list[dict]:
    """Return [{path, title, eyebrow, kind}] for every missing catalog asset."""
    items: dict[str, dict] = {}

    def add(path: str | None, title: str, eyebrow: str, kind: str) -> None:
        if not path or not path.startswith("/assets/") or exists(path):
            return
        items.setdefault(path, {"path": path, "title": title, "eyebrow": eyebrow, "kind": kind})

    menu = load(SRC / "menuData.json")
    for section in menu.get("sections", []):
        section_title = section.get("title", "")
        for category in section.get("categories", []):
            cat_title = category.get("title", "")
            add(category.get("image"), cat_title, section_title, "menu")
            for group in category.get("groups", []):
                for product in group.get("products", []):
                    add(product.get("image"), product.get("name", ""), cat_title, "menu")

    merch = load(SRC / "merchData.json")
    for collection in merch.get("collections", []):
        col_title = collection.get("title", "")
        for product in collection.get("products", []):
            add(product.get("thumbnail"), product.get("name", ""), col_title, "merchandise")
            add(product.get("image"), product.get("name", ""), col_title, "merchandise")

    return sorted(items.values(), key=lambda i: i["path"])


def draw_template(path: pathlib.Path, title: str, eyebrow: str, kind: str) -> None:
    size = (900, 900) if kind == "merchandise" else (900, 760)
    width, height = size

    img = Image.new("RGB", size, CREAM)
    draw = ImageDraw.Draw(img)

    # soft vertical wash
    for y in range(height):
        t = y / height
        r = int(CREAM[0] + (CREAM_DEEP[0] - CREAM[0]) * t)
        g = int(CREAM[1] + (CREAM_DEEP[1] - CREAM[1]) * t)
        b = int(CREAM[2] + (CREAM_DEEP[2] - CREAM[2]) * t)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # decorative rings
    draw.ellipse(
        [width * 0.55, -height * 0.35, width * 1.55, height * 0.75],
        outline=(226, 236, 231),
        width=4,
    )
    draw.ellipse(
        [width * 0.63, -height * 0.25, width * 1.40, height * 0.55],
        outline=(226, 236, 231),
        width=2,
    )
    draw.ellipse(
        [-width * 0.30, height * 0.62, width * 0.42, height * 1.34],
        outline=(226, 236, 231),
        width=3,
    )

    # inset frame
    draw.rectangle([18, 18, width - 19, height - 19], outline=(214, 206, 190), width=2)

    # eyebrow label
    eyebrow_font = ImageFont.truetype(FONT_BOLD, 22)
    eyebrow_text = " ".join(textwrap.wrap(eyebrow.upper(), 44)[:2]) if eyebrow else ""
    if eyebrow_text:
        tw = draw.textlength(eyebrow_text, font=eyebrow_font)
        draw.text(
            ((width - tw) / 2, height * 0.24),
            eyebrow_text,
            font=eyebrow_font,
            fill=GREEN_BRIGHT,
        )

    # gold rule
    rule_y = height * 0.31
    draw.line([(width * 0.42, rule_y), (width * 0.58, rule_y)], fill=GOLD, width=3)

    # title
    title_font = ImageFont.truetype(FONT_BOLD, 40 if len(title) < 46 else 34)
    max_chars = 26 if len(title) < 46 else 32
    lines = textwrap.wrap(title, max_chars)[:4]
    line_h = title_font.size + 12
    block_h = line_h * len(lines)
    y = height * 0.40 + max(0, (height * 0.24 - block_h) / 2)
    for line in lines:
        tw = draw.textlength(line, font=title_font)
        draw.text(((width - tw) / 2, y), line, font=title_font, fill=INK)
        y += line_h

    # footer tag
    tag_font = ImageFont.truetype(FONT_REGULAR, 18)
    tag = "PLACEHOLDER IMAGE"
    tw = draw.textlength(tag, font=tag_font)
    pad = 14
    box_w, box_h = tw + pad * 2, 34
    bx, by = pad + 10, height - box_h - pad - 10
    draw.rounded_rectangle([bx, by, bx + box_w, by + box_h], radius=17, fill=(255, 255, 255))
    draw.rounded_rectangle(
        [bx, by, bx + box_w, by + box_h], radius=17, outline=(214, 206, 190), width=2
    )
    draw.text((bx + pad, by + 7), tag, font=tag_font, fill=MUTED)

    path.parent.mkdir(parents=True, exist_ok=True)
    if path.suffix.lower() == ".png":
        img.save(path, "PNG", optimize=True)
    else:
        img.save(path, "JPEG", quality=86, optimize=True, progressive=True)


def main() -> int:
    missing = collect()
    if not missing:
        print("Nothing missing — every catalog image exists.")
        return 0
    for item in missing:
        target = PUBLIC / item["path"].lstrip("/")
        draw_template(target, item["title"], item["eyebrow"], item["kind"])
    by_kind: dict[str, int] = {}
    for item in missing:
        by_kind[item["kind"]] = by_kind.get(item["kind"], 0) + 1
    print(f"Created {len(missing)} placeholders: {by_kind}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
