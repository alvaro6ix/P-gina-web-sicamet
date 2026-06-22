/**
 * Instrumentos de metrología en SVG animado.
 * Representan las magnitudes/servicios de SICAMET en movimiento.
 * Usan var(--brand) (azul) y var(--gold) (dorado) para integrarse al tema.
 */

type Props = { className?: string };

const wrap = "h-full w-full";

/* ---------------- Manómetro / Presión (aguja que barre) -------------- */
export function PressureGauge({ className }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={className ?? wrap} role="img" aria-label="Manómetro de presión">
      <circle cx="100" cy="100" r="86" fill="none" stroke="var(--border)" strokeWidth="2" />
      <circle cx="100" cy="100" r="76" fill="var(--card-soft)" stroke="var(--border)" strokeWidth="1" />
      {Array.from({ length: 21 }).map((_, i) => {
        const a = (-140 + (i * 280) / 20) * (Math.PI / 180);
        const long = i % 5 === 0;
        const r1 = long ? 58 : 64;
        return (
          <line
            key={i}
            x1={100 + Math.cos(a) * r1}
            y1={100 + Math.sin(a) * r1}
            x2={100 + Math.cos(a) * 70}
            y2={100 + Math.sin(a) * 70}
            stroke={long ? "var(--brand)" : "var(--muted)"}
            strokeWidth={long ? 2.5 : 1}
            opacity={long ? 1 : 0.5}
          />
        );
      })}
      <g style={{ transformOrigin: "100px 100px", animation: "needle-sweep 3.2s ease-in-out infinite" }}>
        <line x1="100" y1="100" x2="100" y2="42" stroke="var(--gold)" strokeWidth="4" strokeLinecap="round" />
        <line x1="100" y1="100" x2="100" y2="116" stroke="var(--gold)" strokeWidth="4" strokeLinecap="round" />
      </g>
      <circle cx="100" cy="100" r="9" fill="var(--brand)" />
      <circle cx="100" cy="100" r="4" fill="var(--gold)" />
      <text x="100" y="150" textAnchor="middle" fontSize="11" className="font-mono" fill="var(--muted)">
        bar / Pa
      </text>
    </svg>
  );
}

/* ---------------- Termómetro (mercurio que sube y baja) -------------- */
export function Thermometer({ className }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={className ?? wrap} role="img" aria-label="Termómetro">
      <g transform="translate(100 18)">
        <rect x="-12" y="0" width="24" height="120" rx="12" fill="var(--card-soft)" stroke="var(--border)" strokeWidth="2" />
        <circle cx="0" cy="135" r="22" fill="var(--card-soft)" stroke="var(--border)" strokeWidth="2" />
        {/* columna animada */}
        <g style={{ transformOrigin: "0px 120px" }}>
          <rect
            x="-5"
            y="20"
            width="10"
            height="100"
            rx="5"
            fill="var(--brand)"
            style={{ transformOrigin: "0px 120px", animation: "mercury-rise 3.4s ease-in-out infinite" }}
          />
        </g>
        <circle cx="0" cy="135" r="13" fill="var(--gold)" />
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1="13" y1={18 + i * 18} x2="22" y2={18 + i * 18} stroke="var(--muted)" strokeWidth="1.5" opacity="0.6" />
        ))}
      </g>
    </svg>
  );
}

/* ---------------- Balanza / Masa (oscila) -------------- */
export function Balance({ className }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={className ?? wrap} role="img" aria-label="Balanza de masa">
      <line x1="100" y1="30" x2="100" y2="150" stroke="var(--border)" strokeWidth="4" />
      <rect x="70" y="150" width="60" height="10" rx="3" fill="var(--brand)" />
      <g style={{ transformOrigin: "100px 40px", animation: "needle-sweep 4s ease-in-out infinite" }}>
        <line x1="40" y1="40" x2="160" y2="40" stroke="var(--brand)" strokeWidth="5" strokeLinecap="round" />
        <circle cx="100" cy="40" r="7" fill="var(--gold)" />
        <g>
          <line x1="40" y1="40" x2="40" y2="70" stroke="var(--muted)" strokeWidth="2" />
          <path d="M22 70 h36 l-6 16 h-24 z" fill="var(--card-soft)" stroke="var(--border)" strokeWidth="1.5" />
        </g>
        <g>
          <line x1="160" y1="40" x2="160" y2="70" stroke="var(--muted)" strokeWidth="2" />
          <path d="M142 70 h36 l-6 16 h-24 z" fill="var(--card-soft)" stroke="var(--border)" strokeWidth="1.5" />
        </g>
      </g>
      <circle cx="100" cy="40" r="11" fill="none" stroke="var(--gold)" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

/* ---------------- Humedad (gota + ondas) -------------- */
export function Humidity({ className }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={className ?? wrap} role="img" aria-label="Humedad">
      <path
        d="M100 35 C 70 80, 55 105, 55 128 a45 45 0 0 0 90 0 C 145 105, 130 80, 100 35 Z"
        fill="var(--card-soft)"
        stroke="var(--brand)"
        strokeWidth="3"
      />
      <clipPath id="drop-clip">
        <path d="M100 35 C 70 80, 55 105, 55 128 a45 45 0 0 0 90 0 C 145 105, 130 80, 100 35 Z" />
      </clipPath>
      <g clipPath="url(#drop-clip)">
        <g style={{ animation: "wave-shift 2.6s linear infinite" }}>
          <path d="M40 120 q20 -10 40 0 t40 0 t40 0 t40 0 v80 h-200 z" fill="var(--brand)" opacity="0.85" />
        </g>
      </g>
      <circle cx="116" cy="70" r="6" fill="var(--gold)" opacity="0.9" />
    </svg>
  );
}

