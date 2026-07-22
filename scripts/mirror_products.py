#!/usr/bin/env python3
"""Refresh product detail pages, fix .html links, apply Tista branding."""

from __future__ import annotations

import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

BASE = "https://www.avkbuildingsolutions.in"
ROOT = Path(__file__).resolve().parent.parent
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0"

PRODUCT_SLUGS = [
    "framework-fasteners",
    "systems-thermoinsulation-wallsfasteners",
    "system-fastenings-thermal-and-hydro-insulation-flat-roofs",
    "fastening-system-lightweight-cladding-roofing-and-walls",
    "screws-and-fasteners-wooden-constructions",
    "screws-and-fasteners-joinery",
    "fastening-systems-furniture-sector",
    "drywall-fastener-systems",
    "bolts-and-screws",
    "mechanical-anchors",
    "chemical-anchoring-systems",
    "construction-chemicals",
    "installation-systems-and-sanitary-fixings-clamps-and-bands",
    "electrical-fasteners",
    "diamond-and-corundum-blades-drill-bits-and-driver-bits",
    "painters-tapes-and-films",
    "construction-membranes-and-protection-plastic-foils",
    "butyl-tapes",
    "products",
]

ATTR_RE = re.compile(
    r"""(?P<attr>href|src|data-retina|data-lazy|data-src)\s*=\s*["'](?P<url>[^"']+)["']""",
    re.I,
)
ASSET_EXT = {
    ".css", ".js", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico",
    ".woff", ".woff2", ".ttf", ".eot", ".otf",
}

HEADER_BLOCK = '''  <div class="container b-header__box b-relative">
    <a href="index.html" class="b-left b-logo"><img src="img/logo/logo-header.jpg" alt="Tista Ventures" /></a>
    <div class="b-header-r b-right">
      <div class="b-top-nav-show-slide f-top-nav-show-slide b-right j-top-nav-show-slide"><i class="fa fa-align-justify"></i></div>
      <nav class="b-top-nav f-top-nav b-right j-top-nav">'''


def log(msg: str) -> None:
    print(msg, flush=True)


def fetch(url: str) -> bytes | None:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return resp.read()
    except Exception as e:
        log(f"  FAIL {url}: {e}")
        return None


def normalize(url: str, base: str) -> str | None:
    url = url.strip()
    if not url or url.startswith(("data:", "javascript:", "mailto:", "tel:", "#")):
        return None
    if url.startswith("//"):
        url = "https:" + url
    abs_url = urllib.parse.urljoin(base, url)
    p = urllib.parse.urlparse(abs_url)
    if "avkbuildingsolutions.in" not in (p.netloc or ""):
        return None
    return urllib.parse.urlunparse((p.scheme, p.netloc, p.path, "", p.query, ""))


def is_asset(url: str) -> bool:
    path = urllib.parse.urlparse(url).path.lower()
    ext = Path(path).suffix
    return ext in ASSET_EXT or any(s in path for s in ("/img/", "/images/"))


