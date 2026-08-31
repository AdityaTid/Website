(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const closeBtn = document.querySelector(".mobile-nav__close");
  const mobileNav = document.querySelector(".mobile-nav");
  const page = document.body.dataset.page;

  // Active navigation highlight
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add("is-active");
    }
  });

  // Scroll detection for compact header
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (header) {
          header.classList.toggle("is-scrolled", window.scrollY > 20);
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile navigation drawer toggle
  const setMenuOpen = (open) => {
    if (!mobileNav || !toggle) return;
    mobileNav.classList.toggle("is-open", open);
    mobileNav.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  };

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      setMenuOpen(!mobileNav.classList.contains("is-open"));
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => setMenuOpen(false));
    }

    mobileNav.addEventListener("click", (e) => {
      if (e.target === mobileNav) {
        setMenuOpen(false);
      }
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
        setMenuOpen(false);
      }
    });
  }

  // Desktop dropdown toggle & click support
  const dropdown = document.querySelector(".nav__dropdown");
  const dropdownBtn = document.querySelector(".nav__dropdown-btn");
  if (dropdown && dropdownBtn) {
    dropdownBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle("is-open");
      dropdownBtn.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("is-open");
        dropdownBtn.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dropdown.classList.remove("is-open");
        dropdownBtn.setAttribute("aria-expanded", "false");
      }
    });
  }
})();
