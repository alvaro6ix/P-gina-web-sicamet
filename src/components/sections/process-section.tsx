"use client";

import { useState, type CSSProperties } from "react";
import { Search, ClipboardList, Gauge, FileCheck2, type LucideIcon } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";

type Step = {
  n: string;
  title: string;
  text: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    n: "01",
    title: "Diagnóstico",
    text: "Evaluamos tus equipos, magnitudes y requerimientos regulatorios para definir el alcance del servicio.",
    icon: Search,
  },
  {
    n: "02",
    title: "Planeación",
    text: "Diseñamos el plan de calibración o calificación con puntos críticos y trazabilidad asegurada.",
    icon: ClipboardList,
  },
  {
    n: "03",
    title: "Ejecución",
    text: "Calibramos en sitio o en laboratorio bajo ISO/IEC 17025, sin tiempo de inactividad.",
    icon: Gauge,
  },
  {
    n: "04",
    title: "Certificación",
    text: "Entregamos certificados acreditados con análisis estadístico e informe de resultados.",
    icon: FileCheck2,
  },
];

export function ProcessSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title={
            <>
              Un proceso <span className="text-accent">claro y trazable</span>
            </>
          }
          description="Metodología probada que asegura cumplimiento normativo y confianza en cada medición. Pasa el cursor por cada etapa."
        />

        {/* Flujo de nodos */}
        <div className="mt-14">
          <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
            {steps.map((s, i) => {
              const isActive = i === active;
              const Icon = s.icon;
              return (
                <div
                  key={s.n}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 0.1}s` } as CSSProperties}
                  className="flex flex-col items-stretch lg:flex-1 lg:flex-row lg:items-center"
                >
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`group relative flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-brand bg-brand text-white shadow-lg shadow-brand/20"
                        : "surface hover:border-brand/40"
                    }`}
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors ${
                        isActive ? "bg-white/15 text-white" : "bg-brand-soft text-brand"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span
                        className={`block font-mono text-xs ${
                          isActive ? "text-gold" : "text-muted"
                        }`}
                      >
                        {s.n}
                      </span>
                      <span className="block font-display text-sm font-semibold">
                        {s.title}
                      </span>
                    </span>
                  </button>

                  {/* conector animado */}
                  {i < steps.length - 1 && (
                    <div className="flex items-center justify-center py-1 lg:px-1 lg:py-0">
                      <svg viewBox="0 0 60 24" className="h-5 w-10 rotate-90 lg:rotate-0" fill="none" aria-hidden>
                        <line
                          x1="2"
                          y1="12"
                          x2="46"
                          y2="12"
                          stroke="var(--brand)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeDasharray="5 7"
                          style={{ animation: "flow-dash 0.8s linear infinite" }}
                        />
                        <path d="M44 6 l9 6 l-9 6" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Detalle de la etapa activa */}
          <div
            data-reveal
            style={{ "--reveal-delay": "0.4s" } as CSSProperties}
            className="surface mt-6 overflow-hidden rounded-3xl p-7"
          >
            <div className="flex items-start gap-4">
              <span className="font-display text-5xl font-bold text-brand/25">
                {steps[active].n}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold">
                  {steps[active].title}
                </h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted">
                  {steps[active].text}
                </p>
              </div>
            </div>
            {/* barra de progreso */}
            <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-brand transition-all duration-500"
                style={{ width: `${((active + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
