import Image from "next/image";
import { Award, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { FancyButton } from "@/components/ui/fancy-button";

const perks = [
  "Garantías y soporte técnico oficial",
  "Reemplazo de sensores",
  "Care Calibration Service (garantía extendida)",
  "Atención especializada para equipos Vaisala",
];

export function VaisalaSection() {
  return (
    <section className="py-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card-soft p-8 sm:p-12">
          <div
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/20 blur-[100px]"
            aria-hidden
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-foreground">
                <Award className="h-4 w-4 text-success" /> Partner oficial
              </span>
              {/* Logo oficial Vaisala Service Partner */}
              <div className="mt-5">
                {/* claro: wordmark navy transparente */}
                <Image
                  src="/vaisala-light.webp"
                  alt="Vaisala Service Partner"
                  width={234}
                  height={80}
                  className="block h-14 w-auto dark:hidden"
                />
                {/* oscuro: wordmark blanco transparente */}
                <Image
                  src="/vaisala-dark.webp"
                  alt="Vaisala Service Partner"
                  width={234}
                  height={80}
                  className="hidden h-14 w-auto dark:block"
                />
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Único partner de{" "}
                {/* Thunder Blue oficial Vaisala (#0A2A3D); blanco en oscuro como el logo */}
                <span className="text-[#0a2a3d] dark:text-white">Vaisala</span> en México
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-muted">
                Como partner certificado y avalado por Vaisala, ofrecemos soporte
                integral para tus equipos de monitoreo: garantía, calibración y
                reemplazo de sensores con respaldo del fabricante.
              </p>
              <div className="mt-7">
                <FancyButton href="/contacto" label="Solicitar servicio Vaisala" />
              </div>
            </div>

            <ul className="grid gap-3">
              {perks.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-4 py-3.5 backdrop-blur"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                  <span className="text-sm font-medium">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
