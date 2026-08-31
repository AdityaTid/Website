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

const founder = {
  name: "Shailesh Patil",
  role: "Founder & Cloud Solutions Architect",
  company: "GetKloud Solutions",
  headline: "Cloud Consultant · AWS & Azure Specialist",
  location: "Pune, Maharashtra, India",
  linkedin: "https://www.linkedin.com/in/shaileshpatilcloud/",
  email: "info@getkloud.in",
  phone: "+91 8421174747",
  statusText: "Available for Consultations",
  experience: "13+ years",
  network: "11K+",
  founded: "2021",
  education: "MBA Marketing · Savitribai Phule Pune University",
  bio:
    "Shailesh founded GetKloud Solutions to empower Indian businesses with clear, cost-optimized, and enterprise-grade cloud, hosting, email, and digital systems. With over 13 years of expertise across AWS, Google Cloud, Microsoft Azure, and SaaS infrastructure, he turns complex technology into dependable business growth.",
  skills: ["AWS Cloud", "Microsoft Azure", "Google Workspace", "Cost Optimization", "DevOps & CI/CD", "Enterprise Security"],
};

const services = [
  {
    slug: "cloud-services",
    icon: "cloud",
    title: "Cloud Services & Infrastructure",
    nav: "services",
    eyebrow: "Cloud Solutions",
    headline: "Scalable, secure cloud architecture engineered for high growth.",
    lead: "Seamless migration, managed infrastructure, and cost optimization across AWS, Microsoft Azure, and private hosting environments.",
    intro:
      "GetKloud removes the friction of cloud adoption. Whether you are modernizing legacy servers, building multi-cloud redundancy, or reducing monthly cloud bills, our certified architects design resilient, high-availability environments.",
    features: [
      {
        title: "Managed AWS & Azure",
        desc: "End-to-end architecture, VPC configuration, serverless pipelines, and database clustering tailored to your workload.",
        tags: ["AWS EC2/S3", "Azure VMs", "Auto-scaling", "Zero-downtime"],
        icon: "cloud",
      },
      {
        title: "Dedicated Private Hosting",
        desc: "High-performance isolated servers with customized RAM/CPU allocations, hardware firewalls, and enterprise root control.",
        tags: ["Custom Hardware", "DDoS Protection", "99.99% SLA", "NVMe SSD"],
        icon: "hosting",
      },
      {
        title: "Cloud Migration & Modernization",
        desc: "Zero-data-loss lift-and-shift or refactoring from on-premise servers to modern containerized cloud stacks.",
        tags: ["Database Migration", "Risk Assessment", "Cutover Plan", "Post-launch QA"],
        icon: "zap",
      },
      {
        title: "Cloud Cost Optimization (FinOps)",
        desc: "Deep audit of idle instances, rightsizing resources, reserved instance planning, and cutting cloud bills by 30-50%.",
        tags: ["Bill Audit", "Auto-shutdown", "Reserved Plans", "Savings Guarantee"],
        icon: "chart",
      },
    ],
    faqs: [
      ["How do you ensure zero downtime during cloud migration?", "We conduct comprehensive dry-run testing in staging environments and perform data synchronization in real-time, executing DNS cutovers during off-peak hours so your operations remain uninterrupted."],
      ["Which cloud provider is best for my business: AWS or Azure?", "It depends on your current software stack and compliance needs. We analyze your workloads (e.g. Windows/.NET favor Azure, microservices/AI favor AWS) to recommend the most cost-effective solution."],
      ["What post-migration support do you provide?", "We offer 24/7 proactive monitoring, automated backup verification, security patching, and dedicated emergency response with strict SLA guarantees."],
    ],
  },
  {
    slug: "email-solutions",
    icon: "email",
    title: "Enterprise Email & Collaboration",
    nav: "services",
    eyebrow: "Email Solutions",
    headline: "Professional business email that teams and clients trust.",
    lead: "Microsoft 365, Google Workspace, Zoho Mail, and encrypted business webmail configured, migrated, and secured for your brand domain.",
    intro:
      "Communication downtime costs deals. GetKloud delivers enterprise-grade mail servers with SPF, DKIM, DMARC authentication to prevent spam filtering and ensure 100% email deliverability.",
    features: [
      {
        title: "Microsoft 365 / Office 365",
        desc: "Full cloud office suite with Exchange email, Teams collaboration, OneDrive cloud storage, and advanced endpoint security.",
        tags: ["Outlook", "Microsoft Teams", "1TB Cloud Drive", "Security Policy"],
        icon: "email",
      },
      {
        title: "Google Workspace for Business",
        desc: "Custom @yourdomain Gmail, Google Meet, Google Drive, Docs, and real-time collaborative workspace setups.",
        tags: ["Gmail Domain", "Google Meet", "Admin Console", "SSO Login"],
        icon: "zap",
      },
      {
        title: "Zoho Workplace & Mail",
        desc: "Ad-free, cost-effective corporate mailboxes with seamless integration into Zoho CRM and productivity applications.",
        tags: ["Ad-Free Mail", "Zoho CRM Sync", "Encrypted Storage", "Budget Friendly"],
        icon: "layers",
      },
      {
        title: "DMARC, SPF & Security Hardening",
        desc: "Complete DNS authentication and spam filter tuning to prevent spoofing, phishing, and domain blacklisting.",
        tags: ["SPF/DKIM/DMARC", "Anti-Phishing", "TLS Encryption", "Inbox Delivery"],
        icon: "shield",
      },
    ],
    faqs: [
      ["Can we migrate our old emails, folders, and calendar data?", "Yes, we handle 100% server-to-server data migration of all emails, folders, contacts, and calendar entries with complete integrity."],
      ["How do you prevent our business emails from going into Spam?", "We configure cryptographically verified SPF, DKIM, and DMARC DNS records along with reverse DNS lookup and MX priority tuning."],
      ["Can we mix different license tiers within the same domain?", "Yes, we can optimize costs by assigning basic mail licenses to field staff and premium collaboration licenses to executive teams."],
    ],
  },
  {
    slug: "lead-generation",
    icon: "ads",
    title: "Performance Lead Generation",
    nav: "services",
    eyebrow: "Digital Marketing",
    headline: "High-intent paid campaigns that generate qualified buyer conversations.",
    lead: "Data-driven Google Ads, YouTube Video Ads, and LinkedIn B2B acquisition engines tuned for conversion and maximum ROI.",
    intro:
      "We replace guesswork with rigorous testing, audience segmentation, conversion tracking, and landing page optimization to turn clicks into profitable sales pipelines.",
    features: [
      {
        title: "Google Search & Display Ads",
        desc: "Capture high-intent commercial searches with targeted keyword clusters, negative matching, and responsive ads.",
        tags: ["Search Intent", "Display Retargeting", "Conversion Tracking", "A/B Testing"],
        icon: "ads",
      },
      {
        title: "LinkedIn B2B Lead Engines",
        desc: "Reach exact decision makers, CXOs, and IT directors through hyper-targeted B2B campaigns and sponsored content.",
        tags: ["Job Title Targeting", "Lead Gen Forms", "InMail Outreach", "Account-Based"],
        icon: "users",
      },
      {
        title: "YouTube Video Ad Campaigns",
        desc: "High-impact video advertising that builds brand authority and drives direct responses from engaged viewers.",
        tags: ["In-Stream Ads", "Video Discovery", "Audience Retargeting", "Brand Lift"],
        icon: "zap",
      },
      {
        title: "Landing Page & Funnel Optimization",
        desc: "High-converting, lightning-fast landing pages with psychological triggers and frictionless contact forms.",
        tags: ["High Conversion", "Heatmap Analysis", "Micro-copy", "Mobile Optimized"],
        icon: "chart",
      },
    ],
    faqs: [
      ["What is the typical timeframe to see leads from Google Ads?", "Search campaigns typically start generating qualified enquiries within the first 48–72 hours after launch and conversion tracking validation."],
      ["How do you ensure ad budget is not wasted on irrelevant clicks?", "We implement tight keyword match types, exhaustive negative keyword lists, geo-fencing, and manual bid adjustments based on conversion metrics."],
      ["Do you provide transparent reporting?", "Yes, you receive real-time dashboard access with metrics on cost-per-lead (CPL), conversion rate, click-through-rate (CTR), and lead quality scores."],
    ],
  },
  {
    slug: "google-ranking",
    icon: "search",
    title: "Google Ranking & SEO Strategy",
    nav: "services",
    eyebrow: "Search Engine Optimization",
    headline: "Dominate search results where your high-value clients are looking.",
    lead: "Technical SEO audits, high-intent keyword strategies, local Google Maps ranking, and authoritative content optimization.",
    intro:
      "Organic search is the most sustainable growth asset for your business. We optimize every layer of your website—from Core Web Vitals and site structure to schema markup and authoritative backlinks.",
    features: [
      {
        title: "Technical SEO & Core Web Vitals",
        desc: "Fix indexing issues, crawl errors, site architecture, canonicalization, and speed bottlenecks for top Google scores.",
        tags: ["PageSpeed 90+", "Schema Markup", "Mobile First", "Clean Architecture"],
        icon: "search",
      },
      {
        title: "Local SEO & Google Maps (GMB)",
        desc: "Dominate local search in Pune and your target cities with verified Google Business Profile optimization and reviews.",
        tags: ["Google Maps Pack", "Local Citations", "Review Management", "Local Keywords"],
        icon: "pin",
      },
      {
        title: "Commercial Keyword Strategy",
        desc: "Identify high-conversion, low-competition keywords that your prospective clients use right before making purchasing decisions.",
        tags: ["Buyer Intent", "Competitor Gap", "Long-tail Keywords", "Content Silos"],
        icon: "chart",
      },
      {
        title: "Comprehensive Website SEO Audit",
        desc: "Deep inspection of your website's health, backlink profile, meta tags, and competitor positioning with actionable fixes.",
        tags: ["Detailed Report", "Broken Link Fixes", "Robots.txt Tuning", "Sitemap Optimization"],
        icon: "analyze",
      },
    ],
    faqs: [
      ["How long does it take to see top Google rankings?", "Most technical fixes and local Google Maps improvements show results within 4–8 weeks, with major commercial keywords ranking on page 1 within 3–6 months."],
      ["Do you follow white-hat SEO guidelines?", "100% white-hat. We follow Google's official Search Essentials and Webmaster Guidelines to ensure sustainable, penalty-proof rankings."],
      ["Can you help our local Pune business appear on Google Maps?", "Yes, our local SEO package specifically optimizes your Google Business Profile, local citations, geo-tagged signals, and review generation."],
    ],
  },
  {
    slug: "ecommerce",
    icon: "shop",
    title: "eCommerce Platform Engineering",
    nav: "services",
    eyebrow: "eCommerce Solutions",
    headline: "Modern digital storefronts engineered for speed, conversions, and scale.",
    lead: "B2B wholesale portals, D2C brand stores, and multi-vendor marketplaces built with seamless payments, inventory sync, and mobile-first UX.",
    intro:
      "We design eCommerce experiences that turn visitors into repeat buyers. With lightning-fast page speeds, intuitive checkout flows, and automated tax and shipping calculations, your store is built to scale.",
    features: [
      {
        title: "B2B Wholesale & Distributor Portals",
        desc: "Tiered wholesale pricing, bulk order forms, custom quotation workflows, credit terms, and GST invoicing.",
        tags: ["Tiered Pricing", "Bulk Orders", "GST Automation", "Distributor Login"],
        icon: "shop",
      },
      {
        title: "D2C Brand Storefronts",
        desc: "Visually stunning, frictionless shopping experiences with product recommendations, one-click checkout, and upsells.",
        tags: ["Shopify / Custom", "1-Click Checkout", "Abandoned Cart", "Visual Merchandising"],
        icon: "spark",
      },
      {
        title: "Payment Gateway & Logistics Integration",
        desc: "Seamless integration with Razorpay, Cashfree, Stripe, Shiprocket, and real-time automated tracking updates.",
        tags: ["Razorpay & Stripe", "UPI & Net Banking", "Shiprocket Sync", "Instant Webhooks"],
        icon: "shield",
      },
      {
        title: "Inventory & ERP Sync",
        desc: "Automated real-time inventory management across multiple sales channels, warehouses, and physical outlets.",
        tags: ["Multi-Warehouse", "Low Stock Alerts", "Auto-Invoicing", "Catalogue Sync"],
        icon: "layers",
      },
    ],
    faqs: [
      ["Which eCommerce platform do you recommend: Shopify, WooCommerce, or Custom?", "We recommend Shopify for fast direct-to-consumer launches, WooCommerce for content-heavy flexible catalogs, and custom Next.js/Node.js solutions for complex B2B workflows."],
      ["How secure is the checkout and payment processing?", "We implement SSL encryption, PCI-DSS compliant payment gateways, tokenized checkouts, and automated fraud detection."],
      ["Can we accept UPI, Credit Cards, Net Banking, and International Payments?", "Yes, we integrate multi-currency gateways supporting UPI, all major Indian banks, EMI options, and global international cards."],
    ],
  },
  {
    slug: "website-development",
    icon: "code",
    title: "Website & Web Application Development",
    nav: "services",
    eyebrow: "Web Development",
    headline: "Ultra-fast, responsive websites that represent your brand with authority.",
    lead: "Custom corporate websites, high-converting landing pages, and scalable web apps built with modern clean code, stellar SEO, and rock-solid security.",
    intro:
      "Your website is the centerpiece of your digital presence. We build clean, modern, mobile-first websites designed to establish credibility, engage visitors, and convert prospective clients.",
    features: [
      {
        title: "Corporate & Enterprise Websites",
        desc: "Bespoke digital flagships with modern aesthetics, smooth micro-animations, multi-page architectures, and CMS ease.",
        tags: ["Brand Identity", "Interactive UI", "Modular Architecture", "CMS Integration"],
        icon: "code",
      },
      {
        title: "High-Performance Landing Pages",
        desc: "Targeted landing pages engineered specifically for high ad conversion, fast loading speeds (<1s), and clear CTA flows.",
        tags: ["Sub-second Speed", "A/B Testing", "Mobile First", "Form Optimization"],
        icon: "zap",
      },
      {
        title: "Custom Web Applications",
        desc: "Full-stack web applications with React, Next.js, Node.js, and PostgreSQL built around your proprietary business workflows.",
        tags: ["React & Node.js", "REST / GraphQL", "Secure Auth", "Cloud Deployed"],
        icon: "layers",
      },
      {
        title: "Ongoing Maintenance & Security Care",
        desc: "Proactive uptime monitoring, automated daily backups, security patching, SSL management, and rapid content updates.",
        tags: ["24/7 Monitoring", "Daily Backups", "Malware Scans", "Speed Optimization"],
        icon: "shield",
      },
    ],
    faqs: [
      ["Will our website be fully mobile responsive and fast?", "Yes, all our websites are built mobile-first and optimized to achieve 90+ performance scores on Google Lighthouse with sub-second page loads."],
      ["Will we be able to edit and update content easily?", "Absolutely. We provide clean administration tools and intuitive CMS setups so your team can easily update text, images, and blog posts without coding."],
      ["Do you include SEO setup with website development?", "Yes, every site comes standard with on-page SEO, semantic HTML5, Schema.org structured data, OpenGraph social cards, XML sitemaps, and robots.txt."],
    ],
  },
  {
    slug: "business-automation",
    icon: "cog",
    title: "Business Process Automation & ERP",
    nav: "services",
    eyebrow: "Custom Automation",
    headline: "Custom software systems that eliminate busywork and accelerate ops.",
    lead: "Custom ERPs, sales CRMs, billing automation, and API integrations that connect your entire business into one smooth engine.",
    intro:
      "Stop wasting hundreds of hours on manual spreadsheets and repetitive tasks. GetKloud architects custom business software tailored to your specific manufacturing, distribution, or service workflow.",
    features: [
      {
        title: "Custom ERP Platforms",
        desc: "Centralized systems managing procurement, production tracking, inventory, employee roles, and financial reporting in real-time.",
        tags: ["Operations Hub", "Role-Based Access", "Inventory Sync", "Real-Time Reports"],
        icon: "cog",
      },
      {
        title: "Tailored Sales CRM Systems",
        desc: "Lead pipeline tracking, automatic follow-up reminders, WhatsApp notification triggers, and sales performance analytics.",
        tags: ["Pipeline Tracker", "WhatsApp Alerts", "Deal Stages", "Team Analytics"],
        icon: "users",
      },
      {
        title: "API & Third-Party Integrations",
        desc: "Connect your payment gateways, accounting tools (Tally, Zoho Books), logistics APIs, and customer databases seamlessly.",
        tags: ["Tally & Zoho Sync", "Webhook Triggers", "Custom REST APIs", "Data Pipelines"],
        icon: "zap",
      },
      {
        title: "Workflow Automation & Notifications",
        desc: "Automate quote generation, customer onboarding emails, invoice reminders, and approval chains with zero manual work.",
        tags: ["Automated Invoicing", "Instant PDF Gen", "Approval Chains", "Error Logging"],
        icon: "layers",
      },
    ],
    faqs: [
      ["Can you integrate our existing software (like Tally or legacy databases)?", "Yes, we build secure API bridges and automated sync pipelines to connect your existing accounting or legacy systems with modern cloud dashboards."],
      ["Is custom software better than off-the-shelf SaaS?", "Off-the-shelf tools often charge high per-user monthly fees and force you to change your workflows. Custom systems are built around your exact processes and own 100% of your data without recurring seat licenses."],
      ["How secure is our company data?", "We implement enterprise-grade encryption at rest and in transit, role-based access control (RBAC), automated daily backups, and audit logs."],
    ],
  },
];

