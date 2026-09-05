import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const BASE = process.env.AUDIT_BASE || "http://localhost:4173";

const pages = [
  "/",
  "/index.html",
  "/about.html",
  "/how-we-work.html",
  "/contact.html",
  "/services/index.html",
  "/services/cloud-services.html",
  "/services/email-solutions.html",
  "/services/lead-generation.html",
  "/services/google-ranking.html",
  "/services/website-development.html",
];

function resolveUrl(from, href) {
  if (!href) return null;
  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
    return { kind: href.split(":")[0], href };
  }
  if (href.startsWith("https://wa.me") || href.startsWith("http://wa.me")) {
    return { kind: "whatsapp", href };
  }
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return { kind: "external", href };
  }
  const abs = new URL(href, from).href;
  return { kind: "internal", href: abs };
}

function extract(html, pageUrl) {
  const hrefs = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)].map((m) => m[1]);
  const cssUrls = [...html.matchAll(/url\(["']?([^"')]+)["']?\)/gi)].map((m) => m[1]);
  return [...hrefs, ...cssUrls]
    .map((h) => resolveUrl(pageUrl, h))
    .filter(Boolean);
}

async function fetchStatus(url) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    return { ok: res.ok, status: res.status, final: res.url };
  } catch (e) {
    return { ok: false, status: 0, error: e.message };
  }
}

const report = {
  pages: [],
  broken: [],
  missingFiles: [],
  warnings: [],
};

for (const page of pages) {
  const url = BASE + page;
  const res = await fetch(url, { redirect: "follow" });
  const html = await res.text();
  const entry = { page, status: res.status, ok: res.ok, assets: [] };
  if (!res.ok) {
    report.broken.push({ type: "page", page, status: res.status });
  }

  const assets = extract(html, url);
  const seen = new Set();
  for (const asset of assets) {
    if (asset.kind === "mailto" || asset.kind === "tel" || asset.kind === "whatsapp" || asset.kind === "external") {
      entry.assets.push(asset);
      continue;
    }
    if (seen.has(asset.href)) continue;
    seen.add(asset.href);
    const st = await fetchStatus(asset.href);
    entry.assets.push({ ...asset, ...st });
    if (!st.ok) {
      report.broken.push({ type: "asset", page, href: asset.href, status: st.status, error: st.error });
    }
  }
  report.pages.push(entry);
}

// CSS-referenced images
const cssFiles = ["css/layout.css", "css/components.css", "css/base.css", "css/animations.css", "css/tokens.css"];
for (const rel of cssFiles) {
  const css = fs.readFileSync(path.join(root, rel), "utf8");
  const urls = [...css.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map((m) => m[1]);
  for (const u of urls) {
    const resolved = path.resolve(path.dirname(path.join(root, rel)), u);
    if (!fs.existsSync(resolved)) {
      report.missingFiles.push({ from: rel, url: u, resolved });
    }
  }
}

// HTML-referenced local files existence
const htmlFiles = [
  "index.html",
  "about.html",
  "how-we-work.html",
  "contact.html",
  "services/index.html",
  "services/cloud-services.html",
  "services/email-solutions.html",
  "services/lead-generation.html",
  "services/google-ranking.html",
  "services/website-development.html",
];

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const refs = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)].map((m) => m[1]);
  const cssUrls = [...html.matchAll(/url\(["']?([^"')]+)["']?\)/gi)].map((m) => m[1]);
  for (const ref of [...refs, ...cssUrls]) {
    if (/^(https?:|mailto:|tel:|javascript:|#)/i.test(ref)) continue;
    const resolved = path.resolve(path.dirname(path.join(root, file)), ref);
    if (!fs.existsSync(resolved)) {
      report.missingFiles.push({ from: file, url: ref, resolved });
    }
  }
}

// Form / JS sanity
const forms = fs.readFileSync(path.join(root, "js/forms.js"), "utf8");
const site = fs.readFileSync(path.join(root, "js/site.js"), "utf8");
if (!forms.includes("mailto:")) report.warnings.push("forms.js missing mailto builder");
if (!forms.includes("wa.me")) report.warnings.push("forms.js missing WhatsApp builder");
if (!site.includes("nav-toggle")) report.warnings.push("site.js missing mobile nav toggle");

console.log(JSON.stringify(report, null, 2));
console.log("\n--- SUMMARY ---");
console.log("Pages checked:", report.pages.length);
console.log("Broken HTTP:", report.broken.length);
console.log("Missing files:", report.missingFiles.length);
console.log("Warnings:", report.warnings.length);
if (report.broken.length) {
  console.log("\nBROKEN:");
  for (const b of report.broken) console.log("-", JSON.stringify(b));
}
if (report.missingFiles.length) {
  console.log("\nMISSING FILES:");
  for (const m of report.missingFiles) console.log("-", m.from, "->", m.url);
}
