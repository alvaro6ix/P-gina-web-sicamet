import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CheckCircle2 } from "lucide-react";
import { services } from "@/lib/content";
import { highlightBrand } from "@/lib/highlight-brand";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { ScrollSlider } from "@/components/ui/scroll-slider";
import { PhotoTilt } from "@/components/ui/photo-tilt";
import { unsplashImg } from "@/lib/sim-image";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

// Fotos (Unsplash) por servicio: 3 cada uno para el slider por scroll.
const SERVICE_IMGS: Record<string, string[]> = {
  calibracion: [
    "photo-1617155093730-a8bf47be792d", // taza medidora
    "photo-1691934286173-d366705baa83", // máquina + microscopios
    "photo-1536905379701-c8aba0076deb", // máquina médica
  ],
  calificacion: [
    "photo-1486825586573-7131f7991bdd", // contenedor lab
    "photo-1581594549595-35f6edc7b762", // vial + jeringa
    "photo-1732690233982-1d4567384ea1", // persona en equipo
  ],
  consultoria: [
    "photo-1581093577421-f561a654a353", // persona
    "photo-1605781645799-c9c7d820b4ac", // escritorio
    "photo-1486825586573-7131f7991bdd", // contenedor lab
  ],
  vaisala: [
    "photo-1691934286173-d366705baa83", // máquina + microscopios
    "photo-1535612731405-1348d22b842f", // dispositivo digital
    "photo-1536905379701-c8aba0076deb", // máquina médica
  ],
};
const DEFAULT_IMGS = [
  "photo-1617155093730-a8bf47be792d",
  "photo-1486825586573-7131f7991bdd",
  "photo-1691934286173-d366705baa83",
];

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
        title={
          <>
            Servicios de metrología de{" "}
            <span className="text-accent">extremo a extremo</span>
          </>
        }
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
              <div
                className={`grid items-center gap-8 rounded-[2rem] border border-border bg-card/40 p-7 sm:p-10 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <span
                    data-reveal
                    className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand ring-1 ring-border"
                  >
                    <Icon name={s.icon} className="h-7 w-7" />
                  </span>
                  <h2
                    data-reveal
                    style={{ "--reveal-delay": "0.06s" } as CSSProperties}
                    className="mt-5 font-display text-2xl font-bold sm:text-3xl"
                  >
                    {s.title}
                  </h2>
                  <p
                    data-reveal
                    style={{ "--reveal-delay": "0.12s" } as CSSProperties}
                    className="mt-3 leading-relaxed text-muted"
                  >
                    {s.description}
                  </p>
                  <ul className="mt-5 grid gap-2.5">
                    {s.bullets.map((b, j) => (
                      <li
                        key={b}
                        data-reveal
                        style={{ "--reveal-delay": `${0.18 + j * 0.06}s` } as CSSProperties}
                        className="flex items-start gap-3 rounded-xl border border-border bg-background/60 px-4 py-3 text-sm"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{highlightBrand(b)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Foto del servicio (más compacta, tilt 3D + Ken Burns) */}
                <div
                  data-reveal
                  style={{ "--reveal-delay": "0.1s" } as CSSProperties}
                  className="reveal-photo mx-auto aspect-[4/3] w-full max-w-xs sm:max-w-sm"
                >
                  <PhotoTilt className="h-full">
                    <ScrollSlider
                      label={s.title}
                      images={(SERVICE_IMGS[s.slug] ?? DEFAULT_IMGS).map((id) =>
                        unsplashImg(id, 800, 600),
                      )}
                    />
                  </PhotoTilt>
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>
    </>
  );
}