function icon(name, extraClass = "") {
  const paths = {
    cloud:
      '<path d="M7.5 18h9.2a4.3 4.3 0 0 0 .5-8.6 5.8 5.8 0 0 0-11.1 1.7A4.2 4.2 0 0 0 7.5 18Z"/><path d="M9.2 13.2h5.6"/>',
    hosting:
      '<rect x="4" y="4.2" width="16" height="5.4" rx="1.6"/><rect x="4" y="14.4" width="16" height="5.4" rx="1.6"/><path d="M7.2 6.9h.01M7.2 17.1h.01M10.2 6.9h4M10.2 17.1h4"/>',
    email:
      '<rect x="3.6" y="5.4" width="16.8" height="13.2" rx="2"/><path d="m5 7.8 7 5.4 7-5.4"/>',
    ads: '<path d="M4.8 19.2V8.4L12 4.2l7.2 4.2v10.8"/><path d="M9.4 19.2v-5.4h5.2v5.4"/><path d="M9.4 10.8h5.2"/>',
    search:
      '<circle cx="11" cy="11" r="6.2"/><path d="m20 20-3.8-3.8"/><path d="M8.8 11h4.4"/>',
    shop: '<path d="M5.2 8.2h13.6l-1.1 10.4a2 2 0 0 1-2 1.8H8.3a2 2 0 0 1-2-1.8L5.2 8.2Z"/><path d="M8.4 8.2V6.6a3.6 3.6 0 0 1 7.2 0v1.6"/>',
    code: '<path d="m8.2 8-3.8 4 3.8 4"/><path d="m15.8 8 3.8 4-3.8 4"/><path d="m13.4 5.5-2.8 13"/>',
    cog: '<circle cx="12" cy="12" r="3.1"/><path d="M12 3.4v2.4M12 18.2v2.4M4.7 6.5l1.7 1.7M17.6 16l1.7 1.7M3.4 12h2.4M18.2 12h2.4M4.7 17.5l1.7-1.7M17.6 8l1.7-1.7"/>',
    chart:
      '<path d="M4.4 19.4h15.2"/><path d="M7 16.2V11"/><path d="M12 16.2V7.4"/><path d="M17 16.2v-6"/><path d="M7 11h10"/>',
    star: '<path d="m12 3.5 2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.7l5-.7Z"/>',
    users:
      '<circle cx="9" cy="8" r="2.5"/><path d="M4.4 17.6c.5-2.7 2.5-4.1 4.6-4.1s4.1 1.4 4.6 4.1"/><circle cx="16.4" cy="8.5" r="2"/><path d="M15.2 13.6c1.9.2 3.5 1.4 4 3.9"/>',
    analyze:
      '<circle cx="11" cy="11" r="6.1"/><path d="m20 20-3.5-3.5"/><path d="M9 11h4M11 9v4"/>',
    plan: '<rect x="5" y="3.6" width="14" height="16.8" rx="2"/><path d="M8.5 2.6v2.2M15.5 2.6v2.2M5 8.2h14"/><path d="M8.4 12h7.2M8.4 15.4h4.8"/>',
    execute: '<path d="M4.8 12h14.4"/><path d="m13 6.4 6.2 5.6L13 17.6"/>',
    shield:
      '<path d="M12 3.2 19.2 6v6c0 4.3-2.9 7.3-7.2 8.4C7.7 19.3 4.8 16.3 4.8 12V6L12 3.2Z"/><path d="m9.1 12 2 2 3.8-3.8"/>',
    layers:
      '<path d="m12 3.4 8 4.1-8 4.1-8-4.1 8-4.1Z"/><path d="m4 12.1 8 4.1 8-4.1"/><path d="m4 16.4 8 4.1 8-4.1"/>',
    spark:
      '<path d="M12 3 13.6 9l5.9.9-4.5 3.8 1.3 5.8L12 16.8 7.7 19.5l1.3-5.8L4.5 9.9 10.4 9Z"/>',
    pin: '<path d="M12 21s6.4-5.3 6.4-10A6.4 6.4 0 0 0 5.6 11C5.6 15.7 12 21 12 21Z"/><circle cx="12" cy="10.7" r="2.1"/>',
    mail: '<rect x="3.6" y="5.4" width="16.8" height="13.2" rx="2"/><path d="m5 7.8 7 5.4 7-5.4"/>',
    phone:
      '<path d="M6.7 3.9c.5-.5 1.3-.5 1.8 0l1.7 1.7c.4.4.5 1.1.2 1.6L9.4 9c1.3 2.4 3.2 4.3 5.6 5.6l1.8-1c.5-.3 1.2-.2 1.6.2l1.7 1.7c.5.5.5 1.3 0 1.8l-1.1 1.1c-.7.7-1.8 1-2.8.7C11.4 18 6 12.6 4.9 7.8c-.3-1 0-2.1.7-2.8L6.7 3.9Z"/>',
    whatsapp:
      '<path fill="currentColor" stroke="none" d="M12.04 3.5A8.45 8.45 0 0 0 3.6 11.96c0 1.49.39 2.94 1.13 4.22L3.5 20.5l4.44-1.16a8.46 8.46 0 0 0 4.1 1.06h.01A8.46 8.46 0 0 0 20.5 12 8.45 8.45 0 0 0 12.04 3.5Zm4.93 11.96c-.2.57-1.18 1.09-1.63 1.16-.42.06-.95.09-1.53-.1-.35-.11-.8-.26-1.38-.51-2.43-1.05-4.01-3.5-4.13-3.66-.12-.16-1-1.18-1-2.25s.63-1.6.86-1.82c.22-.22.48-.27.64-.27h.46c.15 0 .35 0 .53.4.2.45.66 1.56.72 1.67.06.12.1.25.02.4-.08.16-.12.25-.24.39-.12.13-.25.3-.36.4-.12.12-.24.24-.1.47.14.22.62 1.02 1.33 1.65.91.82 1.68 1.07 1.91 1.19.23.12.37.1.5-.06.14-.16.58-.68.73-.91.16-.23.31-.19.52-.12.22.08 1.37.65 1.6.76.24.12.39.17.45.27.06.1.06.58-.14 1.15Z"/>',
    arrow: '<path d="M4.8 12h14.4"/><path d="m13 6.4 6.2 5.6L13 17.6"/>',
    chevron: '<path d="m7.2 9.8 4.8 4.8 4.8-4.8"/>',
    menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
    close: '<path d="m6 6 12 12"/><path d="m18 6-12 12"/>',
    linkedin:
      '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v1.7"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    clock: '<circle cx="12" cy="12" r="8.2"/><path d="M12 7.5V12l3 2"/>',
    check: '<path d="m5 12 5 5L20 7"/>',
    zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
  };
  const d = paths[name] || paths.arrow;
  return `<svg class="icon ${extraClass}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${d}</svg>`;
}

