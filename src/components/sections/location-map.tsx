"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, Navigation, Radio } from "lucide-react";
import { site } from "@/lib/content";
import "mapbox-gl/dist/mapbox-gl.css";

/**
 * Mapa de ubicación de SICAMET — futurista, acento amarillo único, sin
 * gradientes, y que se ADAPTA al tema claro/oscuro del sitio.
 *
 * Motor: Mapbox GL real (3D + zoom) cuando existe NEXT_PUBLIC_MAPBOX_TOKEN;
 * el estilo cambia light-v11 / dark-v11 según el tema. Sin token cae con
 * elegancia a un iframe de Google que también se oscurece en modo oscuro.
 *
 * Features: pin pulsante con glow + radar, línea de barrido, esquinas HUD,
 * chip de telemetría, tarjeta glass con datos, botón "Cómo llegar"
 * (deep link a Maps), zoom, e indicador ABIERTO/CERRADO en vivo.
 */

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
// Estilo "Standard": edificios 3D nativos; el día/noche se controla con
// el lightPreset (no con setStyle), así que es UN solo estilo.
const STYLE_STANDARD = "mapbox://styles/mapbox/standard";

// Horario: Lunes a Viernes, 8:00 – 18:00 (hora de Toluca / CDMX).
const OPEN_HOUR = 8;
const CLOSE_HOUR = 18;

/** ¿El laboratorio está abierto AHORA, en su zona horaria? */
function computeIsOpen(): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Mexico_City",
    weekday: "short",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0") % 24;
  const isWeekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(weekday);
  return isWeekday && hour >= OPEN_HOUR && hour < CLOSE_HOUR;
}

function isDarkTheme(): boolean {
  return (
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
  );
}

/** Aplica el preset de luz (día/noche) del estilo Standard según el tema. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyLightPreset(map: any) {
  try {
    map.setConfigProperty(
      "basemap",
      "lightPreset",
      isDarkTheme() ? "night" : "day",
    );
  } catch {
    /* setConfigProperty sólo existe en el estilo Standard */
  }
}

export function LocationMap() {
  const { lat, lng } = site.address.geo;
  const containerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const [open, setOpen] = useState<boolean | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Estado abierto/cerrado, recalculado cada minuto.
  useEffect(() => {
    const tick = () => setOpen(computeIsOpen());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  // Observa el tema (clase .dark en <html>).
  useEffect(() => {
    const el = document.documentElement;
    const read = () => setTheme(el.classList.contains("dark") ? "dark" : "light");
    read();
    const obs = new MutationObserver(read);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // Crea el mapa una sola vez.
  useEffect(() => {
    if (!MAPBOX_TOKEN || !containerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      const mapboxgl = (await import("mapbox-gl")).default;
      mapboxgl.accessToken = MAPBOX_TOKEN as string;
      if (cancelled || !containerRef.current) return;

      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: STYLE_STANDARD,
        center: [lng, lat],
        zoom: 16,
        pitch: 60,
        bearing: -22,
        antialias: true,
        attributionControl: false,
        scrollZoom: false, // sin secuestrar el scroll de la página ni el aviso gris
      });
      mapRef.current = map;

      map.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        "bottom-right",
      );

      // Al cargar el estilo, fija el preset de luz según el tema actual.
      map.on("style.load", () => {
        if (!cancelled) applyLightPreset(map);
      });

      // El marcador se crea una vez y persiste entre cambios de estilo.
      map.on("load", () => {
        if (cancelled) return;
        const el = document.createElement("div");
        el.className = "cmap-pin";
        el.innerHTML =
          '<span class="cmap-pin__radar"></span>' +
          '<span class="cmap-pin__ring"></span>' +
          '<span class="cmap-pin__ring cmap-pin__ring--2"></span>' +
          '<span class="cmap-pin__core"></span>';
        new mapboxgl.Marker({ element: el, anchor: "center" })
          .setLngLat([lng, lat])
          .addTo(map);
      });
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lat, lng]);

  // Alterna día/noche del estilo Standard al cambiar el tema.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    applyLightPreset(map);
  }, [theme]);

  const embedSrc = `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;

  return (
    <div className="cyber-map h-[480px] sm:h-[560px]">
      {/* Capa del mapa */}
      {MAPBOX_TOKEN ? (
        <div ref={containerRef} className="cyber-map__canvas" aria-label="Mapa" />
      ) : (
        <>
          <iframe
            title="Ubicación de SICAMET"
            src={embedSrc}
            loading="lazy"
            tabIndex={-1}
            referrerPolicy="no-referrer-when-downgrade"
            className="cyber-map__canvas cyber-map__iframe"
          />
          {/* Sin token el iframe es de Google: lo dejamos NO interactivo (así
              no aparece el aviso "Ctrl+scroll") y todo el mapa abre Maps. */}
          <a
            href={site.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-map__cover"
            aria-label="Abrir ubicación en Google Maps"
          />
        </>
      )}

      {/* Acabados (sin gradientes, acento amarillo) */}
      <div className="cyber-map__tint" />
      <div className="cyber-map__scan" />
      <div className="cyber-map__vignette" />
      <div className="cyber-map__edge" />

      {/* Marcos HUD en las esquinas */}
      <span className="cyber-map__corner cyber-map__corner--tl" />
      <span className="cyber-map__corner cyber-map__corner--tr" />
      <span className="cyber-map__corner cyber-map__corner--bl" />
      <span className="cyber-map__corner cyber-map__corner--br" />

      {/* Pin del fallback iframe (Mapbox dibuja el suyo encima del canvas) */}
      {!MAPBOX_TOKEN && (
        <div className="cyber-map__staticpin">
          <span className="cmap-pin__label">SICAMET</span>
          <span className="cmap-pin__radar" />
          <span className="cmap-pin__ring" />
          <span className="cmap-pin__ring cmap-pin__ring--2" />
          <span className="cmap-pin__core" />
        </div>
      )}

      {/* Indicador ABIERTO / CERRADO en vivo */}
      {open !== null && (
        <div
          className={`cyber-map__open ${
            open ? "cyber-map__open--on" : "cyber-map__open--off"
          }`}
        >
          <span className="cmap-livedot" />
          {open ? "Abierto ahora" : "Cerrado"}
        </div>
      )}

      {/* Tarjeta glassmorphism con datos */}
      <div className="cyber-map__card">
        <div className="cyber-map__cardhead">
          <span className="cyber-map__badge">
            <Radio className="h-4 w-4" />
          </span>
          <div>
            <p className="cyber-map__name">{site.name}</p>
            <p className="cyber-map__eyebrow">Laboratorio · Toluca</p>
          </div>
        </div>

        <p className="cyber-map__addr">{site.address.full}</p>

        <p className="cyber-map__row">
          <Clock className="h-4 w-4 shrink-0" />
          <span>
            Lun – Vie · 8:00 a 18:00
            {open !== null && (
              <>
                {" — "}
                <span
                  className={
                    open ? "cyber-map__hours--on" : "cyber-map__hours--off"
                  }
                >
                  {open ? "Abierto" : "Cerrado ahora"}
                </span>
              </>
            )}
          </span>
        </p>

        <a
          href={site.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cyber-map__cta"
        >
          <Navigation className="h-4 w-4" /> Cómo llegar
        </a>
      </div>
    </div>
  );
}
