import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const clients = [
  ["cadmech.webp", "Cadmech"],
  ["theindian.webp", "The Indian"],
  ["joist.webp", "Joist"],
  ["nexel.webp", "Nexel"],
  ["BBCPL-Logo.webp", "BBCPL"],
  ["pratibimb.webp", "Pratibimb"],
  ["radicalnew.webp", "Radical"],
  ["Progohealthnew.webp", "Progo Health"],
  ["awetech.webp", "Awe Tech"],
  ["techsavi.png", "Tech Savi"],
  ["beingwomen.webp", "Being Women"],
  ["aqualine.webp", "Aqualine"],
  ["ams.webp", "AMS"],
  ["cubebox.webp", "Cube Box"],
  ["jsatone.webp", "JS Atone"],
  ["humandala.webp", "Humandala"],
  ["4Deducation.webp", "4D Education"],
  ["12logo_20_1__20_1_.webp", "Client"],
  ["25-years-logo.webp", "25 Years"],
];

const services = [
  {
    slug: "cloud-services",
    icon: "cloud",
    title: "Cloud Services",
    nav: "services",
    cinematic: true,
    image: "gateways/cloud-sm.jpg",
    eyebrow: "Cloud Services",
    headline: "Cloud that scales with your ambition.",
    lead: "Migration, management, and optimization across Azure, AWS, and hybrid environments — with performance, security, and cost clarity.",
    intro:
      "GetKloud simplifies your cloud journey. Whether public, private, or hybrid, we architect resilient platforms and stay with you through ongoing support.",
    offers: [
      ["Private Hosting", "Dedicated resources, stronger control, and customizable environments for sensitive or compliance-heavy workloads.", "privateHosting1.png"],
      ["Cloud Services", "End-to-end cloud adoption — from consultation and migration to management and optimization.", "goggleCloud.png"],
      ["AWS", "Compute, storage, security, and automation on Amazon Web Services, tailored to your goals.", "aws.webp"],
      ["Azure & Hybrid", "Microsoft Azure and hybrid setups that balance agility with governance.", "azure.png"],
    ],
  },
  {
    slug: "email-solutions",
    icon: "email",
    title: "Email Solutions",
    nav: "services",
    cinematic: true,
    image: "gateways/email-sm.jpg",
    eyebrow: "Email Solutions",
    headline: "Business email that teams actually trust.",
    lead: "Office 365, Google Workspace, Zoho Mail, and Webmail — chosen, configured, and supported for your domain.",
    intro:
      "We help you pick the right platform, migrate cleanly, and keep communication secure so your team stays productive from anywhere.",
    offers: [
      ["Office 365", "Secure Outlook email with Word, Excel, Teams, and collaboration across devices.", "office-365.webp"],
      ["Google Workspace", "Gmail, Drive, Docs, and Meet for fast, cloud-native teamwork.", "workspace.webp"],
      ["Zoho Mail", "Ad-free business email with strong privacy and Zoho app integrations.", "zoho.webp"],
      ["Webmail", "Browser-based email access without heavy client installs.", "web-mail.webp"],
    ],
  },
  {
    slug: "lead-generation",
    icon: "ads",
    title: "Lead Generation",
    nav: "services",
    cinematic: false,
    image: "services/s-1-lead.webp",
    eyebrow: "Lead Generation",
    headline: "Campaigns that attract the right buyers.",
    lead: "Paid ads and automation that turn attention into qualified conversations.",
    intro:
      "We build data-driven acquisition systems across search and social — measured against clear KPIs, not vanity metrics.",
    offers: [
      ["Google Paid Ads", "Search and display campaigns tuned for intent, conversions, and efficient spend.", "i-1-google.webp"],
      ["YouTube Paid Ads", "Video campaigns that build awareness and drive action with the right viewers.", "i-1-youtube.webp"],
      ["LinkedIn Paid Ads", "B2B targeting that reaches decision-makers in your niche.", "i-1-linkedin.webp"],
    ],
  },
  {
    slug: "google-ranking",
    icon: "search",
    title: "Google Ranking",
    nav: "services",
    cinematic: false,
    image: "services/s-2-search.webp",
    eyebrow: "SEO & Visibility",
    headline: "Rank where your customers are searching.",
    lead: "Technical SEO, content, local presence, and audits that move you toward page-one visibility.",
    intro:
      "Our SEO work blends keyword strategy, site health, and local optimization so organic traffic becomes a dependable growth channel.",
    offers: [
      ["Google Search", "On-page and organic strategies that improve rankings and qualified traffic.", "i-2-rank.webp"],
      ["Google Locations", "Local SEO and Maps optimization to attract nearby customers.", "i-2-location.webp"],
      ["Website Audit", "A clear diagnosis of SEO gaps, structure issues, and quick wins.", "i-2-audit.webp"],
      ["Google Merchant Center", "Product listing setup and optimization for Google Shopping visibility.", "i-2-shop.webp"],
    ],
  },
  {
    slug: "ecommerce",
    icon: "shop",
    title: "eCommerce Development",
    nav: "services",
    cinematic: false,
    image: "services/s-3-b2b.webp",
    eyebrow: "eCommerce",
    headline: "Stores built to convert, not just launch.",
    lead: "Fast, secure, mobile-first commerce experiences for B2B, B2C, D2C, and more.",
    intro:
      "We design and develop online stores that feel effortless to shop — with the structure, SEO readiness, and performance growth demands.",
    offers: [
      ["B2B eCommerce", "Bulk buying flows and buyer-seller workflows for wholesale growth.", "i-3-b2b.webp"],
      ["B2C eCommerce", "Customer-centric retail experiences that simplify purchase.", "i-3-b2c.webp"],
      ["D2C eCommerce", "Brand-owned storefronts focused on relationships and margin.", "i-3-d2c.webp"],
      ["Product Stores", "Catalog platforms tailored to what you sell.", "i-3-product.webp"],
      ["Service Stores", "Booking-led platforms for service businesses.", "i-3-service.webp"],
      ["Drop Shipping", "Lean storefronts that streamline sourcing and fulfillment.", "i-3-drop.webp"],
    ],
  },
  {
    slug: "website-development",
    icon: "code",
    title: "Website Development",
    nav: "services",
    cinematic: true,
    image: "services/s-4-corporate.webp",
    eyebrow: "Website Development",
    headline: "Websites that look sharp and work harder.",
    lead: "High-performance, mobile-friendly, SEO-ready sites for brands that need results.",
    intro:
      "From single-page launches to corporate platforms and ongoing maintenance — we build secure, scalable sites around your goals.",
    offers: [
      ["Single Page Websites", "Fast, focused one-page experiences with clear messaging.", "i-4-singlepage.webp"],
      ["Small Business Websites", "Affordable professional sites built to generate leads.", "i-4-smallshop.webp"],
      ["Corporate Websites", "Scalable brand platforms for stakeholders and clients.", "i-4-contruction.webp"],
      ["Landing Pages", "Conversion-first pages for campaigns and offers.", "i-4-landing.webp"],
      ["Website Maintenance", "Updates, backups, performance checks, and fixes.", "i-4-maintain.webp"],
    ],
  },
  {
    slug: "business-automation",
    icon: "cog",
    title: "Business Automation",
    nav: "services",
    cinematic: false,
    image: "services/s-5-erp.webp",
    eyebrow: "Automation",
    headline: "Systems that remove busywork.",
    lead: "Custom ERP, CRM, and software that streamline operations and free your team.",
    intro:
      "We automate repetitive workflows with tools designed around how your business actually runs — practical, scalable, and measurable.",
    offers: [
      ["Custom ERP", "Centralized operations platforms with real-time insight.", "i-5-erp.webp"],
      ["Custom CRM", "Lead tracking and relationship tools tailored to your sales motion.", "i-5-crm.webp"],
      ["Custom Software", "Bespoke applications that fit unique processes.", "i-5-develop.webp"],
    ],
  },
];

