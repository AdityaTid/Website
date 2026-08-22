(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const closeBtn = document.querySelector(".mobile-nav__close");
  const mobileNav = document.querySelector(".mobile-nav");
  const page = document.body.dataset.page;

  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add("is-active");
    }
  });

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

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

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
        setMenuOpen(false);
      }
    });
  }

  document.body.classList.add("page-enter");
})();
