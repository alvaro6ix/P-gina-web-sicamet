"use client";

import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

/** Switch sol/luna estilo uiverse. Dispara el reveal circular del tema. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <label
      className={cn("theme-switch", className)}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      onClick={() => toggleTheme()}
    >
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => {}}
        tabIndex={-1}
      />
      <span className="slider">
        <span className="sun-moon" />
        <span className="star s1" />
        <span className="star s2" />
        <span className="star s3" />
      </span>
    </label>
  );
}
