(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll("[data-animate]");

  // 1. Reveal on scroll
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
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );

      items.forEach((el, index) => {
        if (!el.style.getPropertyValue("--delay")) {
          el.style.setProperty("--delay", `${(index % 4) * 90}ms`);
        }
        observer.observe(el);
      });
    }
  }

  // 2. Animated stat counters
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window && !reduce) {
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const animateCounter = (el) => {
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const suffix = el.dataset.suffix || "";
      const duration = 1500;
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
      { threshold: 0.3 }
    );

    counters.forEach((el) => counterObserver.observe(el));
  } else if (counters.length) {
    counters.forEach((el) => {
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      el.textContent = parseFloat(el.dataset.count).toFixed(decimals) + (el.dataset.suffix || "");
    });
  }

  // 3. Interactive FAQ Accordion
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");
      const inner = item.querySelector(".faq-answer-inner");
      const isOpen = item.classList.contains("is-open");

      // Close sibling items
      const parent = item.closest(".faq-accordion");
      if (parent) {
        parent.querySelectorAll(".faq-item.is-open").forEach((sibling) => {
          if (sibling !== item) {
            sibling.classList.remove("is-open");
            const sibAnswer = sibling.querySelector(".faq-answer");
            if (sibAnswer) sibAnswer.style.maxHeight = "0px";
            const sibBtn = sibling.querySelector(".faq-question");
            if (sibBtn) sibBtn.setAttribute("aria-expanded", "false");
          }
        });
      }

      if (isOpen) {
        item.classList.remove("is-open");
        answer.style.maxHeight = "0px";
        btn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("is-open");
        answer.style.maxHeight = inner.offsetHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // 4. Hero Particle Network Canvas
  const canvas = document.getElementById("hero-network-canvas");
  if (canvas && !reduce) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    const count = Math.min(Math.floor((width * height) / 14000), 45);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1.2,
      });
    }

    const resize = () => {
      if (!canvas.offsetWidth || !canvas.offsetHeight) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(2, 132, 199, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and move particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.45)";
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }

      requestAnimationFrame(draw);
    };

    draw();
  }
})();
