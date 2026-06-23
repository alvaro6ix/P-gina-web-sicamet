import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Logo oficial de SICAMET. Cambia entre versión clara/oscura según el tema.
 * `size` fija la altura en px; si se pasa `heightClassName` (ej. "h-12 lg:h-14")
 * la altura la controla esa clase (permite tamaños responsive).
 */
export function Logo({
  className,
  size = 46,
  heightClassName,
}: {
  className?: string;
  size?: number;
  heightClassName?: string;
}) {
  const style = heightClassName
    ? { width: "auto" as const }
    : { height: size, width: "auto" as const };
  return (
    <Link
      href="/"
      aria-label="SICAMET — Inicio"
      className={cn("flex items-center", className)}
    >
      {/* Modo claro: logo navy/dorado transparente */}
      <Image
        src="/sicamet-light.webp"
        alt="SICAMET — Sistemas Integrales de Calibración y Aseguramiento Metrológico"
        width={size * 2}
        height={size * 2}
        quality={100}
        priority
        className={cn("block w-auto dark:hidden", heightClassName)}
        style={style}
      />
      {/* Modo oscuro: logo blanco transparente */}
      <Image
        src="/sicamet-dark.webp"
        alt="SICAMET"
        width={size * 2}
        height={size * 2}
        quality={100}
        priority
        className={cn("hidden w-auto dark:block", heightClassName)}
        style={style}
      />
    </Link>
  );
}

/**
 * Logo Vaisala Service Partner (transparente, swap claro/oscuro).
 * `height` fija la altura en px. Si se pasa `heightClassName` (ej.
 * "h-7 lg:h-10"), la altura la controla esa clase (permite tamaños
 * responsive) y `height` solo se usa para la relación de aspecto.
 */
export function VaisalaLogo({
  height = 30,
  heightClassName,
  className,
}: {
  height?: number;
  heightClassName?: string;
  className?: string;
}) {
  const width = Math.round((height * 1557) / 533);
  const style = heightClassName
    ? { width: "auto" as const }
    : { height, width: "auto" as const };
  return (
    <span className={cn("inline-flex items-center", className)} aria-label="Vaisala Service Partner">
      <Image
        src="/vaisala-light.webp"
        alt="Vaisala Service Partner"
        width={width * 2}
        height={height * 2}
        quality={100}
        className={cn("block w-auto dark:hidden", heightClassName)}
        style={style}
      />
      <Image
        src="/vaisala-dark.webp"
        alt="Vaisala Service Partner"
        width={width * 2}
        height={height * 2}
        quality={100}
        className={cn("hidden w-auto dark:block", heightClassName)}
        style={style}
      />
    </span>
  );
}
