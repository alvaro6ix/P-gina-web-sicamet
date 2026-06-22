"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const WORD = "SICAMET".split("");

/** Preloader de metrología: medidor que se calibra + fondo en movimiento. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) {
        setDone(true);
        return;
      }

      const counter = { v: 0 };
      const tl = gsap.timeline({ onComplete: () => setDone(true) });

      tl.to(counter, {
        v: 100,
        duration: 1.9,
        ease: "power2.inOut",
        onUpdate: () => setCount(Math.round(counter.v)),
      })
        .to(".pl-needle", { rotate: 140, duration: 1.9, ease: "power2.inOut", transformOrigin: "50% 100%" }, 0)
        .to(".pl-content", { scale: 1.05, opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.2")
        .to(".pl-panel", { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, "-=0.2")
        .to(root.current, { autoAlpha: 0, duration: 0.01 });
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100]">
      <div className="pl-panel relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-background">
        {/* fondo en movimiento */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            animation: "wave-shift 6s linear infinite",
          }}
          aria-hidden
        />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[100px]" aria-hidden />

        <div className="pl-content relative flex flex-col items-center">
          {/* medidor que se calibra (con órbitas en movimiento) */}
          <svg viewBox="0 0 120 120" className="h-32 w-32">
            {/* anillo exterior girando */}
            <circle cx="60" cy="60" r="54" fill="none" stroke="var(--border)" strokeWidth="2" strokeDasharray="3 6" className="animate-spin-slow" style={{ transformOrigin: "60px 60px" }} />
            {/* anillo interior contrarrotando */}
            <circle cx="60" cy="60" r="46" fill="none" stroke="var(--brand)" strokeWidth="1.5" strokeDasharray="20 14" opacity="0.5" className="animate-spin-rev" style={{ transformOrigin: "60px 60px" }} />
            {/* dot que orbita */}
            <g className="animate-spin-slow" style={{ transformOrigin: "60px 60px" }}>
              <circle cx="60" cy="6" r="3.5" fill="var(--gold)" />
            </g>
            <g className="animate-spin-rev" style={{ transformOrigin: "60px 60px" }}>
              <circle cx="60" cy="14" r="2.5" fill="var(--brand)" />
            </g>
            {/* marcas de escala */}
            {Array.from({ length: 12 }).map((_, i) => {
              const a = ((-120 + (i * 240) / 11) * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={60 + Math.cos(a) * 34}
                  y1={60 + Math.sin(a) * 34}
                  x2={60 + Math.cos(a) * 42}
                  y2={60 + Math.sin(a) * 42}
                  stroke={i % 3 === 0 ? "var(--brand)" : "var(--muted)"}
                  strokeWidth={i % 3 === 0 ? 2.5 : 1.2}
                />
              );
            })}
            {/* aguja que barre (GSAP) */}
            <g className="pl-needle" style={{ transform: "rotate(-120deg)", transformOrigin: "60px 60px" }}>
              <line x1="60" y1="60" x2="60" y2="30" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" />
            </g>
            <circle cx="60" cy="60" r="6" fill="var(--brand)" />
            <circle cx="60" cy="60" r="3" fill="var(--gold)" />
          </svg>

          {/* wordmark con pulso por letra */}
          <div className="mt-6 font-display text-2xl font-bold tracking-[0.15em]">
            {WORD.map((c, i) => (
              <span key={i} className="pl-letter" style={{ animationDelay: `${i * 0.1}s` }}>
                {c}
              </span>
            ))}
          </div>
          <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-muted">
            Calibrando precisión
          </p>

          {/* barra + porcentaje */}
          <div className="mt-7 h-1 w-56 overflow-hidden rounded-full bg-border">
            <div className="h-full rounded-full bg-brand transition-[width] duration-75" style={{ width: `${count}%` }} />
          </div>
          <div className="mt-3 font-mono text-sm text-muted">
            {count}<span className="text-gold-ink">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
