"use client";

import { useMemo, useState } from "react";

/**
 * Diagrama interactivo del proceso de atención a quejas (ISO 17025).
 *
 * Código de color con significado (no decorativo):
 *  - azul  = pasos operativos de la ruta principal
 *  - teal  = notificación
 *  - ámbar = puntos de decisión
 *  - verde = estado terminal (cierre)
 *  - gris  = caminos de "No" (retorno / retroalimentación)
 *
 * Interacción: pasar el cursor sobre un nodo enfoca su trayectoria; hacer clic
 * fija el detalle en el panel lateral.
 */

type NodeType = "step" | "teal" | "amber" | "green";

interface FlowNode {
  id: string;
  label: string;
  type: NodeType;
  n?: number; // número de paso (ruta principal)
  glyph?: string; // símbolo para nodos no numerados
  kicker: string;
  desc: string;
  channels?: string[];
  branches?: { label: string; tone: "yes" | "no"; text: string }[];
}

const NODES: FlowNode[] = [
  {
    id: "cliente",
    label: "Cliente",
    type: "step",
    n: 1,
    kicker: "Paso 1 · Ruta principal",
    desc: "El cliente notifica su queja o reclamo por uno de tres canales.",
    channels: ["URL", "Teléfono", "E-mail"],
  },
  {
    id: "registro",
    label: "Registro",
    type: "step",
    n: 2,
    kicker: "Paso 2 · Ruta principal",
    desc: "El área de Atención a Clientes registra formalmente la solicitud.",
  },
  {
    id: "validacion",
    label: "Validación",
    type: "step",
    n: 3,
    kicker: "Paso 3 · Decisión ¿Procede?",
    desc: "Se evalúa si la queja procede. Aquí el flujo se bifurca.",
    branches: [
      {
        label: "Sí procede",
        tone: "yes",
        text: "Pasa a Investigación para un análisis a fondo.",
      },
      {
        label: "No procede",
        tone: "no",
        text: "Salta directo a Notificación, sin abrir investigación.",
      },
    ],
  },
  {
    id: "investigacion",
    label: "Investigación",
    type: "step",
    n: 4,
    kicker: "Paso 4 · Ruta principal",
    desc: "Si procede (rama «Sí»), se analiza el caso a fondo.",
  },
  {
    id: "atencion",
    label: "Atención",
    type: "step",
    n: 5,
    kicker: "Paso 5 · Ruta principal",
    desc: "Se genera y envía al cliente el documento con la resolución.",
  },
  {
    id: "notificacion",
    label: "Notificación",
    type: "teal",
    glyph: "✉",
    kicker: "Notificación al cliente",
    desc: "Recibe entradas del paso 5 (resolución) y de la rama «No procede»; informa al cliente las acciones y alimenta el punto de decisión final.",
  },
  {
    id: "resolucion",
    label: "¿Resolución?",
    type: "amber",
    glyph: "?",
    kicker: "Decisión · Conformidad",
    desc: "Se verifica la conformidad del cliente con la atención recibida.",
    branches: [
      {
        label: "Sí, conforme",
        tone: "yes",
        text: "Se procede al Cierre: caso concluido.",
      },
      {
        label: "No conforme",
        tone: "no",
        text: "El lazo «reabre» devuelve el caso al inicio para volver a tratarlo.",
      },
    ],
  },
  {
    id: "cierre",
    label: "Cierre",
    type: "green",
    glyph: "✓",
    kicker: "Estado terminal",
    desc: "Caso concluido satisfactoriamente.",
  },
];

interface FlowEdge {
  from: string;
  to: string;
  kind: "flow" | "no";
  label?: string;
}

const EDGES: FlowEdge[] = [
  { from: "cliente", to: "registro", kind: "flow" },
  { from: "registro", to: "validacion", kind: "flow" },
  { from: "validacion", to: "investigacion", kind: "flow", label: "Sí" },
  { from: "investigacion", to: "atencion", kind: "flow" },
  { from: "atencion", to: "notificacion", kind: "flow" },
  { from: "notificacion", to: "resolucion", kind: "flow" },
  { from: "resolucion", to: "cierre", kind: "flow", label: "Sí" },
  { from: "validacion", to: "notificacion", kind: "no", label: "No procede" },
  { from: "resolucion", to: "cliente", kind: "no", label: "No · reabre" },
];

