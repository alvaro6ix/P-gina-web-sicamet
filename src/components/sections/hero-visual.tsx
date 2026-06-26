"use client";

import { useEffect, useRef, useState } from "react";
import {
  Thermometer,
  Gauge,
  Scale,
  Droplets,
  Wind,
  ShieldCheck,
} from "lucide-react";

/**
 * Driver de "lectura viva" compartido: lleva un valor que deriva suave hacia
 * objetivos aleatorios dentro del rango. Llama a onFrame(f) cada frame (para
 * que cada instrumento mueva SU propio gráfico) y devuelve el número ya
 * suavizado para mostrar (refresco con calma, legible).
 */
function useLive(min: number, max: number, onFrame: (f: number) => void) {
  const [val, setVal] = useState(min + (max - min) * 0.5);
  const cb = useRef(onFrame);
  useEffect(() => {
    cb.current = onFrame;
  });

  useEffect(() => {
    let cur = 0.5;
    let target = 0.5;
    let raf = 0;
    let last = performance.now();
    let tTarget = 0;
    let tRead = 0;
    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      tTarget += dt;
      tRead += dt;
      if (tTarget > 2200) {
        tTarget = 0;
        target = 0.28 + Math.random() * 0.48;
      }
      cur += (target - cur) * Math.min(1, dt * 0.0024);
      const f = Math.max(0.02, Math.min(0.98, cur + Math.sin(now * 0.0016) * 0.005));
      cb.current(f);
      if (tRead > 320) {
        tRead = 0;
        setVal(min + f * (max - min));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [min, max]);

  return val;
}

function Readout({
  label,
  value,
  unit,
  decimals,
  sub,
}: {
  label: string;
  value: number;
  unit: string;
  decimals: number;
  sub: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
      <p className="mt-1 font-mono text-[2rem] font-bold leading-none tabular-nums text-foreground">
        {value.toFixed(decimals)}
        <span className="ml-1 text-sm font-medium text-accent">{unit}</span>
      </p>
      <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-card-soft px-2 py-0.5 text-[10px] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {sub}
      </p>
    </div>
  );
}

/* 🌡️ Temperatura — termómetro que se llena al valor */
function TempInstrument() {
  const fill = useRef<SVGRectElement>(null);
  const val = useLive(-20, 120, (f) => {
    if (!fill.current) return;
    const h = 8 + f * 104;
    fill.current.setAttribute("height", h.toFixed(1));
    fill.current.setAttribute("y", (122 - h).toFixed(1));
  });
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 64 150" className="h-36 w-auto" role="img" aria-label="Termómetro">
        <rect x="22" y="12" width="18" height="112" rx="9" fill="var(--card-soft)" stroke="var(--border)" strokeWidth="2" />
        <rect ref={fill} x="25" y="114" width="12" height="8" rx="6" fill="var(--accent)" />
        <circle cx="31" cy="130" r="15" fill="var(--accent)" stroke="var(--border)" strokeWidth="2" />
        <circle cx="31" cy="130" r="7" fill="#fff" opacity="0.25" />
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1="42" y1={18 + i * 16} x2="49" y2={18 + i * 16} stroke="var(--muted)" strokeWidth="1.4" opacity="0.6" />
        ))}
      </svg>
      <Readout label="Temperatura" value={val} unit="°C" decimals={2} sub="Sonda PT100" />
    </div>
  );
}

