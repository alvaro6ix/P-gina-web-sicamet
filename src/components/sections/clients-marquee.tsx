import { clients } from "@/lib/content";
import { Container } from "@/components/ui/container";

// Color aproximado de cada marca para dar identidad al carrusel.
const brandColors: Record<string, string> = {
  Bayer: "#89D329",
  Bimbo: "#0033A0",
  Novartis: "#0460A9",
  Sigma: "#ED1C24",
  Barcel: "#E4002B",
  Rayere: "#C8102E",
  Silodisa: "#0067B1",
  Aerobal: "#2E7BFF",
  "Tía Rosa": "#E5007E",
};

export function ClientsMarquee() {
  const row = [...clients, ...clients];
  return (
    <section className="py-14">
      <Container>
        <p className="text-center text-xs font-medium uppercase tracking-[0.3em] text-muted">
          Empresas que confían en nosotros
        </p>
      </Container>
      <div className="group relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-14 group-hover:[animation-play-state:paused]">
          {row.map((c, i) => (
            <span
              key={`${c}-${i}`}
              style={{ color: brandColors[c] }}
              className="font-display text-2xl font-bold opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:text-3xl"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
