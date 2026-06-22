import Link from "next/link";
import { Container } from "@/components/ui/container";
import { HeadingReveal } from "@/components/ui/heading-reveal";

/** Encabezado reutilizable para páginas internas con migaja de pan. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb: { name: string; href: string }[];
}) {
  return (
    <section className="relative overflow-hidden pb-12 pt-36">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <div
        className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
        aria-hidden
      />
      <Container className="relative">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
          {breadcrumb.map((b, i) => (
            <span key={b.href} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-border">/</span>}
              {i === breadcrumb.length - 1 ? (
                <span className="text-brand">{b.name}</span>
              ) : (
                <Link href={b.href} className="hover:text-foreground">
                  {b.name}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {eyebrow && (
          <span className="mt-6 inline-block text-xs font-medium uppercase tracking-[0.2em] text-brand">
            {eyebrow}
          </span>
        )}
        <HeadingReveal
          as="h1"
          className="mt-3 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          {title}
        </HeadingReveal>
        {description && (
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
