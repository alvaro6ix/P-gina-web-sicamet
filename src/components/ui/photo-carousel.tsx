"use client";

import { useEffect, useState, type CSSProperties } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  FlaskConical,
  Microscope,
  Users,
  GraduationCap,
  FileCheck2,
  type LucideIcon,
} from "lucide-react";
import { PhotoSlot } from "@/components/ui/photo-slot";
import { unsplashImg } from "@/lib/sim-image";

type Slide = { label: string; icon: LucideIcon; src: string };

const SLIDES: Slide[] = [
  { label: "Recepción e instalaciones", icon: Building2, src: unsplashImg("photo-1605781645799-c9c7d820b4ac", 900, 620) },
  { label: "Área de calibración In-Lab", icon: FlaskConical, src: unsplashImg("photo-1581594549595-35f6edc7b762", 900, 620) },
  { label: "Equipos y patrones de referencia", icon: Microscope, src: unsplashImg("photo-1691934286173-d366705baa83", 900, 620) },
  { label: "Sala de capacitación", icon: GraduationCap, src: unsplashImg("photo-1581093577421-f561a654a353", 900, 620) },
  { label: "Nuestro equipo de trabajo", icon: Users, src: unsplashImg("photo-1732690233982-1d4567384ea1", 900, 620) },
  { label: "Trazabilidad y certificados", icon: FileCheck2, src: unsplashImg("photo-1536905379701-c8aba0076deb", 900, 620) },
];

/** Carrusel coverflow 3D: gira solo, se pausa al pasar el cursor y reanuda al salir. */
export function PhotoCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = SLIDES.length;
  const go = (d: number) => setActive((p) => (p + d + n) % n);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((p) => (p + 1) % n), 2800);
    return () => clearInterval(id);
  }, [paused, n]);

  const offset = (idx: number) => {
    let d = idx - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative mx-auto h-60 w-full max-w-2xl sm:h-72"
        style={{ perspective: "1400px" }}
      >
        {SLIDES.map((s, idx) => {
          const d = offset(idx);
          const abs = Math.abs(d);
          const hidden = abs >= 2; // solo centro + 1 vecino a cada lado
          const style: CSSProperties = {
            transform: `translate(-50%, -50%) translateX(${d * 60}%) rotateY(${-d * 34}deg) scale(${Math.max(0.55, 1 - abs * 0.18)})`,
            zIndex: 20 - abs,
            opacity: hidden ? 0 : 1,
            filter: d === 0 ? "none" : "brightness(0.66) saturate(0.9)",
            // las ocultas (que dan la vuelta) NO animan posición → sin salto.
            transition: hidden
              ? "opacity .4s ease"
              : "transform .6s cubic-bezier(.22,1,.36,1), opacity .5s ease, filter .5s ease",
            cursor: d === 0 ? "default" : "pointer",
            pointerEvents: hidden ? "none" : "auto",
          };
          return (
            <div
              key={s.label}
              onClick={() => d !== 0 && setActive(idx)}
              className="absolute left-1/2 top-1/2 h-[90%] w-[66%] sm:w-[58%]"
              style={style}
            >
              <PhotoSlot
                label={s.label}
                icon={s.icon}
                src={s.src}
                className="h-full shadow-2xl"
              />
            </div>
          );
        })}

        {/* flechas */}
        <button
          type="button"
          aria-label="Anterior"
          onClick={() => go(-1)}
          className="absolute left-1 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur transition-colors hover:text-accent sm:left-3"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          onClick={() => go(1)}
          className="absolute right-1 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur transition-colors hover:text-accent sm:right-3"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* puntos */}
      <div className="mt-6 flex justify-center gap-2">
        {SLIDES.map((s, idx) => (
          <button
            key={s.label}
            type="button"
            aria-label={`Ir a ${s.label}`}
            onClick={() => setActive(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === active ? "w-7 bg-accent" : "w-2 bg-border hover:bg-accent/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
