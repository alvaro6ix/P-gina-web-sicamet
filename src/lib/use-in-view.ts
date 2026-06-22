"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Detecta cuando un elemento entra al viewport (IntersectionObserver).
 * Fiable en móvil/touch (a diferencia de ScrollTrigger + Lenis).
 * El contenido es visible por defecto si JS falla.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px", ...options },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options]);

  return { ref, inView };
}
