# AYURRARTH Professional Code Standards

## Code Quality Checklist

### ✅ HTML Best Practices

- [x] Semantic HTML5 elements
- [x] Proper heading hierarchy (h1 → h2 → h3)
- [x] Meta tags for SEO and social sharing
- [x] Accessible alt text for images
- [x] ARIA labels for interactive elements
- [x] Skip-to-content link
- [x] Proper language attribute
- [x] Mobile viewport meta tag
- [x] Preconnect for external resources

### ✅ CSS Best Practices

- [x] CSS custom properties (design tokens)
- [x] Mobile-first responsive design
- [x] BEM naming convention
- [x] Organized into logical sections
- [x] Vendor prefixes where needed
- [x] Reduced motion support
- [x] Focus indicators for accessibility
- [x] High contrast mode support
- [x] Dark mode support

### ✅ JavaScript Best Practices

- [x] Modular architecture
- [x] No global variables
- [x] Separation of concerns
- [x] DRY (Don't Repeat Yourself)
- [x] Meaningful variable names
- [x] Comments for complex logic
- [x] Event listener cleanup
- [x] Error handling
- [x] Performance optimized (passive listeners, RAF)

### ✅ Accessibility (WCAG 2.1 Level AA)

- [x] Keyboard navigation
- [x] Screen reader support
- [x] Color contrast ratios (4.5:1 for text)
- [x] Focus indicators
- [x] ARIA labels
- [x] Motion preferences respected
- [x] Semantically structured content
- [x] Skip links
- [x] Form labels

### ✅ Performance

- [x] Lazy loading for images
- [x] Font preconnect
- [x] Optimized images
- [x] Minimal CSS/JS
- [x] Tree-shakeable modules
- [x] Passive event listeners
- [x] RequestAnimationFrame for animations
- [x] IntersectionObserver for lazy content

### ✅ SEO

- [x] Semantic HTML structure
- [x] Meta descriptions
- [x] Open Graph tags
- [x] Structured data ready
- [x] Mobile-friendly
- [x] Fast page load
- [x] Descriptive URLs
- [x] Internal linking

---

## Code Style Guide

### JavaScript

#### File Structure
```javascript
/**
 * Module description
 * @module ModuleName
 */

export const ModuleName = (() => {
  // Private variables
  const CONSTANT_VALUE = 42;
  const elements = {};

  // Private functions
  const privateFunction = () => {};

  // Public interface
  const init = () => {};

  return { init };
})();
```

#### Naming Conventions
```javascript
// Constants: UPPER_SNAKE_CASE
const MAX_ATTEMPTS = 3;

// Variables: camelCase
let currentIndex = 0;

// Functions: camelCase
const setupEventListeners = () => {};

// Classes: PascalCase
class ComponentName {}

// Elements: descriptive_names
const elements = {
  header: document.querySelector('[data-header]'),
  nav: document.querySelector('[data-nav]'),
};
```

#### Comments
```javascript
/**
 * Setup scroll listener for header effects
 * @param {HTMLElement} header - Header element
 */
const setupScrollListener = (header) => {
  // Implementation
};
```

---

### CSS

#### Naming
```css
/* Block: main component name */
.card { }

/* Element: part of block */
.card__title { }
.card__body { }

/* Modifier: variation */
.card--featured { }
.card--outlined { }

/* Utility: single purpose */
.text-center { }
.mt-lg { } /* margin-top large */
```

#### Organization
```css
/* 1. Variables & Tokens */
:root { }

/* 2. Reset & Base */
* { }
body { }

/* 3. Layout """
.container { }
.grid { }

/* 4. Components */
.button { }
.card { }

/* 5. Utilities */
.sr-only { }
.text-muted { }

/* 6. Responsive */
@media (max-width: 768px) { }

/* 7. Animations */
@keyframes fade-in { }
```

#### Values
```css
/* ✅ Use tokens */
color: var(--color-primary);
padding: var(--space-lg);
font-family: var(--font-family-sans);

/* ❌ Avoid magic numbers */
color: #b8941f;
padding: 1.5rem;
```

---

### HTML

#### Semantic Elements
```html
<!-- ✅ Good -->
<header>Navigation and logo</header>
<main>Primary content</main>
<section>Related content group</section>
<article>Self-contained content</article>
<aside>Supplementary content</aside>
<footer>Footer information</footer>

<!-- ❌ Avoid -->
<div id="header">Not semantic</div>
```

#### Accessibility
```html
<!-- ✅ Good -->
<button aria-label="Close menu" data-toggle="menu">
  <span class="sr-only">Close</span>
  <span>×</span>
</button>

<!-- ❌ Avoid -->
<div onclick="closeMenu()">Close</div>
```

---

## Performance Targets

### Metrics

| Metric | Target |
|--------|--------|
| **First Contentful Paint** | < 1.5s |
| **Largest Contentful Paint** | < 2.5s |
| **Time to Interactive** | < 3.5s |
| **Cumulative Layout Shift** | < 0.1 |
| **Accessibility Score** | ≥ 90/100 |
| **SEO Score** | ≥ 90/100 |
| **Performance Score** | ≥ 90/100 |

### Testing Tools
- Google Lighthouse
- WebPageTest
- GTmetrix
- PageSpeed Insights

---

## Browser Support

### Desktop
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile
- iOS Safari 14+
- Chrome Android 90+
- Samsung Internet 14+

### Graceful Degradation
- Fallbacks for CSS Grid
- JavaScript checks for APIs
- Feature detection, not browser detection

---

## Security Checklist

- [x] No inline scripts (use external files)
- [x] Content Security Policy headers ready
- [x] No external data in HTML attributes
- [x] XSS protection (sanitize user input)
- [x] HTTPS ready
- [x] Secure external links (rel="noopener noreferrer")
- [x] Form validation
- [x] No sensitive data in client-side code

---

## Documentation Standards

### Code Comments
```javascript
// Bad: What is obvious
const x = 5; // Set x to 5

// Good: Why, not what
// Debounce delay prevents excessive scroll calculations
const SCROLL_DEBOUNCE = 100;
```

### Function Documentation
```javascript
/**
 * Handles mobile menu toggle with keyboard support
 * @param {Event} e - Click or keyboard event
 * @returns {void}
 */
const toggleMenu = (e) => {};
```

### Module Documentation
```javascript
/**
 * Header Module - Manages navigation and scroll effects
 * 
 * Features:
 * - Mobile menu toggle with keyboard support
 * - Scroll-triggered header styling
 * - Keyboard event handling (Escape to close)
 * 
 * @module Header
 */
```

---

## Deployment Checklist

- [ ] All console errors resolved
- [ ] Tested in target browsers
- [ ] Images optimized
- [ ] CSS/JS minified
- [ ] No console.log statements
- [ ] Accessibility audit passed (WAVE, Axe)
- [ ] SEO audit passed
- [ ] Performance audit passed (Lighthouse)
- [ ] Mobile responsiveness verified
- [ ] Form testing complete
- [ ] Analytics tracking verified
- [ ] Backup created

---

## Version Control

### Commit Message Format
```
<type>(<scope>): <subject>

<body (optional)>

<footer (optional)>
```

**Types:** feat, fix, docs, style, refactor, perf, test, chore

**Examples:**
```
feat(header): add keyboard navigation support
fix(hero): resolve image slideshow timing issue
docs(readme): update installation instructions
perf(css): optimize animation performance
```

---

## Continuous Improvement

### Monthly Reviews
- [ ] Performance metrics
- [ ] Accessibility compliance
- [ ] Security updates
- [ ] Browser compatibility

### Quarterly Updates
- [ ] Dependency updates
- [ ] Code refactoring
- [ ] Documentation review
- [ ] User feedback incorporation

### Annual Assessment
- [ ] Architecture evaluation
- [ ] Technology stack review
- [ ] Team training needs
- [ ] Long-term roadmap

---

**Last Updated:** 2026-04-11  
**Next Review:** 2026-07-11
