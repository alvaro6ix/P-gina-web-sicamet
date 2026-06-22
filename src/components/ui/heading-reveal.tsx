"use client";

import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

/**
 * Anima un título al entrar al viewport. Si el contenido es texto plano lo
 * divide en palabras (efecto escalonado); si es JSX hace un reveal del bloque.
 * Usa IntersectionObserver (fiable en móvil).
 */
export function HeadingReveal({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  const { ref, inView } = useInView<HTMLHeadingElement>();

  if (typeof children === "string") {
    const words = children.split(" ");
    return (
      <Tag ref={ref} className={cn(className)}>
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span
              className="inline-block transition-[opacity,transform] duration-700 ease-out"
              style={{
                transitionDelay: `${i * 0.06}s`,
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(110%)",
              }}
            >
              {w}&nbsp;
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={cn("transition-[opacity,transform] duration-700 ease-out", className)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px)",
      }}
    >
      {children}
    </Tag>
  );
}
