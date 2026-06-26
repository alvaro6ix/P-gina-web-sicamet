import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  LogIn,
  LayoutDashboard,
  MessagesSquare,
  ShieldCheck,
  Smartphone,
  Download,
  CheckCircle2,
} from "lucide-react";
import { certificatesPortal } from "@/lib/content";
import { highlightBrand } from "@/lib/highlight-brand";
import { PageHero } from "@/components/layout/page-hero";
import { Container, SectionHeading } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Certificate } from "@/components/metrology/instruments";
import { FancyButton } from "@/components/ui/fancy-button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Portal de Certificados",
  description:
    "Consulta y descarga tus certificados de calibración SICAMET en línea. Estatus en tiempo real, acceso seguro y soporte por chat en certificados.sicamet.cloud.",
  alternates: { canonical: "/certificados" },
};

const steps = [
  {
    icon: LogIn,
    title: "Acceso seguro",
    text: "Ingresa con tu Razón Social y tu Código SICAMET, único y confidencial. Si tienes varias sedes, filtramos por número de Orden de Servicio.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard de certificados",
    text: "Visualiza al instante tus certificados: totales, disponibles para descarga, en proceso y pendientes de pago.",
  },
  {
    icon: MessagesSquare,
    title: "Perfil y chat con asesor",
    text: "Revisa tu información y comunícate con soporte para actualizar tu perfil, recuperar tu código o resolver dudas.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad",
    text: "Cierre de sesión automático por inactividad y gestión de código personal e intransferible para proteger tu cuenta.",
  },
];

const metrics = [
  { label: "Disponibles", icon: Download, c: "text-brand" },
  { label: "En proceso", icon: LayoutDashboard, c: "text-gold-ink" },
  { label: "Pendientes de pago", icon: ShieldCheck, c: "text-brand" },
  { label: "Multiplataforma", icon: Smartphone, c: "text-gold-ink" },
];

export default function CertificadosPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Certificados", href: "/certificados" },
        ]}
      />
      <PageHero
        eyebrow="Portal de clientes"
        title={
          <>
            Tu Portal de <span className="text-accent">Certificados</span>
          </>
        }
        description="Centraliza la consulta y descarga de tus certificados de calibración de forma rápida, segura y desde un solo lugar."
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Certificados", href: "/certificados" },
        ]}
      />

      {/* Intro + CTA */}
      <section className="py-10">
        <Container>
          <div className="surface grid items-center gap-8 rounded-3xl p-6 sm:rounded-[2.5rem] sm:p-12 lg:grid-cols-2 lg:gap-10">
            <div>
              <h2 data-reveal className="font-display text-2xl font-bold sm:text-3xl">
                Control total de tu información
              </h2>
              <p
                data-reveal
                style={{ "--reveal-delay": "0.08s" } as CSSProperties}
                className="mt-4 leading-relaxed text-muted"
              >
                Desarrollado con tecnología moderna, el portal te ofrece una
                experiencia fluida e intuitiva. Monitorea en tiempo real el
                estatus de tus certificados y descarga los aprobados cuando los
                necesites.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {metrics.map((m, i) => (
                  <div
                    key={m.label}
                    data-reveal
                    style={{ "--reveal-delay": `${0.15 + i * 0.08}s` } as CSSProperties}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card-soft px-4 py-3"
                  >
                    <m.icon className={`h-5 w-5 ${m.c}`} />
                    <span className="text-sm font-medium">{m.label}</span>
                  </div>
                ))}
              </div>
              <div
                data-reveal
                style={{ "--reveal-delay": "0.5s" } as CSSProperties}
                className="mt-8"
              >
                <FancyButton
                  href={certificatesPortal.url}
                  external
                  label="Entrar al portal"
                  labelHover="Acceder"
                />
              </div>
              <p className="mt-3 font-mono text-xs text-muted">
                {certificatesPortal.domain}
              </p>
            </div>

            <div
              data-reveal
              style={{ "--reveal-delay": "0.12s" } as CSSProperties}
              className="mx-auto h-80 w-56 sm:h-[30rem] sm:w-80"
            >
              <Certificate />
            </div>
          </div>
        </Container>
      </section>

      {/* Pasos */}
      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Cómo funciona"
            title="Tu portal en 4 pasos"
          />
          <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.title} className="surface rounded-3xl p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {highlightBrand(s.text)}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Beneficios */}
      <section className="pb-20">
        <Container>
          <div className="surface rounded-3xl p-8">
            <h3 data-reveal className="font-display text-xl font-semibold">
              Todo lo que puedes hacer
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {certificatesPortal.features.map((f, i) => (
                <li
                  key={f}
                  data-reveal
                  style={{ "--reveal-delay": `${0.06 + i * 0.06}s` } as CSSProperties}
                  className="flex items-start gap-3 text-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{highlightBrand(f)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
