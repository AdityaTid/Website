# AYURRARTH Website Implementation Guide

## Quick Start

### 1. Backup Current Files
```bash
# Create backup before making changes
cp -r css css_backup
cp -r js js_backup
```

### 2. Add New Files to Your Project

**Copy these files to your website:**

```
New Files Created:
✅ js/modules/header.js
✅ js/modules/hero.js
✅ js/modules/animations.js
✅ js/modules/media.js
✅ js/modules/navigation.js
✅ js/main-new.js
✅ css/components.css
✅ index-new.html (reference)
✅ package.json
✅ OPTIMIZATION_GUIDE.md
✅ CODE_STANDARDS.md
```

### 3. Update Your HTML Files

**Replace this in every HTML file:**

```html
<!-- OLD -->
<script src="js/main.js"></script>

<!-- NEW -->
<link rel="stylesheet" href="css/components.css" />
<script type="module" src="js/main-new.js"></script>
```

### 4. Update CSS Imports

In your `css/styles.css`, add at the top:
```css
@import url('components.css');
```

Or update your HTML `<head>`:
```html
<link rel="stylesheet" href="css/styles.css" />
<link rel="stylesheet" href="css/components.css" />
```

### 5. Test Everything

- [ ] Open site in browser
- [ ] Test mobile menu (hamburger)
- [ ] Test hero image slideshow
- [ ] Scroll and check animations
- [ ] Click all links
- [ ] Test on mobile device
- [ ] Check console for errors

---

## File-by-File Updates

### index.html

**Add to `<head>`:**
```html
<link rel="stylesheet" href="css/components.css" />
<meta name="theme-color" content="#b8941f" />
<meta name="apple-mobile-web-app-capable" content="yes" />
```

**Update `<body>` end:**
```html
<!-- Replace old script with -->
<script type="module" src="js/main-new.js"></script>
```

### about.html, contact.html, treatments.html, panchakarma.html, gallery.html

**Same changes as index.html above**

---

## Module Reference

### Header Module
**File:** `js/modules/header.js`

**Features:**
- Scroll-triggered header styling
- Mobile menu toggle
- Keyboard support (Escape to close)
- Body overflow management

**Usage:**
```javascript
import { Header } from './modules/header.js';
Header.init();
```

### HeroSlideshow Module
**File:** `js/modules/hero.js`

**Features:**
- Auto-rotating image slideshow
- Respects prefers-reduced-motion
- Smooth transitions between slides

**Configuration:**
```javascript
const SLIDE_INTERVAL = 6500; // milliseconds
```

### Animations Module
**File:** `js/modules/animations.js`

**Features:**
- Scroll-triggered reveal animations
- Cinematic parallax effects
- Intersection observer for performance

### Media Module
**File:** `js/modules/media.js`

**Features:**
- Lazy video autoplay
- Auto-update footer year
- IntersectionObserver for video playback

### Navigation Module
**File:** `js/modules/navigation.js`

**Features:**
- Smooth scroll for anchor links
- Keyboard navigation
- Respects prefers-reduced-motion

---

## Component Classes

### Buttons

```html
<!-- Primary Button -->
<a class="btn btn--primary" href="#">Click me</a>

<!-- Ghost Button -->
<button class="btn btn--ghost">More Info</button>

<!-- Small Button -->
<a class="btn btn--primary btn--sm" href="#">Small</a>
```

### Cards

```html
<div class="card">
  <h3 class="card__title">Card Title</h3>
  <p class="card__body">Card content goes here...</p>
</div>
```

### Grids

```html
<!-- Two column grid -->
<div class="grid-2">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

<!-- Three column grid -->
<div class="grid-3">
  <div>Col 1</div>
  <div>Col 2</div>
  <div>Col 3</div>
</div>
```

### Utilities

```html
<!-- Text centering -->
<div class="text-center">Centered text</div>

<!-- Muted text -->
<p class="text-muted">Secondary information</p>

<!-- Primary color -->
<span class="text-primary">Highlighted text</span>

<!-- Screen reader only -->
<span class="sr-only">Only for screen readers</span>
```

---

## Customization Guide

### Colors

Edit `css/components.css`:

```css
:root {
  --color-primary: #b8941f;        /* Change this */
  --color-primary-dark: #9a7528;   /* And this */
  --color-primary-light: #d4b15c;  /* And this */
}
```

### Spacing

```css
:root {
  --space-md: 1rem;      /* Change base spacing */
  --space-lg: 1.5rem;
  --space-xl: 2rem;
}
```

### Typography

```css
:root {
  --font-size-base: 1.05rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
}
```

### Animation Speed

```css
:root {
  --duration-fast: 0.15s;
  --duration-normal: 0.3s;
  --duration-slow: 0.5s;
}
```

---

## Troubleshooting

### Hero images not rotating
- Check that `[data-hero-slideshow]` exists in HTML
- Verify image elements have `.hero-slide` class
- Check browser console for errors
- Verify `SLIDE_INTERVAL` is set correctly

### Mobile menu not working
- Check that button has `[data-nav-toggle]`
- Verify nav has `[data-nav]` attribute
- Check for JavaScript errors in console
- Test keyboard (press Escape)

### Animations not showing
- Enable JavaScript
- Check that elements have `[data-reveal]`
- Verify browser supports IntersectionObserver
- Check `prefers-reduced-motion` setting

### Styles not applying
- Clear browser cache (Ctrl+Shift+Delete)
- Verify CSS file paths are correct
- Check for CSS syntax errors
- Open browser DevTools to inspect

---

## Performance Tips

### Image Optimization
```html
<!-- Use srcset for responsive images -->
<img 
  src="small.jpg"
  srcset="small.jpg 640w, large.jpg 1200w"
  sizes="(max-width: 640px) 100vw, 50vw"
  alt="Description"
/>
```

### Lazy Loading
```html
<!-- Images below fold -->
<img src="..." loading="lazy" />

<!-- Critical images -->
<img src="..." loading="eager" />
```

### Font Loading
```html
<link rel="preload" as="font" href="font.woff2" type="font/woff2" crossorigin>
```

---

## Testing Checklist

### Desktop
- [ ] Chrome latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Edge latest

### Mobile
- [ ] iOS Safari
- [ ] Chrome Android
- [ ] Samsung Internet

### Accessibility
- [ ] Tab through site (keyboard only)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Check color contrast (WAVE tool)
- [ ] Zoom to 200%
- [ ] Disable JavaScript

### Performance (Lighthouse)
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 90
- [ ] Best Practices ≥ 90
- [ ] SEO ≥ 90

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | 2026-04-11 | Modular architecture, BEM CSS, accessibility enhancements |
| 1.0.0 | Original | Initial website version |

---

## Support & Next Steps

### Immediate (This Week)
1. ✅ Copy all new files to your project
2. ✅ Update HTML to use new scripts
3. ✅ Test thoroughly
4. ✅ Fix any console errors

### Next Week
1. ✅ Deploy to production
2. ✅ Monitor for issues
3. ✅ Gather user feedback
4. ✅ Make minor adjustments

### Next Month
1. ✅ Consider adding build tool (Vite)
2. ✅ Implement minification
3. ✅ Set up analytics
4. ✅ Plan enhancements

---

**Questions or Issues?**

1. Check browser console (F12)
2. Read comments in modules
3. Review OPTIMIZATION_GUIDE.md
4. Validate HTML and CSS

**Current Date:** 2026-04-11  
**Status:** ✅ Production Ready
