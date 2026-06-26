"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Instrument } from "@/components/metrology/instruments";

const ORBIT = ["temperature", "pressure", "mass", "humidity", "flow"];

/** Preloader: logo de SICAMET + instrumentos de metrología orbitando. */
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

      tl.from(".pl-logo", { scale: 0.9, opacity: 0, duration: 0.6, ease: "power2.out" })
        .from(
          ".pl-ring",
          { opacity: 0, duration: 0.7, ease: "power2.out", stagger: 0.1 },
          0.1,
        )
        .from(
          ".pl-instr-in",
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.09,
          },
          0.2,
        )
        .to(
          ".pl-logo",
          { scale: 1.04, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: 1 },
          0,
        )
        .to(
          counter,
          {
            v: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => setCount(Math.round(counter.v)),
          },
          0.2,
        )
        .to(".pl-content", { opacity: 0, scale: 0.96, duration: 0.4, ease: "power2.in" }, "+=0.15")
        .to(".pl-panel", { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, "-=0.2")
        .to(root.current, { autoAlpha: 0, duration: 0.01 });
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100]">
      <div className="pl-panel relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-background">
        <div className="bg-grid absolute inset-0 opacity-50" aria-hidden />

        <div className="pl-content relative flex flex-col items-center">
          {/* Escenario: logo + anillos + instrumentos orbitando */}
          <div className="relative grid h-72 w-72 place-items-center sm:h-80 sm:w-80">
            {/* anillos de calibración giratorios */}
            <span
              className="pl-ring absolute h-72 w-72 rounded-full border border-dashed border-brand/30 sm:h-80 sm:w-80"
              style={{ animation: "spin 14s linear infinite" }}
              aria-hidden
            />
            <span
              className="pl-ring absolute h-56 w-56 rounded-full border border-accent/25"
              style={{ animation: "spinRev 10s linear infinite" }}
              aria-hidden
            />

            {/* instrumentos de metrología orbitando el logo */}
            {ORBIT.map((name, i) => {
              const a = (i / ORBIT.length) * 360;
              return (
                <span
                  key={name}
                  className="pl-instr absolute left-1/2 top-1/2"
                  style={{ transform: `translate(-50%, -50%) rotate(${a}deg) translateY(-130px) rotate(${-a}deg)` }}
                  aria-hidden
                >
                  <span className="pl-instr-in grid h-12 w-12 place-items-center rounded-2xl border border-border bg-card/80 p-1.5 shadow-sm backdrop-blur">
                    <Instrument name={name} />
                  </span>
                </span>
              );
            })}

            {/* logo central */}
            <span className="pl-logo relative block">
              <Image
                src="/sicamet-light.webp"
                alt="SICAMET — Sistemas Integrales de Calibración y Aseguramiento Metrológico"
                width={520}
                height={520}
                quality={100}
                priority
                className="block h-24 w-auto sm:h-28 dark:hidden"
              />
              <Image
                src="/sicamet-dark.webp"
                alt="SICAMET"
                width={520}
                height={520}
                quality={100}
                priority
                className="hidden h-24 w-auto sm:h-28 dark:block"
              />
            </span>
          </div>

          {/* Barra de carga + porcentaje */}
          <div className="mt-8 h-1 w-52 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-75"
              style={{ width: `${count}%` }}
            />
          </div>
          <div className="mt-3 font-mono text-sm text-muted">
            Calibrando experiencia · {count}
            <span className="text-accent">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