function icon(name, extraClass = "") {
  const paths = {
    cloud:
      '<path d="M7 18h10.5A4.5 4.5 0 0 0 20 9.6 6 6 0 0 0 8.7 7.1 5 5 0 0 0 7 18Z"/>',
    hosting:
      '<rect x="4" y="4" width="16" height="6" rx="1.4"/><rect x="4" y="14" width="16" height="6" rx="1.4"/><circle cx="8" cy="7" r=".9" fill="currentColor" stroke="none"/><circle cx="8" cy="17" r=".9" fill="currentColor" stroke="none"/>',
    email:
      '<rect x="3.5" y="5.5" width="17" height="13" rx="1.6"/><path d="m4.2 7.2 7.8 6.2 7.8-6.2"/>',
    ads: '<path d="M5 19V9l7-5 7 5v10H5Z"/><path d="M10 19v-6h4v6"/>',
    search:
      '<circle cx="11" cy="11" r="6.2"/><path d="m20 20-4.2-4.2"/>',
    shop: '<path d="M5 8h14l-1.2 11.2A2 2 0 0 1 15.8 21H8.2a2 2 0 0 1-2-1.8L5 8Z"/><path d="M8 8V6.5A4 4 0 0 1 16 6.5V8"/>',
    code: '<path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="m13.2 5-2.4 14"/>',
    cog: '<circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.2M12 18.3V20.5M4.9 6.5l1.6 1.6M17.5 16l1.6 1.6M3.5 12h2.2M18.3 12H20.5M4.9 17.5l1.6-1.6M17.5 8l1.6-1.6"/>',
    chart:
      '<path d="M4.5 19.5h15"/><path d="M7 16v-4"/><path d="M12 16V8"/><path d="M17 16v-7"/>',
    star: '<path d="m12 3.6 2.3 4.7 5.2.8-3.8 3.6.9 5.2L12 15.5 7.4 17.9l.9-5.2-3.8-3.6 5.2-.8Z"/>',
    users:
      '<circle cx="9" cy="8" r="2.4"/><path d="M4.6 17.4c.5-2.6 2.4-4 4.4-4s3.9 1.4 4.4 4"/><circle cx="16.2" cy="8.4" r="2"/><path d="M15.2 13.6c1.8.2 3.3 1.4 3.8 3.8"/>',
    analyze:
      '<circle cx="11" cy="11" r="6"/><path d="m20 20-3.6-3.6"/><path d="M9 11h4M11 9v4"/>',
    plan: '<rect x="5" y="3.8" width="14" height="16.4" rx="1.6"/><path d="M8.5 2.8v2.2M15.5 2.8v2.2M5 8.4h14"/><path d="M8.5 12h7M8.5 15.4h4.5"/>',
    execute:
      '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    optimize:
      '<path d="M4 16c2.4-6 5.2-9 8-9s5.6 3 8 9"/><path d="M8 16h8"/><circle cx="12" cy="16" r="2"/>',
    report:
      '<path d="M7 3.8h7.2L20 9.6V20.2H7A1.4 1.4 0 0 1 5.6 18.8V5.2A1.4 1.4 0 0 1 7 3.8Z"/><path d="M14 3.8V9.6h6"/><path d="M9 13.2h6M9 16.4h4"/>',
    launch:
      '<path d="M14 4c4 1 6 5 6 10-4 0-8-2-10-6 2-2 3-4 4-4Z"/><path d="M10 12 5 17"/><path d="M8.5 17.5 6.5 19.5"/><path d="m13 14 2.2 4.6 1.2-3.2 3.2-1.2Z"/>',
    shield:
      '<path d="M12 3.4 19 6v6.2c0 4.4-2.8 7.4-7 8.4-4.2-1-7-4-7-8.4V6l7-2.6Z"/><path d="m9 12 2 2 4-4"/>',
    headset:
      '<path d="M5 13v-1a7 7 0 0 1 14 0v1"/><rect x="3.6" y="12.2" width="3.6" height="5.4" rx="1.2"/><rect x="16.8" y="12.2" width="3.6" height="5.4" rx="1.2"/><path d="M17 18.4c0 1.6-1.4 2.8-3.2 2.8H12"/>',
    layers:
      '<path d="m12 3.6 8 4.2-8 4.2-8-4.2 8-4.2Z"/><path d="m4 12 8 4.2L20 12"/><path d="m4 16.2 8 4.2 8-4.2"/>',
    spark:
      '<path d="M12 3.2 13.7 9l5.8 1-4.6 3.8L16.2 20 12 16.8 7.8 20l1.3-6.2L4.5 10l5.8-1Z"/>',
    pin: '<path d="M12 21s6.5-5.4 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.6 12 21 12 21Z"/><circle cx="12" cy="10.6" r="2.1"/>',
    mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="1.6"/><path d="m4.2 7.2 7.8 6.2 7.8-6.2"/>',
    phone:
      '<path d="M6.7 3.9c.5-.5 1.3-.5 1.8 0l1.7 1.7c.4.4.5 1.1.2 1.6L9.4 9c1.3 2.4 3.2 4.3 5.6 5.6l1.8-1c.5-.3 1.2-.2 1.6.2l1.7 1.7c.5.5.5 1.3 0 1.8l-1.1 1.1c-.7.7-1.8 1-2.8.7C11.4 18 6 12.6 4.9 7.8c-.3-1 0-2.1.7-2.8L6.7 3.9Z"/>',
    whatsapp:
      '<path fill="currentColor" stroke="none" d="M12.04 3.5A8.45 8.45 0 0 0 3.6 11.96c0 1.49.39 2.94 1.13 4.22L3.5 20.5l4.44-1.16a8.46 8.46 0 0 0 4.1 1.06h.01A8.46 8.46 0 0 0 20.5 12 8.45 8.45 0 0 0 12.04 3.5Zm4.93 11.96c-.2.57-1.18 1.09-1.63 1.16-.42.06-.95.09-1.53-.1-.35-.11-.8-.26-1.38-.51-2.43-1.05-4.01-3.5-4.13-3.66-.12-.16-1-1.18-1-2.25s.63-1.6.86-1.82c.22-.22.48-.27.64-.27h.46c.15 0 .35 0 .53.4.2.45.66 1.56.72 1.67.06.12.1.25.02.4-.08.16-.12.25-.24.39-.12.13-.25.3-.36.4-.12.12-.24.24-.1.47.14.22.62 1.02 1.33 1.65.91.82 1.68 1.07 1.91 1.19.23.12.37.1.5-.06.14-.16.58-.68.73-.91.16-.23.31-.19.52-.12.22.08 1.37.65 1.6.76.24.12.39.17.45.27.06.1.06.58-.14 1.15Z"/>',
    enquire:
      '<rect x="4" y="4.2" width="16" height="12.2" rx="1.4"/><path d="M8 19.2 10.4 16.4"/><path d="M8 9h8M8 12.2h5.5"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    chevron: '<path d="m7 10 5 5 5-5"/>',
  };
  const d = paths[name] || paths.arrow;
  return `<svg class="icon ${extraClass}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${d}</svg>`;
}

