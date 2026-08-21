# -*- coding: utf-8 -*-
"""
KACHINOVA — media pipeline
==========================
Source photography (images/) is heterogeneous stock. This script applies ONE
film grade (tritone luminance ramp + cool bias) to every shot so the whole site
reads as a single piece of footage, exports posters (WebP + JPEG, 2 widths),
exports 16:9 masters for the ffmpeg video pass, and extracts the KACHINOVA logo
from the brand board into transparent PNGs (light + dark knockout).

Run:  python tools/media.py
"""
from __future__ import annotations

import os
import sys
import numpy as np
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "images")
OUT_IMG = os.path.join(ROOT, "assets", "img")
OUT_POSTER = os.path.join(OUT_IMG, "video-posters")
OUT_MASTER = os.path.join(ROOT, ".media-masters")

for d in (OUT_IMG, OUT_POSTER, OUT_MASTER):
    os.makedirs(d, exist_ok=True)

S = {
    "night_tower": "ChatGPT Image 2026年6月19日 01_40_34.png",   # 941x1672  Tokyo night
    "dusk_facade": "ChatGPT Image 2026年6月19日 01_21_48.png",   # 941x1672  dusk tower (text top)
    "day_green":   "ChatGPT Image 2026年6月19日 01_34_09.png",   # 941x1672  daylight + terraces (text top)
    "waterfront":  "mizube.png",                                # 941x1672  waterfront condos
    "net_city":    "ChatGPT Image 2026年6月30日 18_41_41.png",   # 1536x1024 globe + network
    "skyline_net": "ChatGPT Image 2026年6月30日 18_30_21.png",   # 1536x1024 skyline + lines (text top)
    "ai_face":     "ChatGPT Image 2026年6月30日 18_32_28.png",   # 1536x1024 AI head (text center)
    "brandboard":  "ChatGPT Image 2026年6月30日 18_30_06.png",   # 1536x1024 logo lockup
}

# name -> (source key, crop box or None, note)
# Crops are chosen to (a) remove baked-in typography and (b) frame 16:9.
SHOTS = {
    "city":     ("night_tower", (0, 300, 941, 300 + 529)),
    "ai":       ("net_city",    (0, 100, 1536, 100 + 864)),
    "revalue":  ("waterfront",  (0, 620, 941, 620 + 529)),
    "smart":    ("dusk_facade", (0, 460, 941, 460 + 529)),
    "eco":      ("day_green",   (0, 880, 941, 880 + 529)),
    "future":   ("night_tower", (0, 950, 941, 950 + 529)),
}

# Editorial stills used as section / page backgrounds (not video posters).
# about-city / sell-city / why-reuse are now lifted from the delivered films
# by tools/films.py — do not regenerate them here or the film pass gets undone.
# These two carry a page hero: white display type sits directly on them, so
# they are exposed to a target rather than left at the source's own brightness.
# (The delivered films are handled the same way in tools/films.py.)
# tech-mind now comes from the delivered AI film (see tools/films.py).
# lab-globe is the last stock still: it carries a page hero, so it is pulled
# down to a target level rather than left at the source's own brightness.
STILLS = {
    "lab-globe":   ("net_city",   (0, 120, 1400, 120 + 788), 0.30),
}

# ---------------------------------------------------------------- grade ----

# Tritone ramp: shadow -> deep graphite -> silver -> ice highlight.
RAMP = np.array(
    [
        [0.000, 4, 6, 9],
        [0.150, 16, 20, 24],
        [0.320, 38, 45, 51],
        [0.560, 104, 115, 123],
        [0.800, 178, 189, 196],
        [1.000, 240, 245, 248],
    ],
    dtype=np.float64,
)


def _ramp_lut() -> np.ndarray:
    xs = np.linspace(0.0, 1.0, 256)
    lut = np.zeros((256, 3), dtype=np.float64)
    for c in range(3):
        lut[:, c] = np.interp(xs, RAMP[:, 0], RAMP[:, 1 + c])
    # cool bias in the upper mids only (electric-ice memory colour, very slight)
    bias = np.clip(np.sin(np.pi * np.clip((xs - 0.35) / 0.55, 0, 1)), 0, 1)
    lut[:, 2] = np.clip(lut[:, 2] + bias * 7.0, 0, 255)
    lut[:, 0] = np.clip(lut[:, 0] - bias * 3.0, 0, 255)
    return lut


LUT = _ramp_lut()


def _scurve(x: np.ndarray, amount: float = 0.34) -> np.ndarray:
    """Gentle filmic S-curve on 0..1 luminance."""
    return np.clip(x + amount * np.sin(2.0 * np.pi * x) * -1.0 * 0.5 + amount * (x - 0.5) * 0.0, 0, 1) \
        if False else np.clip(x * x * (3 - 2 * x) * amount + x * (1 - amount), 0, 1)


