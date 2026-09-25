const WHATSAPP_NUMBER = "573001234567";

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const navigationLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];

  const closeMenu = () => {
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    menuButton.innerHTML = '<i data-lucide="menu"></i>';
    window.lucide?.createIcons();
  };

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    menuButton.innerHTML = `<i data-lucide="${isOpen ? "x" : "menu"}"></i>`;
    window.lucide?.createIcons();
  });

  navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

  const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const observedSections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55%", threshold: 0 });

  observedSections.forEach((section) => sectionObserver.observe(section));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    revealObserver.observe(element);
  });

  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = lightbox.querySelector("img");

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      lightboxImage.src = item.dataset.full;
      lightboxImage.alt = item.querySelector("img").alt;
      lightbox.showModal();
    });
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });

  document.querySelector("#show-all").addEventListener("click", () => {
    document.querySelector(".gallery-item").click();
  });

  const quoteForm = document.querySelector("#quote-form");
  const formStatus = document.querySelector("#form-status");

  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;

    const name = document.querySelector("#name").value.trim();
    const service = document.querySelector("#service").value;
    const description = document.querySelector("#description").value.trim();
    const message = [
      "Hola, Estructuras HL. Quiero solicitar una cotización.",
      `Nombre: ${name}`,
      `Servicio: ${service}`,
      description ? `Descripción: ${description}` : ""
    ].filter(Boolean).join("\n");

    formStatus.textContent = "Abriendo WhatsApp para enviar tu solicitud...";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });

  document.querySelector("#year").textContent = new Date().getFullYear();
});