/* ---------------- Flujo (partículas por tubería) -------------- */
export function Flow({ className }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={className ?? wrap} role="img" aria-label="Flujo">
      <rect x="20" y="80" width="160" height="40" rx="20" fill="var(--card-soft)" stroke="var(--border)" strokeWidth="2" />
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1="30"
          y1={100}
          x2="170"
          y2={100}
          stroke="var(--brand)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="6 22"
          style={{ animation: `flow-dash 0.9s linear infinite`, animationDelay: `${i * 0.3}s`, transform: `translateY(${(i - 1) * 10}px)` }}
        />
      ))}
      <circle cx="150" cy="60" r="16" fill="none" stroke="var(--gold)" strokeWidth="3" />
      <line x1="150" y1="60" x2="150" y2="48" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" style={{ transformOrigin: "150px 60px", animation: "spin 1.6s linear infinite" }} />
    </svg>
  );
}

/* ---------------- Dimensional (calibrador / vernier) -------------- */
export function Dimensional({ className }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={className ?? wrap} role="img" aria-label="Dimensional">
      <rect x="20" y="92" width="160" height="16" rx="3" fill="var(--card-soft)" stroke="var(--border)" strokeWidth="2" />
      {Array.from({ length: 17 }).map((_, i) => (
        <line key={i} x1={28 + i * 9} y1="92" x2={28 + i * 9} y2={i % 5 === 0 ? 80 : 86} stroke="var(--muted)" strokeWidth="1.4" opacity="0.7" />
      ))}
      <g style={{ animation: "needle-sweep 3.6s ease-in-out infinite", transformOrigin: "100px 100px" }}>
        <rect x="92" y="74" width="16" height="52" rx="3" fill="var(--brand)" />
        <rect x="96" y="120" width="8" height="20" fill="var(--gold)" />
      </g>
    </svg>
  );
}