function assetPrefix(depth) {
  return depth ? "../".repeat(depth) : "";
}

function renderFAQAccordion(faqList) {
  return `
    <div class="faq-accordion" data-animate>
      ${faqList
        .map(
          ([q, a], idx) => `
        <div class="faq-item">
          <button class="faq-question" type="button" aria-expanded="false">
            <span>${q}</span>
            <span class="faq-icon">${icon("chevron")}</span>
          </button>
          <div class="faq-answer">
            <div class="faq-answer-inner">${a}</div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function shell({ depth = 0, page, title, description, body, canonical = "" }) {
  const p = assetPrefix(depth);
  const currentYear = new Date().getFullYear();
  const canonicalUrl = canonical || `https://getkloud.in/${depth ? page + "/" : ""}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} | GetKloud Solutions Pune</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonicalUrl}" />

  <!-- Open Graph / Facebook / WhatsApp -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${title} | GetKloud Solutions" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="https://getkloud.in/assets/logo.png" />
  <meta property="og:site_name" content="GetKloud Solutions" />

  <!-- Twitter Meta -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title} | GetKloud Solutions" />
  <meta name="twitter:description" content="${description}" />

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />

  <!-- Design System CSS -->
  <link rel="stylesheet" href="${p}css/tokens.css" />
  <link rel="stylesheet" href="${p}css/base.css" />
  <link rel="stylesheet" href="${p}css/layout.css" />
  <link rel="stylesheet" href="${p}css/components.css" />
  <link rel="stylesheet" href="${p}css/animations.css" />
  <link rel="stylesheet" href="${p}css/responsive.css" />
  <link rel="icon" href="${p}assets/logo.png" type="image/png" />

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "GetKloud Solutions",
    "image": "https://getkloud.in/assets/logo.png",
    "description": "Enterprise Cloud Services, Managed Hosting, Google Workspace, SEO, eCommerce and Website Development in Pune, India.",
    "telephone": "+918421174747",
    "email": "info@getkloud.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "BHARGAV VIHAR, SN.53/1, Wadgaon Dhayari, Sinhagad Road",
      "addressLocality": "Pune",
      "postalCode": "411041",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "founder": {
      "@type": "Person",
      "name": "Shailesh Patil"
    },
    "priceRange": "$$"
  }
  </script>
</head>
<body data-page="${page}">
  <!-- Top Utility Ribbon -->
  <aside class="top-ribbon" aria-label="Quick Contact and Status">
    <div class="container top-ribbon__inner">
      <div class="top-ribbon__status">
        <span class="pulse-dot pulse-dot--sm" aria-hidden="true"></span>
        <span>24/7 SLA Cloud Operations Active · Pune, India</span>
      </div>
      <div class="top-ribbon__actions">
        <a class="top-ribbon__link" href="tel:+918421174747">
          ${icon("phone", "icon--sm")} +91 84211 74747
        </a>
        <a class="top-ribbon__link top-ribbon__link--whatsapp" href="https://wa.me/918421174747" target="_blank" rel="noopener">
          ${icon("whatsapp", "icon--sm")} WhatsApp Direct
        </a>
        <a class="top-ribbon__badge" href="${p}contact.html">
          ${icon("spark", "icon--sm")} Free Infrastructure Audit
        </a>
      </div>
    </div>
  </aside>

  <header class="site-header">
    <div class="site-header__wrap">
      <div class="site-header__bar">
        <a class="brand" href="${p}index.html" aria-label="GetKloud home">
          <img class="brand__img" src="${p}assets/logo.png" alt="GetKloud Solutions Pvt. Ltd." />
        </a>
        <nav class="nav" aria-label="Primary Navigation">
          <a href="${p}index.html" data-nav="home">Home</a>
          <a href="${p}about.html" data-nav="about">About</a>
          <div class="nav__dropdown">
            <button class="nav__dropdown-btn" type="button" aria-expanded="false" aria-haspopup="true">
              Services ${icon("chevron", "icon--sm")}
            </button>
            <div class="nav__mega-menu" role="region" aria-label="Services Menu">
              <div class="nav__mega-grid">
                <div>
                  <span class="nav__mega-heading">Our Core Capabilities</span>
                  <div class="nav__mega-columns">
                    <a class="nav__mega-item" href="${p}services/cloud-services.html">
                      <span class="nav__mega-icon">${icon("cloud")}</span>
                      <div>
                        <strong>Cloud Services</strong>
                        <span>AWS, Azure & DevOps</span>
                      </div>
                    </a>
                    <a class="nav__mega-item" href="${p}services/email-solutions.html">
                      <span class="nav__mega-icon">${icon("email")}</span>
                      <div>
                        <strong>Enterprise Email</strong>
                        <span>Google & Office 365</span>
                      </div>
                    </a>
                    <a class="nav__mega-item" href="${p}services/website-development.html">
                      <span class="nav__mega-icon">${icon("code")}</span>
                      <div>
                        <strong>Web Development</strong>
                        <span>React & Fast Portals</span>
                      </div>
                    </a>
                    <a class="nav__mega-item" href="${p}services/business-automation.html">
                      <span class="nav__mega-icon">${icon("cog")}</span>
                      <div>
                        <strong>Automation & ERP</strong>
                        <span>Custom Ops & CRM</span>
                      </div>
                    </a>
                    <a class="nav__mega-item" href="${p}services/ecommerce.html">
                      <span class="nav__mega-icon">${icon("shop")}</span>
                      <div>
                        <strong>eCommerce Stores</strong>
                        <span>Shopify & Gateways</span>
                      </div>
                    </a>
                    <a class="nav__mega-item" href="${p}services/google-ranking.html">
                      <span class="nav__mega-icon">${icon("search")}</span>
                      <div>
                        <strong>Google Ranking</strong>
                        <span>Local Maps & SEO</span>
                      </div>
                    </a>
                    <a class="nav__mega-item" href="${p}services/lead-generation.html" style="grid-column: span 2;">
                      <span class="nav__mega-icon">${icon("ads")}</span>
                      <div>
                        <strong>Paid Lead Generation</strong>
                        <span>Targeted B2B Ad Funnels & Inbound Pipelines</span>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="nav__mega-feature">
                  <div class="nav__mega-card">
                    <div>
                      <div class="nav__mega-badge">
                        <span class="pulse-dot pulse-dot--sm"></span> Enterprise Ready
                      </div>
                      <h4>Zero-Downtime Guaranteed</h4>
                      <p>Parallel staging, verified data sync, and 24/7 Pune engineering support.</p>
                    </div>
                    <a class="btn btn--primary btn--sm" href="${p}contact.html" style="width:100%;justify-content:center;">
                      ${icon("zap")} Get Custom Quote
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="${p}how-we-work.html" data-nav="process">How We Work</a>
          <a href="${p}contact.html" data-nav="contact">Contact</a>
        </nav>
        <div class="site-header__actions">
          <a class="nav-btn-whatsapp" href="https://wa.me/918421174747" target="_blank" rel="noopener" aria-label="WhatsApp Support">
            ${icon("whatsapp")} <span>Chat</span>
          </a>
          <a class="nav-cta" href="${p}contact.html">
            ${icon("zap", "icon--sm")} <span>Get Quote</span>
          </a>
          <button class="nav-toggle" type="button" aria-label="Open mobile menu" aria-expanded="false">
            ${icon("menu")}
          </button>
        </div>
      </div>
    </div>
  </header>

  <div class="mobile-nav" aria-label="Mobile Menu" aria-hidden="true">
    <div class="mobile-nav__drawer">
      <div class="mobile-nav__head">
        <a class="brand" href="${p}index.html">
          <img class="brand__img" src="${p}assets/logo.png" alt="GetKloud Solutions" />
        </a>
        <button class="mobile-nav__close" type="button" aria-label="Close menu">
          ${icon("close")}
        </button>
      </div>
      <div class="mobile-nav__links">
        <a class="mobile-nav__link" href="${p}index.html">Home</a>
        <a class="mobile-nav__link" href="${p}about.html">About</a>
        <a class="mobile-nav__link" href="${p}services/index.html">All Services</a>
        <div class="mobile-nav__sublinks">
          <a class="mobile-nav__sublink" href="${p}services/cloud-services.html">Cloud Services</a>
          <a class="mobile-nav__sublink" href="${p}services/email-solutions.html">Email Solutions</a>
          <a class="mobile-nav__sublink" href="${p}services/lead-generation.html">Lead Generation</a>
          <a class="mobile-nav__sublink" href="${p}services/google-ranking.html">Google Ranking</a>
          <a class="mobile-nav__sublink" href="${p}services/ecommerce.html">eCommerce Stores</a>
          <a class="mobile-nav__sublink" href="${p}services/website-development.html">Website Development</a>
          <a class="mobile-nav__sublink" href="${p}services/business-automation.html">Business Automation</a>
        </div>
        <a class="mobile-nav__link" href="${p}how-we-work.html">How We Work</a>
        <a class="mobile-nav__link" href="${p}contact.html">Contact</a>
      </div>
      <div class="mobile-nav__footer">
        <a class="btn btn--primary" href="${p}contact.html" style="width:100%;">
          ${icon("zap")} Get Custom Quote
        </a>
        <a class="btn btn--outline" href="https://wa.me/918421174747" target="_blank" rel="noopener" style="width:100%;">
          ${icon("whatsapp")} WhatsApp Support
        </a>
      </div>
    </div>
  </div>

  <main>
${body}
  </main>

  <footer class="site-footer">
    <div class="container site-footer__grid">
      <div>
        <a class="brand" href="${p}index.html">
          <img class="brand__img brand__img--footer" src="${p}assets/logo.png" alt="GetKloud Solutions Pvt. Ltd." />
        </a>
        <p style="margin-top:1rem;font-size:0.95rem;">
          Enterprise cloud architecture, business email, SEO, eCommerce, and bespoke web applications built for reliability, scale, and clear ROI.
        </p>
        <div style="display:flex;gap:0.75rem;margin-top:1.25rem;">
          <a class="btn btn--sm btn--ghost" href="https://www.linkedin.com/in/shaileshpatilcloud/" target="_blank" rel="noopener" style="color:#fff;">
            ${icon("linkedin", "icon--sm")} LinkedIn
          </a>
          <a class="btn btn--sm btn--ghost" href="https://wa.me/918421174747" target="_blank" rel="noopener" style="color:#fff;">
            ${icon("whatsapp", "icon--sm")} WhatsApp
          </a>
        </div>
      </div>
      <div>
        <h3>Our Services</h3>
        <a href="${p}services/cloud-services.html">${icon("cloud", "icon--sm")} Cloud Services & AWS</a>
        <a href="${p}services/email-solutions.html">${icon("email", "icon--sm")} Google & Office 365</a>
        <a href="${p}services/lead-generation.html">${icon("ads", "icon--sm")} Google & B2B Ads</a>
        <a href="${p}services/google-ranking.html">${icon("search", "icon--sm")} Search Engine SEO</a>
        <a href="${p}services/ecommerce.html">${icon("shop", "icon--sm")} eCommerce Solutions</a>
        <a href="${p}services/website-development.html">${icon("code", "icon--sm")} Website Development</a>
        <a href="${p}services/business-automation.html">${icon("cog", "icon--sm")} Custom ERP & Software</a>
      </div>
      <div>
        <h3>Company & Process</h3>
        <a href="${p}index.html">Home Overview</a>
        <a href="${p}about.html">About GetKloud</a>
        <a href="${p}how-we-work.html">6-Phase Delivery Process</a>
        <a href="${p}services/index.html">Solutions Directory</a>
        <a href="${p}contact.html">Contact & Consultation</a>
      </div>
      <div>
        <h3>Headquarters</h3>
        <p style="margin-bottom:0.75rem;display:flex;align-items:flex-start;gap:0.5rem;">
          ${icon("pin", "icon--sm")}
          <span>BHARGAV VIHAR, SN.53/1, Wadgaon Dhayari, Sinhagad Road, Pune 411041, India</span>
        </p>
        <a href="tel:+918421174747">${icon("phone", "icon--sm")} +91 8421174747</a>
        <a href="mailto:info@getkloud.in">${icon("mail", "icon--sm")} info@getkloud.in</a>
      </div>
    </div>
    <div class="container site-footer__bottom">
      <div>© ${currentYear} GetKloud Solutions Pvt. Ltd. All rights reserved.</div>
      <div>Pune, Maharashtra · Serving Clients Across India & Global Markets</div>
    </div>
  </footer>

  <div class="float-dock" aria-label="Quick action shortcuts">
    <a href="${p}contact.html" aria-label="Book a Project Consultation" title="Book Consultation">
      ${icon("mail", "icon--dock")}
    </a>
    <a href="tel:+918421174747" data-action="call" aria-label="Direct Phone Call" title="Call Now">
      ${icon("phone", "icon--dock")}
    </a>
    <a href="https://wa.me/918421174747" data-action="whatsapp" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" title="WhatsApp Us">
      ${icon("whatsapp", "icon--dock")}
    </a>
  </div>

  <script src="${p}js/site.js"></script>
  <script src="${p}js/animate.js"></script>
  <script src="${p}js/forms.js"></script>
</body>
</html>`;
}

function write(rel, content) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log("Generated:", rel);
}

