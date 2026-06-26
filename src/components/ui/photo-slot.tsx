import { ImageIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Placeholder de foto (simulación de dónde irá una imagen real). Estilo moderno:
 * retícula + barrido (shimmer) + esquinas tipo HUD + icono central. Cuando
 * tengas la foto, se reemplaza el contenido por un <Image fill>.
 */
export function PhotoSlot({
  label = "Espacio para foto",
  hint,
  icon: Icon = ImageIcon,
  src,
  motion = false,
  className,
}: {
  label?: string;
  hint?: string;
  icon?: LucideIcon;
  /** Imagen de simulación (CSS background). Si se pasa, se muestra la foto. */
  src?: string;
  /** Aplica zoom/paneo lento (Ken Burns) a la imagen. */
  motion?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <div
        className={cn(
          "photo-slot relative h-full w-full overflow-hidden rounded-3xl border border-border",
          className,
        )}
      >
        <div
          className={cn("absolute inset-0 bg-cover bg-center", motion && "kenburns")}
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden
        />
        {/* velo inferior para que el texto/sello se lea */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" aria-hidden />
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
          Simulación
        </span>
        <span className="absolute bottom-3 left-4 right-4 text-sm font-semibold text-white drop-shadow">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "photo-slot relative h-full w-full overflow-hidden rounded-3xl border border-dashed border-border bg-card-soft",
        className,
      )}
    >
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <span className="photo-shimmer pointer-events-none absolute inset-0" aria-hidden />

      {/* esquinas HUD */}
      {[
        "left-3 top-3 border-l-2 border-t-2",
        "right-3 top-3 border-r-2 border-t-2",
        "left-3 bottom-3 border-l-2 border-b-2",
        "right-3 bottom-3 border-r-2 border-b-2",
      ].map((c, i) => (
        <span
          key={i}
          className={cn("pointer-events-none absolute h-5 w-5 rounded-[2px] border-brand/40", c)}
          aria-hidden
        />
      ))}

      <div className="absolute inset-0 grid place-items-center p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand/10 text-brand ring-1 ring-border">
            <Icon className="h-8 w-8" />
          </span>
          <span className="text-sm font-semibold text-foreground">{label}</span>
          {hint && <span className="max-w-[15rem] text-xs leading-relaxed text-muted">{hint}</span>}
        </div>
      </div>
    </div>
  );
}
