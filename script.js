/* =================================================================
   Diego Cerro — interacciones
   Vanilla JS, sin dependencias. Movimiento con propósito, no relleno.
   ================================================================= */
(() => {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Tema claro/oscuro (recuerda preferencia) ---------- */
  const root = document.documentElement;
  const stored = localStorage.getItem("dc-theme");
  if (stored) {
    root.dataset.theme = stored;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.dataset.theme = "dark";
  }
  const themeToggle = document.getElementById("themeToggle");
  themeToggle?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("dc-theme", next);
  });

  /* ---------- Nav: estado al hacer scroll ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    nav?.classList.toggle("scrolled", window.scrollY > 24);
    // barra de progreso
    const bar = document.getElementById("progressBar");
    if (bar) {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menú móvil ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");
  const closeMenu = () => {
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  };
  menuToggle?.addEventListener("click", () => {
    const open = navLinks?.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(!!open));
  });
  navLinks?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---------- Reveal al entrar en viewport ---------- */
  const reveals = document.querySelectorAll("[data-reveal]");
  if (prefersReduced) {
    reveals.forEach((el) => el.classList.add("in"));
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // pequeño escalonado para grupos cercanos
            const delay = Math.min(i * 60, 180);
            setTimeout(() => entry.target.classList.add("in"), delay);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Botones magnéticos ---------- */
  if (!prefersReduced && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".magnetic").forEach((el) => {
      const strength = 14;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
        const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------- Año en el footer ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Saludo para quien inspecciona ---------- */
  console.log(
    "%c👋 ¿Curioseando el código?%c\nMe gusta tu estilo. Hablemos: %cdiegocerro04@gmail.com",
    "font-size:15px;font-weight:700;color:#d94f24",
    "font-size:13px;color:#5b554b",
    "font-size:13px;font-weight:600;color:#1d6b62"
  );
})();
