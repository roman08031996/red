/* =====================================================
   RED URBANA — script.js
   Interacciones: navbar al hacer scroll, año dinámico
   en el footer y animaciones de aparición al hacer scroll.
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---- Año dinámico en el footer ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Navbar: cambia de estilo al hacer scroll ---- */
  const navbar = document.getElementById("mainNavbar");
  const toggleNavbarStyle = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  };
  toggleNavbarStyle();
  window.addEventListener("scroll", toggleNavbarStyle, { passive: true });

  /* ---- Cierra el menú móvil al elegir una opción ---- */
  const navLinks = document.querySelectorAll("#navMenu .nav-link");
  const navMenu = document.getElementById("navMenu");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        bsCollapse.hide();
      }
    });
  });

  /* ---- Animaciones de aparición al hacer scroll ---- */
  const revealElements = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window && revealElements.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: si no hay soporte, se muestran directamente
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }


  /* ---- Contador de vistas discreto (junto al copyright) ----
     Usa CountAPI (countapi.xyz), un servicio externo gratuito para
     contar visitas en sitios estaticos sin backend propio.
     Se registra la visita al cargar la pagina (en silencio) y el
     numero solo se muestra al tocar el icono del ojo. */
  const NAMESPACE = "redurbana-sanluis";
  const KEY = "vistas-sitio";
  const viewsToggle = document.getElementById("viewsToggle");
  const viewsCount = document.getElementById("viewsCount");
  let viewsValue = null;

  if (viewsToggle && viewsCount) {
    fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`)
      .then((res) => res.json())
      .then((data) => { viewsValue = data.value; })
      .catch(() => { viewsValue = null; });

    viewsToggle.addEventListener("click", () => {
      const isVisible = viewsCount.classList.toggle("is-visible");
      if (isVisible) {
        viewsCount.textContent = viewsValue !== null ? viewsValue : "...";
      }
    });
  }

});