/* ⏱️ Presión — dial con aguja que apunta al valor */
function PressureInstrument() {
  const needle = useRef<SVGGElement>(null);
  const val = useLive(80, 240, (f) => {
    if (needle.current) needle.current.style.transform = `rotate(${-90 + f * 180}deg)`;
  });
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 160 104" className="h-28 w-auto" role="img" aria-label="Manómetro">
        <path d="M16 92 A64 64 0 0 1 144 92" fill="none" stroke="var(--border-strong)" strokeWidth="9" strokeLinecap="round" />
        <path d="M118 44 A64 64 0 0 1 144 92" fill="none" stroke="var(--accent)" strokeWidth="9" strokeLinecap="round" opacity="0.55" />
        {Array.from({ length: 11 }).map((_, i) => {
          const a = (Math.PI * i) / 10;
          const x1 = 80 - Math.cos(a) * 56;
          const y1 = 92 - Math.sin(a) * 56;
          const x2 = 80 - Math.cos(a) * 48;
          const y2 = 92 - Math.sin(a) * 48;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--muted)" strokeWidth={i % 5 === 0 ? 2 : 1} opacity={i % 5 === 0 ? 0.9 : 0.45} />;
        })}
        <g ref={needle} style={{ transformOrigin: "80px 92px" }}>
          <line x1="80" y1="92" x2="80" y2="40" stroke="var(--brand)" strokeWidth="3.5" strokeLinecap="round" />
        </g>
        <circle cx="80" cy="92" r="8" fill="var(--card)" stroke="var(--brand)" strokeWidth="3" />
        <circle cx="80" cy="92" r="3" fill="var(--brand)" />
      </svg>
      <Readout label="Presión" value={val} unit="kPa" decimals={1} sub="0 – 250 kPa" />
    </div>
  );
}

/* ⚖️ Masa — balanza con barra de carga proporcional */
function MassInstrument() {
  const bar = useRef<SVGRectElement>(null);
  const val = useLive(100, 1000, (f) => {
    if (bar.current) bar.current.setAttribute("width", (f * 62).toFixed(1));
  });
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 150 134" className="h-32 w-auto" role="img" aria-label="Balanza">
        <g style={{ transformOrigin: "75px 60px", animation: "weigh-bob 3.4s ease-in-out infinite" }}>
          <rect x="55" y="32" width="40" height="30" rx="5" fill="var(--brand)" />
          <path d="M64 32 q11 -13 22 0" fill="none" stroke="var(--brand)" strokeWidth="5" strokeLinecap="round" />
          {/* denominación grabada en la pesa patrón */}
          <text x="75" y="51" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff" className="font-mono">
            kg
          </text>
          <ellipse cx="75" cy="72" rx="46" ry="8" fill="var(--card)" stroke="var(--brand)" strokeWidth="2.5" />
        </g>
        <rect x="36" y="86" width="78" height="36" rx="9" fill="var(--card-soft)" stroke="var(--border)" strokeWidth="2" />
        <rect x="44" y="106" width="62" height="7" rx="3.5" fill="var(--border-strong)" />
        <rect ref={bar} x="44" y="106" width="31" height="7" rx="3.5" fill="var(--accent)" />
        <circle cx="105" cy="95" r="2.4" fill="var(--accent)">
          <animate attributeName="opacity" values="1;0.25;1" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </svg>
      <Readout label="Masa" value={val} unit="g" decimals={3} sub="Estable" />
    </div>
  );
}

/* 💧 Humedad — vaso que se llena de agua al nivel de %HR */
function HumidityInstrument() {
  const water = useRef<SVGGElement>(null);
  const val = useLive(30, 75, (f) => {
    if (water.current) water.current.style.transform = `translateY(${(112 - f * 80).toFixed(1)}px)`;
  });
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 104 140" className="h-36 w-auto" role="img" aria-label="Humedad">
        <defs>
          <clipPath id="beaker">
            <path d="M30 26 h44 v74 a16 16 0 0 1 -16 16 h-12 a16 16 0 0 1 -16 -16 z" />
          </clipPath>
        </defs>
        <g clipPath="url(#beaker)">
          <rect x="0" y="0" width="104" height="140" fill="var(--card-soft)" />
          <g ref={water}>
            <path
              d="M-10 6 q14 -9 28 0 t28 0 t28 0 t28 0 t28 0 v150 h-140 z"
              fill="var(--accent)"
              opacity="0.85"
              style={{ animation: "wave-shift 2.8s linear infinite" }}
            />
          </g>
        </g>
        <path d="M30 26 h44 v74 a16 16 0 0 1 -16 16 h-12 a16 16 0 0 1 -16 -16 z" fill="none" stroke="var(--border)" strokeWidth="2.5" />
        <line x1="74" y1="44" x2="82" y2="44" stroke="var(--muted)" strokeWidth="1.4" opacity="0.6" />
        <line x1="74" y1="70" x2="82" y2="70" stroke="var(--muted)" strokeWidth="1.4" opacity="0.6" />
        <line x1="74" y1="96" x2="82" y2="96" stroke="var(--muted)" strokeWidth="1.4" opacity="0.6" />
      </svg>
      <Readout label="Humedad" value={val} unit="%HR" decimals={1} sub="Higrómetro" />
    </div>
  );
}

