/**
 * Animations Module - Handles scroll-triggered animations and transitions
 * @module Animations
 */

export const Animations = (() => {
  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Initialize all animations
   */
  const init = () => {
    if (prefersReduced) return;

    setupScrollReveal();
    setupCinematicEffects();
  };

  /**
   * Setup scroll-triggered reveal animations
   */
  const setupScrollReveal = () => {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (!revealEls.length || !('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      revealEls.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 0.05, 0.4)}s`;
      io.observe(el);
    });
  };

  /**
   * Cinematic section — subtle parallax on the background image only.
   * The scroll-pin / tall-track approach is replaced by a CSS animation on
   * the card, so this function only drives a lightweight image parallax.
   */
  const setupCinematicEffects = () => {
    const cinematicRoot = document.querySelector('[data-cinematic]');
    if (!cinematicRoot) return;

    const cinematicImg = cinematicRoot.querySelector('.cinematic-media img');
    if (!cinematicImg) return;

    // Gentle vertical parallax on the background image as the user scrolls past
    let rafPending = false;

    const applyParallax = () => {
      rafPending = false;
      const rect = cinematicRoot.getBoundingClientRect();
      const vh = window.innerHeight;

      // p: 0 when section bottom enters viewport, 1 when section top leaves
      const p = Math.min(1, Math.max(0, 1 - rect.bottom / (vh + rect.height)));
      const drift = p * 6; // max 6% vertical drift

      cinematicImg.style.transform = `scale(1.06) translateY(${drift}%)`;
    };

    const queue = () => {
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(() => { applyParallax(); rafPending = false; });
      }
    };

    // Run once on load, then on scroll/resize
    applyParallax();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue, { passive: true });
  };

  return { init };
})();