function assetPrefix(depth) {
  return depth ? "../".repeat(depth) : "";
}

function shell({ depth, page, title, description, body, cinematicHero = false }) {
  const p = assetPrefix(depth);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} | GetKloud</title>
  <meta name="description" content="${description}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${p}css/tokens.css" />
  <link rel="stylesheet" href="${p}css/base.css" />
  <link rel="stylesheet" href="${p}css/layout.css" />
  <link rel="stylesheet" href="${p}css/components.css" />
  <link rel="stylesheet" href="${p}css/animations.css" />
  <link rel="icon" href="${p}assets/logo.png" type="image/png" />
</head>
<body data-page="${page}">
  <header class="site-header">
    <div class="site-header__inner">
      <a class="brand" href="${p}index.html" aria-label="GetKloud home">
        <img class="brand__mark" src="${p}assets/logo.png" alt="GetKloud Solutions" />
      </a>
      <nav class="nav" aria-label="Primary">
        <a href="${p}index.html" data-nav="home">Home</a>
        <a href="${p}about.html" data-nav="about">About</a>
        <div class="nav__dropdown">
          <a href="${p}services/index.html" data-nav="services">Services ${icon("chevron", "icon--nav")}</a>
          <div class="nav__dropdown-menu">
            <a href="${p}services/cloud-services.html">Cloud Services</a>
            <a href="${p}services/email-solutions.html">Email Solutions</a>
            <a href="${p}services/lead-generation.html">Lead Generation</a>
            <a href="${p}services/google-ranking.html">Google Ranking</a>
            <a href="${p}services/ecommerce.html">eCommerce</a>
            <a href="${p}services/website-development.html">Website Development</a>
            <a href="${p}services/business-automation.html">Business Automation</a>
          </div>
        </div>
        <a href="${p}how-we-work.html" data-nav="process">How We Work</a>
        <a href="${p}contact.html" data-nav="contact">Contact</a>
      </nav>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">
        <span></span>
      </button>
    </div>
  </header>

  <nav class="mobile-nav" aria-label="Mobile">
    <a href="${p}index.html">Home</a>
    <a href="${p}about.html">About</a>
    <a href="${p}services/index.html">Services</a>
    <div class="mobile-nav__group">
      <a href="${p}services/cloud-services.html">Cloud Services</a>
      <a href="${p}services/email-solutions.html">Email Solutions</a>
      <a href="${p}services/lead-generation.html">Lead Generation</a>
      <a href="${p}services/google-ranking.html">Google Ranking</a>
      <a href="${p}services/ecommerce.html">eCommerce</a>
      <a href="${p}services/website-development.html">Website Development</a>
      <a href="${p}services/business-automation.html">Business Automation</a>
    </div>
    <a href="${p}how-we-work.html">How We Work</a>
    <a href="${p}contact.html">Contact</a>
  </nav>

  <main>
