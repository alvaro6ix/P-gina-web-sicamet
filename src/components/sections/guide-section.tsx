"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Gauge,
  ShieldCheck,
  Award,
  FileCheck2,
  GraduationCap,
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import { certificatesPortal, whatsappUrl } from "@/lib/content";
import { unsplashImg } from "@/lib/sim-image";
import { Container, SectionHeading } from "@/components/ui/container";
import { Parallax } from "@/components/ui/parallax";

// Foto (Unsplash) por intención, relacionada al contenido.
const INTENT_IMG: Record<string, string> = {
  calibrar: unsplashImg("photo-1617155093730-a8bf47be792d", 760, 340), // taza medidora
  calificar: unsplashImg("photo-1486825586573-7131f7991bdd", 760, 340), // contenedor lab
  vaisala: unsplashImg("photo-1691934286173-d366705baa83", 760, 340), // máquina + microscopios
  certificados: unsplashImg("photo-1535612731405-1348d22b842f", 760, 340), // dispositivo digital
  capacitacion: unsplashImg("photo-1581093577421-f561a654a353", 760, 340), // persona / oficina
  asesor: unsplashImg("photo-1732690233982-1d4567384ea1", 760, 340), // persona en equipo
};

type Cta = {
  label: string;
  href: string;
  external?: boolean;
  primary?: boolean;
};

type Intent = {
  key: string;
  icon: LucideIcon;
  /** Texto corto del botón de selección. */
  pill: string;
  /** Encabezado del panel de resultado. */
  headline: string;
  text: string;
  /** Puntos rápidos de lo que incluye. */
  points: string[];
  ctas: Cta[];
};

const intents: Intent[] = [
  {
    key: "calibrar",
    icon: Gauge,
    pill: "Calibrar un equipo",
    headline: "Calibración acreditada ISO/IEC 17025",
    text: "En sitio o en laboratorio, con trazabilidad garantizada y reconocida por ema, a.c. Te entregamos un certificado válido para auditorías.",
    points: [
      "En sitio (sin parar tu operación) o In-Lab",
      "Reconocida por ema, a.c.",
      "Certificado y ajuste incluidos",
    ],
    ctas: [
      { label: "Cotizar calibración", href: "/contacto", primary: true },
      { label: "Ver el servicio", href: "/servicios#calibracion" },
    ],
  },
  {
    key: "calificar",
    icon: ShieldCheck,
    pill: "Calificar un área o equipo",
    headline: "Calificación DQ/IQ/OQ/PQ y mapeos",
    text: "Aseguramos tus procesos críticos bajo BPF, ISO 14644 e ISO/IEC 17025: mapeos térmicos, red de frío y áreas limpias.",
    points: [
      "Mapeos térmicos de almacenes y cámaras",
      "Validación de red de frío (OMS / ISPE)",
      "Áreas limpias (ISO 14644)",
    ],
    ctas: [
      { label: "Solicitar calificación", href: "/contacto", primary: true },
      { label: "Ver el servicio", href: "/servicios#calificacion" },
    ],
  },
  {
    key: "vaisala",
    icon: Award,
    pill: "Equipos Vaisala",
    headline: "Soporte oficial como Service Partner de Vaisala",
    text: "Somos el único partner certificado y avalado por Vaisala en México: garantías, reemplazo de sensores y Care Calibration Service.",
    points: [
      "Garantía y soporte técnico oficial",
      "Reemplazo de sensores",
      "Care Calibration Service (garantía extendida)",
    ],
    ctas: [
      { label: "Solicitar soporte Vaisala", href: "/contacto", primary: true },
      { label: "Conocer el partnership", href: "/servicios#vaisala" },
    ],
  },
  {
    key: "certificados",
    icon: FileCheck2,
    pill: "Consultar mis certificados",
    headline: "Portal de Certificados en línea",
    text: "Consulta y descarga tus certificados con tu Razón Social y Código SICAMET. Estatus en tiempo real desde cualquier dispositivo.",
    points: [
      "Disponibles, en proceso y pendientes de pago",
      "Acceso seguro y confidencial",
      "Descarga inmediata",
    ],
    ctas: [
      { label: "Ir al portal", href: certificatesPortal.url, external: true, primary: true },
      { label: "Cómo funciona", href: "/certificados" },
    ],
  },
  {
    key: "capacitacion",
    icon: GraduationCap,
    pill: "Capacitación o consultoría",
    headline: "Consultoría y capacitación en metrología",
    text: "Fortalecemos la cultura metrológica de tu organización: en línea, presencial o In-Lab, con programas a la medida.",
    points: [
      "Metrología industrial e ISO/IEC 17025",
      "Asesoría para acreditación de laboratorios",
      "Programas a la medida",
    ],
    ctas: [
      { label: "Quiero capacitación", href: "/contacto", primary: true },
      { label: "Ver el servicio", href: "/servicios#consultoria" },
    ],
  },
  {
    key: "asesor",
    icon: MessageCircle,
    pill: "No estoy seguro",
    headline: "Hablemos y te orientamos",
    text: "¿No sabes qué necesitas? Cuéntanos tu caso y un asesor te guía hacia la mejor solución, sin compromiso.",
    points: [
      "Atención por un especialista",
      "Respuesta rápida por WhatsApp",
      "Sin compromiso",
    ],
    ctas: [
      {
        label: "Hablar por WhatsApp",
        href: whatsappUrl("Hola SICAMET, necesito orientación sobre sus servicios."),
        external: true,
        primary: true,
      },
      { label: "Ir a contacto", href: "/contacto" },
    ],
  },
];

