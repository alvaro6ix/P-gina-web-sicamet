"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FancyButton } from "@/components/ui/fancy-button";
import { site } from "@/lib/content";
import { HeroVisual } from "./hero-visual";

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
        .from(".hero-stat", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.3")
        .from(".hero-visual", { scale: 0.8, opacity: 0, duration: 1.1, ease: "power2.out" }, "-=1");
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
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
        <div>
          <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium backdrop-blur">
            <BadgeCheck className="h-4 w-4 text-success" />
            Acreditado ISO/IEC 17025:2017 · {site.yearsExperience} años
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span className="hero-line block">Metrología que</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block text-gradient">mide la confianza</span>
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

