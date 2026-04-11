/**
 * Header Module - Manages navigation, scroll state, and mobile menu
 * @module Header
 */

export const Header = (() => {
  const elements = {
    header: document.querySelector('[data-header]'),
    nav: document.querySelector('[data-nav]'),
    navToggle: document.querySelector('[data-nav-toggle]'),
  };

  const SCROLL_THRESHOLD = 40;

  /**
   * Initialize header module
   */
  const init = () => {
    if (!elements.header) return;
    setupScrollListener();
    setupMobileMenu();
  };

  /**
   * Handle scroll effects
   */
  const setupScrollListener = () => {
    const onScroll = () => {
      const isScrolled = window.scrollY > SCROLL_THRESHOLD;
      elements.header.classList.toggle('is-scrolled', isScrolled);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll(); // Initial check
  };

  /**
   * Handle mobile menu toggle
   */
  const setupMobileMenu = () => {
    if (!elements.navToggle || !elements.nav) return;

    elements.navToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking nav links
    elements.nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  };

  /**
   * Toggle mobile menu state
   */
  const toggleMenu = () => {
    const isOpen = elements.navToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  };

  /**
   * Set menu open/close state
   * @param {boolean} isOpen - Menu state
   */
  const setMenuState = (isOpen) => {
    elements.navToggle.setAttribute('aria-expanded', String(isOpen));
    elements.nav.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  /**
   * Close menu
   */
  const closeMenu = () => {
    setMenuState(false);
  };

  return { init };
})();
