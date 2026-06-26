"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";
import { Container, SectionHeading } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import type { CSSProperties } from "react";

export function ServicesSection() {
  return (
    <section id="servicios" className="relative py-24">
      <Container>
        <SectionHeading
          eyebrow="Servicios"
          title={
            <>
              Soluciones <span className="text-accent">integrales</span> de
              metrología
            </>
          }
          description="Desde la calibración acreditada hasta la calificación de equipos y la transferencia de conocimiento. Todo bajo un sistema de gestión ISO/IEC 17025."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({
  service,
  index = 0,
}: {
  service: (typeof services)[number];
  index?: number;
}) {
  return (
    <Link
      href={`/servicios#${service.slug}`}
      data-reveal
      style={{ "--reveal-delay": `${index * 0.08}s` } as CSSProperties}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className="card-spotlight group flex flex-col rounded-3xl border border-border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10"
    >
      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand ring-1 ring-border transition-colors duration-300 group-hover:bg-accent-soft group-hover:text-accent">
        <Icon name={service.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-5 flex items-center gap-1 font-display text-lg font-semibold">
        {service.title}
        <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-accent" />
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {service.short}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-brand transition-colors duration-300 group-hover:text-accent">
        Conocer más
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