${body}
  </main>

  <footer class="site-footer">
    <div class="container site-footer__grid">
      <div>
        <a class="brand" href="${p}index.html">
          <img class="brand__mark" src="${p}assets/logo.png" alt="GetKloud Solutions" />
        </a>
        <p style="margin-top:1rem;">Website development, cloud, and digital growth partner serving Pune and across India.</p>
      </div>
      <div>
        <h3>Services</h3>
        <a href="${p}services/index.html">All services</a>
        <a href="${p}services/cloud-services.html">Cloud Services</a>
        <a href="${p}services/email-solutions.html">Email Solutions</a>
        <a href="${p}services/lead-generation.html">Lead Generation</a>
        <a href="${p}services/google-ranking.html">Google Ranking</a>
        <a href="${p}services/ecommerce.html">eCommerce</a>
        <a href="${p}services/website-development.html">Website Development</a>
        <a href="${p}services/business-automation.html">Business Automation</a>
      </div>
      <div>
        <h3>Site map</h3>
        <a href="${p}index.html">Home</a>
        <a href="${p}about.html">About</a>
        <a href="${p}how-we-work.html">How We Work</a>
        <a href="${p}contact.html">Contact</a>
      </div>
      <div>
        <h3>Contact</h3>
        <a href="tel:+918421174747">${icon("phone", "icon--sm")} +91 8421174747</a>
        <a href="mailto:info@getkloud.in">${icon("mail", "icon--sm")} info@getkloud.in</a>
        <p class="footer-pin">${icon("pin", "icon--sm")} Sinhagad Road, Pune 411041</p>
      </div>
    </div>
    <div class="container site-footer__bottom">© ${new Date().getFullYear()} GetKloud Solutions. All rights reserved.</div>
  </footer>

  <div class="float-dock" aria-label="Quick contact">
    <a href="${p}contact.html" aria-label="Enquire">${icon("enquire", "icon--dock")}</a>
    <a href="tel:+918421174747" aria-label="Call">${icon("phone", "icon--dock")}</a>
    <a href="https://wa.me/918421174747" data-action="whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("whatsapp", "icon--dock")}</a>
  </div>

  <script src="${p}js/site.js"></script>
  <script src="${p}js/animate.js"></script>
  <script src="${p}js/forms.js"></script>
