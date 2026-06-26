"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "Slider" gobernado por el scroll: la imagen visible cambia según el avance
 * del elemento por el viewport (solo cambia cuando deslizas). Crossfade + Ken
 * Burns + indicadores. Pensado para simular fotos por tarjeta.
 */
export function ScrollSlider({
  images,
  label,
  className,
}: {
  images: string[];
  label?: string;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  useGSAP(
    () => {
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const i = Math.min(
            images.length - 1,
            Math.floor(self.progress * images.length),
          );
          setIdx(i);
        },
      });
      return () => st.kill();
    },
    { scope: root, dependencies: [images.length] },
  );

  return (
    <div
      ref={root}
      className={cn(
        "relative h-full w-full overflow-hidden rounded-3xl border border-border",
        className,
      )}
    >
      {images.map((src, i) => (
        <div
          key={src}
          className="kenburns absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-out"
          style={{ backgroundImage: `url(${src})`, opacity: i === idx ? 1 : 0 }}
          aria-hidden
        />
      ))}

      <div
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent"
        aria-hidden
      />
      <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
        Simulación
      </span>
      {label && (
        <span className="absolute bottom-3 left-4 right-16 text-sm font-semibold text-white drop-shadow">
          {label}
        </span>
      )}

      {/* indicadores */}
      <div className="absolute bottom-3.5 right-4 flex gap-1.5">
        {images.map((src, i) => (
          <span
            key={src}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === idx ? "w-5 bg-accent" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