export function GuideSection() {
  const [active, setActive] = useState(0);
  const intent = intents[active];
  const Glyph = intent.icon;

  return (
    <section id="guia" className="relative py-24">
      <Container>
        <SectionHeading
          eyebrow="Empieza aquí"
          title={
            <>
              ¿Qué necesitas <span className="text-accent">hoy</span>?
            </>
          }
          description="Elige una opción y te llevamos directo a la solución correcta. En segundos."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          {/* Selector de intención */}
          <div className="flex flex-col gap-3">
            {intents.map((it, i) => {
              const ItIcon = it.icon;
              const selected = i === active;
              return (
                <button
                  key={it.key}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={selected}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 0.06}s` } as CSSProperties}
                  className={[
                    "group flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300",
                    selected
                      ? "border-accent/60 bg-accent-soft/60 shadow-lg shadow-accent/10"
                      : "border-border bg-card/50 hover:-translate-y-0.5 hover:border-accent/40",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition-colors",
                      selected
                        ? "bg-accent text-white ring-accent"
                        : "bg-brand-soft text-brand ring-border group-hover:text-accent",
                    ].join(" ")}
                  >
                    <ItIcon className="h-5 w-5" />
                  </span>
                  <span className="flex-1 font-medium">{it.pill}</span>
                  <ArrowRight
                    className={[
                      "h-4 w-4 shrink-0 transition-all duration-300",
                      selected
                        ? "translate-x-0 text-accent opacity-100"
                        : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>

          {/* Panel de resultado (cambia según la selección) */}
          <div
            data-reveal
            style={{ "--reveal-delay": "0.1s" } as CSSProperties}
            className="surface relative overflow-hidden rounded-[2rem] p-7 sm:p-9"
          >
            <Parallax
              ariaHidden
              speed={26}
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/15 blur-[80px]"
            />
            {/* key fuerza la animación de entrada al cambiar de opción */}
            <div key={intent.key} className="guide-panel relative flex h-full flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent-soft/50 px-3 py-1 text-xs font-medium text-accent">
                <Glyph className="h-4 w-4" />
                {intent.pill}
              </span>

              {/* Imagen de simulación con efecto Ken Burns (zoom lento) */}
              <div className="relative mt-5 aspect-[16/7] overflow-hidden rounded-2xl border border-border bg-card-soft">
                <div
                  className="kenburns absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${INTENT_IMG[intent.key] ?? INTENT_IMG.calibrar})`,
                  }}
                  aria-hidden
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent"
                  aria-hidden
                />
                <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
                  Simulación
                </span>
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 text-sm font-semibold text-white drop-shadow">
                  <Glyph className="h-4 w-4" /> {intent.pill}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
                {intent.headline}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{intent.text}</p>

              <ul className="mt-5 grid gap-2.5 text-sm">
                {intent.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-3 pt-7">
                {intent.ctas.map((c) =>
                  c.external ? (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={ctaClass(c.primary)}
                    >
                      {c.label}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link key={c.label} href={c.href} className={ctaClass(c.primary)}>
                      {c.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ctaClass(primary?: boolean) {
  return [
    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
    primary
      ? "bg-accent text-white hover:bg-accent-strong hover:shadow-lg hover:shadow-accent/25"
      : "border border-border bg-card/60 text-foreground hover:border-accent/50 hover:text-accent",
  ].join(" ");
}
