import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const services = [
  {
    slug: "cloud-services",
    title: "Cloud Services",
    nav: "services",
    cinematic: true,
    image: "gateway-cloud.jpg",
    eyebrow: "Cloud Services",
    headline: "Cloud that scales with your ambition.",
    lead: "Migration, management, and optimization across Azure, AWS, and hybrid environments — with performance, security, and cost clarity.",
    intro:
      "GetKloud simplifies your cloud journey. Whether public, private, or hybrid, we architect resilient platforms and stay with you through ongoing support.",
    offers: [
      ["Private Hosting", "Dedicated resources, stronger control, and customizable environments for sensitive or compliance-heavy workloads."],
      ["Cloud Services", "End-to-end cloud adoption — from consultation and migration to management and optimization."],
      ["AWS", "Compute, storage, security, and automation on Amazon Web Services, tailored to your goals."],
      ["Azure & Hybrid", "Microsoft Azure and hybrid setups that balance agility with governance."],
    ],
  },
  {
    slug: "email-solutions",
    title: "Email Solutions",
    nav: "services",
    cinematic: true,
    image: "gateway-email.jpg",
    eyebrow: "Email Solutions",
    headline: "Business email that teams actually trust.",
    lead: "Office 365, Google Workspace, Zoho Mail, and Webmail — chosen, configured, and supported for your domain.",
    intro:
      "We help you pick the right platform, migrate cleanly, and keep communication secure so your team stays productive from anywhere.",
    offers: [
      ["Office 365", "Secure Outlook email with Word, Excel, Teams, and collaboration across devices."],
      ["Google Workspace", "Gmail, Drive, Docs, and Meet for fast, cloud-native teamwork."],
      ["Zoho Mail", "Ad-free business email with strong privacy and Zoho app integrations."],
      ["Webmail", "Browser-based email access without heavy client installs."],
    ],
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    nav: "services",
    cinematic: false,
    image: "service-digital.jpg",
    eyebrow: "Lead Generation",
    headline: "Campaigns that attract the right buyers.",
    lead: "Paid ads and automation that turn attention into qualified conversations.",
    intro:
      "We build data-driven acquisition systems across search and social — measured against clear KPIs, not vanity metrics.",
    offers: [
      ["Google Paid Ads", "Search and display campaigns tuned for intent, conversions, and efficient spend."],
      ["YouTube Paid Ads", "Video campaigns that build awareness and drive action with the right viewers."],
      ["LinkedIn Paid Ads", "B2B targeting that reaches decision-makers in your niche."],
    ],
  },
  {
    slug: "google-ranking",
    title: "Google Ranking",
    nav: "services",
    cinematic: false,
    image: "service-digital.jpg",
    eyebrow: "SEO & Visibility",
    headline: "Rank where your customers are searching.",
    lead: "Technical SEO, content, local presence, and audits that move you toward page-one visibility.",
    intro:
      "Our SEO work blends keyword strategy, site health, and local optimization so organic traffic becomes a dependable growth channel.",
    offers: [
      ["Google Search", "On-page and organic strategies that improve rankings and qualified traffic."],
      ["Google Locations", "Local SEO and Maps optimization to attract nearby customers."],
      ["Website Audit", "A clear diagnosis of SEO gaps, structure issues, and quick wins."],
      ["Google Merchant Center", "Product listing setup and optimization for Google Shopping visibility."],
    ],
  },
  {
    slug: "ecommerce",
    title: "eCommerce Development",
    nav: "services",
    cinematic: false,
    image: "service-digital.jpg",
    eyebrow: "eCommerce",
    headline: "Stores built to convert, not just launch.",
    lead: "Fast, secure, mobile-first commerce experiences for B2B, B2C, D2C, and more.",
    intro:
      "We design and develop online stores that feel effortless to shop — with the structure, SEO readiness, and performance growth demands.",
    offers: [
      ["B2B eCommerce", "Bulk buying flows and buyer-seller workflows for wholesale growth."],
      ["B2C eCommerce", "Customer-centric retail experiences that simplify purchase."],
      ["D2C eCommerce", "Brand-owned storefronts focused on relationships and margin."],
      ["Product & Service Stores", "Catalog or booking-led platforms tailored to what you sell."],
      ["Drop Shipping", "Lean storefronts that streamline sourcing and fulfillment."],
    ],
  },
  {
    slug: "website-development",
    title: "Website Development",
    nav: "services",
    cinematic: true,
    image: "panel-cloud.jpg",
    eyebrow: "Website Development",
    headline: "Websites that look sharp and work harder.",
    lead: "High-performance, mobile-friendly, SEO-ready sites for brands that need results.",
    intro:
      "From single-page launches to corporate platforms and ongoing maintenance — we build secure, scalable sites around your goals.",
    offers: [
      ["Single Page Websites", "Fast, focused one-page experiences with clear messaging."],
      ["Small Business Websites", "Affordable professional sites built to generate leads."],
      ["Corporate Websites", "Scalable brand platforms for stakeholders and clients."],
      ["Landing Pages", "Conversion-first pages for campaigns and offers."],
      ["Website Maintenance", "Updates, backups, performance checks, and fixes."],
    ],
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    nav: "services",
    cinematic: false,
    image: "gateway-hosting.jpg",
    eyebrow: "Automation",
    headline: "Systems that remove busywork.",
    lead: "Custom ERP, CRM, and software that streamline operations and free your team.",
    intro:
      "We automate repetitive workflows with tools designed around how your business actually runs — practical, scalable, and measurable.",
    offers: [
      ["Custom ERP", "Centralized operations platforms with real-time insight."],
      ["Custom CRM", "Lead tracking and relationship tools tailored to your sales motion."],
      ["Custom Software", "Bespoke applications that fit unique processes."],
    ],
  },
];

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
  <link rel="icon" href="${p}assets/logo.svg" type="image/svg+xml" />
