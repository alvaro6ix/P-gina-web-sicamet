"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  labelHover?: string; // compat (no se usa)
  href?: string;
  external?: boolean;
  variant?: "solid" | "outline";
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
};

/** Botón del sitio: azul sólido (solid) o transparente con borde (outline). */
export function FancyButton({
  label,
  href,
  external,
  variant = "solid",
  size = "md",
  className,
  onClick,
}: Props) {
  const classes = cn(
    "ubtn",
    size === "sm" && "sm",
    variant === "outline" && "outline",
    className,
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {label}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {label}
    </button>
  );
}
