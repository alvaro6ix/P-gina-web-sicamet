"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FancyButton } from "@/components/ui/fancy-button";
import { VaisalaLogo } from "@/components/layout/logo";
import { site } from "@/lib/content";
import { HeroVisual } from "./hero-visual";
import { HeroBackdrop } from "./hero-backdrop";

/**
 * Fondo multimedia del hero. Está LISTO para una imagen o un video:
 * solo pon aquí la ruta (en /public) y el tipo; el velo de legibilidad
 * se aplica solo. Déjalo en `null` para mantener el fondo actual (retícula).
 *   Ejemplo imagen:  { type: "image", src: "/hero/lab.webp" }
 *   Ejemplo video:   { type: "video", src: "/hero/lab.mp4" }
 */
const HERO_MEDIA: { type: "image" | "video"; src: string } | null = null;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });
      tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.7 })
        .from(
          ".hero-line",
          { yPercent: 120, opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.3",
        )
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from(".hero-stat", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.3");

      // Disolución al hacer scroll (estilo Apple): el texto sube y se desvanece,
      // el visual hace un parallax más lento. Se omite con reduced-motion.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) {
        gsap.to(".hero-content", {
          yPercent: -14,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "75% top",
            scrub: true,
          },
        });
        gsap.to(".hero-visual", {
          yPercent: 16,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      {/* Fondo: slideshow de imágenes de simulación (detrás de todo) */}
      <HeroBackdrop />

      {/* Capa de fondo multimedia (imagen/video) — solo aparece si HERO_MEDIA
          está definido; incluye un velo para que el texto siga legible. */}
      {HERO_MEDIA && (
        <div className="absolute inset-0" aria-hidden>
          {HERO_MEDIA.type === "video" ? (
            <video
              className="h-full w-full object-cover"
              src={HERO_MEDIA.src}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <Image
              src={HERO_MEDIA.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-background/82 backdrop-blur-[2px]" />
        </div>
      )}

      {/* Fondos (aislados en su capa para no repintar al hacer scroll) */}
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div
        className="absolute -top-24 left-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/15 blur-[70px]"
        style={{ willChange: "transform" }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gold/12 blur-[70px]"
        style={{ willChange: "transform" }}
        aria-hidden
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Texto */}
        <div className="hero-content">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium backdrop-blur">
              <BadgeCheck className="h-4 w-4 text-success" />
              Acreditado ISO/IEC 17025:2017 · {site.yearsExperience} años
            </div>
            {/* Sello de partnership oficial — presencia de marca Vaisala */}
            <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft/40 px-3.5 py-1.5 text-xs font-medium backdrop-blur">
              <span className="text-accent">Service Partner oficial</span>
              <span className="h-3.5 w-px bg-accent/30" />
              <VaisalaLogo height={15} />
            </div>
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span className="hero-line block">Metrología que</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block text-accent">mide la confianza</span>
            </span>
          </h1>

          <p className="hero-sub mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Calibración y calificación acreditada, en sitio y en laboratorio.
            Trazabilidad garantizada para los sectores industrial, farmacéutico y
            médico. Único partner de Vaisala en México.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="hero-cta">
              <FancyButton
                href="/contacto"
                label="Cotizar"
                labelHover="¡Vamos!"
              />
            </span>
            <span className="hero-cta">
              <FancyButton href="/servicios" label="Ver servicios" variant="outline" />
            </span>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {[
              { v: "12", l: "Acreditaciones EMA" },
              { v: `${site.yearsExperience}+`, l: "Años de experiencia" },
              { v: "100%", l: "Trazabilidad" },
            ].map((s) => (
              <div key={s.l} className="hero-stat">
                <dt className="font-display text-3xl font-bold text-gradient">
                  {s.v}
                </dt>
                <dd className="mt-1 text-xs text-muted">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual: panel de instrumentos interactivo */}
        <div className="hero-visual relative mx-auto aspect-square w-full max-w-md">
          <HeroVisual />
        </div>
      </Container>

      {/* Indicador de scroll */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted lg:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-brand" />
      </div>
    </section>
  );
}

