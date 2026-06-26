import type { CSSProperties } from "react";
import { CheckCircle2, Lock, Clock, Download } from "lucide-react";
import { certificatesPortal } from "@/lib/content";
import { highlightBrand } from "@/lib/highlight-brand";
import { Container } from "@/components/ui/container";
import { Certificate } from "@/components/metrology/instruments";
import { FancyButton } from "@/components/ui/fancy-button";

export function CertificadosSection() {
  return (
    <section id="certificados" className="py-24">
      <Container>
        <div className="surface relative overflow-hidden rounded-3xl p-6 sm:rounded-[2.5rem] sm:p-12">
          <span
            className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-[100px]"
            aria-hidden
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            {/* visual: certificado animado + métricas */}
            <div className="order-2 lg:order-1">
              <div data-reveal className="mx-auto h-80 w-56 sm:h-[26rem] sm:w-72">
                <Certificate />
              </div>
              <div className="mx-auto mt-4 grid max-w-xs grid-cols-3 gap-2 sm:max-w-sm">
                {[
                  { n: "Disponibles", c: "text-success", Icon: CheckCircle2 },
                  { n: "En proceso", c: "text-gold-ink", Icon: Clock },
                  { n: "Descargas", c: "text-brand", Icon: Download },
                ].map((m, i) => (
                  <div
                    key={m.n}
                    data-reveal
                    style={{ "--reveal-delay": `${i * 0.08}s` } as CSSProperties}
                    className="flex flex-col items-center rounded-xl border border-border bg-card-soft px-2 py-2.5 text-center"
                  >
                    <m.Icon className={`h-5 w-5 ${m.c}`} />
                    <p className="mt-1 text-[10px] text-muted">{m.n}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* texto */}
            <div className="order-1 lg:order-2">
              <span
                data-reveal
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground"
              >
                <Lock className="h-3.5 w-3.5" /> Portal de clientes
              </span>
              <h2
                data-reveal
                style={{ "--reveal-delay": "0.05s" } as CSSProperties}
                className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-4xl"
              >
                Consulta y descarga tus{" "}
                <span className="text-gold">certificados</span> en línea
              </h2>
              <p
                data-reveal
                style={{ "--reveal-delay": "0.1s" } as CSSProperties}
                className="mt-4 max-w-lg leading-relaxed text-muted"
              >
                Accede al Portal de Certificados{" "}
                <strong className="font-bold">SICAMET</strong> con tu Razón Social y tu
                Código de acceso. Monitorea el estatus en tiempo real y descarga
                tus certificados aprobados desde cualquier dispositivo.
              </p>

              <ul className="mt-6 grid gap-2.5">
                {certificatesPortal.features.slice(0, 4).map((f, i) => (
                  <li
                    key={f}
                    data-reveal
                    style={{ "--reveal-delay": `${0.12 + i * 0.06}s` } as CSSProperties}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span>{highlightBrand(f)}</span>
                  </li>
                ))}
              </ul>

              <div
                data-reveal
                style={{ "--reveal-delay": "0.4s" } as CSSProperties}
                className="mt-8"
              >
                <FancyButton
                  href={certificatesPortal.url}
                  external
                  label="Ir al portal"
                  labelHover="Acceder"
                />
              </div>
              <p className="mt-3 font-mono text-xs text-muted">
                {certificatesPortal.domain}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
