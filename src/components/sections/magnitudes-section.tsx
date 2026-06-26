import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FileCheck2 } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";
import { Instrument } from "@/components/metrology/instruments";

const nodes = [
  { key: "temperature", name: "Temperatura" },
  { key: "pressure", name: "Presión" },
  { key: "mass", name: "Masa" },
  { key: "humidity", name: "Humedad" },
  { key: "flow", name: "Flujo" },
  { key: "electrical", name: "Eléctrica" },
];

/** Conector con flujo animado (horizontal en desktop, vertical en móvil). */
function FlowConnector({ delay = 0 }: { delay?: number }) {
  return (
    <div
      data-reveal
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
      className="flex items-center justify-center lg:py-0 py-1"
    >
      <svg
        viewBox="0 0 80 24"
        className="h-6 w-16 rotate-90 lg:rotate-0"
        fill="none"
        aria-hidden
      >
        <line
          x1="2"
          y1="12"
          x2="66"
          y2="12"
          stroke="var(--brand)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 8"
          style={{ animation: "flow-dash 0.8s linear infinite" }}
        />
        <path
          d="M64 5 l10 7 l-10 7"
          stroke="var(--gold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function MagnitudesSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
      <Container className="relative">
        <SectionHeading
          eyebrow="Trazabilidad"
          title={
            <>
              De la magnitud al <span className="text-accent">certificado</span>
            </>
          }
          description="Cada instrumento sigue una cadena de trazabilidad acreditada: lo medimos, lo calibramos bajo ISO/IEC 17025 y emitimos un certificado con validez internacional."
        />

        <div className="mt-14 grid items-stretch gap-3 lg:grid-cols-[minmax(0,1.5fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
          {/* ETAPA 1 — Magnitudes (instrumentos animados) */}
          <div data-reveal className="surface rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              1 · Magnitudes
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {nodes.map((n) => (
                <div
                  key={n.key}
                  className="group flex flex-col items-center rounded-2xl border border-border bg-card-soft p-2 text-center"
                >
                  <div className="h-14 w-14 transition-transform duration-500 group-hover:scale-110">
                    <Instrument name={n.key} />
                  </div>
                  <span className="mt-1 text-[10px] font-medium text-muted">
                    {n.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-muted">
              + Dimensional, Fuerza, Óptica, Volumen…
            </p>
          </div>

          <FlowConnector delay={0.12} />

          {/* ETAPA 2 — Calibración acreditada (hub) */}
          <div
            data-reveal
            style={{ "--reveal-delay": "0.24s" } as CSSProperties}
            className="surface relative flex flex-col items-center justify-center rounded-3xl p-6 text-center"
          >
            <div className="relative grid h-20 w-20 place-items-center">
              <span
                className="absolute inset-0 rounded-full border-2 border-dashed border-brand/40"
                style={{ animation: "spin 14s linear infinite" }}
              />
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white">
                <ShieldCheck className="h-6 w-6" />
              </span>
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              2 · Calibración
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold">
              Acreditada ISO/IEC 17025
            </h3>
            <p className="mt-1 text-xs text-muted">
              Trazabilidad a patrones nacionales · ema, a.c.
            </p>
          </div>

          <FlowConnector delay={0.36} />

          {/* ETAPA 3 — Certificado */}
          <Link
            href="/certificados"
            data-reveal
            style={{ "--reveal-delay": "0.48s" } as CSSProperties}
            className="surface group flex flex-col items-center justify-center rounded-3xl p-6 text-center transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-gold text-[#1a1400]">
              <FileCheck2 className="h-6 w-6" />
            </span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-ink">
              3 · Certificado
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold">
              Trazable y descargable
            </h3>
            <p className="mt-1 text-xs text-muted">
              Consulta tu certificado en el portal en línea.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand">
              Ver portal <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/acreditaciones"
            className="text-sm font-medium text-brand hover:underline"
          >
            Ver las 12 magnitudes acreditadas →
          </Link>
        </div>
      </Container>
    </section>
  );
}
