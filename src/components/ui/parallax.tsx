"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Mueve su contenido a distinta velocidad que el scroll → sensación de
 * profundidad (parallax). Ideal para fondos decorativos. `speed` en % de la
 * altura del elemento (positivo = baja más lento). Respeta reduced-motion.
 */
export function Parallax({
  children,
  className,
  speed = 16,
  ariaHidden,
}: {
  children?: React.ReactNode;
  className?: string;
  speed?: number;
  ariaHidden?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(ref.current, {
        yPercent: speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref, dependencies: [speed] },
  );

  return (
    <div ref={ref} className={className} aria-hidden={ariaHidden}>
      {children}
    </div>
  );
}
