"use client";

import { whatsappUrl } from "@/lib/content";
import { WhatsappGlyph } from "@/components/ui/whatsapp-glyph";

/** Botón flotante de WhatsApp (abajo-izquierda, siempre visible). */
export function WhatsappFab() {
  const href = whatsappUrl(
    "Hola SICAMET, me gustaría solicitar información sobre sus servicios de calibración.",
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-6 left-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-transform hover:scale-110"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
      <WhatsappGlyph className="relative z-10 h-8 w-8 text-white" />
    </a>
  );
}
