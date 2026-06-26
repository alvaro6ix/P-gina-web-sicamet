"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Detecta cuando un elemento entra al viewport (IntersectionObserver).
 * Fiable en móvil/touch (a diferencia de ScrollTrigger + Lenis).
 * El contenido es visible por defecto si JS falla.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
  /** Si es true, anima una sola vez. Por defecto se repite al re-entrar. */
  once = false,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // Sin soporte: mostrar el contenido (diferido para no encadenar renders).
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        // Alterna entrada/salida → la animación se vuelve a reproducir al
        // regresar al viewport (estilo Apple). Con `once` se queda fija.
        setInView(visible);
        if (visible && once) io.disconnect();
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px", ...options },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options, once]);

  return { ref, inView };
}
