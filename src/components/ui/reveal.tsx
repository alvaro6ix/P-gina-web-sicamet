import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
} from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Anima los hijos directos de forma escalonada */
  stagger?: boolean;
  /** Compat: ya no se usa (el reveal usa `scale`, no translate). */
  y?: number;
  as?: React.ElementType;
};

/**
 * Revela contenido al hacer scroll usando el sistema universal `data-reveal`
 * (lo observa <ScrollReveals/> en el layout). Mismo efecto en TODO el sitio:
 * se re-anima al volver a entrar y no choca con los hover de las tarjetas.
 *
 * - `stagger`: aplica `data-reveal` a cada hijo directo con retardo por índice.
 * - sin `stagger`: anima el bloque completo.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
  as: Tag = "div",
}: RevealProps) {
  if (stagger) {
    const items = Children.toArray(children);
    return (
      <Tag className={cn(className)}>
        {items.map((child, i) => {
          if (!isValidElement(child)) return child;
          const el = child as ReactElement<{
            style?: CSSProperties;
            "data-reveal"?: boolean | string;
          }>;
          return cloneElement(el, {
            "data-reveal": true,
            style: {
              ...(el.props.style || {}),
              "--reveal-delay": `${delay + i * 0.09}s`,
            } as CSSProperties,
          });
        })}
      </Tag>
    );
  }

  return (
    <Tag
      className={cn(className)}
      data-reveal
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
