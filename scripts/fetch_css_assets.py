#!/usr/bin/env python3
"""Download missing assets referenced from local CSS files."""

from __future__ import annotations

import re
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://www.avkbuildingsolutions.in"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0"
CSS_URL = re.compile(r"""url\(\s*['"]?([^'")]+)['"]?\s*\)""", re.I)

CSS_FILES = [
    "css/main-default.css",
    "css/animate.css",
    "fonts/fonts.css",
    "js/rs-plugin/css/settings.css",
    "js/rs-plugin/css/settings-custom.css",
    "js/flexslider/flexslider.css",
    "js/bxslider/jquery.bxslider.css",
    "js/fancybox/jquery.fancybox.css",
    "js/jqueryui/jquery-ui.css",
    "js/jqueryui/jquery-ui.structure.css",
]


def main() -> None:
    seen: set[str] = set()
    for rel_css in CSS_FILES:
        css = ROOT / rel_css
        if not css.exists():
            continue
        text = css.read_text(encoding="utf-8", errors="replace")
        css_url = f"{BASE}/{rel_css.replace(chr(92), '/')}"
        for m in CSS_URL.finditer(text):
            raw = m.group(1).strip()
            if not raw or raw.startswith("data:"):
                continue
            absu = urllib.parse.urljoin(css_url, raw)
            p = urllib.parse.urlparse(absu)
            if "avkbuildingsolutions.in" not in p.netloc:
                continue
            rel = urllib.parse.unquote(p.path.lstrip("/"))
            if not rel or rel in seen:
                continue
            seen.add(rel)
            dest = ROOT / rel
            if dest.exists() and dest.stat().st_size > 0:
                continue
            dest.parent.mkdir(parents=True, exist_ok=True)
            fetch = absu.replace(" ", "%20")
            print(f"GET {fetch}", flush=True)
            try:
                req = urllib.request.Request(fetch, headers={"User-Agent": UA})
                data = urllib.request.urlopen(req, timeout=60).read()
                dest.write_bytes(data)
                print(f" OK {rel} ({len(data)})", flush=True)
            except Exception as e:
                print(f" FAIL {rel}: {e}", flush=True)
    print(f"scanned refs: {len(seen)}", flush=True)


if __name__ == "__main__":
    main()
