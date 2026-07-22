#!/usr/bin/env python3
"""Phase 2: mirror AVK About/Quality/Career/Enquiry/Contact and rewire nav."""

from __future__ import annotations

import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

BASE = "https://www.avkbuildingsolutions.in"
ROOT = Path(__file__).resolve().parent.parent

START_PAGES = {
    f"{BASE}/about-us": ROOT / "about-us.html",
    f"{BASE}/quality": ROOT / "quality.html",
    f"{BASE}/career": ROOT / "career.html",
    f"{BASE}/enquiry": ROOT / "enquiry.html",
    f"{BASE}/contact-us": ROOT / "contact-us.html",
}

PROTECTED = {
    "img/logo/logo1.jpg",
    "img/logo/logo2.jpg",
    "img/hero/hero1.jpg",
}

ASSET_EXT = {
    ".css", ".js", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico",
    ".woff", ".woff2", ".ttf", ".eot", ".otf", ".mp4", ".webm", ".map",
    ".swf", ".json",
}

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)

ATTR_RE = re.compile(
    r"""(?P<attr>href|src|data-retina|data-lazy|data-src|poster)\s*=\s*["'](?P<url>[^"']+)["']""",
    re.I,
)

visited: set[str] = set()
queue: list[str] = []

PAGE_LINK_MAP = [
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

REL_HREF_MAP = [
    ('href="about-us"', 'href="about-us.html"'),
    ("href='about-us'", "href='about-us.html'"),
    ('href="quality"', 'href="quality.html"'),
    ('href="career"', 'href="career.html"'),
    ('href="enquiry"', 'href="enquiry.html"'),
    ('href="contact-us"', 'href="contact-us.html"'),
    ('href="products"', 'href="products.html"'),
    ('href="framework-fasteners"', 'href="framework-fasteners.html"'),
    # Phase 1 stubs -> real pages
    ('href="coming-soon.html"', None),  # handled specially per context — see rewire_nav
]


def log(msg: str) -> None:
    print(msg, flush=True)


def normalize(url: str, base: str) -> str | None:
    url = url.strip()
    if not url or url.startswith(("data:", "javascript:", "mailto:", "tel:", "#")):
        return None
    if url.startswith("//"):
        url = "https:" + url
    abs_url = urllib.parse.urljoin(base, url)
    parsed = urllib.parse.urlparse(abs_url)
    if "avkbuildingsolutions.in" not in (parsed.netloc or ""):
        return None
    return urllib.parse.urlunparse((parsed.scheme, parsed.netloc, parsed.path, "", parsed.query, ""))


def is_asset(url: str) -> bool:
    path = urllib.parse.urlparse(url).path.lower()
    ext = Path(path).suffix
    if ext in ASSET_EXT:
        return True
    return any(seg in path for seg in ("/css/", "/js/", "/img/", "/fonts/", "/images/", "/font/"))


def local_path_for_asset(url: str) -> Path:
    parsed = urllib.parse.urlparse(url)
    path = urllib.parse.unquote(parsed.path).lstrip("/")
    return ROOT / path


def enqueue(url: str | None) -> None:
    if url and url not in visited and url not in queue:
        queue.append(url)


def download(url: str) -> bytes | None:
    if url in visited:
        return None
    visited.add(url)
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return resp.read()
    except Exception as e:
        log(f"  FAIL {url}: {e}")
        return None


def extract_assets_from_html(html: str, page_url: str) -> None:
    for m in ATTR_RE.finditer(html):
        u = normalize(m.group("url"), page_url)
        if u and is_asset(u):
            enqueue(u)


def rewrite_and_rebrand(html: str) -> str:
    html = re.sub(
        r'src="[^"]*logo-header-default[^"]*"',
        'src="img/logo/logo1.jpg"',
        html,
        flags=re.I,
    )
    html = re.sub(
        r'src="[^"]*logo-vertical-default[^"]*"',
        'src="img/logo/logo1.jpg"',
        html,
        flags=re.I,
    )
    html = re.sub(
        r'href="[^"]*favicon[^"]*"',
        'href="img/logo/logo1.jpg"',
        html,
        flags=re.I,
    )
    # Don't let theme JS rewrite the logo
    html = html.replace(
        'class="color-theme" data-retina src="img/logo/logo1.jpg"',
        'data-retina src="img/logo/logo1.jpg"',
    )
    html = html.replace(
        'class="b-footer-logo color-theme" src="img/logo/logo1.jpg"',
        'class="b-footer-logo" src="img/logo/logo1.jpg"',
    )

    for old, new in PAGE_LINK_MAP:
        html = html.replace(old, new)

    for old, new in REL_HREF_MAP:
        if new:
            html = html.replace(old, new)

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

    html = re.sub(
        r"Tista Ventures,\s*<br/>No:42,Raghavendra Nagar,<br/>\s*3rd cross, HRBR Layout,<br/>Kalyan\s*Nagar, Bangalore-560043\.<br/>",
        "Tista Ventures<br/>Address will be updated soon.<br/>",
        html,
        flags=re.I | re.S,
    )
    html = re.sub(
        r"\+91 98765 43210\s*,\s*\+91 98765 43210</br>\+91 98765 43210",
        "+91 98765 43210",
        html,
    )
    html = re.sub(r"<title>.*?</title>", "<title>Tista Ventures</title>", html, flags=re.I | re.S)
    return html


def rewire_nav_in_existing() -> None:
    """Point Phase 1 coming-soon links to real Phase 2 pages."""
    replacements = [
        # Footer / crude global coming-soon already mixed — fix by menu label context via sequential safe maps
        ('href="coming-soon.html"><i class="fa fa-folder-open b-menu-1level-ico"></i>About Us',
         'href="about-us.html"><i class="fa fa-folder-open b-menu-1level-ico"></i>About Us'),
        ('href="coming-soon.html"><i class="fa fa-code b-menu-1level-ico"></i>Quality',
         'href="quality.html"><i class="fa fa-code b-menu-1level-ico"></i>Quality'),
        ('href="coming-soon.html"><i class="fa fa-cloud-download b-menu-1level-ico"></i>Career',
         'href="career.html"><i class="fa fa-cloud-download b-menu-1level-ico"></i>Career'),
        ('href="coming-soon.html"><i class="fa fa-inbox b-menu-1level-ico"></i>Enquiry',
         'href="enquiry.html"><i class="fa fa-inbox b-menu-1level-ico"></i>Enquiry'),
        ('href="coming-soon.html"><i class="fa fa-folder-open b-menu-1level-ico"></i>Contact us',
         'href="contact-us.html"><i class="fa fa-folder-open b-menu-1level-ico"></i>Contact us'),
        ('href="coming-soon.html">AboutsUs</a>', 'href="about-us.html">AboutsUs</a>'),
        ('href="coming-soon.html">Quality</a>', 'href="quality.html">Quality</a>'),
        ('href="coming-soon.html">Career</a>', 'href="career.html">Career</a>'),
        ('href="coming-soon.html">Enquiry</a>', 'href="enquiry.html">Enquiry</a>'),
        ('href="coming-soon.html">ContactUs</a>', 'href="contact-us.html">ContactUs</a>'),
        # Read more buttons that pointed to about
        ('href="coming-soon.html" class="f-primary-b f-more"',
         'href="about-us.html" class="f-primary-b f-more"'),
        ('href="coming-soon.html" <button class="button-xs text-uppercase">Read More</button>',
         'href="about-us.html" <button class="button-xs text-uppercase">Read More</button>'),
    ]
    for path in ROOT.glob("*.html"):
        if path.name in {"coming-soon.html"}:
            continue
        text = path.read_text(encoding="utf-8")
        orig = text
        for a, b in replacements:
            text = text.replace(a, b)
        # leftover Read more / about links
        text = text.replace('href="coming-soon.html"', 'href="about-us.html"')
        if text != orig:
            path.write_text(text, encoding="utf-8")
            log(f"  rewired {path.name}")


def save_bytes(path: Path, data: bytes) -> None:
    rel = str(path.relative_to(ROOT)).replace("\\", "/")
    if rel in PROTECTED:
        log(f"  SKIP protected {rel}")
        return
    if path.exists() and path.stat().st_size > 0:
        log(f"  EXISTS {rel}")
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    log(f"  OK {rel} ({len(data)} bytes)")


def main() -> int:
    html_jobs: list[tuple[str, Path]] = []

    for url, dest in START_PAGES.items():
        log(f"GET PAGE {url}")
        data = download(url)
        if not data:
            continue
        text = data.decode("utf-8", errors="replace")
        extract_assets_from_html(text, url)
        dest.write_text(text, encoding="utf-8")
        html_jobs.append((url, dest))

    log(f"Queued {len(queue)} new asset candidates...")
    while queue:
        url = queue.pop(0)
        lp = local_path_for_asset(url)
        if lp.exists() and lp.stat().st_size > 0:
            visited.add(url)
            continue
        log(f"GET {url}")
        data = download(url)
        if data is None:
            continue
        # encode spaces in path
        if " " in str(lp):
            pass
        save_bytes(lp, data)
        time.sleep(0.02)

    log("Rebranding Phase 2 HTML...")
    for url, dest in html_jobs:
        text = dest.read_text(encoding="utf-8")
        dest.write_text(rewrite_and_rebrand(text), encoding="utf-8")
        log(f"  WROTE {dest.name}")

    log("Rewiring nav on existing pages...")
    rewire_nav_in_existing()
    # also rewire the new pages (coming-soon leftovers shouldn't exist, but absolute maps done)

    log(f"Done. Fetched {len(visited)} URLs.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
