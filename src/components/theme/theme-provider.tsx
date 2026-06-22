"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  /** Cambia el tema con reveal circular desde la esquina superior izquierda. */
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Script inyectado antes de la hidratación para evitar el "flash" de tema. */
export const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('sicamet-theme');
    var sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (sysDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const applyTheme = useCallback((next: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("sicamet-theme", next);
    } catch {}
    setTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Fallback si el navegador no soporta View Transitions
    if (!document.startViewTransition || prefersReduced) {
      applyTheme(next);
      return;
    }

    // flushSync aplica el cambio de tema de forma síncrona dentro del callback
    // para que el snapshot sea limpio y la transición NO se salte.
    const transition = document.startViewTransition(() => {
      flushSync(() => applyTheme(next));
    });

    // Reveal circular desde la esquina superior izquierda, en ambos sentidos.
    transition.ready
      .then(() => {
        const endRadius = Math.hypot(window.innerWidth, window.innerHeight);
        document.documentElement.animate(
          {
            clipPath: ["circle(0px at 0% 0%)", `circle(${endRadius}px at 0% 0%)`],
          },
          {
            duration: 550,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {
        /* la transición pudo saltarse (cambios rápidos); se ignora */
      });
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  return ctx;
}