</head>
<body data-page="${page}">
  <header class="site-header">
    <div class="site-header__inner">
      <a class="brand" href="${p}index.html" aria-label="GetKloud home">
        <img class="brand__mark" src="${p}assets/logo.svg" alt="" />
        <span class="brand__name">GetKloud</span>
      </a>
      <nav class="nav" aria-label="Primary">
        <a href="${p}index.html" data-nav="home">Home</a>
        <a href="${p}about.html" data-nav="about">About</a>
        <div class="nav__dropdown">
          <a href="${p}services/index.html" data-nav="services">Services</a>
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
          <img class="brand__mark" src="${p}assets/logo.svg" alt="" />
          <span class="brand__name">GetKloud</span>
        </a>
        <p style="margin-top:1rem;">Website development, cloud, and digital growth partner serving Pune and across India.</p>
      </div>
      <div>
        <h3>Services</h3>
        <a href="${p}services/cloud-services.html">Cloud Services</a>
        <a href="${p}services/lead-generation.html">Lead Generation</a>
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
        <a href="tel:+918421174747">+91 8421174747</a>
        <a href="mailto:info@getkloud.in">info@getkloud.in</a>
        <p>Sinhagad Road, Pune 411041</p>
      </div>
    </div>
    <div class="container site-footer__bottom">© ${new Date().getFullYear()} GetKloud Solutions. All rights reserved.</div>
  </footer>

  <div class="float-dock" aria-label="Quick contact">
    <a href="${p}contact.html">Enquire</a>
    <a href="tel:+918421174747">Call</a>
    <a href="https://wa.me/918421174747" data-action="whatsapp" target="_blank" rel="noopener">WhatsApp</a>
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
          <a class="btn btn--primary" href="services/index.html">Explore Services</a>
          <a class="btn btn--ghost" href="contact.html">Talk to Us</a>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <p class="section__eyebrow" data-animate>Start here</p>
        <h2 data-animate>Choose your gateway</h2>
        <div class="gateway" style="margin-top:2rem;">
          <a class="gateway__item" style="--gateway-image:url('assets/images/gateway-cloud.jpg')" href="services/cloud-services.html" data-animate>
            <h3>Cloud Services</h3>
            <p>Limitless potential across Azure, AWS, and hybrid cloud.</p>
            <span>Explore Cloud</span>
          </a>
          <a class="gateway__item" style="--gateway-image:url('assets/images/gateway-hosting.jpg')" href="services/cloud-services.html" data-animate>
            <h3>Private Hosting</h3>
            <p>Security and performance with dedicated hosting control.</p>
            <span>Explore Plans</span>
          </a>
          <a class="gateway__item" style="--gateway-image:url('assets/images/gateway-email.jpg')" href="services/email-solutions.html" data-animate>
            <h3>Email Solutions</h3>
            <p>Business inboxes that keep teams connected and confident.</p>
            <span>Explore Email</span>
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
          <a class="btn btn--outline" href="about.html" data-animate>Learn about GetKloud</a>
        </div>
        <div class="stat-row">
          <div class="stat" data-animate>
            <div class="stat__value">99%</div>
            <p class="stat__label">Track and analyze business reports.</p>
          </div>
          <div class="stat" data-animate>
            <div class="stat__value">4.98</div>
            <p class="stat__label">Best rated agency experience.</p>
          </div>
          <div class="stat" data-animate>
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
              (s) => `<a class="service-link" href="services/${s.slug}.html" data-animate>
            <h3>${s.title}</h3>
            <p>${s.lead}</p>
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
          <a class="btn btn--outline" href="how-we-work.html" data-animate>See full process</a>
        </div>
        <div class="steps">
          <div class="step" data-animate><div><h3>Analyze</h3><p>We study your needs, challenges, and market to shape a growth path.</p></div></div>
          <div class="step" data-animate><div><h3>Plan</h3><p>Strategy with clear KPIs across leads, SEO, cloud, or development.</p></div></div>
          <div class="step" data-animate><div><h3>Execute</h3><p>Quality delivery on ads, websites, automation, and infrastructure.</p></div></div>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <p class="section__eyebrow" data-animate>Our clients</p>
        <h2 data-animate>Trusted by growing teams</h2>
        <div class="clients" style="margin-top:1.5rem;" data-animate>
          <span class="client-pill">Bhogale</span>
          <span class="client-pill">SV Controls</span>
          <span class="client-pill">Cadmech</span>
          <span class="client-pill">Khinvasara</span>
          <span class="client-pill">Fyjiyama</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="section__eyebrow" data-animate>Why GetKloud</p>
        <h2 data-animate>Built for reliability and momentum</h2>
        <div class="feature-band" style="margin-top:1.5rem;">
          <div class="feature" data-animate>
            <h3>Scalable cloud services</h3>
            <p>Flexible infrastructure on AWS, Azure, and GCP with migration and cost optimization.</p>
          </div>
          <div class="feature" data-animate>
            <h3>Reliable email solutions</h3>
            <p>Google Workspace, Microsoft 365, Zoho Mail, and Webmail — chosen for your workflow.</p>
          </div>
          <div class="feature" data-animate>
            <h3>Powerful private hosting</h3>
            <p>High-performance environments with control, scalability, and strong security posture.</p>
          </div>
          <div class="feature" data-animate>
            <h3>Dedicated support</h3>
            <p>Monitoring, tuning, and technical help so your systems stay online and optimized.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container">
        <h2 data-animate>How we can help you</h2>
        <p data-animate>Tell us what you need — cloud, website, leads, or automation. We’ll respond with a clear next step.</p>
        <div class="btn-row" style="margin-top:1.25rem;" data-animate>
          <a class="btn btn--primary" href="contact.html" style="background:#fff;color:var(--ink);">Send a message</a>
          <a class="btn btn--ghost" href="https://wa.me/918421174747" data-action="whatsapp" target="_blank" rel="noopener">WhatsApp</a>
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
          <div class="feature" data-animate><h3>Innovation with reliability</h3><p>Modern platforms delivered with practical governance and support.</p></div>
          <div class="feature" data-animate><h3>End-to-end digital stack</h3><p>Cloud, email, websites, SEO, ads, and automation under one roof.</p></div>
          <div class="feature" data-animate><h3>Pune-based, India-wide</h3><p>Serving Pune, Mumbai, Nagpur, Thane, Bangalore, and beyond.</p></div>
          <div class="feature" data-animate><h3>4+ years of delivery</h3><p>Hands-on experience helping businesses thrive in a digital-first world.</p></div>
        </div>
      </div>
    </section>
    <section class="cta-band">
      <div class="container">
        <h2 data-animate>Let’s build what’s next</h2>
        <p data-animate>Share your goals and we’ll map a practical path forward.</p>
        <a class="btn btn--primary" href="contact.html" style="background:#fff;color:var(--ink);margin-top:1rem;" data-animate>Contact GetKloud</a>
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
          <div class="step" data-animate><div><h3>Analyze</h3><p>We analyze your business needs, challenges, and market trends to craft tailored strategies for growth.</p></div></div>
          <div class="step" data-animate><div><h3>Plan</h3><p>We craft a strategy aligned with your goals — lead generation, SEO, eCommerce, or infrastructure — with clear KPIs.</p></div></div>
          <div class="step" data-animate><div><h3>Execute</h3><p>With a clear plan, we implement ads, websites, automation, or cloud work efficiently and on time.</p></div></div>
          <div class="step" data-animate><div><h3>Optimize</h3><p>We monitor performance and refine strategies so results keep improving after launch.</p></div></div>
          <div class="step" data-animate><div><h3>Report & Support</h3><p>Regular communication, performance reporting, and ongoing support for updates and improvements.</p></div></div>
          <div class="step" data-animate><div><h3>Go Live</h3><p>A smooth, tested, optimized launch for maximum impact from day one.</p></div></div>
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
            <button class="btn btn--primary" type="submit">Send via Email</button>
            <button class="btn btn--outline" type="button" data-action="whatsapp">Send via WhatsApp</button>
          </div>
        </form>
        <div class="contact-details" data-animate="right">
          <div>
            <h3>Office location</h3>
            <p>BHARGAV VIHAR, SN.53/1, Wadgaon Dhayari, Sinhagad Road, Pune 411041, India</p>
          </div>
          <div>
            <h3>Email</h3>
            <p><a href="mailto:info@getkloud.in">info@getkloud.in</a></p>
          </div>
          <div>
            <h3>Call</h3>
            <p><a href="tel:+918421174747">+91 8421174747</a></p>
          </div>
          <div>
            <h3>WhatsApp</h3>
            <p><a href="https://wa.me/918421174747" data-action="whatsapp" target="_blank" rel="noopener">Chat with GetKloud</a></p>
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
            (s) => `<a class="service-link" href="${s.slug}.html" data-animate>
          <h3>${s.title}</h3>
          <p>${s.lead}</p>
        </a>`
          )
          .join("\n")}
      </div>
    </section>`,
  })
);