def grade(im: Image.Image, residual_sat: float = 0.13, lift: float = 0.0) -> Image.Image:
    """Apply the single KACHINOVA film grade. Returns RGB."""
    a = np.asarray(im.convert("RGB"), dtype=np.float64) / 255.0
    lum = a[..., 0] * 0.2126 + a[..., 1] * 0.7152 + a[..., 2] * 0.0722
    lum = _scurve(lum)
    lum = np.clip(lum * (1.0 - lift) + lift, 0, 1)

    idx = np.clip((lum * 255.0).round().astype(np.int32), 0, 255)
    toned = LUT[idx] / 255.0

    # keep a whisper of the original chroma so it is not a dead duotone
    chroma = a - lum[..., None]
    out = np.clip(toned + chroma * residual_sat, 0, 1)

    # fine grain: kills banding in the long sky gradients
    rng = np.random.default_rng(7)
    grain = rng.normal(0.0, 0.0055, size=out.shape[:2])[..., None]
    out = np.clip(out + grain, 0, 1)

    return Image.fromarray((out * 255.0).round().astype(np.uint8), "RGB")


def vignette(im: Image.Image, strength: float = 0.30) -> Image.Image:
    w, h = im.size
    yy, xx = np.mgrid[0:h, 0:w]
    nx = (xx / (w - 1) - 0.5) * 2.0
    ny = (yy / (h - 1) - 0.5) * 2.0
    r = np.sqrt(nx ** 2 * 0.86 + ny ** 2)
    v = 1.0 - strength * np.clip((r - 0.42) / 0.85, 0, 1) ** 1.5
    a = np.asarray(im, dtype=np.float64) / 255.0
    a = np.clip(a * v[..., None], 0, 1)
    return Image.fromarray((a * 255.0).round().astype(np.uint8), "RGB")


