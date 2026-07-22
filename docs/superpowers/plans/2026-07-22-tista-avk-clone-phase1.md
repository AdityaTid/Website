# Tista Ventures AVK Clone — Phase 1 Implementation Plan

> **For agentic workers:** Execute task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a local static clone of AVK Home + Products, rebranded as Tista Ventures with `img/logo/logo1.jpg`.

**Architecture:** Mirror AVK HTML/CSS/JS/fonts/images for Home and Products into this repo; rebrand text/logo; stub deferred nav pages.

**Tech Stack:** Static HTML, Bootstrap, jQuery, Revolution/fullscreen slider, animate.css, Font Awesome (as used by AVK)

---

### Task 1: Archive current drafts

**Files:**
- Move existing Tailwind drafts if they conflict

- [ ] **Step 1:** Ensure `old/` holds prior drafts; do not delete `img/logo/logo1.jpg` or `img/logo/logo2.jpg` or `img/hero/hero1.jpg`.
- [ ] **Step 2:** Commit archive only if files moved.

### Task 2: Mirror AVK assets locally

**Files:**
- Create/populate: `css/`, `js/`, `fonts/`, `img/` (excluding overwrite of Tista logos)

- [ ] **Step 1:** Download `https://www.avkbuildingsolutions.in/` and `https://www.avkbuildingsolutions.in/products` HTML.
- [ ] **Step 2:** Parse and download all referenced CSS/JS/font/image assets to matching relative paths.
- [ ] **Step 3:** Verify homepage slider CSS/JS files exist under `js/rs-plugin/` (or equivalent paths from HTML).

### Task 3: Install Home page as `index.html`

**Files:**
- Create/overwrite: `index.html`

- [ ] **Step 1:** Save mirrored home HTML as `index.html` with local asset paths.
- [ ] **Step 2:** Replace company name, email, phone with Tista details.
- [ ] **Step 3:** Point header/footer logo `src` to `img/logo/logo1.jpg`.
- [ ] **Step 4:** Point deferred nav links (About, Quality, Career, Enquiry, Contact) to `coming-soon.html`.

### Task 4: Install Products page(s)

**Files:**
- Create: `products.html` (+ Klimas/product subpage if linked locally)

- [ ] **Step 1:** Save products HTML with local assets.
- [ ] **Step 2:** Apply same Tista branding as Home.
- [ ] **Step 3:** Ensure Products nav links between Home and Products work.

### Task 5: Coming soon stub

**Files:**
- Create: `coming-soon.html`

- [ ] **Step 1:** Minimal page matching AVK header/footer branding stating page coming in Phase 2, with link back to Home.

### Task 6: Verify locally

- [ ] **Step 1:** Open site via local static server.
- [ ] **Step 2:** Confirm slider/animations load, logo shows, contact info is Tista, no broken critical CSS/JS.

---

## Spec coverage
- Phase 1 Home + Products → Tasks 3–4  
- Branding → Tasks 3–4  
- Image strategy C → Task 2 (keep AVK imgs) + logo path Task 3  
- Deferred pages → Task 5  
- Offline assets → Task 2  
