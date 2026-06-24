"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/content";
import { highlightBrand } from "@/lib/highlight-brand";
import { Container, SectionHeading } from "@/components/ui/container";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          title={<>Resolvemos tus dudas</>}
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-border rounded-3xl border border-border bg-card/40">
          {faqs.map((f, i) => {
            const active = open === i;
            return (
              <div key={f.q} className="px-6">
                <button
                  onClick={() => setOpen(active ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-medium">{highlightBrand(f.q)}</span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-brand transition-transform duration-300 ${
                      active ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-muted">
                        {highlightBrand(f.a)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
