import Link from "next/link";
import { accreditations } from "@/lib/content";
import { Container, SectionHeading } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Instrument } from "@/components/metrology/instruments";

export function AccreditationsSection() {
  return (
    <section id="acreditaciones" className="relative overflow-hidden py-24">
      <div className="bg-grid absolute inset-0 opacity-50" aria-hidden />
      <Container className="relative">
        <SectionHeading
          eyebrow="Acreditaciones EMA"
          title={<>12 magnitudes acreditadas</>}
          description="Competencia técnica reconocida por la Entidad Mexicana de Acreditación (ema, a.c.) con validez internacional a través de ILAC."
        />

        <Reveal
          stagger
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {accreditations.map((a) => (
            <div
              key={a.code}
              className="surface group relative flex flex-col rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50"
            >
              <div className="flex items-start justify-between">
                <div className="h-16 w-16 transition-transform duration-500 group-hover:scale-110">
                  <Instrument name={a.instrument} />
                </div>
                <span className="rounded-full border border-border bg-card-soft px-2 py-0.5 font-mono text-xs font-semibold text-muted">
                  {a.code}
                </span>
              </div>
              <h3 className="mt-3 font-display text-base font-semibold">
                {a.magnitude}
              </h3>
              <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted">
                {a.scope}
              </p>
            </div>
          ))}
        </Reveal>

        <div className="mt-10 text-center">
          <Link
            href="/acreditaciones"
            className="text-sm font-medium text-brand hover:underline"
          >
            Ver alcances y descargar acreditaciones →
          </Link>
        </div>
      </Container>
    </section>
  );
}
