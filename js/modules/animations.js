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
   * Setup cinematic scroll effect (parallax-like motion)
   */
  const setupCinematicEffects = () => {
    const cinematicRoot = document.querySelector('[data-cinematic]');
    if (!cinematicRoot) return;

    const cinematicTrack = cinematicRoot.querySelector('.cinematic-track');
    const cinematicImg = cinematicRoot.querySelector('.cinematic-media img');
    const cinematicCard = cinematicRoot.querySelector('.cinematic-card');
    const cinematicScrim = cinematicRoot.querySelector('.cinematic-scrim');

    if (!cinematicTrack || !cinematicImg) return;

    const cinematicSmooth = { p: 0 };
    let cinematicRafPending = false;

    const applyCinematic = (p) => {
      const t = Math.min(1, Math.max(0, p));
      const scale = 1.11 - t * 0.11;
      const drift = t * 2.2;

      cinematicImg.style.transform = `scale(${scale}) translate3d(0, ${drift}%, 0)`;

      if (cinematicCard) {
        cinematicCard.style.opacity = String(0.22 + t * 0.78);
        cinematicCard.style.transform = `translate3d(0, ${(1 - t) * 40}px, 0)`;
      }

      if (cinematicScrim) {
        cinematicScrim.style.opacity = String(0.88 - t * 0.22);
      }
    };

    const cinematicFrame = () => {
      cinematicRafPending = false;

      const rect = cinematicTrack.getBoundingClientRect();
      const total = cinematicTrack.offsetHeight - window.innerHeight;

      if (total <= 0) return;

      const target = Math.min(1, Math.max(0, -rect.top / total));
      const cur = cinematicSmooth.p;
      const alpha = 0.12;
      const next = cur + (target - cur) * alpha;

      cinematicSmooth.p = Math.abs(target - next) < 0.0015 ? target : next;
      applyCinematic(cinematicSmooth.p);

      if (Math.abs(cinematicSmooth.p - target) > 0.003) {
        cinematicRafPending = true;
        requestAnimationFrame(cinematicFrame);
      }
    };

    const queueCinematic = () => {
      if (!cinematicRafPending) {
        cinematicRafPending = true;
        requestAnimationFrame(cinematicFrame);
      }
    };

    window.addEventListener('scroll', queueCinematic, { passive: true });
    window.addEventListener('resize', queueCinematic, { passive: true });
  };

  return { init };
})();
