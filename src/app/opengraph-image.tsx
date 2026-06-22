import { ImageResponse } from "next/og";
import { accreditations, site } from "@/lib/content";

export const alt = `${site.name} — Laboratorio de metrología y calibración acreditado ISO/IEC 17025`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagen Open Graph de marca (se usa al compartir el sitio en redes/mensajería).
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a1f4d",
          backgroundImage:
            "radial-gradient(circle at 80% 0%, #15397f 0%, #0a1f4d 55%)",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* barra de acento dorada */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 16,
            height: "100%",
            backgroundColor: "#ffd300",
          }}
        />

        {/* encabezado: pill de acreditación */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "10px 22px",
              fontSize: 24,
              color: "#cde0ff",
            }}
          >
            ISO/IEC 17025:2017 · Acreditado por ema, a.c.
          </div>
        </div>

        {/* bloque central */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            {site.name}
            <span style={{ color: "#ffd300" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 42,
              color: "#e8f0ff",
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 12,
              fontSize: 28,
              color: "#9fb6dd",
            }}
          >
            Calibración · Calificación · Metrología · {site.address.city}, México
          </div>
        </div>

        {/* pie: señales clave */}
        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 26,
            color: "#cde0ff",
          }}
        >
          <div style={{ display: "flex" }}>
            {accreditations.length} acreditaciones ema
          </div>
          <div style={{ display: "flex", color: "#ffd300" }}>•</div>
          <div style={{ display: "flex" }}>
            Único partner Vaisala en México
          </div>
          <div style={{ display: "flex", color: "#ffd300" }}>•</div>
          <div style={{ display: "flex" }}>sicamet.mx</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