/* ---------------- Eléctrica (señal senoidal) -------------- */
export function Electrical({ className }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={className ?? wrap} role="img" aria-label="Eléctrica">
      <rect x="24" y="56" width="152" height="88" rx="10" fill="var(--card-soft)" stroke="var(--border)" strokeWidth="2" />
      <line x1="24" y1="100" x2="176" y2="100" stroke="var(--border)" strokeWidth="1" />
      <g clipPath="none">
        <path
          d="M24 100 q19 -42 38 0 t38 0 t38 0 t38 0 t38 0"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="3.5"
          style={{ animation: "wave-shift 1.8s linear infinite" }}
        />
      </g>
      <circle cx="150" cy="74" r="4" fill="var(--gold)">
        <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* -------- Certificado de calibración profesional (ISO/IEC 17025) -------- */
export function Certificate({ className }: Props) {
  return (
    <svg viewBox="0 0 260 330" className={className ?? wrap} role="img" aria-label="Certificado de calibración">
      <defs>
        <clipPath id="cert-page">
          <rect x="22" y="14" width="216" height="302" rx="10" />
        </clipPath>
      </defs>

      {/* hoja */}
      <rect x="22" y="14" width="216" height="302" rx="10" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
      <rect x="22" y="14" width="216" height="302" rx="10" fill="none" stroke="var(--brand)" strokeWidth="1" strokeDasharray="4 5" opacity="0.35" />

      {/* encabezado (azul) */}
      <g>
        <rect x="22" y="14" width="216" height="46" rx="10" fill="#0e3f8f" clipPath="url(#cert-page)" />
        <circle cx="46" cy="37" r="12" fill="#fff" />
        <circle cx="46" cy="37" r="12" fill="none" stroke="#bcd4f7" strokeWidth="1.2" opacity="0.7" />
        <text x="46" y="41" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0e3f8f" className="font-display">S</text>
        <text x="66" y="34" fontSize="13" fontWeight="700" fill="#fff" className="font-display">
          SICAMET
        </text>
        <text x="66" y="47" fontSize="7.5" fill="#dbe6fb" letterSpacing="0.5">
          CERTIFICADO DE CALIBRACIÓN
        </text>
      </g>

      {/* número de certificado */}
      <text x="34" y="76" fontSize="7.5" fill="var(--muted)" className="font-mono">
        No. ICMR 9.0024.26
      </text>
      <text x="204" y="76" fontSize="7.5" fill="var(--brand)" textAnchor="end" className="font-mono">
        ISO/IEC 17025
      </text>
      <line x1="34" y1="82" x2="226" y2="82" stroke="var(--border)" strokeWidth="1" />

      {/* campos del equipo */}
      {[
        ["Instrumento", "Termómetro digital"],
        ["Marca / Modelo", "Vaisala · HMT330"],
        ["No. de serie", "S-4471-26"],
        ["Magnitud", "Temperatura"],
      ].map(([k, v], i) => {
        const y = 96 + i * 16;
        return (
          <g key={k}>
            <text x="34" y={y} fontSize="7" fill="var(--muted)">{k}</text>
            <text x="226" y={y} fontSize="7.5" fontWeight="600" fill="var(--foreground)" textAnchor="end">{v}</text>
            <line x1="34" y1={y + 4} x2="226" y2={y + 4} stroke="var(--border)" strokeWidth="0.6" opacity="0.6" />
          </g>
        );
      })}

      {/* tabla de resultados */}
      <text x="34" y="178" fontSize="7.5" fontWeight="700" fill="var(--foreground)">
        Resultados de calibración
      </text>
      <rect x="34" y="184" width="192" height="14" rx="3" fill="var(--brand-soft)" />
      {["Patrón", "Lectura", "Error", "U (k=2)"].map((h, i) => (
        <text key={h} x={42 + i * 48} y="194" fontSize="6.5" fontWeight="700" fill="var(--brand)">{h}</text>
      ))}
      {[
        ["0.00", "0.01", "+0.01", "0.03"],
        ["50.00", "50.02", "+0.02", "0.03"],
        ["100.0", "99.98", "-0.02", "0.04"],
      ].map((row, r) => (
        <g key={r} style={{ opacity: 0, animation: `cert-row 3.4s ease-in-out infinite`, animationDelay: `${0.3 + r * 0.25}s` }}>
          {row.map((c, i) => (
            <text key={i} x={42 + i * 48} y={212 + r * 14} fontSize="6.5" fill="var(--foreground)" className="font-mono">{c}</text>
          ))}
          <line x1="34" y1={216 + r * 14} x2="226" y2={216 + r * 14} stroke="var(--border)" strokeWidth="0.5" opacity="0.5" />
        </g>
      ))}

      {/* pie: trazabilidad + firma + sello */}
      <text x="34" y="276" fontSize="6.5" fill="var(--muted)">
        Trazable a patrones nacionales (CENAM)
      </text>
      <text x="34" y="288" fontSize="6.5" fill="var(--muted)">
        Acreditado por ema, a.c. · Reconocimiento ILAC
      </text>

      {/* firma */}
      <path
        d="M40 304 q8 -12 16 0 t16 -2 q6 8 12 0"
        fill="none"
        stroke="var(--brand)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="70"
        strokeDashoffset="70"
        style={{ animation: "draw-check 3.4s ease-in-out infinite" }}
      />
      <line x1="36" y1="309" x2="96" y2="309" stroke="var(--muted)" strokeWidth="0.6" />
      <text x="36" y="316" fontSize="5.5" fill="var(--muted)">Firma autorizada</text>

      {/* sello verde de aprobación */}
      <g style={{ transformOrigin: "200px 298px", animation: "seal-stamp 3.4s ease-in-out infinite" }}>
        <circle cx="200" cy="298" r="20" fill="#16a34a" opacity="0.95" />
        {Array.from({ length: 18 }).map((_, i) => {
          const a = ((i * 360) / 18) * (Math.PI / 180);
          return <circle key={i} cx={200 + Math.cos(a) * 20} cy={298 + Math.sin(a) * 20} r="1.8" fill="#16a34a" />;
        })}
        <circle cx="200" cy="298" r="15" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.7" />
        <path
          d="M192 298 l6 6 l11 -12"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="34"
          strokeDashoffset="34"
          style={{ animation: "draw-check 3.4s ease-in-out infinite" }}
        />
      </g>

      {/* sello EMA (acreditación) — centrado en zona sin texto */}
      <g opacity="0.95">
        <circle cx="130" cy="260" r="16" fill="#fff" />
        <circle cx="130" cy="260" r="16" fill="none" stroke="#16a34a" strokeWidth="2" />
        <circle cx="130" cy="260" r="12" fill="none" stroke="#16a34a" strokeWidth="0.7" strokeDasharray="2 3" />
        <text x="130" y="259" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#16a34a" className="font-display">
          ema
        </text>
        <text x="130" y="268" textAnchor="middle" fontSize="4" fontWeight="600" fill="#16a34a" letterSpacing="0.5">
          ACREDITADO
        </text>
      </g>

      {/* línea de escaneo */}
      <rect
        x="22"
        y="60"
        width="216"
        height="2.5"
        fill="var(--brand)"
        opacity="0.35"
        clipPath="url(#cert-page)"
        style={{ animation: "cert-scan 3.4s ease-in-out infinite" }}
      />
    </svg>
  );
}

/* ---------------- Analizadores específicos (tacómetro/velocímetro) -------- */
export function Analyzer({ className }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={className ?? wrap} role="img" aria-label="Analizadores específicos">
      <path d="M34 132 A70 70 0 0 1 166 132" fill="none" stroke="var(--border)" strokeWidth="10" strokeLinecap="round" />
      {Array.from({ length: 11 }).map((_, i) => {
        const a = ((180 + (i * 180) / 10) * Math.PI) / 180;
        const long = i % 5 === 0;
        return (
          <line
            key={i}
            x1={100 + Math.cos(a) * 56}
            y1={132 + Math.sin(a) * 56}
            x2={100 + Math.cos(a) * (long ? 44 : 50)}
            y2={132 + Math.sin(a) * (long ? 44 : 50)}
            stroke={long ? "var(--brand)" : "var(--muted)"}
            strokeWidth={long ? 2.5 : 1.4}
          />
        );
      })}
      <g style={{ transformOrigin: "100px 132px", animation: "needle-sweep 1.6s ease-in-out infinite" }}>
        <line x1="100" y1="132" x2="100" y2="74" stroke="var(--gold)" strokeWidth="4" strokeLinecap="round" />
      </g>
      <circle cx="100" cy="132" r="8" fill="var(--brand)" />
      <circle cx="100" cy="132" r="3.5" fill="var(--gold)" />
      <text x="100" y="160" textAnchor="middle" fontSize="11" className="font-mono" fill="var(--muted)">rpm · km/h</text>
    </svg>
  );
}

