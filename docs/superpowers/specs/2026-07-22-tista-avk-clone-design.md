# Tista Ventures — AVK Site Clone Design

**Date:** 2026-07-22  
**Status:** Approved  
**Customer brand:** Tista Ventures  
**Reference site:** https://www.avkbuildingsolutions.in/

## Goal

Create a near-identical clone of the AVK Building Solutions website for Tista Ventures: same layout, sections, product brands, and animations, with Tista branding (logo + contact) swapped in.

## Decisions (locked)

| Decision | Choice |
|----------|--------|
| Content model | **B** — AVK copy + product brands (Klimas, Cotswold, SideRise, Tremco); swap company name/contact/logo |
| Images | **C** — Keep AVK section/product images for now; use only `img/logo/logo1.jpg` for brand logo |
| Build approach | **3 — Hybrid** — Phase 1 clones Home + Products with AVK template assets; Phase 2 rebuilds remaining pages later |
| Company name | Tista Ventures |
| Email | info@tistaventures.com |
| Phone | +91 98765 43210 |
| Address / social | Placeholders until customer provides |

## Phase 1 scope (this project)

### Pages
- **Home** (`index.html`) — top bar, nav, Revolution/fullscreen slider, Who We Are, About, Why Choose Us (vision/mission/values), product logo carousel, footer
- **Products** (`products.html` and any AVK product subpages required for nav, e.g. Klimas/framework-fasteners)

### Branding swaps
- Header/footer logo → `img/logo/logo1.jpg`
- All visible “AVK Building Solutions” → “Tista Ventures”
- Email → `info@tistaventures.com`
- Phone → `+91 98765 43210`
- Keep product brand names and external product links as on AVK

### Navigation
- Home → `index.html`
- Products (+ dropdown) → local product pages / same external links as AVK where AVK used them
- About Us, Quality, Career, Enquiry, Contact → temporary Coming Soon pages (or `#`) until Phase 2

### Technical approach
1. Download AVK Home + Products HTML and required shared CSS/JS/fonts/images so the site works offline (no runtime dependency on avkbuildingsolutions.in for assets).
2. Replace current Tailwind draft `index.html` / `products.html` with AVK-based versions; archive existing drafts under `old/` if needed.
3. Rebrand headers/footers as above.
4. Preserve AVK animation stack: Bootstrap, Revolution Slider / fullscreen slider, animate.css, carousels (bxslider/flexslider/logo slider as used).

### Target folder layout
```
/
  index.html
  products.html
  coming-soon.html          (optional shared stub for deferred pages)
  css/                      (AVK styles)
  js/                       (sliders, animate, bootstrap…)
  img/                      (AVK images + logo/logo1.jpg)
  fonts/
  docs/superpowers/specs/   (this design)
```

## Phase 2 (out of scope now)
Rebuild About Us, Quality, Career, Enquiry, Contact (optionally in Tailwind) with real Tista address/social and custom imagery.

## Success criteria (Phase 1)
- Home visually and behaviorally matches AVK (slider, fade-ins, product logo carousel).
- Products navigation and page(s) work locally.
- Tista logo appears in header and footer.
- Site opens via local static server / file open with CSS/JS/images loading from local paths.
- Contact bar shows Tista email and phone.

## Non-goals (Phase 1)
- Perfect legal rewrite of AVK marketing copy into unique Tista copy
- Custom product photography
- Backend enquiry forms / email sending
- Hosting / domain setup
