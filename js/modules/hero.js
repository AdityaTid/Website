/**
 * Hero Slideshow Module - Manages automatic image rotation
 * @module Hero
 */

export const HeroSlideshow = (() => {
  const SLIDE_INTERVAL = 6500; // milliseconds
  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Initialize hero slideshow
   */
  const init = () => {
    const slideshow = document.querySelector('[data-hero-slideshow]');
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.hero-slide');
    if (!slides.length) return;

    if (!prefersReduced && slides.length > 1) {
      autoPlaySlideshow(slides);
    } else {
      // Show first slide if motion is reduced or only one slide
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === 0));
    }
  };

  /**
   * Play slideshow automatically
   * @param {NodeListOf<Element>} slides - Slide elements
   */
  const autoPlaySlideshow = (slides) => {
    let currentIndex = 0;

    setInterval(() => {
      slides[currentIndex].classList.remove('is-active');
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add('is-active');
    }, SLIDE_INTERVAL);
  };

  return { init };
})();
