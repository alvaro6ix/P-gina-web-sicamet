import { Container } from "@/components/ui/container";
import { FancyButton } from "@/components/ui/fancy-button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <div
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[120px]"
        aria-hidden
      />
      <Container className="relative text-center">
        <p className="font-display text-8xl font-bold text-gradient sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
          Medición fuera de rango
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          La página que buscas no existe o fue movida. Regresa al inicio para
          continuar.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <FancyButton href="/" label="Volver al inicio" />
          <FancyButton href="/contacto" label="Contactar" variant="outline" />
        </div>
      </Container>
    </section>
  );
}
