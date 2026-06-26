"use client";

import { useEffect, useState } from "react";

// Fotos de laboratorio (Unsplash) que rotan en el fondo del hero.
const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&h=900&q=70`;

const IMGS = [
  U("photo-1518152006812-edab29b069ac"), // microscopio
  U("photo-1532187863486-abf9dbad1b69"), // recarga de líquido en tubos
  U("photo-1532094349884-543bc11b234d"), // beakers
  U("photo-1608037222022-62649819f8aa"), // trofeo / reconocimiento
];

/**
 * Fondo del hero: slideshow con crossfade detrás del contenido. Lleva un velo
 * + blur para que el texto y el instrumento sigan perfectamente legibles
 * (no afecta a ningún componente del hero).
 */
export function HeroBackdrop() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((p) => (p + 1) % IMGS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {IMGS.map((src, idx) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1600ms] ease-in-out"
          style={{ backgroundImage: `url(${src})`, opacity: idx === i ? 1 : 0 }}
        />
      ))}
      {/* velo de legibilidad: más cubierto a la izquierda (texto), más
          transparente a la derecha para que las imágenes se vean. */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/55 to-background/30 backdrop-blur-[1px]" />
    </div>
  );
}