// ----------------------------------------------------
// 1. HOMEPAGE
// ----------------------------------------------------
const homeBody = `
    <!-- Hero Section -->
    <section class="hero hero--split">
      <div class="hero__canvas-wrap">
        <canvas id="hero-network-canvas" class="hero__canvas"></canvas>
      </div>
      <div class="hero__glow hero__glow--1" aria-hidden="true"></div>
      <div class="hero__glow hero__glow--2" aria-hidden="true"></div>
      <div class="container hero__grid">
        <div class="hero__content">
          <div class="hero__badge" data-animate>
            <span class="pulse-dot" aria-hidden="true"></span>
            Cloud · Infrastructure · Web · Pune, India
          </div>
          <h1 data-animate>Cloud-native growth engineered for modern business.</h1>
          <p class="hero__text" data-animate>
            Empower your organization with enterprise cloud architecture, secure business email, high-speed web platforms, and automated digital systems built for clarity and scale.
          </p>
          <div class="btn-row" data-animate>
            <a class="btn btn--primary btn--lg" href="services/index.html">
              ${icon("arrow")} Explore All Solutions
            </a>
            <a class="btn btn--outline btn--lg" href="contact.html">
              ${icon("zap")} Get Custom Quote
            </a>
          </div>
          <div class="hero__tags" data-animate>
            <span class="hero__tag">${icon("cloud", "icon--sm")} AWS & Azure Cloud</span>
            <span class="hero__tag">${icon("shield", "icon--sm")} 99.9% Uptime Hosting</span>
            <span class="hero__tag">${icon("code", "icon--sm")} Web & SaaS Apps</span>
            <span class="hero__tag">${icon("search", "icon--sm")} SEO & Lead Gen</span>
          </div>
        </div>

        <aside class="hero__panel" data-animate="scale" aria-label="Company highlights">
          <div class="hero__panel-card">
            <div class="hero__panel-top">
              <span class="hero__panel-label">
                ${icon("spark")} Certified Technology Partner
              </span>
              <span class="hero__panel-pill">13+ Yrs Exp</span>
            </div>
            <div class="hero__panel-stats">
              <div>
                <strong data-count="99.9" data-decimals="1" data-suffix="%">0%</strong>
                <span>Uptime SLA</span>
              </div>
              <div>
                <strong data-count="4.98" data-decimals="2">0</strong>
                <span>Client Rating</span>
              </div>
              <div>
                <strong data-count="98" data-suffix="%">0%</strong>
                <span>Repeat Clients</span>
              </div>
            </div>
            <p style="font-size:0.95rem;line-height:1.55;color:var(--ink-soft);margin-bottom:1.5rem;">
              From seamless AWS migrations to bespoke ERP automation—one dependable team, enterprise security standards.
            </p>
            <a class="btn btn--outline btn--primary" href="contact.html" style="width:100%;">
              ${icon("arrow")} Start Your Project
            </a>
          </div>
        </aside>
      </div>
    </section>

    <!-- Client Trust Strip -->
    <section class="trust-strip" aria-label="Trusted by industry leaders">
      <div class="trust-strip__track">
        ${clients
          .concat(clients)
          .map(
            ([file, name]) =>
              `<img class="trust-strip__logo" src="assets/images/clients/${file}" alt="${name} logo" loading="lazy" />`
          )
          .join("")}
      </div>
    </section>

    <!-- Gateways Section -->
    <section class="section section--panel">
      <div class="container">
        <div class="section__header section__header--center">
          <p class="section__eyebrow" data-animate>Start Here</p>
          <h2 data-animate>Choose your infrastructure gateway</h2>
          <p class="section__lead" data-animate>
            Explore our core pillars of cloud transformation, dedicated hosting, and team collaboration.
          </p>
        </div>
        <div class="gateway" style="margin-top:2.5rem;">
          <a class="gateway__item" href="services/cloud-services.html" data-animate>
            <div>
              <div class="gateway__media">
                <img src="assets/images/cloud-infrastructure.jpg" alt="Cloud Infrastructure" loading="lazy" />
                <div class="gateway__media-overlay"></div>
                <div class="gateway__badge">${icon("cloud", "icon--lg")}</div>
              </div>
              <h3>Cloud Services & Migration</h3>
              <p>Scalable, auto-healing AWS & Microsoft Azure architecture with automated DevOps and FinOps cost optimization.</p>
            </div>
            <span class="gateway__action">${icon("arrow")} Explore Cloud Architecture</span>
          </a>
          <a class="gateway__item" href="services/cloud-services.html" data-animate>
            <div>
              <div class="gateway__media">
                <img src="assets/images/dedicated-hosting.jpg" alt="Dedicated Private Hosting" loading="lazy" />
                <div class="gateway__media-overlay"></div>
                <div class="gateway__badge">${icon("hosting", "icon--lg")}</div>
              </div>
              <h3>Dedicated Private Hosting</h3>
              <p>High-security isolated infrastructure with NVMe storage, custom firewall policies, and 99.99% network availability.</p>
            </div>
            <span class="gateway__action">${icon("arrow")} View Hosting Capabilities</span>
          </a>
          <a class="gateway__item" href="services/email-solutions.html" data-animate>
            <div>
              <div class="gateway__media">
                <img src="assets/images/email-security.jpg" alt="Enterprise Email Solutions" loading="lazy" />
                <div class="gateway__media-overlay"></div>
                <div class="gateway__badge">${icon("email", "icon--lg")}</div>
              </div>
              <h3>Enterprise Email Solutions</h3>
              <p>Microsoft 365, Google Workspace, and Zoho Mail setups hardened with SPF/DKIM/DMARC for 100% deliverability.</p>
            </div>
            <span class="gateway__action">${icon("arrow")} Explore Email Setup</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Interactive Scope & Estimator Widget -->
    <section class="section">
      <div class="container">
        <div class="section__header">
          <p class="section__eyebrow" data-animate>Interactive Tool</p>
          <h2 data-animate>Calculate your project scope & stack</h2>
          <p class="section__lead" data-animate>
            Select your requirements to generate an instant timeline estimate, architecture deliverables, and recommended tech stack.
          </p>
        </div>

        <div class="estimator-box" data-estimator data-animate>
          <div class="estimator-step-title">Select Your Required Capabilities:</div>
          <div class="estimator-chips">
            <div class="estimator-chip is-selected" data-days="7" data-deliverable="AWS/Azure Migration Roadmap" data-stack="AWS, Azure">
              ${icon("cloud", "icon--sm")} Cloud Migration
            </div>
            <div class="estimator-chip" data-days="3" data-deliverable="M365 / Google Workspace Setup" data-stack="Microsoft 365, Google">
              ${icon("email", "icon--sm")} Business Email (M365/Google)
            </div>
            <div class="estimator-chip" data-days="10" data-deliverable="Custom Corporate Website" data-stack="React, HTML5, CSS3">
              ${icon("code", "icon--sm")} Corporate Website
            </div>
            <div class="estimator-chip" data-days="14" data-deliverable="eCommerce Storefront & Gateway" data-stack="Shopify, WooCommerce, Node.js">
              ${icon("shop", "icon--sm")} eCommerce Store
            </div>
            <div class="estimator-chip" data-days="7" data-deliverable="Google Ads & Lead Funnel" data-stack="Google Ads, Meta Ads">
              ${icon("ads", "icon--sm")} Paid Lead Generation
            </div>
            <div class="estimator-chip" data-days="14" data-deliverable="Technical SEO & Local Maps Ranking" data-stack="Google Search Console, Schema">
              ${icon("search", "icon--sm")} SEO & Google Ranking
            </div>
            <div class="estimator-chip" data-days="21" data-deliverable="Custom Business ERP / CRM" data-stack="Node.js, PostgreSQL, React">
              ${icon("cog", "icon--sm")} Business Automation & ERP
            </div>
          </div>

          <div class="estimator-results">
            <div>
              <div class="estimator-metrics">
                <div class="estimator-metric">
                  <span style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--accent-bright);">Estimated Delivery</span>
                  <strong data-est-timeline>2–4 Weeks</strong>
                </div>
                <div class="estimator-metric">
                  <span style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--accent-bright);">Core Deliverables</span>
                  <div style="font-size:0.95rem;font-weight:700;color:#fff;margin-top:0.2rem;" data-est-deliverables>AWS/Azure Migration Roadmap, Architecture Consultation</div>
                </div>
              </div>
              <div style="margin-top:1rem;font-size:0.85rem;color:var(--ink-inverse-soft);">
                <strong>Recommended Stack:</strong> <span data-est-stack>AWS · Azure · Cloud Security</span>
              </div>
            </div>
            <div>
              <button class="btn btn--primary btn--lg" data-est-action type="button">
                ${icon("zap")} Request Scope Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section section--panel">
      <div class="container">
        <div class="section__header">
          <p class="section__eyebrow" data-animate>All Solutions</p>
          <h2 data-animate>Engineered for speed, security, and growth</h2>
          <p class="section__lead" data-animate>
            From cloud infrastructure to high-converting web applications, we provide end-to-end digital engineering.
          </p>
        </div>

        <div class="offer-list" style="margin-top:2rem;">
          ${services
            .map(
              (s) => `
            <article class="offer" data-animate>
              <div class="offer__head">
                <div class="offer__icon-box">${icon(s.icon, "icon--lg")}</div>
                <div>
                  <h3>${s.title}</h3>
                  <p>${s.lead}</p>
                </div>
              </div>
              <div class="offer__tags">
                ${s.features.map((f) => `<span class="offer__tag">${f.title}</span>`).join("")}
              </div>
              <div style="margin-top:auto;padding-top:1rem;border-top:1px solid var(--line);">
                <a class="btn btn--sm btn--outline" href="services/${s.slug}.html" style="width:100%;">
                  ${icon("arrow")} Explore ${s.title.split(" ")[0]} Details
                </a>
              </div>
            </article>
          `
            )
            .join("")}
        </div>
      </div>
    </section>

    <!-- Leadership Section -->
    <section class="section">
      <div class="container grid-2 grid-2--sidebar">
        <div>
          <p class="section__eyebrow" data-animate>Leadership & Expertise</p>
          <h2 data-animate>Led by proven cloud architects</h2>
          <p class="section__lead" data-animate>
            GetKloud is directed by Shailesh Patil, a cloud technology veteran with 13+ years across AWS, Microsoft Azure, Google Cloud, and enterprise SaaS.
          </p>
          <p data-animate>
            We eliminate technical bloat and vendor lock-in. Every client receives hands-on solution architecture, proactive security monitoring, and clear milestone reporting.
          </p>
          <div class="btn-row" style="margin-top:1.75rem;" data-animate>
            <a class="btn btn--primary" href="about.html">${icon("arrow")} Read Our Full Story</a>
            <a class="btn btn--outline" href="https://www.linkedin.com/in/shaileshpatilcloud/" target="_blank" rel="noopener">
              ${icon("linkedin")} LinkedIn Profile
            </a>
          </div>
        </div>

        <div class="founder-card" data-animate="scale">
          <div class="founder-card__badge-row">
            <span class="founder-card__status">
              <span class="pulse-dot"></span> Available for Projects
            </span>
            <div data-founder-clock style="font-size:0.82rem;font-weight:700;color:var(--ink-muted);display:flex;align-items:center;gap:0.35rem;">
              ${icon("clock", "icon--sm")} <time datetime="">--:--</time>
            </div>
          </div>
          <div class="founder-card__body">
            <div class="founder-card__photo-frame">
              <img class="founder-card__photo" src="assets/images/team/shailesh-patil.jpg" alt="Shailesh Patil" loading="lazy" />
            </div>
            <h3 class="founder-card__name">Shailesh Patil</h3>
            <span class="founder-card__title">Founder & Lead Cloud Architect</span>
            <span class="founder-card__location">${icon("pin", "icon--sm")} Pune, Maharashtra, India</span>
          </div>
          <div class="founder-card__stats">
            <div><strong>13+ Yrs</strong><span>Experience</span></div>
            <div><strong>11K+</strong><span>Network</span></div>
            <div><strong>2021</strong><span>Founded</span></div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.4rem;justify-content:center;">
            <span class="offer__tag">AWS Certified</span>
            <span class="offer__tag">Azure Cloud</span>
            <span class="offer__tag">Google Cloud</span>
            <span class="offer__tag">FinOps</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Preview -->
    <section class="section section--panel">
      <div class="container">
        <div class="section__header section__header--center">
          <p class="section__eyebrow" data-animate>How We Work</p>
          <h2 data-animate>Milestone-driven execution framework</h2>
          <p class="section__lead" data-animate>
            A calm, predictable 6-phase engineering lifecycle designed to eliminate surprises.
          </p>
        </div>

        <div class="step-grid" style="margin-top:2.5rem;">
          <div class="step-card" data-animate>
            <div class="step-card__num">01</div>
            <h3>Discovery & Audit</h3>
            <p>Comprehensive inspection of current servers, DNS, codebase, and business objectives.</p>
          </div>
          <div class="step-card" data-animate>
            <div class="step-card__num">02</div>
            <h3>Architecture Design</h3>
            <p>Clear blueprint detailing cloud topologies, security boundaries, and timeline milestones.</p>
          </div>
          <div class="step-card" data-animate>
            <div class="step-card__num">03</div>
            <h3>Precision Execution</h3>
            <p>Agile build, configuration, data migration, and coding with weekly milestone check-ins.</p>
          </div>
          <div class="step-card" data-animate>
            <div class="step-card__num">04</div>
            <h3>QA & Security Hardening</h3>
            <p>Load testing, SSL validation, DMARC/SPF audits, and penetration testing prior to cutover.</p>
          </div>
          <div class="step-card" data-animate>
            <div class="step-card__num">05</div>
            <h3>Zero-Downtime Launch</h3>
            <p>Seamless DNS switchover, database synchronization, and live environment validation.</p>
          </div>
          <div class="step-card" data-animate>
            <div class="step-card__num">06</div>
            <h3>24/7 SLA Support</h3>
            <p>Proactive monitoring, automated backups, and guaranteed emergency response.</p>
          </div>
        </div>

        <div style="text-align:center;margin-top:2.5rem;" data-animate>
          <a class="btn btn--outline btn--lg" href="how-we-work.html">
            ${icon("arrow")} View Full Engineering Lifecycle
          </a>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section">
      <div class="container">
        <div class="section__header section__header--center">
          <p class="section__eyebrow" data-animate>Frequently Asked Questions</p>
          <h2 data-animate>Answers to common project questions</h2>
          <p class="section__lead" data-animate>
            Everything you need to know about our cloud services, delivery SLAs, and engagement models.
          </p>
        </div>

        ${renderFAQAccordion([
          ["How do you guarantee zero downtime during cloud or email migrations?", "We set up parallel staging environments, pre-sync database records and mailbox archives, and perform final DNS switchovers during off-peak hours with automated rollbacks in place."],
          ["Do you work with startups, SMBs, and enterprise teams?", "Yes, we tailor solutions according to scale—from lean, cost-efficient setups for growing SMBs to multi-region redundant architectures for corporate organizations."],
          ["What are your pricing models?", "We offer transparent fixed-milestone project pricing for migrations and web development, as well as monthly managed service retainers for 24/7 monitoring and cloud optimization."],
          ["How fast can you initiate a new project?", "Following our initial 30-minute discovery call and scope sign-off, engineering kick-off begins within 48 to 72 hours."],
          ["Where is GetKloud based and do you serve international clients?", "We are headquartered in Pune, Maharashtra, India, and actively serve enterprise clients across India, the Middle East, North America, and Europe."],
        ])}
      </div>
    </section>

    <!-- CTA Band -->
    <section class="container" data-animate>
      <div class="cta-band">
        <div class="container" style="position:relative;z-index:2;">
          <h2>Ready to elevate your cloud & digital stack?</h2>
          <p>
            Schedule a 30-minute technical consultation with our lead cloud architect. We'll provide a clear roadmap and next steps with zero obligation.
          </p>
          <div class="btn-row" style="margin-top:1.75rem;">
            <a class="btn btn--white btn--lg" href="contact.html">
              ${icon("zap")} Start a Conversation
            </a>
            <a class="btn btn--ghost btn--lg" href="https://wa.me/918421174747" target="_blank" rel="noopener">
              ${icon("whatsapp")} Instant WhatsApp Chat
            </a>
          </div>
        </div>
      </div>
    </section>
`;

