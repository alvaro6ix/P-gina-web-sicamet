"use client";

import { useEffect, useState } from "react";
import { Instrument } from "@/components/metrology/instruments";
import { ShieldCheck } from "lucide-react";

type Mag = {
  key: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  decimals: number;
};

const MAGS: Mag[] = [
  { key: "temperature", label: "Temperatura", unit: "°C", min: -20, max: 120, decimals: 2 },
  { key: "pressure", label: "Presión", unit: "kPa", min: 80, max: 240, decimals: 1 },
  { key: "mass", label: "Masa", unit: "g", min: 100, max: 1000, decimals: 3 },
  { key: "humidity", label: "Humedad", unit: "%HR", min: 30, max: 75, decimals: 1 },
  { key: "flow", label: "Flujo", unit: "L/min", min: 5, max: 60, decimals: 2 },
];

/** Panel de instrumentos interactivo con lectura en vivo (da sensación de medición real). */
export function HeroVisual() {
  const [active, setActive] = useState(0);
  const [value, setValue] = useState(0);
  const mag = MAGS[active];

  // Lectura "viva" con throttle (≈8 fps) para no causar jank al hacer scroll.
  useEffect(() => {
    let t = 0;
    const id = window.setInterval(() => {
      t += 0.16;
      const noise = Math.sin(t * 2.1) * 0.5 + Math.sin(t * 5.3) * 0.25;
      const span = (mag.max - mag.min) * 0.12;
      const center = mag.min + (mag.max - mag.min) * 0.55;
      setValue(center + noise * span + (Math.sin(t) * span) / 3);
    }, 120);
    return () => clearInterval(id);
  }, [mag]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md p-2">
      {/* estado calibrado */}
      <div className="absolute right-2 top-2 z-10 flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-foreground">
        <ShieldCheck className="h-3.5 w-3.5 text-success" /> Calibrado
      </div>

      {/* instrumento */}
      <div className="relative mx-auto h-[62%] w-[82%]">
        <Instrument name={mag.key} />
      </div>

      {/* lectura digital en vivo */}
      <div className="mt-2 flex items-end justify-between rounded-2xl border border-border bg-card-soft px-4 py-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{mag.label}</p>
          <p className="font-mono text-2xl font-bold tabular-nums text-foreground">
            {value.toFixed(mag.decimals)}
            <span className="ml-1 text-sm font-medium text-brand">{mag.unit}</span>
          </p>
        </div>
        <span className="mb-1 flex h-2.5 w-2.5">
          <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-gold/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold" />
        </span>
      </div>

      {/* chips de magnitud */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {MAGS.map((m, i) => (
          <button
            key={m.key}
            onClick={() => setActive(i)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
              i === active
                ? // azul fijo accesible: blanco sobre #1456c9 = 6.5:1 (AA) en
                  // ambos temas; el --brand de modo oscuro (#3b86f7) fallaba
                  "bg-[#1456c9] text-white"
                : "border border-border bg-card text-muted hover:border-brand hover:text-brand"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}
