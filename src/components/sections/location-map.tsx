import { Clock, MapPin, Navigation } from "lucide-react";
import { site } from "@/lib/content";

/**
 * Ubicación de SICAMET: mapa embebido (sin API key) con tratamiento de marca
 * + tarjeta glass flotante con dirección, horario y botón "Cómo llegar".
 */
export function LocationMap() {
  const { lat, lng } = site.address.geo;
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border shadow-xl">
      <iframe
        title="Ubicación de SICAMET"
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[420px] w-full saturate-[1.05] transition-all duration-700 group-hover:scale-[1.02] sm:h-[460px] dark:invert-[0.92] dark:hue-rotate-180 dark:saturate-[0.85]"
      />

      {/* anillo interior sutil para integrar el mapa al diseño */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />

      {/* tarjeta flotante */}
      <div className="glass pointer-events-auto absolute inset-x-4 bottom-4 flex flex-col gap-3 rounded-2xl border border-border/60 p-5 backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-xs">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
            <MapPin className="h-4 w-4" />
          </span>
          <span className="font-display text-base font-semibold">
            {site.name}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted">
          {site.address.full}
        </p>
        <p className="flex items-center gap-2 text-sm text-muted">
          <Clock className="h-4 w-4 shrink-0 text-brand" /> Lun – Vie · 8:00 a
          18:00
        </p>
        <a
          href={site.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand/25 transition-transform hover:scale-[1.03]"
        >
          <Navigation className="h-4 w-4" /> Cómo llegar
        </a>
      </div>
    </div>
  );
}