// ----------------------------------------------------
// 2. ABOUT PAGE
// ----------------------------------------------------
const aboutBody = `
    <section class="page-hero">
      <div class="container">
        <p class="section__eyebrow" data-animate>About GetKloud Solutions</p>
        <h1 data-animate>Empowering modern enterprises with cloud clarity and precision.</h1>
        <p class="section__lead" data-animate>
          Founded in 2021 in Pune, GetKloud Solutions bridges the gap between complex enterprise infrastructure and practical business outcomes.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container grid-2">
        <div>
          <h2 data-animate>Our Mission & Philosophy</h2>
          <p data-animate>
            Cloud adoption should accelerate your business, not overwhelm your budget with hidden fees and architectural complexity. We help organizations across India and global markets migrate, scale, and secure their digital systems.
          </p>
          <p data-animate>
            Whether managing high-traffic web applications on AWS, configuring secure Microsoft 365 environments, or engineering bespoke business ERPs, our focus remains absolute: zero downtime, rock-solid security, and measurable ROI.
          </p>
          <div class="hero__tags" style="margin-top:1.5rem;" data-animate>
            <span class="hero__tag">${icon("check", "icon--sm")} Zero Vendor Lock-in</span>
            <span class="hero__tag">${icon("check", "icon--sm")} Proactive 24/7 Monitoring</span>
            <span class="hero__tag">${icon("check", "icon--sm")} Strict SLA Guarantees</span>
          </div>
        </div>

        <div class="founder-card" data-animate="scale">
          <div class="founder-card__badge-row">
            <span class="founder-card__status">
              <span class="pulse-dot"></span> Founder Profile
            </span>
            <div data-founder-clock style="font-size:0.82rem;font-weight:700;color:var(--ink-muted);display:flex;align-items:center;gap:0.35rem;">
              ${icon("clock", "icon--sm")} <time datetime="">--:--</time>
            </div>
          </div>
          <div class="founder-card__body">
            <div class="founder-card__photo-frame">
              <img class="founder-card__photo" src="assets/images/team/shailesh-patil.jpg" alt="Shailesh Patil" loading="lazy" />
            </div>
            <h3 class="founder-card__name">Shailesh Patil</h3>
            <span class="founder-card__title">Founder & Owner · GetKloud Solutions</span>
            <span class="founder-card__location">${icon("pin", "icon--sm")} Pune, Maharashtra, India</span>
          </div>
          <div class="founder-card__stats">
            <div><strong>13+ Yrs</strong><span>Industry Exp</span></div>
            <div><strong>11K+</strong><span>Followers</span></div>
            <div><strong>MBA</strong><span>Marketing</span></div>
          </div>
          <p style="font-size:0.9rem;line-height:1.55;color:var(--ink-soft);text-align:center;margin:0 0 1rem;">
            "We treat every client's infrastructure as our own—architecting for resilience, continuous security, and cost efficiency."
          </p>
          <a class="btn btn--outline" href="https://www.linkedin.com/in/shaileshpatilcloud/" target="_blank" rel="noopener" style="width:100%;">
            ${icon("linkedin")} View LinkedIn Profile
          </a>
        </div>
      </div>
    </section>

    <!-- Engineering & Architecture Consultation Showcase -->
    <section class="section">
      <div class="container grid-2" style="align-items:center;">
        <div class="visual-showcase" data-animate>
          <img src="assets/images/team-consulting.jpg" alt="GetKloud Engineering & Cloud Architects" loading="lazy" />
          <div class="visual-showcase__caption">
            <span class="visual-showcase__title">Enterprise Cloud Architecture & Advisory</span>
            <span class="visual-showcase__tag">Pune Engineering Hub</span>
          </div>
        </div>
        <div>
          <p class="section__eyebrow" data-animate>Architecture & Advisory</p>
          <h2 data-animate>Collaborative engineering built on measurable clarity.</h2>
          <p data-animate>
            We partner directly with your leadership and engineering teams to design resilient, cost-effective infrastructure that scales effortlessly under real-world demand.
          </p>
          <div class="stats-matrix" style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-top:1.5rem;" data-animate>
            <div style="padding:1.25rem;background:#fff;border-radius:var(--radius-sm);border:1px solid var(--line);">
              <div style="font-size:1.6rem;font-weight:800;color:var(--accent-deep);font-family:var(--font-display);">150+</div>
              <div style="font-size:0.85rem;font-weight:600;color:var(--ink-soft);margin-top:0.25rem;">Cloud Migrations Completed</div>
            </div>
            <div style="padding:1.25rem;background:#fff;border-radius:var(--radius-sm);border:1px solid var(--line);">
              <div style="font-size:1.6rem;font-weight:800;color:var(--emerald);font-family:var(--font-display);">99.9%</div>
              <div style="font-size:0.85rem;font-weight:600;color:var(--ink-soft);margin-top:0.25rem;">Guaranteed Infrastructure SLA</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section section--panel">
      <div class="container">
        <div class="section__header section__header--center">
          <p class="section__eyebrow" data-animate>Why GetKloud</p>
          <h2 data-animate>The GetKloud Advantage</h2>
          <p class="section__lead" data-animate>
            Why growing organizations choose us over traditional IT agencies.
          </p>
        </div>

        <div class="grid-3" style="margin-top:2.5rem;">
          <div class="offer" data-animate>
            <div class="offer__icon-box">${icon("shield", "icon--lg")}</div>
            <h3>Enterprise Security Standards</h3>
            <p>Every system is hardened with SSL/TLS, multi-factor authentication, automated vulnerability scans, and strict firewall policies.</p>
          </div>
          <div class="offer" data-animate>
            <div class="offer__icon-box">${icon("chart", "icon--lg")}</div>
            <h3>FinOps Cost Optimization</h3>
            <p>We actively audit and eliminate idle cloud resources, saving our clients an average of 30% to 50% on their ongoing cloud infrastructure bills.</p>
          </div>
          <div class="offer" data-animate>
            <div class="offer__icon-box">${icon("zap", "icon--lg")}</div>
            <h3>Sub-Second Performance</h3>
            <p>Websites, e-commerce stores, and cloud APIs engineered for lightning-fast speeds and top Google Core Web Vitals rankings.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section">
      <div class="container">
        <div class="section__header section__header--center">
          <p class="section__eyebrow" data-animate>Common Inquiries</p>
          <h2 data-animate>Frequently Asked Questions</h2>
        </div>
        ${renderFAQAccordion([
          ["Where is your primary engineering team located?", "Our core engineering, cloud architecture, and support team is located in Pune, Maharashtra, India."],
          ["What technologies and platforms do you specialize in?", "We are specialists across Amazon Web Services (AWS), Microsoft Azure, Google Cloud, Microsoft 365, Google Workspace, React, Next.js, Node.js, and PostgreSQL."],
          ["How do we start a consultation?", "Simply fill out our contact form or send a WhatsApp message. We'll set up a 30-minute discovery call to evaluate your infrastructure requirements."],
        ])}
      </div>
    </section>
`;

