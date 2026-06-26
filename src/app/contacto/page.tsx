import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { contacts, site, whatsappUrl } from "@/lib/content";
import { WhatsappGlyph } from "@/components/ui/whatsapp-glyph";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { LeadForm } from "@/components/sections/lead-form";
import { LocationMap } from "@/components/sections/location-map";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a SICAMET para cotizaciones de calibración y calificación. Teléfonos, correos por departamento y ubicación en Toluca, Estado de México.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Contacto", href: "/contacto" },
        ]}
      />
      <PageHero
        eyebrow="Hablemos"
        title={
          <>
            Solicita tu <span className="text-accent">cotización</span>
          </>
        }
        description="Cuéntanos qué necesitas calibrar o calificar y te enviaremos una propuesta a la medida. También puedes escribirnos por WhatsApp o llamarnos directamente."
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Contacto", href: "/contacto" },
        ]}
      />

      <section className="py-10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <LeadForm type="contacto" />

            <Reveal stagger className="space-y-4">
              <div className="grid gap-3 rounded-3xl border border-border bg-card/50 p-6">
                <h3 className="font-display text-lg font-semibold">
                  Datos de contacto
                </h3>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-sm text-muted hover:text-brand"
                >
                  <Mail className="h-4 w-4 text-brand" /> {site.email}
                </a>
                {site.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/-/g, "")}`}
                    className="flex items-center gap-3 text-sm text-muted hover:text-brand"
                  >
                    <Phone className="h-4 w-4 text-brand" /> {p}
                  </a>
                ))}
                <a
                  href={whatsappUrl(
                    "Hola SICAMET, me gustaría solicitar información.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted hover:text-[#25D366]"
                >
                  <WhatsappGlyph className="h-4 w-4 text-[#25D366]" /> WhatsApp:{" "}
                  {site.whatsappDisplay}
                </a>
                <p className="flex items-start gap-3 text-sm text-muted">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {site.address.full}
                </p>
                <p className="flex items-center gap-3 text-sm text-muted">
                  <Clock className="h-4 w-4 text-brand" /> Lun – Vie · 8:00 a
                  18:00
                </p>
              </div>

              <div className="grid gap-3 rounded-3xl border border-border bg-card/50 p-6">
                <h3 className="font-display text-lg font-semibold">
                  Atención por área
                </h3>
                {contacts.map((c, i) => (
                  <div
                    key={c.email}
                    data-reveal
                    style={{ "--reveal-delay": `${i * 0.08}s` } as CSSProperties}
                    className="rounded-2xl border border-border bg-background/60 p-4"
                  >
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="text-xs text-muted">{c.role}</p>
                    <a
                      href={`mailto:${c.email}`}
                      className="mt-1 inline-block text-xs text-brand hover:underline"
                    >
                      {c.email}
                    </a>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-8">
            <Reveal>
              <LocationMap />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
