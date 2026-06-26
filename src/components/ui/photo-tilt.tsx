"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Envuelve contenido (p. ej. un PhotoSlot/imagen) y lo inclina en 3D siguiendo
 * el cursor. Efecto moderno e interactivo. En touch no hace nada (sin hover).
 */
export function PhotoTilt({
  children,
  className,
  max = 9,
}: {
  children: React.ReactNode;
  className?: string;
  /** Inclinación máxima en grados. */
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  }
  function reset() {
    if (ref.current)
      ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        "transition-transform duration-200 ease-out [transform-style:preserve-3d] will-change-transform",
        className,
      )}
    >
      {children}
    </div>
  );
}
