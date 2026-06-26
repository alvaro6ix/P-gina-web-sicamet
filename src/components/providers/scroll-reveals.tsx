"use client";

import { useEffect } from "react";

/**
 * Activa la animación de entrada en CUALQUIER elemento con `data-reveal`,
 * re-disparándose al volver a entrar al viewport (estilo Apple).
 *
 * Usa UN SOLO observer persistente (este provider vive en el layout y no se
 * desmonta al navegar) + un MutationObserver que detecta el contenido de cada
 * página nueva. Así no se recrea el observer al cambiar de ruta —lo que dejaba
 * secciones sin mostrar hasta recargar.
 */
export function ScrollReveals() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Atributo (no clase): React no lo controla, así sobrevive a los
          // re-renders (p. ej. al hacer clic en un botón con data-reveal).
          (e.target as HTMLElement).toggleAttribute("data-in", e.isIntersecting);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-bound])")
        .forEach((el) => {
          el.dataset.revealBound = "1";
          io.observe(el);
        });
    };

    let raf = 0;
    const scheduleScan = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    };

    scan();
    // Detecta el contenido que aparece después (navegación, paneles, listas…).
    const mo = new MutationObserver(scheduleScan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
