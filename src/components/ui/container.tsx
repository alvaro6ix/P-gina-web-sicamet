import { cn } from "@/lib/utils";
import { HeadingReveal } from "./heading-reveal";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-ring" />
          {eyebrow}
        </span>
      )}
      <HeadingReveal className="mt-5 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </HeadingReveal>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
