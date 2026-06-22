"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Building2,
  Wrench,
  BadgeCheck,
  FileCheck2,
  Mail,
  MessageSquareWarning,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { navLinks, site, whatsappUrl } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Logo, VaisalaLogo } from "./logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { FancyButton } from "@/components/ui/fancy-button";

const icons: Record<string, LucideIcon> = {
  Home,
  Building2,
  Wrench,
  BadgeCheck,
  FileCheck2,
  Mail,
  MessageSquareWarning,
};

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-3 mt-3 flex items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 sm:mx-auto sm:max-w-7xl sm:px-5",
          scrolled
            ? "glass glow border border-border shadow-lg"
            : "border border-transparent",
        )}
      >
        <div className="flex shrink-0 items-center gap-2.5">
          <Logo size={44} className="shrink-0" />
          <span className="h-8 w-px shrink-0 bg-border" />
          <VaisalaLogo heightClassName="h-7 lg:h-10" className="shrink-0" />
        </div>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors",
                  active ? "text-brand" : "text-foreground/70 hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-brand/10 ring-1 ring-brand/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/60 backdrop-blur lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menú móvil moderno */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass mx-3 mt-2 overflow-hidden rounded-3xl border border-border p-2 lg:hidden"
          >
            {navLinks.map((link, i) => {
              const Icon = icons[link.icon] ?? Home;
              const active = isActive(link.href);
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors",
                      active ? "bg-brand/10" : "hover:bg-card",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition-colors",
                        active
                          ? "border-brand/40 bg-brand text-white"
                          : "border-border bg-card text-brand group-hover:border-brand/40",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-sm font-medium",
                        active ? "text-brand" : "text-foreground",
                      )}
                    >
                      {link.label}
                    </span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform group-hover:translate-x-0.5",
                        active ? "text-brand" : "text-muted",
                      )}
                    />
                  </Link>
                </motion.div>
              );
            })}

            <FancyButton
              href={whatsappUrl()}
              external
              label="Solicitar cotización"
              className="mt-1 block"
            />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