/* ---------------- Fuerza (prensa / celda de carga) ----------------------- */
export function Force({ className }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={className ?? wrap} role="img" aria-label="Fuerza">
      {/* marco */}
      <line x1="44" y1="40" x2="44" y2="172" stroke="var(--border)" strokeWidth="6" strokeLinecap="round" />
      <line x1="156" y1="40" x2="156" y2="172" stroke="var(--border)" strokeWidth="6" strokeLinecap="round" />
      <rect x="40" y="36" width="120" height="10" rx="3" fill="var(--border)" />
      {/* yunque fijo */}
      <rect x="60" y="150" width="80" height="14" rx="3" fill="var(--brand)" />
      {/* cabezal que presiona */}
      <g style={{ transformOrigin: "100px 100px", animation: "force-press 1.8s ease-in-out infinite" }}>
        <rect x="64" y="64" width="72" height="16" rx="3" fill="var(--brand)" />
        <rect x="92" y="80" width="16" height="14" fill="var(--muted)" />
        {/* muestra/resorte */}
        <path d="M100 96 l-12 8 l24 8 l-24 8 l24 8 l-12 8" fill="none" stroke="var(--gold)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="100" y="184" textAnchor="middle" fontSize="11" className="font-mono" fill="var(--muted)">kN · HRC</text>
    </svg>
  );
}