// Geometría (sistema de coordenadas del viewBox).
const W = 200;
const H = 58;
const CX = 260;
const LEFT = 160;
const RIGHT = 360;
const RIGHT_LANE = 404;
const LEFT_LANE = 116;
const Y: Record<string, number> = {
  cliente: 24,
  registro: 128,
  validacion: 232,
  investigacion: 336,
  atencion: 440,
  notificacion: 544,
  resolucion: 648,
  cierre: 752,
};
const VB_H = 834;

const FILL: Record<NodeType, string> = {
  step: "#1456c9",
  teal: "#0d9488",
  amber: "#d97706",
  green: "#16a34a",
};
const BLUE = "#1456c9";
const GRAY = "#94a3b8";

function edgePath(e: FlowEdge): string {
  if (e.kind === "flow") {
    return `M ${CX} ${Y[e.from] + H} L ${CX} ${Y[e.to]}`;
  }
  if (e.from === "validacion") {
    // bypass "No procede": baja por el carril derecho hasta Notificación
    return `M ${RIGHT} ${Y.validacion + H / 2} H ${RIGHT_LANE} V ${Y.notificacion + H / 2} H ${RIGHT}`;
  }
  // lazo "reabre": sube por el carril izquierdo de vuelta a Cliente
  return `M ${LEFT} ${Y.resolucion + H / 2} H ${LEFT_LANE} V ${Y.cliente + H / 2} H ${LEFT}`;
}

