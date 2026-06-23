"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/** Preloader: logo de SICAMET (transparente, claro/oscuro) + barra de carga. */
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

      // Entrada suave del logo + respiración mientras carga.
      tl.from(".pl-logo", {
        scale: 0.92,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          ".pl-logo",
          {
            scale: 1.04,
            duration: 1.1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          },
          0,
        )
        .to(
          counter,
          {
            v: 100,
            duration: 1.9,
            ease: "power2.inOut",
            onUpdate: () => setCount(Math.round(counter.v)),
          },
          0,
        )
        .to(
          ".pl-content",
          { opacity: 0, duration: 0.4, ease: "power2.in" },
          "+=0.15",
        )
        .to(
          ".pl-panel",
          { yPercent: -100, duration: 0.7, ease: "power4.inOut" },
          "-=0.2",
        )
        .to(root.current, { autoAlpha: 0, duration: 0.01 });
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100]">
      <div className="pl-panel relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-background">
        <div className="pl-content flex flex-col items-center">
          {/* Logo transparente, swap claro/oscuro (como el footer) — grande */}
          <span className="pl-logo block">
            <Image
              src="/sicamet-light.webp"
              alt="SICAMET — Sistemas Integrales de Calibración y Aseguramiento Metrológico"
              width={520}
              height={520}
              quality={100}
              priority
              className="block h-32 w-auto sm:h-44 dark:hidden"
            />
            <Image
              src="/sicamet-dark.webp"
              alt="SICAMET"
              width={520}
              height={520}
              quality={100}
              priority
              className="hidden h-32 w-auto sm:h-44 dark:block"
            />
          </span>

          {/* Barra de carga + porcentaje */}
          <div className="mt-10 h-1 w-48 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-75"
              style={{ width: `${count}%` }}
            />
          </div>
          <div className="mt-3 font-mono text-sm text-muted">
            {count}
            <span className="text-gold-ink">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
