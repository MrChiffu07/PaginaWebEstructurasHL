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
    image.decoding = "async";

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
    button.dataset.category = item.categoria || "otros";
    button.setAttribute("aria-label", `Ampliar imagen: ${item.titulo || "proyecto"}`);

    const image = document.createElement("img");
    image.src = item.imagen || "";
    image.alt = item.titulo || "Proyecto de Estructuras HL";
    image.loading = "lazy";
    image.decoding = "async";

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
  const lightboxCounter = document.querySelector("#lightbox-counter");
  const galleryItems = [...document.querySelectorAll(".gallery-item")];
  let visibleItems = [...galleryItems];
  let currentIndex = 0;

  const showImage = (index) => {
    if (!visibleItems.length) return;
    currentIndex = (index + visibleItems.length) % visibleItems.length;
    const item = visibleItems[currentIndex];
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector("img").alt;
    lightboxCounter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;
    lightbox.querySelectorAll(".lightbox-nav").forEach((button) => {
      button.hidden = visibleItems.length < 2;
    });
  };

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      showImage(visibleItems.indexOf(item));
      lightbox.showModal();
    });
  });

  lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showImage(currentIndex - 1));
  lightbox.querySelector(".lightbox-next").addEventListener("click", () => showImage(currentIndex + 1));

  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    if (event.key === "ArrowRight") showImage(currentIndex + 1);
  });

  let touchStartX = null;
  lightbox.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 45) showImage(currentIndex + (deltaX < 0 ? 1 : -1));
    touchStartX = null;
  }, { passive: true });

  const galleryEmpty = document.querySelector("#gallery-empty");
  const filterChips = [...document.querySelectorAll("#gallery-filters .filter-chip")];

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;
      filterChips.forEach((other) => other.classList.toggle("is-active", other === chip));

      visibleItems = galleryItems.filter((item) => filter === "todos" || item.dataset.category === filter);
      galleryItems.forEach((item) => item.classList.toggle("is-hidden", !visibleItems.includes(item)));
      galleryEmpty.hidden = visibleItems.length > 0;
    });
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });

  document.querySelector("#show-all").addEventListener("click", () => {
    visibleItems[0]?.click();
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
    quoteForm.reset();
  });

  const floatingBadge = document.querySelector(".floating-badge");
  setTimeout(() => floatingBadge?.classList.add("is-visible"), 1600);

  document.querySelector("#year").textContent = new Date().getFullYear();
});