for (const s of services) {
  const offers = s.offers
    .map(
      ([name, copy]) => `<article class="offer" data-animate>
          <h3>${name}</h3>
          <p>${copy}</p>
        </article>`
    )
    .join("\n");

  const hero = s.cinematic
    ? `<section class="page-hero page-hero--cinematic" style="--page-hero-image:url('../assets/images/${s.image}')">
      <div class="page-hero__media" aria-hidden="true"></div>
      <div class="container">
        <p class="section__eyebrow">${s.eyebrow}</p>
        <h1>${s.headline}</h1>
        <p class="section__lead">${s.lead}</p>
        <div class="btn-row" style="margin-top:1.25rem;">
          <a class="btn btn--primary" href="../contact.html">Start a project</a>
          <a class="btn btn--ghost" href="https://wa.me/918421174747" data-action="whatsapp" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </section>`
    : `<section class="page-hero">
      <div class="container">
        <p class="section__eyebrow">${s.eyebrow}</p>
        <h1>${s.headline}</h1>
        <p class="section__lead">${s.lead}</p>
        <div class="btn-row" style="margin-top:1.25rem;">
          <a class="btn btn--primary" href="../contact.html">Start a project</a>
          <a class="btn btn--outline" href="https://wa.me/918421174747" data-action="whatsapp" target="_blank" rel="noopener">WhatsApp</a>
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
        <a class="btn btn--primary" href="../contact.html" style="background:#fff;color:var(--ink);margin-top:1rem;" data-animate>Contact GetKloud</a>
      </div>
    </section>`,
    })
  );
}

console.log("Done.");