def rebrand(html: str) -> str:
    page_map = [
        (f"{BASE}/framework-fasteners", "framework-fasteners.html"),
        (f"{BASE}/contact-us", "contact-us.html"),
        (f"{BASE}/about-us", "about-us.html"),
        (f"{BASE}/products", "products.html"),
        (f"{BASE}/enquiry", "enquiry.html"),
        (f"{BASE}/quality", "quality.html"),
        (f"{BASE}/career", "career.html"),
        ("https://avkbuildingsolutions.in/framework-fasteners", "framework-fasteners.html"),
        ("https://avkbuildingsolutions.in/contact-us", "contact-us.html"),
        ("https://avkbuildingsolutions.in/about-us", "about-us.html"),
        ("https://avkbuildingsolutions.in/products", "products.html"),
        ("https://avkbuildingsolutions.in/enquiry", "enquiry.html"),
        ("https://avkbuildingsolutions.in/quality", "quality.html"),
        ("https://avkbuildingsolutions.in/career", "career.html"),
        ("https://avkbuildingsolutions.in/", "index.html"),
        (f"{BASE}/", "index.html"),
    ]
    for old, new in page_map:
        html = html.replace(old, new)

    for slug in PRODUCT_SLUGS:
        if slug == "products":
            continue
        html = html.replace(f'href="{slug}"', f'href="{slug}.html"')
        html = html.replace(f"href='{slug}'", f"href='{slug}.html'")
        html = html.replace(f"{BASE}/{slug}", f"{slug}.html")
        html = html.replace(f"https://avkbuildingsolutions.in/{slug}", f"{slug}.html")

    html = html.replace('href="index"', 'href="index.html"')
    html = html.replace('href="about-us"', 'href="about-us.html"')
    html = html.replace('href="quality"', 'href="quality.html"')
    html = html.replace('href="career"', 'href="career.html"')
    html = html.replace('href="enquiry"', 'href="enquiry.html"')
    html = html.replace('href="contact-us"', 'href="contact-us.html"')
    html = html.replace('href="products"', 'href="products.html"')
    html = html.replace('href="coming-soon.html"', 'href="about-us.html"')

    replacements = [
        ("AVK Building Solutions", "Tista Ventures"),
        ("AVK Buildingsolutions", "Tista Ventures"),
        ("sales@avkbuildingsolutions.in", "info@tistaventures.com"),
        ("+91 7337752405", "+91 98765 43210"),
        ("+91-7337752405", "+91 98765 43210"),
        ("+91-9036972383", "+91 98765 43210"),
        ("+91-9980011260", "+91 98765 43210"),
        ("avk.buildingsolutions", "tista.ventures"),
        ("http://cdnjs.cloudflare.com", "https://cdnjs.cloudflare.com"),
        ("Copyright © 2019", "Copyright © 2026"),
    ]
    for a, b in replacements:
        html = html.replace(a, b)

    html = re.sub(r"<title>.*?</title>", "<title>Tista Ventures</title>", html, flags=re.I | re.S)
    html = re.sub(
        r'href="[^"]*favicon[^"]*"',
        'href="img/logo/logo1.jpg"',
        html,
        flags=re.I,
    )

    # Inject overrides css if missing
    if "tista-overrides.css" not in html and "main-default.css" in html:
        html = html.replace(
            'href="css/main-default.css">',
            'href="css/main-default.css">\n<link type="text/css" rel="stylesheet" href="css/tista-overrides.css">',
            1,
        )

    # Replace broken header block with clean one (best-effort)
    html = re.sub(
        r'<div class="container b-header__box b-relative">[\s\S]*?<nav class="b-top-nav f-top-nav b-right j-top-nav">',
        HEADER_BLOCK,
        html,
        count=1,
    )

    html = re.sub(
        r'src="[^"]*logo-header-default[^"]*"',
        'src="img/logo/logo-header.jpg"',
        html,
        flags=re.I,
    )
    html = re.sub(
        r'src="[^"]*logo-vertical-default[^"]*"',
        'src="img/logo/logo-footer.jpg"',
        html,
        flags=re.I,
    )
    html = html.replace('src="img/logo/logo1.jpg" alt="Logo"', 'src="img/logo/logo-footer.jpg" alt="Tista Ventures"')
    html = re.sub(
        r'(class="b-footer-logo[^"]*"\s+src=")img/logo/logo1\.jpg(")',
        r"\1img/logo/logo-footer.jpg\2",
        html,
    )
    html = re.sub(
        r"Tista Ventures,\s*<br/>No:42,Raghavendra Nagar,<br/>\s*3rd cross, HRBR Layout,<br/>Kalyan\s*Nagar, Bangalore-560043\.<br/>",
        "Tista Ventures<br/>Address will be updated soon.<br/>",
        html,
        flags=re.I | re.S,
    )
    return html


def fix_sitewide_product_links() -> None:
    slugs = [s for s in PRODUCT_SLUGS if s != "products"]
    for path in ROOT.glob("*.html"):
        t = path.read_text(encoding="utf-8")
        orig = t
        for slug in slugs:
            t = t.replace(f'href="{slug}"', f'href="{slug}.html"')
            t = t.replace(f"href='{slug}'", f"href='{slug}.html'")
        t = t.replace('href="index"', 'href="index.html"')
        if t != orig:
            path.write_text(t, encoding="utf-8")
            log(f"  linked {path.name}")


def main() -> int:
    assets: set[str] = set()
    for slug in PRODUCT_SLUGS:
        url = f"{BASE}/{slug}"
        dest = ROOT / ("products.html" if slug == "products" else f"{slug}.html")
        log(f"GET {url}")
        data = fetch(url)
        if not data:
            continue
        text = data.decode("utf-8", errors="replace")
        for m in ATTR_RE.finditer(text):
            u = normalize(m.group("url"), url)
            if u and is_asset(u):
                assets.add(u)
        dest.write_text(rebrand(text), encoding="utf-8")
        log(f"  WROTE {dest.name}")
        time.sleep(0.05)

    log(f"Downloading up to {len(assets)} assets...")
    for u in sorted(assets):
        rel = urllib.parse.unquote(urllib.parse.urlparse(u).path.lstrip("/"))
        dest = ROOT / rel
        if dest.exists() and dest.stat().st_size > 0:
            continue
        log(f"GET {u}")
        data = fetch(u.replace(" ", "%20"))
        if not data:
            continue
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
        log(f"  OK {rel}")
        time.sleep(0.02)

    log("Fixing product links sitewide...")
    fix_sitewide_product_links()
    log("Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
