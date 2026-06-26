"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ImageIcon } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TILES = Array.from({ length: 6 }); // 3 columnas × 2 filas
const LAB_IMG =
  "https://images.unsplash.com/photo-1602052577122-f73b9710adba?auto=format&fit=crop&w=1200&h=750&q=70";

/**
 * Showcase del laboratorio: una foto que se ENSAMBLA desde piezas dispersas a
 * medida que haces scroll (estilo Apple). Las piezas vuelan a su posición y se
 * forma el marco completo; al final aparece la etiqueta del placeholder.
 */
export function LabShowcase() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tiles = gsap.utils.toArray<HTMLElement>(".pa-tile");
      tiles.forEach((t, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        gsap.fromTo(
          t,
          {
            xPercent: (col - 1) * 150,
            yPercent: (row === 0 ? -1 : 1) * 130,
            rotate: (col - 1) * 14,
            scale: 0.6,
            autoAlpha: 0,
          },
          {
            xPercent: 0,
            yPercent: 0,
            rotate: 0,
            scale: 1,
            autoAlpha: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 78%",
              end: "center 58%",
              scrub: 0.6,
            },
          },
        );
      });

      gsap.fromTo(
        ".pa-label",
        { autoAlpha: 0, scale: 0.9, y: 10 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.current,
            start: "center 66%",
            end: "center 52%",
            scrub: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Nuestro laboratorio"
          title={
            <>
              Donde la <span className="text-accent">precisión</span> toma forma
            </>
          }
          description="Instalaciones, equipos y patrones que respaldan cada medición. Haz scroll y míralo armarse."
        />

        <div
          ref={root}
          className="relative mx-auto mt-14 aspect-[16/10] w-full max-w-3xl"
        >
          {/* glow detrás */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-[2.5rem] bg-accent/10 blur-[90px]"
            aria-hidden
          />
          <div className="grid h-full w-full grid-cols-3 grid-rows-2 gap-2">
            {TILES.map((_, i) => {
              const col = i % 3;
              const row = Math.floor(i / 3);
              return (
                <div
                  key={i}
                  className="pa-tile overflow-hidden rounded-2xl border border-border bg-card-soft bg-no-repeat shadow-sm"
                  style={{
                    backgroundImage: `url(${LAB_IMG})`,
                    backgroundSize: "300% 200%",
                    backgroundPosition: `${col * 50}% ${row * 100}%`,
                  }}
                />
              );
            })}
          </div>

          {/* sello de simulación (aparece al ensamblarse) */}
          <div className="pa-label pointer-events-none absolute bottom-3 left-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
              <ImageIcon className="h-4 w-4" /> Simulación · foto del laboratorio
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
