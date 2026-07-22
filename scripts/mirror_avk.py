#!/usr/bin/env python3
"""Mirror AVK Building Solutions Home/Products assets for local Tista clone."""

from __future__ import annotations

import os
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

BASE = "https://www.avkbuildingsolutions.in"
ROOT = Path(__file__).resolve().parent.parent

START_PAGES = {
    f"{BASE}/": ROOT / "index.html",
    f"{BASE}/products": ROOT / "products.html",
    f"{BASE}/framework-fasteners": ROOT / "framework-fasteners.html",
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
CSS_URL_RE = re.compile(r"""url\(\s*['"]?(?P<url>[^'")]+)['"]?\s*\)""", re.I)
IMPORT_RE = re.compile(r"""@import\s+(?:url\()?['"]?(?P<url>[^'")]+)['"]?\)?""", re.I)

visited: set[str] = set()
queue: list[str] = []


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
    # theme sometimes serves extensionless? treat known dirs as assets
    return any(seg in path for seg in ("/css/", "/js/", "/img/", "/fonts/", "/images/", "/font/"))


def local_path_for_asset(url: str) -> Path:
    parsed = urllib.parse.urlparse(url)
    path = urllib.parse.unquote(parsed.path).lstrip("/")
    if parsed.query:
        # rare query assets — flatten
        safe_q = re.sub(r"[^\w.-]+", "_", parsed.query)[:80]
        return ROOT / f"{path}__{safe_q}"
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
        with urllib.request.urlopen(req, timeout=45) as resp:
            return resp.read()
    except Exception as e:
        log(f"  FAIL {url}: {e}")
        return None


def extract_assets_from_html(html: str, page_url: str) -> None:
    for m in ATTR_RE.finditer(html):
        u = normalize(m.group("url"), page_url)
        if u and is_asset(u):
            enqueue(u)


def extract_assets_from_css(css: str, css_url: str) -> None:
    for m in CSS_URL_RE.finditer(css):
        u = normalize(m.group("url"), css_url)
        if u and is_asset(u):
            enqueue(u)
    for m in IMPORT_RE.finditer(css):
        u = normalize(m.group("url"), css_url)
        if u and is_asset(u):
            enqueue(u)


def rewrite_and_rebrand(html: str) -> str:
    # logo paths (keep customer logo)
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

    page_map = [
        (f"{BASE}/framework-fasteners", "framework-fasteners.html"),
        (f"{BASE}/contact-us", "coming-soon.html"),
        (f"{BASE}/about-us", "coming-soon.html"),
        (f"{BASE}/products", "products.html"),
        (f"{BASE}/enquiry", "coming-soon.html"),
        (f"{BASE}/quality", "coming-soon.html"),
        (f"{BASE}/career", "coming-soon.html"),
        (f"https://avkbuildingsolutions.in/framework-fasteners", "framework-fasteners.html"),
        (f"https://avkbuildingsolutions.in/contact-us", "coming-soon.html"),
        (f"https://avkbuildingsolutions.in/about-us", "coming-soon.html"),
        (f"https://avkbuildingsolutions.in/products", "products.html"),
        (f"https://avkbuildingsolutions.in/enquiry", "coming-soon.html"),
        (f"https://avkbuildingsolutions.in/quality", "coming-soon.html"),
        (f"https://avkbuildingsolutions.in/career", "coming-soon.html"),
        (f"https://avkbuildingsolutions.in/", "index.html"),
        (f"{BASE}/", "index.html"),
    ]
    for old, new in page_map:
        html = html.replace(old, new)

    for old, new in [
        ('href="about-us"', 'href="coming-soon.html"'),
        ("href='about-us'", "href='coming-soon.html'"),
        ('href="quality"', 'href="coming-soon.html"'),
        ('href="career"', 'href="coming-soon.html"'),
        ('href="enquiry"', 'href="coming-soon.html"'),
        ('href="contact-us"', 'href="coming-soon.html"'),
        ('href="products"', 'href="products.html"'),
        ('href="framework-fasteners"', 'href="framework-fasteners.html"'),
    ]:
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
    ]
    for a, b in replacements:
        html = html.replace(a, b)

    html = re.sub(r"<title>.*?</title>", "<title>Tista Ventures</title>", html, flags=re.I | re.S)
    return html


def save_bytes(path: Path, data: bytes) -> None:
    rel = str(path.relative_to(ROOT)).replace("\\", "/")
    if rel in PROTECTED:
        log(f"  SKIP protected {rel}")
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    log(f"  OK {rel} ({len(data)} bytes)")


def main() -> int:
    os.chdir(ROOT)
    html_jobs: list[tuple[str, Path]] = []

    for url, dest in START_PAGES.items():
        log(f"GET PAGE {url}")
        data = download(url)
        if not data:
            continue
        text = data.decode("utf-8", errors="replace")
        extract_assets_from_html(text, url)
        html_jobs.append((url, dest))
        # stash raw temporarily on dest for rewrite pass
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(text, encoding="utf-8")

    log(f"Queued {len(queue)} assets...")

    while queue:
        url = queue.pop(0)
        log(f"GET {url}")
        data = download(url)
        if data is None:
            continue
        lp = local_path_for_asset(url)
        if lp.suffix.lower() == ".css":
            extract_assets_from_css(data.decode("utf-8", errors="replace"), url)
        # also scan JS lightly for url strings to theme assets? skip for speed
        save_bytes(lp, data)
        time.sleep(0.02)

    log("Rebranding HTML pages...")
    for url, dest in html_jobs:
        text = dest.read_text(encoding="utf-8")
        out = rewrite_and_rebrand(text)
        dest.write_text(out, encoding="utf-8")
        log(f"  WROTE {dest.name}")

    log(f"Done. Fetched {len(visited)} URLs.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
