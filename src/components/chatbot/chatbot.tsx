"use client";

import { type ComponentType, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  FileCheck2,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { site, whatsappUrl } from "@/lib/content";
import { cn } from "@/lib/utils";
import { WhatsappGlyph } from "@/components/ui/whatsapp-glyph";

type ChatAction = {
  type: "whatsapp" | "maps" | "call" | "email" | "certificados";
  label: string;
  href: string;
};

type Msg = { role: "user" | "model"; text: string; actions?: ChatAction[] };

const ACTION_ICON: Record<
  ChatAction["type"],
  ComponentType<{ className?: string }>
> = {
  whatsapp: WhatsappGlyph,
  maps: MapPin,
  call: Phone,
  email: Mail,
  certificados: FileCheck2,
};

const SUGGESTIONS = [
  "¿Qué magnitudes calibran?",
  "¿Hacen calibración en sitio?",
  "Quiero una cotización",
];

const GREETING: Msg = {
  role: "model",
  text: `¡Hola! 👋 Soy el asistente de ${site.name}. ¿En qué puedo ayudarte con calibración o metrología?`,
  actions: [
    {
      type: "whatsapp",
      label: "Escribir por WhatsApp",
      href: whatsappUrl(
        "Hola, vengo del sitio de SICAMET y me gustaría más información.",
      ),
    },
    { type: "email", label: "Enviar correo", href: `mailto:${site.email}` },
  ],
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const next = [...messages, { role: "user", text: content } as Msg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          // Historial PREVIO (sin el saludo ni el mensaje actual: la API
          // reenvía `message` por su cuenta). Debe terminar en turno "model".
          history: messages.filter((m) => m !== GREETING),
        }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "model",
          text:
            data.reply ||
            data.error ||
            "Lo siento, ocurrió un problema. Llámanos al " + site.phones[0],
          actions: data.reply ? (data.actions as ChatAction[]) : undefined,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "model",
          text: `Hubo un error de conexión. Escríbenos por WhatsApp o al ${site.phones[0]}.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Botón lanzador: loader gooey + robot blanco */}
      <motion.button
        type="button"
        aria-label="Abrir asistente virtual"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 h-16 w-16"
      >
        <span className="bot-orb-loader" aria-hidden>
          <svg width={100} height={100} viewBox="0 0 100 100">
            <defs>
              <mask id="bot-clipping">
                <polygon points="0,0 100,0 100,100 0,100" fill="black" />
                <polygon points="25,25 75,25 50,75" fill="white" />
                <polygon points="50,25 75,75 25,75" fill="white" />
                <polygon points="35,35 65,35 50,65" fill="white" />
                <polygon points="35,35 65,35 50,65" fill="white" />
                <polygon points="35,35 65,35 50,65" fill="white" />
                <polygon points="35,35 65,35 50,65" fill="white" />
              </mask>
            </defs>
          </svg>
          <span className="box" />
        </span>

        {/* ícono robot blanco encima, sin fondo */}
        <span className="absolute inset-0 z-10 grid place-items-center text-white">
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="h-6 w-6 drop-shadow" />
              </motion.span>
            ) : (
              <motion.span
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Bot className="h-7 w-7 drop-shadow" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.button>

      {/* Panel del chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="glass fixed bottom-24 right-6 z-50 flex h-[min(560px,75vh)] w-[min(380px,calc(100vw-3rem))] flex-col overflow-hidden rounded-3xl border border-border shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-brand-soft p-4">
              <div className="relative grid h-10 w-10 place-items-center rounded-full bg-brand text-white">
                <Bot className="h-5 w-5" />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold">Asistente de SICAMET</p>
                <p className="text-xs text-muted">En línea</p>
              </div>
              <Sparkles className="ml-auto h-4 w-4 text-brand" />
            </div>

            {/* Mensajes — data-lenis-prevent: que el smooth-scroll global
                no capture la rueda del mouse dentro del chat */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "flex max-w-[85%] flex-col gap-2.5 rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-sm bg-brand text-white"
                        : "rounded-bl-sm bg-card text-foreground ring-1 ring-border",
                    )}
                  >
                    <span>{m.text}</span>
                    {m.actions && m.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        {m.actions.map((a) => {
                          const Icon = ACTION_ICON[a.type];
                          return (
                            <a
                              key={a.type}
                              href={a.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                                a.type === "whatsapp"
                                  ? "bg-green-500 text-white hover:bg-green-600"
                                  : "bg-brand text-white hover:bg-brand/90",
                              )}
                            >
                              <Icon className="h-3.5 w-3.5" />
                              {a.label}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-card px-4 py-3 ring-1 ring-border">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-2 w-2 animate-bounce rounded-full bg-muted"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted transition-colors hover:border-brand hover:text-brand"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje…"
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Enviar"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white transition-transform hover:scale-105 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