// ----------------------------------------------------
// 3. SERVICES DIRECTORY (services/index.html)
// ----------------------------------------------------
const servicesHubBody = `
    <section class="page-hero">
      <div class="container">
        <p class="section__eyebrow" data-animate>Solutions Directory</p>
        <h1 data-animate>Complete cloud, web & digital engineering services.</h1>
        <p class="section__lead" data-animate>
          Discover our specialized technology solutions engineered to accelerate operations, enhance security, and drive measurable revenue.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="offer-list">
          ${services
            .map(
              (s) => `
            <article class="offer" data-animate>
              <div class="offer__head">
                <div class="offer__icon-box">${icon(s.icon, "icon--lg")}</div>
                <div>
                  <span style="font-size:0.78rem;font-weight:750;text-transform:uppercase;color:var(--accent);">${s.eyebrow}</span>
                  <h3 style="font-size:1.35rem;margin-top:0.25rem;">${s.title}</h3>
                  <p>${s.lead}</p>
                </div>
              </div>
              <div class="grid-2" style="gap:1rem;margin-top:1rem;">
                ${s.features
                  .slice(0, 2)
                  .map(
                    (f) => `
                  <div style="background:var(--bg);padding:1rem;border-radius:var(--radius-sm);border:1px solid var(--line);">
                    <strong style="font-size:0.92rem;display:block;margin-bottom:0.25rem;">${f.title}</strong>
                    <p style="font-size:0.85rem;margin:0;line-height:1.45;">${f.desc}</p>
                  </div>
                `
                  )
                  .join("")}
              </div>
              <div style="margin-top:auto;padding-top:1.25rem;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);">
                <span style="font-size:0.85rem;font-weight:700;color:var(--ink-soft);">Enterprise SLA · Custom Scope</span>
                <a class="btn btn--primary btn--sm" href="${s.slug}.html">
                  ${icon("arrow")} View Full Service Details
                </a>
              </div>
            </article>
          `
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="container" data-animate>
      <div class="cta-band">
        <div class="container" style="position:relative;z-index:2;">
          <h2>Need a custom multi-service solution?</h2>
          <p>
            We frequently combine cloud migration, email security, and website development into comprehensive digital transformation packages.
          </p>
          <div class="btn-row" style="margin-top:1.75rem;">
            <a class="btn btn--white btn--lg" href="../contact.html">${icon("zap")} Request Custom Proposal</a>
          </div>
        </div>
      </div>
    </section>
`;

