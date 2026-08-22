(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll("[data-animate]");

  if (items.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-inview"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
      );

      items.forEach((el, index) => {
        if (!el.style.getPropertyValue("--delay")) {
          el.style.setProperty("--delay", `${(index % 5) * 80}ms`);
        }
        observer.observe(el);
      });
    }
  }

  if (reduce) return;

  // Soft parallax on cinematic / home heroes
  const media = document.querySelector(".hero__media, .page-hero--cinematic .page-hero__media");
  if (media) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY * 0.18, 90);
        media.style.translate = `0 ${y}px`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Magnetic hover for float dock icons
  document.querySelectorAll(".float-dock a").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) scale(1.05)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });

  // Animated stat counters
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const animateCounter = (el) => {
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const suffix = el.dataset.suffix || "";
      const duration = 1400;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = target * easeOut(progress);
        el.textContent = value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    counters.forEach((el) => counterObserver.observe(el));
  } else if (counters.length) {
    counters.forEach((el) => {
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      el.textContent = parseFloat(el.dataset.count).toFixed(decimals) + (el.dataset.suffix || "");
    });
  }
})();
