import type { Metadata } from "next";
import { Eye, ShieldCheck } from "lucide-react";
import { accreditations } from "@/lib/content";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Instrument } from "@/components/metrology/instruments";
import { FancyButton } from "@/components/ui/fancy-button";
import { VaisalaSection } from "@/components/sections/vaisala-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Acreditaciones",
  description:
    "12 magnitudes acreditadas por ema, a.c. con reconocimiento internacional ILAC: temperatura, presión, masa, humedad, flujo, dimensional, eléctrica y más.",
  alternates: { canonical: "/acreditaciones" },
};

export default function AcreditacionesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Acreditaciones", href: "/acreditaciones" },
        ]}
      />
      <PageHero
        eyebrow="Competencia técnica"
        title={
          <>
            <span className="text-accent">12</span> magnitudes acreditadas por
            ema, a.c.
          </>
        }
        description="La acreditación reconoce la competencia técnica y confiabilidad de nuestro laboratorio, con validez internacional a través de los acuerdos de reconocimiento mutuo de ILAC."
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Acreditaciones", href: "/acreditaciones" },
        ]}
      />

      <VaisalaSection />

      <section className="py-10">
        <Container>
          <Reveal
            stagger
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {accreditations.map((a) => (
              <div
                key={a.code}
                className="group flex flex-col rounded-3xl border border-border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl hover:shadow-brand/5"
              >
                <div className="flex items-start justify-between">
                  <div className="h-20 w-20 transition-transform duration-500 group-hover:scale-110">
                    <Instrument name={a.instrument} />
                  </div>
                  <span className="rounded-full border border-border bg-card-soft px-3 py-1 font-mono text-xs font-semibold text-muted">
                    {a.code}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-xl font-semibold">
                  {a.magnitude}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {a.scope}
                </p>
                <a
                  href={a.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-gold-ink"
                >
                  <Eye className="h-4 w-4" />
                  Ver acreditación
                </a>
              </div>
            ))}
          </Reveal>

          <div
            data-reveal
            className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-border bg-card/40 p-8 text-center sm:flex-row sm:justify-between sm:text-left"
          >
            <div className="flex items-center gap-4">
              <ShieldCheck className="h-10 w-10 shrink-0 text-brand" />
              <div>
                <h3 className="font-display text-lg font-semibold">
                  Verifica nuestra información vigente
                </h3>
                <p className="text-sm text-muted">
                  Consulta el catálogo oficial de la Entidad Mexicana de
                  Acreditación.
                </p>
              </div>
            </div>
            <FancyButton
              href="https://www.ema.org.mx/portal_v3/"
              external
              label="Catálogo ema, a.c."
              variant="outline"
              size="sm"
              className="shrink-0"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
