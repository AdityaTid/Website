/**
 * Navigation Module - Handles smooth scrolling and anchor links
 * @module Navigation
 */

export const Navigation = (() => {
  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Initialize navigation module
   */
  const init = () => {
    setupAnchorLinks();
  };

  /**
   * Setup smooth scrolling for anchor links
   */
  const setupAnchorLinks = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', handleAnchorClick);
    });
  };

  /**
   * Handle anchor link click
   * @param {Event} e - Click event
   */
  const handleAnchorClick = (e) => {
    const href = e.currentTarget.getAttribute('href');

    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return { init };
})();
