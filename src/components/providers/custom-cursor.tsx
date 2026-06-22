"use client";

import { useEffect, useRef, useState } from "react";

/** Cursor tipo retícula de instrumento. Solo en dispositivos con puntero fino. */
export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      window.innerWidth > 1024;
    if (!fine) return;

    setActive(true);
    document.body.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const d = dot.current;
      const r = ring.current;
      if (d) d.style.transform = `translate(${mx}px, ${my}px)`;
      const t = e.target as HTMLElement;
      const interactive = t.closest(
        'a, button, input, textarea, label, [role="button"]',
      );
      r?.classList.toggle("is-pointer", !!interactive);
    };

    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      const r = ring.current;
      if (r) r.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    const onLeave = () => {
      if (ring.current) ring.current.style.opacity = "0";
      if (dot.current) dot.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (ring.current) ring.current.style.opacity = "1";
      if (dot.current) dot.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <div ref={ring} className="cursor-reticle" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
