const WHATSAPP_NUMBER = "573001234567";
const CONTENT_URL = "content/site.json";

const createIcon = (name) => {
  const icon = document.createElement("i");
  icon.dataset.lucide = name;
  return icon;
};

const renderServices = (services) => {
  const grid = document.querySelector("#services-grid");
  if (!grid || !services.length) return;
  grid.textContent = "";

  services.forEach((service) => {
    const col = document.createElement("article");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card service-card reveal";

    const image = document.createElement("img");
    image.className = "card-img-top";
    image.src = service.imagen || "";
    image.alt = service.nombre || "";
    image.loading = "lazy";

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h3");
    title.append(createIcon("settings"), ` ${service.nombre || ""}`);

    const description = document.createElement("p");
    description.textContent = service.descripcion || "";

    body.append(title, description);
    card.append(image, body);
    col.append(card);
    grid.append(col);
  });
};

const renderGallery = (gallery) => {
  const grid = document.querySelector("#gallery-grid");
  if (!grid || !gallery.length) return;
  grid.textContent = "";

  gallery.forEach((item) => {
    const button = document.createElement("button");
    button.className = "col gallery-item reveal";
    button.type = "button";
    button.dataset.full = item.imagen || "";
    button.setAttribute("aria-label", `Ampliar imagen: ${item.titulo || "proyecto"}`);

    const image = document.createElement("img");
    image.src = item.imagen || "";
    image.alt = item.titulo || "Proyecto de Estructuras HL";
    image.loading = "lazy";

    const overlay = document.createElement("span");
    overlay.append(createIcon("maximize-2"));

    button.append(image, overlay);
    grid.append(button);
  });
};

const loadContent = async () => {
  try {
    const response = await fetch(CONTENT_URL, { cache: "no-cache" });
    if (!response.ok) return;
    const data = await response.json();
    renderServices(Array.isArray(data.servicios) ? data.servicios : []);
    renderGallery(Array.isArray(data.galeria) ? data.galeria : []);
  } catch {
    // Sin acceso al JSON se conserva el contenido estático del HTML.
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadContent();

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const header = document.querySelector(".site-header");
  const navigation = document.querySelector(".main-nav");
  const navigationLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];

  navigationLinks.forEach((link) => link.addEventListener("click", () => {
    window.bootstrap?.Collapse.getInstance(navigation)?.hide();
  }));

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