def fit16x9(im: Image.Image, w: int) -> Image.Image:
    h = round(w * 9 / 16)
    sw, sh = im.size
    scale = max(w / sw, h / sh)
    im = im.resize((max(w, round(sw * scale)), max(h, round(sh * scale))), Image.LANCZOS)
    sw, sh = im.size
    return im.crop(((sw - w) // 2, (sh - h) // 2, (sw - w) // 2 + w, (sh - h) // 2 + h))


def export(im: Image.Image, base: str, widths=(1920, 1280, 720)) -> None:
    for w in widths:
        h = round(im.size[1] * w / im.size[0])
        r = im.resize((w, h), Image.LANCZOS)
        suffix = "" if w == widths[0] else f"-{w}"
        r.save(f"{base}{suffix}.webp", "WEBP", quality=74, method=6)
        r.save(f"{base}{suffix}.jpg", "JPEG", quality=76, optimize=True, progressive=True)


# ----------------------------------------------------------------- run -----

def build_shots() -> None:
    """Only used to bootstrap posters before real footage existed.
    tools/films.py now overwrites every poster from the delivered clips."""
    for name, (key, box) in SHOTS.items():
        p = os.path.join(SRC, S[key])
        im = Image.open(p).convert("RGB")
        if box:
            im = im.crop(box)
        im = fit16x9(im, 1920)
        im = vignette(grade(im), 0.34)
        # master for ffmpeg (kept out of the published tree)
        im.save(os.path.join(OUT_MASTER, f"{name}.png"), "PNG")
        export(im, os.path.join(OUT_POSTER, f"kachinova-{name}"))
        print(f"  shot  {name:9s} <- {key}")


def _to_level(im: Image.Image, target: float) -> Image.Image:
    """Scale a graded image to a target mean luminance.

    Applied after grading, not before: these sources are near-white, and no
    pre-gamma can pull them through the tritone ramp far enough (the ramp lifts
    mid-tones by design). A post-grade scale hits the number exactly and keeps
    the tonal relationships intact — which is all a backdrop needs."""
    w = np.array([0.2126, 0.7152, 0.0722])
    a = np.asarray(im, dtype=np.float64) / 255.0
    cur = float((a @ w).mean())
    if cur <= target or cur <= 1e-6:
        return im
    a = np.clip(a * (target / cur), 0.0, 1.0)
    return Image.fromarray((a * 255.0).round().astype(np.uint8), "RGB")


def build_stills() -> None:
    for name, (key, box, target) in STILLS.items():
        p = os.path.join(SRC, S[key])
        im = Image.open(p).convert("RGB")
        if box:
            im = im.crop(box)
        # page heroes declare 1600x900, so guarantee it rather than trusting
        # the crop box to be exactly 16:9
        im = fit16x9(im, 1600)
        im = _to_level(vignette(grade(im), 0.28), target)
        im.save(os.path.join(OUT_IMG, f"{name}.webp"), "WEBP", quality=74, method=6)
        im.save(os.path.join(OUT_IMG, f"{name}.jpg"), "JPEG", quality=76, optimize=True, progressive=True)
        print(f"  still {name:11s} <- {key}")


# ----------------------------------------------------------------- logo ----

WHITE_POINT = 249.0   # the brand boards are not pure white


def unmultiply_white(rgb: np.ndarray) -> np.ndarray:
    """Recover RGBA from artwork composited over a near-white board."""
    c = rgb.astype(np.float64)
    a = 1.0 - c.min(axis=2) / WHITE_POINT
    a = np.clip((a - 0.035) / (1.0 - 0.035), 0.0, 1.0)
    safe = np.maximum(a, 1e-4)[..., None]
    src = (c - 255.0 * (1.0 - a)[..., None]) / safe
    src = np.clip(src, 0, 255)
    out = np.zeros(rgb.shape[:2] + (4,), dtype=np.uint8)
    out[..., :3] = src.round().astype(np.uint8)
    out[..., 3] = (a * 255.0).round().astype(np.uint8)
    return out


def _components(mask: np.ndarray):
    """Label 8-connected components of a boolean mask (small, pure-python BFS)."""
    from collections import deque
    h, w = mask.shape
    seen = np.zeros((h, w), dtype=bool)
    comps = []
    ys, xs = np.where(mask)
    for sy, sx in zip(ys, xs):
        if seen[sy, sx]:
            continue
        q = deque([(sy, sx)])
        seen[sy, sx] = True
        px = []
        while q:
            y, x = q.popleft()
            px.append((y, x))
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not seen[ny, nx]:
                        seen[ny, nx] = True
                        q.append((ny, nx))
        comps.append(px)
    return comps


def strip_particles(rgba: np.ndarray) -> np.ndarray:
    """The brand board has decorative particle swooshes bleeding into the crop.
    Drop any small component that lives entirely inside the top-left corner —
    no part of the KACHINOVA lockup occupies that zone."""
    h, w = rgba.shape[:2]
    mask = rgba[..., 3] > 30
    zx, zy = int(w * 0.32), int(h * 0.44)
    sub = mask[:zy, :zx]
    removed = 0
    for px in _components(sub):
        if len(px) > 2600:
            continue
        ys = [p[0] for p in px]
        xs = [p[1] for p in px]
        if max(ys) >= zy - 1 or max(xs) >= zx - 1:
            continue          # touches the zone edge -> may continue into the logo
        for y, x in px:
            rgba[y, x, 3] = 0
        removed += 1
    # the residual swoosh arc is one large component; nothing of the lockup
    # lives in this corner at all, so clear it outright.
    rgba[: int(h * 0.38), : int(w * 0.28), 3] = 0
    print(f"  particles stripped: {removed} component(s) + corner clear")
    return rgba


def build_logo() -> None:
    im = Image.open(os.path.join(SRC, S["brandboard"])).convert("RGB")
    rx0, ry0 = 250, 128
    region = im.crop((rx0, ry0, 1302, 832))
    a = np.asarray(region)
    strict = a.max(axis=2) < 200
    cols = np.where(strict.sum(axis=0) >= 2)[0]
    rows = np.where(strict.sum(axis=1) >= 2)[0]
    pad = 8
    x0, x1 = max(cols.min() - pad, 0), min(cols.max() + pad + 1, a.shape[1])
    y0, y1 = max(rows.min() - pad, 0), min(rows.max() + pad + 1, a.shape[0])
    lock = a[y0:y1, x0:x1]
    print(f"  logo bbox: x{rx0+x0}-{rx0+x1} y{ry0+y0}-{ry0+y1}  ({x1-x0}x{y1-y0})")

    rgba = strip_particles(unmultiply_white(lock))

    rowcount = (rgba[..., 3] > 40).sum(axis=1)
    gaps, run = [], None
    for i, v in enumerate(rowcount):
        if v <= 2 and run is None:
            run = i
        elif v > 2 and run is not None:
            gaps.append((i - run, run, i))
            run = None
    inner = [g for g in gaps if 0.45 < (g[1] / len(rowcount)) < 0.80]
    split = None
    if inner:
        best = max(inner, key=lambda g: g[0])
        split = (best[1] + best[2]) // 2
    print(f"  mark/wordmark split row: {split} of {len(rowcount)}")

    def trim(arr: np.ndarray) -> np.ndarray:
        m = arr[..., 3] > 24
        ys2, xs2 = np.where(m)
        return arr[ys2.min():ys2.max() + 1, xs2.min():xs2.max() + 1]

    def save(arr: np.ndarray, name: str, height: int) -> None:
        """Write the PNG master plus a WebP the pages actually use.
        The logo is displayed at 15-96px; a 120px PNG with soft alpha cost
        ~80KB, the WebP costs a fraction of that at the same fidelity."""
        img = Image.fromarray(arr, "RGBA")
        w = max(1, round(img.size[0] * height / img.size[1]))
        r = img.resize((w, height), Image.LANCZOS)
        r.save(os.path.join(OUT_IMG, name), "PNG", optimize=True)
        r.save(os.path.join(OUT_IMG, name.replace(".png", ".webp")), "WEBP",
               quality=88, method=6, exact=False)

    def knockout(arr: np.ndarray) -> np.ndarray:
        """Dark-background version: ink -> off-white, gold stays (brightened) gold."""
        o = arr.copy()
        r = o[..., 0].astype(np.int16)
        g = o[..., 1].astype(np.int16)
        b = o[..., 2].astype(np.int16)
        is_gold = (r - b > 24) & (r > 60)
        o[..., :3] = np.where(
            is_gold[..., None],
            np.dstack([np.clip(r + 40, 0, 255), np.clip(g + 30, 0, 255), np.clip(b + 20, 0, 255)]).astype(np.uint8),
            np.array([238, 242, 245], dtype=np.uint8),
        )
        return o

    save(rgba, "logo-lockup.png", 200)
    save(knockout(rgba), "logo-lockup-dark.png", 200)
    if split:
        # wordmark block: isolate just "KACHINOVA" (drop the rule + tagline),
        # because at header scale the full stack is unreadable.
        word_region = rgba[split:]
        wr = (word_region[..., 3] > 40).sum(axis=1)
        blocks, run = [], None
        for i, v in enumerate(wr):
            if v > 2 and run is None:
                run = i
            elif v <= 2 and run is not None:
                blocks.append((run, i))
                run = None
        if run is not None:
            blocks.append((run, len(wr)))
        if blocks:
            b0, b1 = max(blocks, key=lambda b: b[1] - b[0])
            word = trim(word_region[b0:b1])
            save(word, "logo-word.png", 96)
            save(knockout(word), "logo-word-dark.png", 96)
            print(f"  wordmark rows {b0}-{b1} ({word.shape[1]}x{word.shape[0]})")

        mark = trim(rgba[:split])
        save(mark, "logo-mark.png", 200)
        save(knockout(mark), "logo-mark-dark.png", 200)
        km = Image.fromarray(knockout(mark), "RGBA")
        for size, fname in ((180, "apple-touch-icon.png"), (512, "icon-512.png"), (64, "favicon-64.png")):
            canvas = Image.new("RGBA", (size, size), (7, 9, 11, 255))
            inner_h = round(size * 0.60)
            w = max(1, round(km.size[0] * inner_h / km.size[1]))
            canvas.alpha_composite(km.resize((w, inner_h), Image.LANCZOS),
                                   ((size - w) // 2, (size - inner_h) // 2))
            canvas.save(os.path.join(OUT_IMG, fname), "PNG")
    print("  logo exported")


def build_og() -> None:
    """1200x630 social card built from the hero shot."""
    im = Image.open(os.path.join(OUT_MASTER, "city.png")).convert("RGB")
    sw, sh = im.size
    scale = max(1200 / sw, 630 / sh)
    im = im.resize((round(sw * scale), round(sh * scale)), Image.LANCZOS)
    sw, sh = im.size
    im = im.crop(((sw - 1200) // 2, (sh - 630) // 2, (sw - 1200) // 2 + 1200, (sh - 630) // 2 + 630))
    a = np.asarray(im, dtype=np.float64) / 255.0
    a = np.clip(a * 0.42, 0, 1)
    card = Image.fromarray((a * 255).round().astype(np.uint8), "RGB").convert("RGBA")
    logo = Image.open(os.path.join(OUT_IMG, "logo-lockup-dark.png")).convert("RGBA")
    w = 620
    logo = logo.resize((w, round(logo.size[1] * w / logo.size[0])), Image.LANCZOS)
    card.alpha_composite(logo, ((1200 - w) // 2, (630 - logo.size[1]) // 2 - 10))
    card.convert("RGB").save(os.path.join(OUT_IMG, "og-kachinova.jpg"), "JPEG",
                             quality=82, optimize=True, progressive=True)
    print("  og card exported")


if __name__ == "__main__":
    print("KACHINOVA media pipeline")
    build_shots()
    build_stills()
    build_logo()
    build_og()
    print("done.")
