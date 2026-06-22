import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextRequest } from "next/server";
import {
  accreditations,
  certificatesPortal,
  faqs,
  services,
  site,
  whatsappUrl,
} from "@/lib/content";

export const runtime = "nodejs";

/**
 * Registra cada intercambio cliente↔bot en logs/chat-AAAA-MM-DD.jsonl.
 * Sirve para que Álvaro revise las dudas reales y vaya enriqueciendo las
 * FAQs / el system prompt (aprendizaje con curaduría humana, no fine-tuning).
 * Es "fire-and-forget": si falla el guardado, NUNCA rompe la respuesta al usuario.
 * NOTA: en Vercel el filesystem es efímero; para producción persistente
 * habrá que cambiar esto por una base de datos (ver conversación).
 */
async function logConversation(entry: {
  question: string;
  reply: string | null;
  error?: string;
}) {
  try {
    const dir = path.join(process.cwd(), "logs");
    await mkdir(dir, { recursive: true });
    const day = new Date().toISOString().slice(0, 10);
    const line =
      JSON.stringify({ ts: new Date().toISOString(), ...entry }) + "\n";
    await appendFile(path.join(dir, `chat-${day}.jsonl`), line, "utf8");
  } catch (e) {
    console.error("[chat] no se pudo registrar la conversación:", e);
  }
}

// Contexto que recibe el modelo para responder siempre como SICAMET.
const SYSTEM_PROMPT = `Eres el asistente virtual de ${site.legalName} (${site.name}),
un laboratorio de metrología en ${site.address.city}, México, acreditado bajo ISO/IEC 17025:2017
con ${site.yearsExperience} años de experiencia y único partner de Vaisala en México.

REGLAS:
- Responde SIEMPRE en español, de forma breve, profesional y cordial.
- Solo hablas de SICAMET: calibración, calificación, metrología, acreditaciones, capacitación y contacto.
- Si preguntan algo fuera de tema, redirige amablemente a los servicios de SICAMET.
- Si piden cotización o contacto, ofrece el WhatsApp ${site.whatsappDisplay} (canal preferido), el teléfono ${site.phones[0]} o el correo ${site.email}.
- El número de WhatsApp es ${site.whatsappDisplay}. NO es lo mismo que los teléfonos fijos; nunca des un teléfono fijo como si fuera el WhatsApp.
- Si preguntan cómo consultar, descargar o ver sus certificados/resultados, indícales que lo hacen en el portal de certificados en línea: ${certificatesPortal.domain} (acceso con su Razón Social y Código SICAMET).
- No inventes datos, precios ni alcances que no estén en la información proporcionada.
- Usa máximo 4 oraciones por respuesta cuando sea posible.

SERVICIOS:
${services.map((s) => `- ${s.title}: ${s.short}`).join("\n")}

ACREDITACIONES EMA (12 magnitudes):
${accreditations.map((a) => `- ${a.magnitude} (${a.code}): ${a.detail}`).join("\n")}

PREGUNTAS FRECUENTES:
${faqs.map((f) => `P: ${f.q}\nR: ${f.a}`).join("\n")}

PORTAL DE CERTIFICADOS:
- Los clientes consultan y descargan sus certificados en línea en ${certificatesPortal.domain}.
- ${certificatesPortal.features.join("\n- ")}

CONTACTO:
- WhatsApp: ${site.whatsappDisplay}
- Teléfonos fijos: ${site.phones.join(", ")}
- Correo: ${site.email}
- Dirección: ${site.address.full}`;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Reintenta una operación cuando Gemini devuelve un error TRANSITORIO
 * (503 sobrecarga, 429 rate limit, 500). No reintenta errores definitivos
 * (clave inválida, historial mal formado), que deben fallar de inmediato.
 */
async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const msg = err instanceof Error ? err.message : String(err);
      const transient = /\b(503|429|500)\b|overloaded|high demand|unavailable/i.test(
        msg,
      );
      if (!transient || i === attempts - 1) throw err;
      await sleep(600 * (i + 1)); // 600ms, 1200ms…
    }
  }
  throw lastErr;
}

type ChatMessage = { role: "user" | "model"; text: string };

export type ChatAction = {
  type: "whatsapp" | "maps" | "call" | "email" | "certificados";
  label: string;
  href: string;
};

/**
 * Detecta la intención del mensaje del cliente y devuelve botones de acción
 * (WhatsApp, mapa, llamada, correo, portal). WhatsApp es el canal prioritario
 * por petición del cliente. Se deduplican por tipo y se conserva el orden.
 */
function detectActions(message: string): ChatAction[] {
  const t = message
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, ""); // sin acentos para robustez
  const has = (...kw: string[]) => kw.some((k) => t.includes(k));
  const actions: ChatAction[] = [];
  const push = (a: ChatAction) => {
    if (!actions.some((x) => x.type === a.type)) actions.push(a);
  };

  const isContact = has(
    "whatsapp",
    "contact",
    "numero",
    "telefono",
    "llam",
    "comunic",
    "hablar con",
  );
  const isQuote = has("cotiz", "precio", "costo", "presupuesto", "cuanto cuesta");
  const isLocation = has(
    "ubicaci",
    "direccion",
    "donde estan",
    "donde se",
    "donde quedan",
    "como llego",
    "como llegar",
    "mapa",
    "sede",
    "domicilio",
    "sucursal",
  );
  const isEmail = has("correo", "email", "e-mail", "mail");
  const isCerts = has("certificad", "portal", "descargar mi", "mis resultados");

  if (isContact || isQuote) {
    push({
      type: "whatsapp",
      label: isQuote ? "Cotizar por WhatsApp" : "Escribir por WhatsApp",
      href: whatsappUrl(
        "Hola, vengo del sitio de SICAMET y me gustaría más información.",
      ),
    });
  }
  if (isContact) {
    push({
      type: "call",
      label: "Llamar",
      href: `tel:+52${site.phones[0].replace(/\D/g, "")}`,
    });
    push({ type: "email", label: "Enviar correo", href: `mailto:${site.email}` });
  }
  if (isLocation) {
    push({
      type: "maps",
      label: "Cómo llegar",
      href: site.address.mapsUrl,
    });
  }
  if (isEmail) {
    push({ type: "email", label: "Enviar correo", href: `mailto:${site.email}` });
  }
  if (isCerts) {
    push({
      type: "certificados",
      label: "Portal de certificados",
      href: certificatesPortal.url,
    });
  }
  return actions;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "El chatbot no está configurado. Agrega GEMINI_API_KEY en .env.local.",
      },
      { status: 503 },
    );
  }

  let body: { message?: string; history?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const message = (body.message || "").trim();
  if (!message) {
    return Response.json({ error: "Mensaje vacío." }, { status: 400 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const history = (body.history || [])
      .filter((m) => m.text?.trim())
      .slice(-8)
      .map((m) => ({ role: m.role, parts: [{ text: m.text }] }));

    // Gemini exige que el historial empiece en "user": si el corte dejó un
    // turno "model" al frente, lo descartamos.
    while (history.length && history[0].role !== "user") history.shift();

    const chat = model.startChat({
      history,
      generationConfig: { temperature: 0.5, maxOutputTokens: 400 },
    });

    const result = await withRetry(() => chat.sendMessage(message));
    const reply = result.response.text();

    void logConversation({ question: message, reply });

    return Response.json({ reply, actions: detectActions(message) });
  } catch (err) {
    console.error("[chat] error:", err);
    void logConversation({
      question: message,
      reply: null,
      error: err instanceof Error ? err.message : String(err),
    });
    return Response.json(
      { error: "No pude procesar tu mensaje. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
