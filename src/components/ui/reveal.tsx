"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
} from "react";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Anima los hijos directos de forma escalonada */
  stagger?: boolean;
  y?: number;
  as?: React.ElementType;
};

const base = "transition-[opacity,transform] duration-700 ease-out";

/** Revela contenido al entrar al viewport (IntersectionObserver, fiable en móvil). */
export function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
  y = 28,
  as: Tag = "div",
}: RevealProps) {
  const { ref, inView } = useInView();

  if (stagger) {
    const items = Children.toArray(children);
    return (
      <Tag ref={ref} className={cn(className)}>
        {items.map((child, i) => {
          if (!isValidElement(child)) return child;
          const el = child as React.ReactElement<{
            style?: CSSProperties;
            className?: string;
          }>;
          const style: CSSProperties = {
            ...(el.props.style || {}),
            transition: "opacity .7s ease, transform .7s ease",
            transitionDelay: `${delay + i * 0.09}s`,
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : `translateY(${y}px)`,
          };
          return cloneElement(el, { style });
        })}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={cn(base, className)}
      style={{
        transitionDelay: `${delay}s`,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${y}px)`,
      }}
    >
      {children}
    </Tag>
  );
}
