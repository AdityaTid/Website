(function () {
  const EMAIL = "info@getkloud.in";
  const WHATSAPP = "918421174747";

  // 1. Helper to format project enquiry data
  function buildMessage(data) {
    return [
      "🚀 *GetKloud Solutions Project Enquiry*",
      "----------------------------------",
      `👤 *Name:* ${data.name || "Client"}`,
      `📧 *Email:* ${data.email || "Not provided"}`,
      `📞 *Phone:* ${data.phone || "Not provided"}`,
      `💼 *Service Area:* ${data.service || "General Consultation"}`,
      data.scope ? `🛠 *Estimated Scope:* ${data.scope}` : "",
      "",
      "📝 *Project Notes / Requirements:*",
      data.message || "Looking to discuss cloud & digital growth opportunities for our business.",
      "",
      "----------------------------------",
      "Sent via getkloud.in",
    ]
      .filter(Boolean)
      .join("\n");
  }

  function getFormData(form) {
    const fd = new FormData(form);
    return {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      service: String(fd.get("service") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      scope: String(fd.get("scope") || "").trim(),
    };
  }

  // 2. Dispatch Modal Creator & Handler
  function showDispatchModal(data) {
    let modal = document.getElementById("dispatch-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "dispatch-modal";
      modal.className = "modal-overlay";
      modal.innerHTML = `
        <div class="modal-box">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;">
            <h3 style="margin:0;font-size:1.3rem;">Project Brief Prepared</h3>
            <button type="button" class="modal-close" style="background:none;border:none;cursor:pointer;font-size:1.4rem;color:var(--ink-muted);line-height:1;" aria-label="Close modal">&times;</button>
          </div>
          <p style="margin-bottom:1.5rem;font-size:0.95rem;color:var(--ink-soft);">
            Thank you, <strong>${data.name || "there"}</strong>! Your project brief is ready. Choose your preferred way to send it to our team:
          </p>
          <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.5rem;">
            <button class="btn btn--primary" id="modal-send-wa" style="background:#25d366;width:100%;">
              <svg class="icon" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M12.04 3.5A8.45 8.45 0 0 0 3.6 11.96c0 1.49.39 2.94 1.13 4.22L3.5 20.5l4.44-1.16a8.46 8.46 0 0 0 4.1 1.06h.01A8.46 8.46 0 0 0 20.5 12 8.45 8.45 0 0 0 12.04 3.5Zm4.93 11.96c-.2.57-1.18 1.09-1.63 1.16-.42.06-.95.09-1.53-.1-.35-.11-.8-.26-1.38-.51-2.43-1.05-4.01-3.5-4.13-3.66-.12-.16-1-1.18-1-2.25s.63-1.6.86-1.82c.22-.22.48-.27.64-.27h.46c.15 0 .35 0 .53.4.2.45.66 1.56.72 1.67.06.12.1.25.02.4-.08.16-.12.25-.24.39-.12.13-.25.3-.36.4-.12.12-.24.24-.1.47.14.22.62 1.02 1.33 1.65.91.82 1.68 1.07 1.91 1.19.23.12.37.1.5-.06.14-.16.58-.68.73-.91.16-.23.31-.19.52-.12.22.08 1.37.65 1.6.76.24.12.39.17.45.27.06.1.06.58-.14 1.15Z"/></svg>
              Send via WhatsApp (Instant Reply)
            </button>
            <button class="btn btn--outline" id="modal-send-email" style="width:100%;">
              <svg class="icon" viewBox="0 0 24 24"><rect x="3.6" y="5.4" width="16.8" height="13.2" rx="2"/><path d="m5 7.8 7 5.4 7-5.4"/></svg>
              Open in Email Client
            </button>
            <button class="btn btn--ghost" id="modal-copy-brief" style="color:var(--ink);border-color:var(--line-strong);width:100%;">
              <svg class="icon" viewBox="0 0 24 24"><rect x="8.2" y="8.2" width="11.6" height="11.6" rx="1.6"/><path d="M6.2 15.8H4.8a1.6 1.6 0 0 1-1.6-1.6V4.8a1.6 1.6 0 0 1 1.6-1.6h9.4a1.6 1.6 0 0 1 1.6 1.6v1.4"/></svg>
              Copy Brief to Clipboard
            </button>
          </div>
          <div id="modal-toast" style="font-size:0.85rem;color:var(--emerald);font-weight:700;text-align:center;display:none;">
            ✓ Project brief copied to clipboard!
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const closeModal = () => modal.classList.remove("is-active");
      modal.querySelector(".modal-close").addEventListener("click", closeModal);
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });
    }

    const msg = buildMessage(data);

    document.getElementById("modal-send-wa").onclick = () => {
      const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank", "noopener");
    };

    document.getElementById("modal-send-email").onclick = () => {
      const subject = encodeURIComponent(
        `Project Enquiry${data.service ? ` [${data.service}]` : ""} — ${data.name || "Client"}`
      );
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${encodeURIComponent(msg)}`;
    };

    document.getElementById("modal-copy-brief").onclick = () => {
      navigator.clipboard.writeText(msg).then(() => {
        const toast = document.getElementById("modal-toast");
        toast.style.display = "block";
        setTimeout(() => (toast.style.display = "none"), 3500);
      });
    };

    modal.classList.add("is-active");
  }

  // 3. Form Submission
  document.querySelectorAll("[data-enquire-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = getFormData(form);
      if (!data.name || !data.email) {
        form.reportValidity();
        return;
      }
      showDispatchModal(data);
    });
  });

  // Direct WhatsApp buttons
  document.querySelectorAll('[data-action="whatsapp"]').forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      const form = document.querySelector("[data-enquire-form]");
      let msg = "Hi GetKloud, I would like to explore your cloud and digital services.";
      if (form) {
        const data = getFormData(form);
        if (data.name || data.service || data.message) {
          msg = buildMessage(data);
        }
      }
      const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank", "noopener");
    });
  });

  // 4. Interactive Scope & Estimator Widget
  const estimator = document.querySelector("[data-estimator]");
  if (estimator) {
    const chips = estimator.querySelectorAll(".estimator-chip");
    const timelineEl = estimator.querySelector("[data-est-timeline]");
    const deliverablesEl = estimator.querySelector("[data-est-deliverables]");
    const stackEl = estimator.querySelector("[data-est-stack]");
    const actionBtn = estimator.querySelector("[data-est-action]");

    const recalculate = () => {
      const selected = Array.from(chips).filter((c) => c.classList.contains("is-selected"));
      let days = 7;
      let deliverables = [];
      let stacks = [];

      selected.forEach((chip) => {
        const addDays = parseInt(chip.dataset.days || "5", 10);
        days += addDays;
        if (chip.dataset.deliverable) deliverables.push(chip.dataset.deliverable);
        if (chip.dataset.stack) stacks.push(chip.dataset.stack);
      });

      if (timelineEl) {
        const weeks = Math.max(1, Math.round(days / 7));
        timelineEl.textContent = `${weeks}–${weeks + 2} Weeks`;
      }

      if (deliverablesEl) {
        deliverablesEl.textContent = deliverables.length
          ? deliverables.slice(0, 3).join(", ")
          : "Architecture roadmap & scoping consultation";
      }

      if (stackEl) {
        const uniqueStacks = [...new Set(stacks.join(", ").split(", "))].filter(Boolean);
        stackEl.textContent = uniqueStacks.length
          ? uniqueStacks.slice(0, 4).join(" · ")
          : "AWS · Azure · Cloud Security · DevOps";
      }
    };

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chip.classList.toggle("is-selected");
        recalculate();
      });
    });

    if (actionBtn) {
      actionBtn.addEventListener("click", () => {
        const selected = Array.from(chips)
          .filter((c) => c.classList.contains("is-selected"))
          .map((c) => c.textContent.trim());

        const scopeSummary = selected.length ? selected.join(", ") : "Full Cloud & Digital Assessment";
        const contactForm = document.querySelector("[data-enquire-form]");

        if (contactForm) {
          const serviceSelect = contactForm.querySelector('select[name="service"]');
          if (serviceSelect && selected.length) {
            // Select first matched option or leave general
          }
          const msgArea = contactForm.querySelector('textarea[name="message"]');
          if (msgArea) {
            msgArea.value = `Estimated requirements selected: ${scopeSummary}`;
          }
          contactForm.scrollIntoView({ behavior: "smooth" });
        } else {
          // If on a page without contact form, redirect to contact.html with prefilled scope
          window.location.href = `contact.html?scope=${encodeURIComponent(scopeSummary)}`;
        }
      });
    }

    recalculate();
  }

  // 5. Founder Clocks
  function updateFounderClocks() {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const hour12 = ((h + 11) % 12) + 1;
    const ampm = h >= 12 ? "PM" : "AM";
    const text = `${hour12}:${m} ${ampm} IST`;
    document.querySelectorAll("[data-founder-clock] time").forEach((el) => {
      el.textContent = text;
    });
  }

  updateFounderClocks();
  setInterval(updateFounderClocks, 30000);
})();
