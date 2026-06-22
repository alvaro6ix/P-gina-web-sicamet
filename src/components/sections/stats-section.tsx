import { stats } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";

export function StatsSection() {
  return (
    <section className="relative py-16">
      <Container>
        <Reveal
          stagger
          className="grid grid-cols-2 gap-6 rounded-3xl border border-border bg-card/40 p-8 backdrop-blur md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl font-bold text-gradient sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
