/**
 * Media Module - Handles video autoplay and image optimization
 * @module Media
 */

export const Media = (() => {
  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Initialize media module
   */
  const init = () => {
    setupVideoAutoplay();
    setCurrentYear();
  };

  /**
   * Setup video autoplay with intersection observer
   */
  const setupVideoAutoplay = () => {
    const videos = document.querySelectorAll('video[data-autoplay-in-view]');

    videos.forEach((video) => {
      // Disable autoplay if motion is reduced
      if (prefersReduced) {
        video.removeAttribute('autoplay');
        return;
      }

      // Fallback for browsers without IntersectionObserver
      if (!('IntersectionObserver' in window)) {
        video.play().catch(() => {});
        return;
      }

      // Use IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.play().catch(() => {});
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -5% 0px' }
      );

      observer.observe(video);
    });
  };

  /**
   * Set current year in footer (auto-update)
   */
  const setCurrentYear = () => {
    const yearEl = document.querySelector('[data-year]');
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  };

  return { init };
})();
