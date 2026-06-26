import { stats } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { Parallax } from "@/components/ui/parallax";

export function StatsSection() {
  return (
    <section className="relative py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-8 backdrop-blur sm:p-10">
          <Parallax
            ariaHidden
            speed={22}
            className="pointer-events-none absolute -left-16 top-0 h-44 w-44 rounded-full bg-accent/10 blur-[80px]"
          />
          <Reveal className="relative">
            <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-accent">
              Respaldo que se mide
            </p>
            <h2 className="mx-auto mt-2 max-w-2xl text-balance text-center font-display text-xl font-bold tracking-tight sm:text-2xl">
              Más de <span className="text-accent">dos décadas</span> haciendo
              de la confianza algo medible
            </h2>
          </Reveal>

          <Reveal
            stagger
            className="relative mt-8 grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl font-bold text-gradient sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <span className="mx-auto mt-2 block h-0.5 w-8 rounded-full bg-accent/60" />
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