export function ComplaintFlow() {
  const [selected, setSelected] = useState("cliente");
  const [hover, setHover] = useState<string | null>(null);

  const sel = NODES.find((n) => n.id === selected)!;
  const focus = hover; // el dimming sólo ocurre al pasar el cursor
  const highlight = hover ?? selected;

  const related = useMemo(() => {
    const map: Record<string, Set<string>> = {};
    for (const n of NODES) map[n.id] = new Set([n.id]);
    for (const e of EDGES) {
      map[e.from].add(e.to);
      map[e.to].add(e.from);
    }
    return map;
  }, []);

  const nodeDim = (id: string) => focus !== null && !related[focus].has(id);
  const nodeOn = (id: string) => id === selected || id === hover;
  const edgeDim = (e: FlowEdge) =>
    focus !== null && e.from !== focus && e.to !== focus;
  const edgeOn = (e: FlowEdge) =>
    highlight !== null && (e.from === highlight || e.to === highlight);

  return (
    <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-start">
      {/* Diagrama */}
      <div className="surface rounded-3xl border border-border p-4 sm:p-6">
        <svg
          viewBox={`0 0 520 ${VB_H}`}
          className="mx-auto h-auto w-full max-w-[440px]"
          role="img"
          aria-label="Diagrama del proceso de atención a quejas"
        >
          <defs>
            <marker
              id="cf-arrow-blue"
              markerWidth="11"
              markerHeight="11"
              refX="8"
              refY="3.5"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M0,0 L9,3.5 L0,7 Z" fill={BLUE} />
            </marker>
            <marker
              id="cf-arrow-gray"
              markerWidth="11"
              markerHeight="11"
              refX="8"
              refY="3.5"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M0,0 L9,3.5 L0,7 Z" fill={GRAY} />
            </marker>
          </defs>

          {/* Aristas */}
          {EDGES.map((e, i) => {
            const on = edgeOn(e);
            const dim = edgeDim(e);
            const color = e.kind === "no" ? GRAY : BLUE;
            return (
              <g
                key={i}
                style={{ transition: "opacity .2s" }}
                opacity={dim ? 0.18 : 1}
              >
                <path
                  d={edgePath(e)}
                  fill="none"
                  stroke={color}
                  strokeWidth={on ? 4 : 2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={e.kind === "no" ? "7 6" : undefined}
                  markerEnd={`url(#cf-arrow-${e.kind === "no" ? "gray" : "blue"})`}
                  className={on ? "cf-edge cf-edge--on" : "cf-edge"}
                />
              </g>
            );
          })}

          {/* Etiquetas de rama */}
          {[
            { x: 296, y: 313, t: "Sí", tone: "yes" as const },
            { x: 296, y: 731, t: "Sí", tone: "yes" as const },
            { x: RIGHT_LANE, y: 408, t: "No procede", tone: "no" as const },
            { x: LEFT_LANE, y: 360, t: "No · reabre", tone: "no" as const },
          ].map((l, i) => {
            const w = l.t.length * 6.2 + 14;
            return (
              <g key={`lbl-${i}`}>
                <rect
                  x={l.x - w / 2}
                  y={l.y - 11}
                  width={w}
                  height={22}
                  rx={11}
                  fill="var(--card)"
                  stroke="var(--border)"
                />
                <text
                  x={l.x}
                  y={l.y + 4}
                  textAnchor="middle"
                  fontSize="12.5"
                  fontWeight={700}
                  fill={l.tone === "no" ? GRAY : BLUE}
                >
                  {l.t}
                </text>
              </g>
            );
          })}

          {/* Nodos */}
          {NODES.map((node) => {
            const y = Y[node.id];
            const on = nodeOn(node.id);
            const dim = nodeDim(node.id);
            const color = FILL[node.type];
            return (
              <g
                key={node.id}
                role="button"
                tabIndex={0}
                aria-pressed={node.id === selected}
                aria-label={node.label}
                style={{ cursor: "pointer", transition: "opacity .2s" }}
                opacity={dim ? 0.32 : 1}
                onMouseEnter={() => setHover(node.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(node.id)}
                onBlur={() => setHover(null)}
                onClick={() => setSelected(node.id)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    setSelected(node.id);
                  }
                }}
              >
                {on && (
                  <rect
                    x={LEFT - 4}
                    y={y - 4}
                    width={W + 8}
                    height={H + 8}
                    rx={18}
                    fill="none"
                    stroke={color}
                    strokeWidth={3}
                    opacity={0.5}
                  />
                )}
                <rect
                  x={LEFT}
                  y={y}
                  width={W}
                  height={H}
                  rx={14}
                  fill={color}
                />
                {/* insignia: número o glifo */}
                <circle cx={LEFT + 30} cy={y + H / 2} r={15} fill="#ffffff" />
                <text
                  x={LEFT + 30}
                  y={y + H / 2 + 5}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight={800}
                  fill={color}
                >
                  {node.n ?? node.glyph}
                </text>
                <text
                  x={LEFT + 56}
                  y={y + H / 2 + 6}
                  fontSize="17.5"
                  fontWeight={700}
                  fill="#ffffff"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Leyenda */}
        <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted">
          {[
            { c: FILL.step, t: "Ruta principal" },
            { c: FILL.teal, t: "Notificación" },
            { c: FILL.amber, t: "Decisión" },
            { c: FILL.green, t: "Cierre" },
            { c: GRAY, t: "Retorno «No»" },
          ].map((l) => (
            <li key={l.t} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: l.c }}
              />
              {l.t}
            </li>
          ))}
        </ul>
      </div>

      {/* Panel de detalle */}
      <div className="surface rounded-3xl border border-border p-6 lg:sticky lg:top-24">
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white"
          style={{ background: FILL[sel.type] }}
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-white/90 text-[11px] font-extrabold" style={{ color: FILL[sel.type] }}>
            {sel.n ?? sel.glyph}
          </span>
          {sel.label}
        </span>
        <p className="mt-3 text-[11px] uppercase tracking-wider text-muted">
          {sel.kicker}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/90">
          {sel.desc}
        </p>

        {sel.channels && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-muted">Canales</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {sel.channels.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border bg-brand/10 px-3 py-1 text-xs font-medium text-brand"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {sel.branches && (
          <div className="mt-4 space-y-2">
            {sel.branches.map((b) => (
              <div
                key={b.label}
                className="rounded-2xl border border-border p-3"
              >
                <p
                  className="text-xs font-bold"
                  style={{ color: b.tone === "yes" ? FILL.green : GRAY }}
                >
                  {b.label}
                </p>
                <p className="mt-0.5 text-xs text-muted">{b.text}</p>
              </div>
            ))}
          </div>
        )}

        <p className="mt-5 text-[11px] text-muted">
          Toca cualquier paso del diagrama para ver su detalle.
        </p>
      </div>
    </div>
  );
}