// ----------------------------------------------------
// 4. HOW WE WORK (how-we-work.html)
// ----------------------------------------------------
const howWeWorkBody = `
    <section class="page-hero">
      <div class="container">
        <p class="section__eyebrow" data-animate>Engineering Methodology</p>
        <h1 data-animate>A calm, predictable process with sharp execution.</h1>
        <p class="section__lead" data-animate>
          We follow a rigorous 6-phase delivery lifecycle that eliminates guesswork, maintains continuous communication, and ensures on-time completion.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="step-grid">
          <div class="step-card" data-animate>
            <div class="step-card__num">01</div>
            <h3>Discovery & Needs Audit</h3>
            <p>We analyze your business objectives, inspect your current infrastructure, assess security vulnerabilities, and establish quantifiable KPIs.</p>
            <div style="margin-top:1rem;font-size:0.82rem;font-weight:700;color:var(--accent);">Deliverable: Architecture Audit Report</div>
          </div>
          <div class="step-card" data-animate>
            <div class="step-card__num">02</div>
            <h3>Blueprint & Strategy</h3>
            <p>Our lead architect drafts a detailed topology diagram, technology stack selection, security controls, and clear milestone timeline.</p>
            <div style="margin-top:1rem;font-size:0.82rem;font-weight:700;color:var(--accent);">Deliverable: Implementation Roadmap</div>
          </div>
          <div class="step-card" data-animate>
            <div class="step-card__num">03</div>
            <h3>Agile Build & Configuration</h3>
            <p>We set up infrastructure-as-code, configure server instances, build frontend/backend modules, and provide weekly sprint demos.</p>
            <div style="margin-top:1rem;font-size:0.82rem;font-weight:700;color:var(--accent);">Deliverable: Functional Staging Environment</div>
          </div>
          <div class="step-card" data-animate>
            <div class="step-card__num">04</div>
            <h3>Testing & Security Hardening</h3>
            <p>Comprehensive load testing, SSL validation, vulnerability scans, cross-browser compatibility checks, and DNS dry-runs.</p>
            <div style="margin-top:1rem;font-size:0.82rem;font-weight:700;color:var(--accent);">Deliverable: QA & Security Certification</div>
          </div>
          <div class="step-card" data-animate>
            <div class="step-card__num">05</div>
            <h3>Zero-Downtime Deployment</h3>
            <p>Executing live DNS cutovers, data synchronization, and SSL binding during off-peak windows with live monitoring.</p>
            <div style="margin-top:1rem;font-size:0.82rem;font-weight:700;color:var(--accent);">Deliverable: Production Go-Live</div>
          </div>
          <div class="step-card" data-animate>
            <div class="step-card__num">06</div>
            <h3>Proactive SLA Maintenance</h3>
            <p>24/7 automated monitoring, daily verified backups, security updates, and dedicated monthly review check-ins.</p>
            <div style="margin-top:1rem;font-size:0.82rem;font-weight:700;color:var(--accent);">Deliverable: Monthly Performance Analytics</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <div class="section__header section__header--center">
          <p class="section__eyebrow" data-animate>Client Commitments</p>
          <h2 data-animate>Our Guarantees to You</h2>
        </div>
        <div class="grid-3" style="margin-top:2.5rem;">
          <div class="offer" data-animate>
            <div class="offer__icon-box">${icon("check", "icon--lg")}</div>
            <h3>Zero Hidden Surcharges</h3>
            <p>Transparent milestones and clear scope definition before any work begins.</p>
          </div>
          <div class="offer" data-animate>
            <div class="offer__icon-box">${icon("users", "icon--lg")}</div>
            <h3>Dedicated Tech Lead</h3>
            <p>Direct communication with senior cloud architects, never intermediate non-technical reps.</p>
          </div>
          <div class="offer" data-animate>
            <div class="offer__icon-box">${icon("shield", "icon--lg")}</div>
            <h3>Complete Data Ownership</h3>
            <p>100% of licenses, source code, and cloud accounts are registered in your company name.</p>
          </div>
        </div>
      </div>
    </section>
`;

