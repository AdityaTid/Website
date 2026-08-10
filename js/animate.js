(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll("[data-animate]");

  if (!items.length) return;

  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-inview"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-inview");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach((el, index) => {
    if (!el.style.getPropertyValue("--delay")) {
      el.style.setProperty("--delay", `${(index % 4) * 70}ms`);
    }
    observer.observe(el);
  });
})();
