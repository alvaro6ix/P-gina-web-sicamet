import type { Metadata } from "next";
import { MessageSquareWarning, ShieldCheck, Eye, Scale } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { LeadForm } from "@/components/sections/lead-form";
import { ComplaintFlow } from "@/components/sections/complaint-flow";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Centro de Quejas",
  description:
    "Canal oficial de SICAMET para registrar quejas, sugerencias y comentarios. Tu retroalimentación se atiende con confidencialidad e imparcialidad.",
  alternates: { canonical: "/centro-de-quejas" },
};

const principles = [
  {
    icon: ShieldCheck,
    title: "Confidencialidad",
    text: "Tu información se maneja de forma reservada y protegida.",
  },
  {
    icon: Scale,
    title: "Imparcialidad",
    text: "Cada caso se evalúa con objetividad y sin conflicto de interés.",
  },
  {
    icon: Eye,
    title: "Seguimiento",
    text: "Damos trazabilidad a tu queja hasta su resolución.",
  },
];

export default function CentroDeQuejasPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Centro de Quejas", href: "/centro-de-quejas" },
        ]}
      />
      <PageHero
        eyebrow="Tu opinión nos mejora"
        title={
          <>
            Centro de <span className="text-accent">Quejas</span> y Sugerencias
          </>
        }
        description="Como laboratorio acreditado ISO/IEC 17025, contamos con un proceso formal para atender quejas, sugerencias y comentarios con imparcialidad y confidencialidad."
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Centro de Quejas", href: "/centro-de-quejas" },
        ]}
      />

      <section className="py-10">
        <Container>
          <Reveal className="mb-16 border-b border-border pb-14 sm:mb-24 sm:pb-20">
            <div className="mb-6 text-center">
              <h2 className="font-display text-xl font-semibold sm:text-2xl">
                Así atendemos tu queja
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-muted">
                Proceso formal de cinco pasos con dos puntos de decisión y lazos
                de retroalimentación. Pasa el cursor o toca cada etapa para ver
                su detalle.
              </p>
            </div>
            <ComplaintFlow />
          </Reveal>

          <Reveal stagger className="mb-10 grid gap-4 sm:grid-cols-3">
            {principles.map((p) => (
              <div
                key={p.title}
                className="flex items-start gap-4 rounded-3xl border border-border bg-card/50 p-6"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
                  <p.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">{p.text}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <div className="mx-auto max-w-3xl">
            <div data-reveal className="mb-6 flex items-center gap-3">
              <MessageSquareWarning className="h-6 w-6 text-brand" />
              <h2 className="font-display text-xl font-semibold">
                Registra tu queja o sugerencia
              </h2>
            </div>
            <LeadForm
              type="queja"
              subjectLabel="Tipo de caso"
              subjectOptions={[
                "Queja",
                "Sugerencia",
                "Comentario",
                "Otro",
              ]}
              messageLabel="Describe tu caso a detalle"
              submitLabel="Enviar queja"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