// ----------------------------------------------------
// 5. CONTACT PAGE (contact.html)
// ----------------------------------------------------
const contactBody = `
    <section class="page-hero">
      <div class="container">
        <p class="section__eyebrow" data-animate>Contact GetKloud</p>
        <h1 data-animate>Let's engineer your digital advantage.</h1>
        <p class="section__lead" data-animate>
          Send an enquiry or initiate an instant WhatsApp chat. We review all technical requirements and respond within 24 hours.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container grid-2">
        <form class="form" data-enquire-form data-animate>
          <h3 style="margin-bottom:0.5rem;">Project Enquiry Form</h3>
          <p style="font-size:0.9rem;color:var(--ink-muted);margin-bottom:1.5rem;">
            Provide your requirements below for a detailed technical estimate.
          </p>

          <div class="form-group">
            <label class="form-label" for="inp-name">Full Name *</label>
            <input class="form-input" id="inp-name" name="name" type="text" required autocomplete="name" placeholder="Shailesh Patil" />
          </div>

          <div class="grid-2" style="gap:1rem;">
            <div class="form-group">
              <label class="form-label" for="inp-email">Business Email *</label>
              <input class="form-input" id="inp-email" name="email" type="email" required autocomplete="email" placeholder="name@company.com" />
            </div>
            <div class="form-group">
              <label class="form-label" for="inp-phone">Phone / WhatsApp</label>
              <input class="form-input" id="inp-phone" name="phone" type="tel" autocomplete="tel" placeholder="+91 98765 43210" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="inp-service">Service Area</label>
            <select class="form-select" id="inp-service" name="service">
              <option value="">Select primary solution</option>
              <option>Cloud Services & AWS/Azure</option>
              <option>Enterprise Email (M365/Google)</option>
              <option>Paid Lead Generation</option>
              <option>Google Ranking & SEO</option>
              <option>eCommerce Store Development</option>
              <option>Custom Website Development</option>
              <option>Business Automation & ERP</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="inp-message">Project Details & Objectives</label>
            <textarea class="form-textarea" id="inp-message" name="message" placeholder="Describe your current setup, challenges, and goals..."></textarea>
          </div>

          <div class="btn-row" style="margin-top:0.5rem;">
            <button class="btn btn--primary btn--lg" type="submit" style="width:100%;">
              ${icon("zap")} Prepare & Send Project Brief
            </button>
          </div>
        </form>

        <div style="display:flex;flex-direction:column;gap:1.5rem;" data-animate="right">
          <div class="offer" style="background:#ffffff;">
            <div class="offer__icon-box">${icon("pin", "icon--lg")}</div>
            <h3>Pune Headquarters</h3>
            <p>BHARGAV VIHAR, SN.53/1, Wadgaon Dhayari, Sinhagad Road, Pune 411041, Maharashtra, India</p>
          </div>

          <div class="offer" style="background:#ffffff;">
            <div class="offer__icon-box">${icon("phone", "icon--lg")}</div>
            <h3>Direct Call & WhatsApp</h3>
            <p><a href="tel:+918421174747" style="font-weight:700;font-size:1.1rem;">+91 8421174747</a></p>
            <p style="font-size:0.88rem;margin-top:0.35rem;">Monday – Saturday, 9:00 AM – 7:00 PM IST</p>
          </div>

          <div class="offer" style="background:#ffffff;">
            <div class="offer__icon-box">${icon("mail", "icon--lg")}</div>
            <h3>Official Email</h3>
            <p><a href="mailto:info@getkloud.in" style="font-weight:700;font-size:1.1rem;">info@getkloud.in</a></p>
            <p style="font-size:0.88rem;margin-top:0.35rem;">Responses guaranteed within 24 business hours.</p>
          </div>

          <div class="offer" style="background:var(--accent-soft);border-color:var(--accent-border);">
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <span class="pulse-dot"></span>
              <strong style="color:var(--accent-deep);">Instant WhatsApp Messaging Available</strong>
            </div>
            <p style="font-size:0.92rem;margin-top:0.5rem;">
              Need a quick question answered? Chat directly with our solutions team on WhatsApp.
            </p>
            <a class="btn btn--primary btn--sm" href="https://wa.me/918421174747" target="_blank" rel="noopener" style="margin-top:0.5rem;align-self:flex-start;">
              ${icon("whatsapp")} Open WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
`;

// ----------------------------------------------------
// BUILD ALL PAGES
// ----------------------------------------------------
console.log("Starting full website generation...");

// 1. Root pages
write(
  "index.html",
  shell({
    depth: 0,
    page: "home",
    title: "Website Development & Cloud Services in Pune",
    description: "GetKloud Solutions: Enterprise AWS/Azure Cloud Services, Google Workspace, SEO, eCommerce and Website Development in Pune, India.",
    body: homeBody,
  })
);

write(
  "about.html",
  shell({
    depth: 0,
    page: "about",
    title: "About Us | Cloud & IT Solutions Partner",
    description: "Learn about GetKloud Solutions — certified cloud architects and digital transformation experts in Pune led by Shailesh Patil.",
    body: aboutBody,
  })
);

write(
  "how-we-work.html",
  shell({
    depth: 0,
    page: "process",
    title: "How We Work | 6-Phase Engineering Lifecycle",
    description: "Discover GetKloud's milestone-driven process: analyze, architecture, agile execution, security hardening, and 24/7 SLA monitoring.",
    body: howWeWorkBody,
  })
);

write(
  "contact.html",
  shell({
    depth: 0,
    page: "contact",
    title: "Contact Us | GetKloud Solutions Pune",
    description: "Connect with GetKloud Solutions in Pune for custom cloud migration, web development, and digital marketing consultations.",
    body: contactBody,
  })
);

// 2. Services Hub
write(
  "services/index.html",
  shell({
    depth: 1,
    page: "services",
    title: "Enterprise Technology Services & Solutions",
    description: "Complete catalog of GetKloud solutions: Cloud Infrastructure, Google Workspace, Lead Generation, SEO, eCommerce, and Custom ERP.",
    body: servicesHubBody,
  })
);

// 3. Dedicated Service Pages
const serviceVisuals = {
  "cloud-services": {
    img: "cloud-infrastructure.jpg",
    title: "AWS & Azure Multi-Region Architecture",
    tag: "99.9% Uptime SLA Guarantee",
  },
  "email-solutions": {
    img: "email-security.jpg",
    title: "Enterprise Email Security & Migration",
    tag: "SPF / DKIM / DMARC 100% Deliverability",
  },
  "lead-generation": {
    img: "cloud-infrastructure.jpg",
    title: "Targeted Inbound B2B Lead Funnels",
    tag: "Multi-Channel Tracking & Conversion",
  },
  "google-ranking": {
    img: "cloud-infrastructure.jpg",
    title: "Search Engine Optimization & Authority",
    tag: "Local Maps & Technical SEO",
  },
  "ecommerce": {
    img: "web-engineering.jpg",
    title: "High-Converting eCommerce Architecture",
    tag: "Razorpay & Multi-Currency Ready",
  },
  "website-development": {
    img: "web-engineering.jpg",
    title: "Modern React & Responsive Web Engineering",
    tag: "Sub-Second Lighthouse Performance",
  },
  "business-automation": {
    img: "web-engineering.jpg",
    title: "Custom Enterprise ERP & Process Systems",
    tag: "Automated Workflows & API Bridges",
  },
};

for (const s of services) {
  const vis = serviceVisuals[s.slug] || {
    img: "cloud-infrastructure.jpg",
    title: s.title,
    tag: "Enterprise Architecture",
  };

  const serviceBody = `
    <section class="page-hero page-hero--cinematic">
      <div class="container">
        <p class="section__eyebrow" data-animate>${s.eyebrow}</p>
        <h1 data-animate>${s.headline}</h1>
        <p class="section__lead" data-animate>${s.lead}</p>
        <div class="btn-row" style="margin-top:1.75rem;" data-animate>
          <a class="btn btn--primary btn--lg" href="../contact.html">
            ${icon("zap")} Get ${s.title.split(" ")[0]} Quote
          </a>
          <a class="btn btn--ghost btn--lg" href="https://wa.me/918421174747" target="_blank" rel="noopener">
            ${icon("whatsapp")} WhatsApp Consultation
          </a>
        </div>
      </div>
    </section>

    <!-- Visual Showcase -->
    <section class="section" style="padding-bottom:1rem;">
      <div class="container">
        <div class="visual-showcase" data-animate>
          <img src="../assets/images/${vis.img}" alt="${vis.title}" loading="lazy" />
          <div class="visual-showcase__caption">
            <span class="visual-showcase__title">${vis.title}</span>
            <span class="visual-showcase__tag">${vis.tag}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section__header">
          <p class="section__eyebrow" data-animate>What We Deliver</p>
          <h2 data-animate>Comprehensive ${s.title} Capabilities</h2>
          <p class="section__lead" data-animate>${s.intro}</p>
        </div>

        <div class="offer-list" style="margin-top:2.5rem;">
          ${s.features
            .map(
              (f) => `
            <article class="offer" data-animate>
              <div class="offer__head">
                <div class="offer__icon-box">${icon(f.icon || s.icon, "icon--lg")}</div>
                <div>
                  <h3>${f.title}</h3>
                  <p>${f.desc}</p>
                </div>
              </div>
              <div class="offer__tags">
                ${f.tags.map((t) => `<span class="offer__tag">${t}</span>`).join("")}
              </div>
            </article>
          `
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="section section--panel">
      <div class="container">
        <div class="section__header section__header--center">
          <p class="section__eyebrow" data-animate>FAQ</p>
          <h2 data-animate>Frequently Asked Questions</h2>
        </div>
        ${renderFAQAccordion(s.faqs)}
      </div>
    </section>

    <section class="container" data-animate>
      <div class="cta-band">
        <div class="container" style="position:relative;z-index:2;">
          <h2>Ready to get started with ${s.title}?</h2>
          <p>Contact our Pune engineering team today for a tailored architecture review and quote.</p>
          <div class="btn-row" style="margin-top:1.75rem;">
            <a class="btn btn--white btn--lg" href="../contact.html">${icon("zap")} Request Proposal</a>
          </div>
        </div>
      </div>
    </section>
  `;

  write(
    `services/${s.slug}.html`,
    shell({
      depth: 1,
      page: "services",
      title: `${s.title}`,
      description: s.lead,
      body: serviceBody,
    })
  );
}

console.log("All 13 pages generated successfully!");
