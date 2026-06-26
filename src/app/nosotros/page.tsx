import type { Metadata } from "next";
import { Target, Eye, HeartHandshake, Trophy, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/content";
import { PageHero } from "@/components/layout/page-hero";
import { Container, SectionHeading } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PhotoCarousel } from "@/components/ui/photo-carousel";
import { stats } from "@/lib/content";
import { Counter } from "@/components/ui/counter";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce a SICAMET: laboratorio de metrología con más de 20 años de experiencia, acreditado ISO/IEC 17025:2017 y reconocido por su compromiso con la calidad.",
  alternates: { canonical: "/nosotros" },
};

const pillars = [
  {
    icon: Target,
    title: "Misión",
    text: "Brindar servicios profesionales de calibración, calificación, consultoría y capacitación con validez ética y técnica, garantizando la confiabilidad de las mediciones de nuestros clientes.",
  },
  {
    icon: Eye,
    title: "Visión",
    text: "Ser el laboratorio de metrología de referencia en México y Latinoamérica, impulsando la cultura metrológica y la mejora continua en cada sector que atendemos.",
  },
  {
    icon: HeartHandshake,
    title: "Valores",
    text: "Mejora continua, innovación de servicios, trabajo en equipo, desarrollo del personal y compromiso absoluto con la satisfacción del cliente.",
  },
];

const highlights = [
  "Norma ISO/IEC 17025:2017 (competencia de laboratorios)",
  "Sistema de gestión de calidad documentado",
  "12 acreditaciones otorgadas por ema, a.c.",
  "Reconocimiento internacional mediante ILAC",
  "Único partner de Vaisala en México",
  "Buenas Prácticas de Fabricación e Ingeniería",
];

export default function NosotrosPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", href: "/" },
          { name: "Nosotros", href: "/nosotros" },
        ]}
      />
      <PageHero
        eyebrow="Quiénes somos"
        title={
          <>
            Más de <span className="text-accent">20 años</span> midiendo la
            confianza
          </>
        }
        description={`${site.legalName} es un laboratorio de metrología especializado en servicios de calibración y calificación para los sectores industrial, farmacéutico y médico.`}
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Nosotros", href: "/nosotros" },
        ]}
      />

      <section className="py-10">
        <Container>
          <Reveal
            stagger
            className="grid grid-cols-2 divide-border rounded-3xl border border-border bg-card-soft p-2 sm:grid-cols-4 sm:divide-x"
          >
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-6 text-center">
                <div className="font-display text-3xl font-bold text-brand sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Reveal stagger className="grid gap-5 md:grid-cols-3">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-3xl border border-border bg-card/50 p-7"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand ring-1 ring-border">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {p.text}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Compromiso con la calidad"
                title={<>Excelencia técnica respaldada por la acreditación</>}
                description="Hemos recibido seis reconocimientos consecutivos al «Compromiso con la Acreditación» otorgados por ema, a.c., una distinción para empresas éticas y responsables."
              />
            </Reveal>
            <Reveal stagger className="grid gap-3">
              {highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card/50 px-5 py-4"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                  <span className="text-sm font-medium">{h}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Instalaciones"
            title={
              <>
                Conoce nuestro <span className="text-accent">laboratorio</span>
              </>
            }
            description="Un recorrido por nuestras áreas, equipos y el equipo humano detrás de cada medición."
          />
          <Reveal className="mt-12">
            <PhotoCarousel />
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Reveal className="flex flex-col items-center gap-4 rounded-[2.5rem] border border-border bg-card-soft p-12 text-center">
            <Trophy className="h-12 w-12 text-brand" />
            <h3 className="font-display text-2xl font-bold sm:text-3xl">
              6 reconocimientos al Compromiso con la Acreditación
            </h3>
            <p className="max-w-xl text-muted">
              Otorgados por la Entidad Mexicana de Acreditación (ema, a.c.) como
              distinción a nuestra ética, responsabilidad y competencia técnica.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
