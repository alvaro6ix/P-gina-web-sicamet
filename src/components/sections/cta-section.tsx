import { site } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { FancyButton } from "@/components/ui/fancy-button";

export function CtaSection() {
  return (
    <section className="py-16">
      <Container>
        <Reveal className="surface relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl px-6 py-10 text-center sm:flex-row sm:justify-between sm:gap-8 sm:px-10 sm:text-left">
          {/* acento dorado mínimo */}
          <span className="absolute left-0 top-0 h-full w-1.5 bg-gold" aria-hidden />
          <span
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/15 blur-[80px]"
            aria-hidden
          />

          <div className="relative">
            <h2 className="text-balance font-display text-2xl font-bold tracking-tight sm:text-3xl">
              ¿Listo para asegurar la precisión de tus mediciones?
            </h2>
            <p className="mt-2 max-w-xl text-pretty text-sm text-muted sm:text-base">
              Solicita una cotización sin compromiso. Te respondemos con una
              propuesta a la medida de tu operación.
            </p>
          </div>

          <div className="relative flex shrink-0 flex-wrap items-center justify-center gap-3">
            <FancyButton href="/contacto" label="Cotizar ahora" />
            <FancyButton
              href={`tel:${site.phones[0].replace(/-/g, "")}`}
              label={site.phones[0]}
              variant="outline"
              size="sm"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
