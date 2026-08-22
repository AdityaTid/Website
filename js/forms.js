(function () {
  const EMAIL = "info@getkloud.in";
  const WHATSAPP = "918421174747";

  function buildMessage(data) {
    return [
      "Hello GetKloud,",
      "",
      `Name: ${data.name || "-"}`,
      `Email: ${data.email || "-"}`,
      `Phone: ${data.phone || "-"}`,
      `Service: ${data.service || "-"}`,
      "",
      data.message || "",
    ].join("\n");
  }

  function getFormData(form) {
    const fd = new FormData(form);
    return {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      service: String(fd.get("service") || "").trim(),
      message: String(fd.get("message") || "").trim(),
    };
  }

  document.querySelectorAll("[data-enquire-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = getFormData(form);
      if (!data.name || !data.email) {
        form.reportValidity();
        return;
      }
      const subject = encodeURIComponent(
        `Enquiry${data.service ? ` — ${data.service}` : ""} — GetKloud`
      );
      const body = encodeURIComponent(buildMessage(data));
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    });
  });

  document.querySelectorAll('[data-action="whatsapp"]').forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      const form = document.querySelector("[data-enquire-form]");
      let text = el.dataset.message || "Hi GetKloud, I would like to know more about your services.";
      if (form) {
        const data = getFormData(form);
        if (data.name || data.service || data.message) {
          text = buildMessage(data);
        }
      }
      const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener");
    });
  });

  function formatFounderTime(date) {
    let h = date.getHours();
    const m = date.getMinutes().toString().padStart(2, "0");
    const hour12 = ((h + 11) % 12) + 1;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour12}:${m}${ampm}`;
  }

  function updateFounderClocks() {
    const now = new Date();
    const text = formatFounderTime(now);
    const iso = now.toISOString();
    document.querySelectorAll("[data-founder-clock] time").forEach((el) => {
      el.textContent = text;
      el.dateTime = iso;
    });
  }

  updateFounderClocks();
  setInterval(updateFounderClocks, 30000);

  document.querySelectorAll("[data-copy-email]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const email = btn.dataset.copyEmail || EMAIL;
      const label = btn.querySelector("[data-copy-label]");
      try {
        await navigator.clipboard.writeText(email);
        if (label) label.textContent = "Copied";
        btn.classList.add("is-copied");
        setTimeout(() => {
          if (label) label.textContent = "Copy Email";
          btn.classList.remove("is-copied");
        }, 1500);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  });
})();