/* 🌬️ Flujo — tubería con partículas; su velocidad sube con el caudal */
function FlowInstrument() {
  const last = useRef(0);
  const off = useRef(0);
  const rot = useRef(0);
  const l0 = useRef<SVGLineElement>(null);
  const l1 = useRef<SVGLineElement>(null);
  const l2 = useRef<SVGLineElement>(null);
  const imp = useRef<SVGGElement>(null);
  const val = useLive(5, 60, (f) => {
    const now = performance.now();
    const dt = last.current ? Math.min(64, now - last.current) : 16;
    last.current = now;
    off.current -= f * 0.5 * dt;
    rot.current += f * 0.6 * dt;
    const o = off.current.toFixed(1);
    [l0, l1, l2].forEach((r) => {
      if (r.current) r.current.style.strokeDashoffset = o;
    });
    if (imp.current) imp.current.style.transform = `rotate(${rot.current.toFixed(1)}deg)`;
  });
  const lines = [l0, l1, l2];
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 160 110" className="h-28 w-auto" role="img" aria-label="Flujo">
        <rect x="12" y="46" width="136" height="34" rx="17" fill="var(--card-soft)" stroke="var(--border)" strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            ref={lines[i]}
            x1="22"
            y1={63}
            x2="138"
            y2={63}
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="5 20"
            style={{ transform: `translateY(${(i - 1) * 10}px)` }}
          />
        ))}
        <g ref={imp} style={{ transformOrigin: "130px 26px" }}>
          <line x1="130" y1="12" x2="130" y2="40" stroke="var(--brand)" strokeWidth="3" strokeLinecap="round" />
          <line x1="116" y1="26" x2="144" y2="26" stroke="var(--brand)" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx="130" cy="26" r="4.5" fill="var(--card)" stroke="var(--brand)" strokeWidth="2.5" />
      </svg>
      <Readout label="Flujo" value={val} unit="L/min" decimals={2} sub="Caudalímetro" />
    </div>
  );
}

const ITEMS = [
  { key: "temperature", label: "Temperatura", icon: Thermometer, Cmp: TempInstrument },
  { key: "pressure", label: "Presión", icon: Gauge, Cmp: PressureInstrument },
  { key: "mass", label: "Masa", icon: Scale, Cmp: MassInstrument },
  { key: "humidity", label: "Humedad", icon: Droplets, Cmp: HumidityInstrument },
  { key: "flow", label: "Flujo", icon: Wind, Cmp: FlowInstrument },
];

/**
 * Panel del hero: un instrumento ÚNICO por magnitud (no el mismo repetido),
 * cada uno reaccionando a su valor en vivo. Compacto e interactivo.
 */
export function HeroVisual() {
  const [active, setActive] = useState(0);
  const Active = ITEMS[active].Cmp;

  return (
    <div className="mx-auto w-full max-w-sm">
      {/* Sello calibrado, sin tarjeta de fondo */}
      <div className="mb-3 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
        <ShieldCheck className="h-3.5 w-3.5 text-success" /> Calibrado
        <span className="h-3 w-px bg-border" />
        <span className="font-mono">ISO/IEC 17025</span>
      </div>

      {/* Instrumento puro, sin tarjeta glass. key={active} → se "construye"
          al cargar y cada vez que cambias de magnitud. */}
      <div key={active} className="instr-build flex min-h-[160px] items-center justify-center">
        <Active />
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {ITEMS.map((m, i) => {
          const MIcon = m.icon;
          const on = i === active;
          return (
            <button
              key={m.key}
              onClick={() => setActive(i)}
              aria-pressed={on}
              style={{ animationDelay: `${0.5 + i * 0.08}s` }}
              className={`hv-chip-in inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                on
                  ? "bg-accent text-white shadow-sm shadow-accent/30"
                  : "border border-border bg-card text-muted hover:border-accent hover:text-accent"
              }`}
            >
              <MIcon className="h-3.5 w-3.5" />
              {m.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