</body>
</html>
`;
}

function write(rel, content) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("wrote", rel);
}

const homeBody = `
    <section class="hero">
      <div class="hero__media" aria-hidden="true"></div>
      <div class="hero__content">
        <div class="hero__brand">GetKloud</div>
        <h1>Cloud-backed growth for modern business.</h1>
        <p class="hero__text">Empower your company with cloud, hosting, email, and digital services built for clarity, speed, and scale.</p>
        <div class="btn-row">
          <a class="btn btn--primary" href="services/index.html">${icon("arrow")} Explore Services</a>
          <a class="btn btn--ghost" href="contact.html">${icon("enquire")} Talk to Us</a>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <p class="section__eyebrow" data-animate>Start here</p>
        <h2 data-animate>Choose your gateway</h2>
        <div class="gateway" style="margin-top:2rem;">
          <a class="gateway__item" style="--gateway-image:url('assets/images/gateways/cloud-sm.jpg')" href="services/cloud-services.html" data-animate>
            <h3>Cloud Services</h3>
            <p>Limitless potential across Azure, AWS, and hybrid cloud.</p>
            <span>${icon("cloud")} Explore Cloud</span>
          </a>
          <a class="gateway__item" style="--gateway-image:url('assets/images/gateways/hosting-sm.jpg')" href="services/cloud-services.html" data-animate>
            <h3>Private Hosting</h3>
            <p>Security and performance with dedicated hosting control.</p>
            <span>${icon("hosting")} Explore Plans</span>
          </a>
          <a class="gateway__item" style="--gateway-image:url('assets/images/gateways/email-sm.jpg')" href="services/email-solutions.html" data-animate>
            <h3>Email Solutions</h3>
            <p>Business inboxes that keep teams connected and confident.</p>
            <span>${icon("email")} Explore Email</span>
          </a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container grid-2">
        <div>
          <p class="section__eyebrow" data-animate>About us</p>
          <h2 data-animate>A powerful agency for corporate business.</h2>
          <p class="section__lead" data-animate>Founded in 2021, GetKloud Solutions is a trusted partner in cloud transformation and digital growth — delivering scalable, secure services across Microsoft Azure, AWS, and private hosting.</p>
          <a class="btn btn--outline" href="about.html" data-animate>${icon("arrow")} Learn about GetKloud</a>
        </div>
        <div class="stat-row">
          <div class="stat" data-animate>
            <div class="stat__icon">${icon("chart")}</div>
            <div class="stat__value">99%</div>
            <p class="stat__label">Track and analyze business reports.</p>
          </div>
          <div class="stat" data-animate>
            <div class="stat__icon">${icon("star")}</div>
            <div class="stat__value">4.98</div>
            <p class="stat__label">Best rated agency experience.</p>
          </div>
          <div class="stat" data-animate>
            <div class="stat__icon">${icon("users")}</div>
            <div class="stat__value">98%</div>
            <p class="stat__label">Genuine repeated happy customers.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <p class="section__eyebrow" data-animate>Our services</p>
        <h2 data-animate>Everything your digital stack needs</h2>
        <p class="section__lead" data-animate>From infrastructure to acquisition to custom software — one partner, clear execution.</p>
        <div class="service-links" style="margin-top:2rem;">
          ${services
            .map(
              (s) => `<a class="service-link service-link--icon" href="services/${s.slug}.html" data-animate>
            <span class="service-link__icon">${icon(s.icon)}</span>
            <div>
              <h3>${s.title}</h3>
              <p>${s.lead}</p>
            </div>
          </a>`
            )
            .join("\n")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container grid-2">
        <div>
          <p class="section__eyebrow" data-animate>How we work</p>
          <h2 data-animate>A calm process with sharp momentum.</h2>
          <p class="section__lead" data-animate>Analyze, plan, execute, optimize, report, and go live — with transparency at every step.</p>
          <a class="btn btn--outline" href="how-we-work.html" data-animate>${icon("arrow")} See full process</a>
        </div>
        <div class="steps">
          <div class="step" data-animate><span class="step__icon">${icon("analyze")}</span><div><h3>Analyze</h3><p>We study your needs, challenges, and market to shape a growth path.</p></div></div>
          <div class="step" data-animate><span class="step__icon">${icon("plan")}</span><div><h3>Plan</h3><p>Strategy with clear KPIs across leads, SEO, cloud, or development.</p></div></div>
          <div class="step" data-animate><span class="step__icon">${icon("execute")}</span><div><h3>Execute</h3><p>Quality delivery on ads, websites, automation, and infrastructure.</p></div></div>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <p class="section__eyebrow" data-animate>Our clients</p>
        <h2 data-animate>Trusted by growing teams</h2>
        <div class="clients" style="margin-top:1.5rem;" data-animate>
          ${clients
            .map(
              ([file, name]) =>
                `<img class="client-logo" src="assets/images/clients/${file}" alt="${name}" loading="lazy" />`
            )
            .join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="section__eyebrow" data-animate>Why GetKloud</p>
        <h2 data-animate>Built for reliability and momentum</h2>
        <div class="feature-band" style="margin-top:1.5rem;">
          <div class="feature" data-animate>
            <span class="feature__icon">${icon("cloud")}</span>
            <div>
              <h3>Scalable cloud services</h3>
              <p>Flexible infrastructure on AWS, Azure, and GCP with migration and cost optimization.</p>
            </div>
          </div>
          <div class="feature" data-animate>
            <span class="feature__icon">${icon("email")}</span>
            <div>
              <h3>Reliable email solutions</h3>
              <p>Google Workspace, Microsoft 365, Zoho Mail, and Webmail — chosen for your workflow.</p>
            </div>
          </div>
          <div class="feature" data-animate>
            <span class="feature__icon">${icon("hosting")}</span>
            <div>
              <h3>Powerful private hosting</h3>
              <p>High-performance environments with control, scalability, and strong security posture.</p>
            </div>
          </div>
          <div class="feature" data-animate>
            <span class="feature__icon">${icon("headset")}</span>
            <div>
              <h3>Dedicated support</h3>
              <p>Monitoring, tuning, and technical help so your systems stay online and optimized.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container">
        <h2 data-animate>How we can help you</h2>
        <p data-animate>Tell us what you need — cloud, website, leads, or automation. We’ll respond with a clear next step.</p>
        <div class="btn-row" style="margin-top:1.25rem;" data-animate>
          <a class="btn btn--primary" href="contact.html" style="background:#fff;color:var(--ink);">${icon("mail")} Send a message</a>
          <a class="btn btn--ghost" href="https://wa.me/918421174747" data-action="whatsapp" target="_blank" rel="noopener">${icon("whatsapp")} WhatsApp</a>
        </div>
      </div>
    </section>
`;

write(
  "index.html",
  shell({
    depth: 0,
    page: "home",
    title: "Website Development & Digital Marketing in Pune",
    description:
      "GetKloud Solutions — cloud services, email, lead generation, SEO, eCommerce, and website development in Pune.",
    body: homeBody,
  })
);

write(
  "about.html",
  shell({
    depth: 0,
    page: "about",
    title: "About Us",
    description: "Learn about GetKloud Solutions — cloud and digital partners based in Pune, India.",
    body: `
    <section class="page-hero">
      <div class="container">
        <p class="section__eyebrow">About GetKloud</p>
        <h1>Powerful agency for corporate business.</h1>
        <p class="section__lead">Founded in 2021, GetKloud Solutions helps organizations adopt cloud and digital systems with clarity, security, and lasting support.</p>
      </div>
    </section>
    <section class="section">
      <div class="container grid-2">
        <div>
          <h2 data-animate>Our mission</h2>
          <p data-animate>We simplify cloud adoption for businesses of all sizes — offering tailored solutions that improve agility, performance, and cost-efficiency across Microsoft Azure, AWS, and private hosting environments.</p>
          <p data-animate>Whether you are migrating legacy systems, optimizing infrastructure, or building hybrid environments, our team focuses on seamless execution and dependable ongoing support.</p>
        </div>
        <div class="visual-panel" data-animate="scale" aria-hidden="true"></div>
      </div>
    </section>
    <section class="section section--tight">
      <div class="container">
        <h2 data-animate>Why teams choose us</h2>
        <div class="feature-band" style="margin-top:1.5rem;">
          <div class="feature" data-animate><span class="feature__icon">${icon("spark")}</span><div><h3>Innovation with reliability</h3><p>Modern platforms delivered with practical governance and support.</p></div></div>
          <div class="feature" data-animate><span class="feature__icon">${icon("layers")}</span><div><h3>End-to-end digital stack</h3><p>Cloud, email, websites, SEO, ads, and automation under one roof.</p></div></div>
          <div class="feature" data-animate><span class="feature__icon">${icon("pin")}</span><div><h3>Pune-based, India-wide</h3><p>Serving Pune, Mumbai, Nagpur, Thane, Bangalore, and beyond.</p></div></div>
          <div class="feature" data-animate><span class="feature__icon">${icon("shield")}</span><div><h3>4+ years of delivery</h3><p>Hands-on experience helping businesses thrive in a digital-first world.</p></div></div>
        </div>
      </div>
    </section>
    <section class="cta-band">
      <div class="container">
        <h2 data-animate>Let’s build what’s next</h2>
        <p data-animate>Share your goals and we’ll map a practical path forward.</p>
        <a class="btn btn--primary" href="contact.html" style="background:#fff;color:var(--ink);margin-top:1rem;" data-animate>${icon("enquire")} Contact GetKloud</a>
      </div>
    </section>`,
  })
);

write(
  "how-we-work.html",
  shell({
    depth: 0,
    page: "process",
    title: "How We Work",
    description: "GetKloud’s six-step process — analyze, plan, execute, optimize, report, and go live.",
    body: `
    <section class="page-hero">
      <div class="container">
        <p class="section__eyebrow">How we work</p>
        <h1>From clarity to go-live.</h1>
        <p class="section__lead">A transparent process designed for measurable progress — whether the work is cloud, campaigns, or custom development.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="steps">
          <div class="step" data-animate><span class="step__icon">${icon("analyze")}</span><div><h3>Analyze</h3><p>We analyze your business needs, challenges, and market trends to craft tailored strategies for growth.</p></div></div>
          <div class="step" data-animate><span class="step__icon">${icon("plan")}</span><div><h3>Plan</h3><p>We craft a strategy aligned with your goals — lead generation, SEO, eCommerce, or infrastructure — with clear KPIs.</p></div></div>
          <div class="step" data-animate><span class="step__icon">${icon("execute")}</span><div><h3>Execute</h3><p>With a clear plan, we implement ads, websites, automation, or cloud work efficiently and on time.</p></div></div>
          <div class="step" data-animate><span class="step__icon">${icon("optimize")}</span><div><h3>Optimize</h3><p>We monitor performance and refine strategies so results keep improving after launch.</p></div></div>
          <div class="step" data-animate><span class="step__icon">${icon("report")}</span><div><h3>Report & Support</h3><p>Regular communication, performance reporting, and ongoing support for updates and improvements.</p></div></div>
          <div class="step" data-animate><span class="step__icon">${icon("launch")}</span><div><h3>Go Live</h3><p>A smooth, tested, optimized launch for maximum impact from day one.</p></div></div>
        </div>
      </div>
    </section>`,
  })
);

write(
  "contact.html",
  shell({
    depth: 0,
    page: "contact",
    title: "Contact",
    description: "Contact GetKloud in Pune — email, phone, WhatsApp, and office location.",
    body: `
    <section class="page-hero">
      <div class="container">
        <p class="section__eyebrow">Contact</p>
        <h1>How we can help you</h1>
        <p class="section__lead">Send a message by email or WhatsApp. We never collect information without your consent.</p>
      </div>
    </section>
    <section class="section">
      <div class="container grid-2">
        <form class="form" data-enquire-form data-animate>
          <label>Name *
            <input name="name" type="text" required autocomplete="name" placeholder="Your name" />
          </label>
          <label>Email *
            <input name="email" type="email" required autocomplete="email" placeholder="you@company.com" />
          </label>
          <label>Phone
            <input name="phone" type="tel" autocomplete="tel" placeholder="+91 ..." />
          </label>
          <label>Interested service
            <select name="service">
              <option value="">Select a service</option>
              <option>Cloud Services</option>
              <option>Email Solutions</option>
              <option>Lead Generation</option>
              <option>Google Ranking</option>
              <option>eCommerce Development</option>
              <option>Website Development</option>
              <option>Business Automation</option>
            </select>
          </label>
          <label>Message
            <textarea name="message" placeholder="Tell us about your project"></textarea>
          </label>
          <div class="btn-row">
            <button class="btn btn--primary" type="submit">${icon("mail")} Send via Email</button>
            <button class="btn btn--outline" type="button" data-action="whatsapp">${icon("whatsapp")} Send via WhatsApp</button>
          </div>
        </form>
        <div class="contact-details" data-animate="right">
          <div class="contact-item">
            <span class="contact-item__icon">${icon("pin")}</span>
            <div>
              <h3>Office location</h3>
              <p>BHARGAV VIHAR, SN.53/1, Wadgaon Dhayari, Sinhagad Road, Pune 411041, India</p>
            </div>
          </div>
          <div class="contact-item">
            <span class="contact-item__icon">${icon("mail")}</span>
            <div>
              <h3>Email</h3>
              <p><a href="mailto:info@getkloud.in">info@getkloud.in</a></p>
            </div>
          </div>
          <div class="contact-item">
            <span class="contact-item__icon">${icon("phone")}</span>
            <div>
              <h3>Call</h3>
              <p><a href="tel:+918421174747">+91 8421174747</a></p>
            </div>
          </div>
          <div class="contact-item">
            <span class="contact-item__icon">${icon("whatsapp")}</span>
            <div>
              <h3>WhatsApp</h3>
              <p><a href="https://wa.me/918421174747" data-action="whatsapp" target="_blank" rel="noopener">Chat with GetKloud</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>`,
  })
);

write(
  "services/index.html",
  shell({
    depth: 1,
    page: "services",
    title: "Services",
    description: "Explore GetKloud services — cloud, email, leads, SEO, eCommerce, websites, and automation.",
    body: `
    <section class="page-hero">
      <div class="container">
        <p class="section__eyebrow">Our services</p>
        <h1>Capabilities that compound.</h1>
        <p class="section__lead">Infrastructure, acquisition, and software — designed to work together for your business.</p>
      </div>
    </section>
    <section class="section">
      <div class="container service-links">
        ${services
          .map(
            (s) => {
              const thumb = s.image.startsWith("services/")
                ? `../assets/images/${s.image}`
                : `../assets/images/${s.image}`;
              return `<a class="service-link service-link--media" href="${s.slug}.html" data-animate>
          <img src="${thumb}" alt="" loading="lazy" />
          <div>
            <h3><span class="service-link__icon service-link__icon--inline">${icon(s.icon)}</span>${s.title}</h3>
            <p>${s.lead}</p>
          </div>
        </a>`;
            }
          )
          .join("\n")}
      </div>
    </section>`,
  })
);

for (const s of services) {
  const offers = s.offers
    .map(([name, copy, img]) => {
      const imgTag = img
        ? `<img class="offer__img" src="../assets/images/services/${img}" alt="" loading="lazy" />`
        : "";
      return `<article class="offer" data-animate>
          ${imgTag}
          <div class="offer__body">
            <h3>${name}</h3>
            <p>${copy}</p>
          </div>
        </article>`;
    })
    .join("\n");

  const heroImage = s.image.startsWith("services/") || s.image.startsWith("gateways/") || s.image.startsWith("heroes/")
    ? `../assets/images/${s.image}`
    : `../assets/images/${s.image}`;

  const hero = s.cinematic
    ? `<section class="page-hero page-hero--cinematic" style="--page-hero-image:url('${heroImage}')">
      <div class="page-hero__media" aria-hidden="true"></div>
      <div class="container">
        <p class="section__eyebrow">${s.eyebrow}</p>
        <h1>${s.headline}</h1>
        <p class="section__lead">${s.lead}</p>
        <div class="btn-row" style="margin-top:1.25rem;">
          <a class="btn btn--primary" href="../contact.html">${icon("arrow")} Start a project</a>
          <a class="btn btn--ghost" href="https://wa.me/918421174747" data-action="whatsapp" target="_blank" rel="noopener">${icon("whatsapp")} WhatsApp</a>
        </div>
      </div>
    </section>`
    : `<section class="page-hero page-hero--cinematic" style="--page-hero-image:url('${heroImage}')">
      <div class="page-hero__media" aria-hidden="true"></div>
      <div class="container">
        <p class="section__eyebrow">${s.eyebrow}</p>
        <h1>${s.headline}</h1>
        <p class="section__lead">${s.lead}</p>
        <div class="btn-row" style="margin-top:1.25rem;">
          <a class="btn btn--primary" href="../contact.html">${icon("arrow")} Start a project</a>
          <a class="btn btn--ghost" href="https://wa.me/918421174747" data-action="whatsapp" target="_blank" rel="noopener">${icon("whatsapp")} WhatsApp</a>
        </div>
      </div>
    </section>`;

  write(
    `services/${s.slug}.html`,
    shell({
      depth: 1,
      page: "services",
      title: s.title,
      description: s.lead,
      body: `
    ${hero}
    <section class="section">
      <div class="container">
        <h2 data-animate>What we deliver</h2>
        <p class="section__lead" data-animate>${s.intro}</p>
        <div class="offer-list" style="margin-top:2rem;">
          ${offers}
        </div>
      </div>
    </section>
    <section class="cta-band">
      <div class="container">
        <h2 data-animate>Ready to talk ${s.title.toLowerCase()}?</h2>
        <p data-animate>Tell us where you are today — we’ll recommend a clear next step.</p>
        <a class="btn btn--primary" href="../contact.html" style="background:#fff;color:var(--ink);margin-top:1rem;" data-animate>${icon("enquire")} Contact GetKloud</a>
      </div>
    </section>`,
    })
  );
}

console.log("Done.");