/* ---------------- Mediciones especiales (cámara/estufa) ------------------ */
export function SpecialChamber({ className }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={className ?? wrap} role="img" aria-label="Mediciones especiales">
      <rect x="38" y="44" width="124" height="112" rx="8" fill="var(--card-soft)" stroke="var(--border)" strokeWidth="2" />
      <rect x="48" y="54" width="104" height="74" rx="4" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      {/* ventilador girando */}
      <g style={{ transformOrigin: "140px 66px", animation: "spin 2.2s linear infinite" }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <ellipse key={i} cx="140" cy="60" rx="2.6" ry="6" fill="var(--brand)" transform={`rotate(${i * 90} 140 66)`} />
        ))}
      </g>
      <circle cx="140" cy="66" r="2" fill="var(--gold)" />
      {/* ondas de calor */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${62 + i * 28} 120 q6 -10 12 0 t12 0`}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ animation: "ray-pulse 1.6s ease-in-out infinite", animationDelay: `${i * 0.25}s` }}
        />
      ))}
      {/* display */}
      <rect x="56" y="138" width="50" height="12" rx="2" fill="var(--brand)" />
      <text x="81" y="147" textAnchor="middle" fontSize="8" fill="#fff" className="font-mono">37.0 °C</text>
      <circle cx="148" cy="144" r="4" fill="var(--gold)">
        <animate attributeName="opacity" values="1;0.2;1" dur="1.3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ---------------- Óptica (fotómetro / iluminancia) ---------------------- */
export function Optics({ className }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={className ?? wrap} role="img" aria-label="Óptica">
      {/* fuente de luz */}
      <circle cx="52" cy="100" r="16" fill="var(--gold)" />
      <g style={{ transformOrigin: "52px 100px", animation: "spin 6s linear infinite" }}>
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          return (
            <line key={i} x1={52 + Math.cos(a) * 19} y1={100 + Math.sin(a) * 19} x2={52 + Math.cos(a) * 25} y2={100 + Math.sin(a) * 25} stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" />
          );
        })}
      </g>
      {/* rayos hacia el sensor */}
      {[-16, 0, 16].map((dy, i) => (
        <line
          key={i}
          x1="74"
          y1={100 + dy * 0.4}
          x2="134"
          y2={100 + dy}
          stroke="var(--gold)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="5 6"
          style={{ animation: "flow-dash 0.7s linear infinite, ray-pulse 1.4s ease-in-out infinite", animationDelay: `${i * 0.2}s` }}
        />
      ))}
      {/* sensor */}
      <rect x="136" y="78" width="34" height="44" rx="5" fill="var(--card-soft)" stroke="var(--brand)" strokeWidth="2.5" />
      <rect x="142" y="86" width="22" height="14" rx="2" fill="var(--brand)" />
      <text x="153" y="97" textAnchor="middle" fontSize="7" fill="#fff" className="font-mono">lux</text>
      <text x="153" y="114" textAnchor="middle" fontSize="8" fill="var(--brand)" className="font-mono">850</text>
    </svg>
  );
}

/* ---------------- Volumen (probeta graduada con menisco) ----------------- */
export function Volume({ className }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={className ?? wrap} role="img" aria-label="Volumen">
      <path d="M82 28 h36 v126 a18 18 0 0 1 -36 0 z" fill="var(--card-soft)" stroke="var(--border)" strokeWidth="2.5" />
      <clipPath id="vol-clip">
        <path d="M82 28 h36 v126 a18 18 0 0 1 -36 0 z" />
      </clipPath>
      <g clipPath="url(#vol-clip)">
        <rect
          x="82"
          y="60"
          width="36"
          height="112"
          fill="var(--brand)"
          opacity="0.85"
          style={{ transformOrigin: "100px 172px", animation: "mercury-rise 3.6s ease-in-out infinite" }}
        />
        <rect x="82" y="58" width="36" height="4" fill="var(--gold)" style={{ transformOrigin: "100px 172px", animation: "mercury-rise 3.6s ease-in-out infinite" }} />
      </g>
      {/* graduaciones */}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1="118" y1={48 + i * 16} x2={i % 2 === 0 ? 130 : 125} y2={48 + i * 16} stroke="var(--muted)" strokeWidth="1.4" opacity="0.7" />
      ))}
      <text x="100" y="190" textAnchor="middle" fontSize="11" className="font-mono" fill="var(--muted)">mL · µL</text>
    </svg>
  );
}

/* ---------------- Mapa de selección por nombre ---------------- */
const registry: Record<string, (p: Props) => React.JSX.Element> = {
  pressure: PressureGauge,
  temperature: Thermometer,
  mass: Balance,
  humidity: Humidity,
  flow: Flow,
  dimensional: Dimensional,
  electrical: Electrical,
  analyzers: Analyzer,
  force: Force,
  special: SpecialChamber,
  optics: Optics,
  volume: Volume,
  certificate: Certificate,
};

export function Instrument({ name, className }: { name: string; className?: string }) {
  const Cmp = registry[name] ?? PressureGauge;
  return <Cmp className={className} />;
}
