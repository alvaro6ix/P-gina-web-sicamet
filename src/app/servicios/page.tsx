import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { services } from "@/lib/content";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios de calibración acreditada ISO/IEC 17025, calificación de áreas y equipos (DQ/IQ/OQ/PQ), consultoría, capacitación y soporte Vaisala.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Servicios", href: "/servicios" },
        ]}
      />
      <PageHero
        eyebrow="Lo que hacemos"
        title="Servicios de metrología de extremo a extremo"
        description="Calibración, calificación, consultoría y soporte especializado bajo un mismo sistema de gestión ISO/IEC 17025."
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Servicios", href: "/servicios" },
        ]}
      />

      <div className="space-y-6 py-10">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} className="scroll-mt-28">
            <Container>
              <Reveal
                className={`grid items-center gap-8 rounded-[2rem] border border-border bg-card/40 p-7 sm:p-10 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand ring-1 ring-border">
                    <Icon name={s.icon} className="h-7 w-7" />
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-bold sm:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted">
                    {s.description}
                  </p>
                </div>
                <ul className="grid gap-2.5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-4 py-3 text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </Container>
          </section>
        ))}
      </div>
    </>
  );
}
