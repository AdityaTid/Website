import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../assets/images/original");
fs.mkdirSync(outDir, { recursive: true });

const BASE = "https://getkloud.in";

function absolutize(url) {
  if (!url) return null;
  if (url.startsWith("data:")) return null;
  if (url.startsWith("//")) return "https:" + url;
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return BASE + url;
  return BASE + "/" + url.replace(/^\.\//, "");
}

function extFromUrl(url, contentType = "") {
  const clean = url.split("?")[0].toLowerCase();
  const m = clean.match(/\.(png|jpe?g|webp|svg|gif|ico|avif)$/);
  if (m) return "." + m[1].replace("jpeg", "jpg");
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return ".jpg";
  if (contentType.includes("svg")) return ".svg";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("gif")) return ".gif";
  return ".bin";
}

function safeName(url, i) {
  const u = new URL(url);
  let base = path.basename(u.pathname) || `image-${i}`;
  base = base.replace(/[^a-zA-Z0-9._-]/g, "_");
  if (!path.extname(base)) base += ".jpg";
  return base;
}

async function collectFromHtml(html, pageUrl) {
  const found = new Set();
  const patterns = [
    /(?:src|data-src|data-lazy-src|data-bg|href)=["']([^"']+\.(?:png|jpe?g|webp|svg|gif|ico|avif)[^"']*)["']/gi,
    /url\(["']?([^"')]+)["']?\)/gi,
    /(?:srcset)=["']([^"']+)["']/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(html))) {
      const raw = m[1];
      if (raw.includes(",")) {
        raw.split(",").forEach((part) => {
          const u = part.trim().split(/\s+/)[0];
          const abs = absolutize(u);
          if (abs && /\.(png|jpe?g|webp|svg|gif|ico|avif)(\?|$)/i.test(abs)) found.add(abs);
        });
      } else {
        const abs = absolutize(raw);
        if (abs && /\.(png|jpe?g|webp|svg|gif|ico|avif)(\?|$)/i.test(abs)) found.add(abs);
      }
    }
  }
  // WordPress uploads common paths mentioned in content
  console.log(`Page ${pageUrl}: found ${found.size} candidates`);
  return [...found];
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "image/*,*/*",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  let final = dest;
  const ext = extFromUrl(url, res.headers.get("content-type") || "");
  if (!path.extname(dest) || path.extname(dest) === ".bin") {
    final = dest.replace(/\.[^.]+$/, "") + ext;
  }
  fs.writeFileSync(final, buf);
  return { file: path.basename(final), bytes: buf.length, url };
}

const pages = [
  BASE + "/",
  BASE + "/wp-json/wp/v2/media?per_page=100",
];

const all = new Set();

for (const page of pages) {
  try {
    const res = await fetch(page, { headers: { "User-Agent": "Mozilla/5.0" } });
    const text = await res.text();
    if (page.includes("wp-json")) {
      try {
        const json = JSON.parse(text);
        for (const item of json) {
          if (item.source_url) all.add(item.source_url);
          if (item.guid?.rendered) all.add(item.guid.rendered);
          const sizes = item.media_details?.sizes || {};
          for (const s of Object.values(sizes)) {
            if (s.source_url) all.add(s.source_url);
          }
        }
        console.log(`WP media API: ${json.length} items`);
      } catch {
        console.log("WP media API not available or not JSON");
        for (const u of await collectFromHtml(text, page)) all.add(u);
      }
    } else {
      for (const u of await collectFromHtml(text, page)) all.add(u);
    }
  } catch (e) {
    console.log("Failed", page, e.message);
  }
}

// Also scrape common asset directories from homepage for Elementor/WP
try {
  const home = await (await fetch(BASE + "/", { headers: { "User-Agent": "Mozilla/5.0" } })).text();
  const uploadPaths = [...home.matchAll(/https?:\/\/[^"'()\s]+\/wp-content\/uploads\/[^"'()\s]+/gi)].map((m) => m[0]);
  uploadPaths.forEach((u) => all.add(u.replace(/&amp;/g, "&")));
  console.log(`Extra upload URLs: ${uploadPaths.length}`);
} catch {}

const urls = [...all].filter((u) => !u.includes("gravatar") && !u.includes("emoji") && !u.includes("data:"));
console.log(`Total unique image URLs: ${urls.length}`);

const manifest = [];
let i = 0;
for (const url of urls) {
  i += 1;
  const name = safeName(url, i);
  const dest = path.join(outDir, name);
  // avoid overwrite collisions
  let finalDest = dest;
  let n = 1;
  while (fs.existsSync(finalDest) && !manifest.find((m) => m.file === path.basename(finalDest))) {
    const parsed = path.parse(dest);
    finalDest = path.join(parsed.dir, `${parsed.name}-${n}${parsed.ext}`);
    n += 1;
  }
  try {
    const result = await download(url, finalDest);
    manifest.push(result);
    console.log("OK", result.file, result.bytes);
  } catch (e) {
    console.log("FAIL", url, e.message);
  }
}

fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`Downloaded ${manifest.length} images to assets/images/original`);
