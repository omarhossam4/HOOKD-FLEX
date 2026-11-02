"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import clsx from "clsx";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/lib/content/types";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const active = testimonials[index];

  return (
    <section className="scroll-mt-20 bg-ink py-28">
      <div className="container-edge">
        <SectionHeading
          eyebrow="Client Trust"
          headline="TRUST BUILT THROUGH CREATIVE PARTNERSHIPS."
          align="center"
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <Quote className="mx-auto h-10 w-10 text-lime/40" />

          <div className="relative mt-6 min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <p className="text-xl font-medium leading-relaxed text-paper sm:text-2xl">
                  &ldquo;{active.quote}&rdquo;
                </p>
                <div className="mt-8 flex flex-col items-center gap-3">
                  {active.photoUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={active.photoUrl}
                      alt={active.clientName}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm font-bold text-paper">{active.clientName}</p>
                    <p className="text-xs text-gray-soft">
                      {active.position ? `${active.position}, ` : ""}
                      {active.brandName}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {testimonials.length > 1 && (
            <div className="mt-10 flex items-center justify-center gap-6">
              <button
                onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper hover:border-lime hover:text-lime focus-lime"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={clsx(
                      "h-1.5 rounded-full transition-all",
                      i === index ? "w-6 bg-lime" : "w-1.5 bg-line"
                    )}
                  />
                ))}
              </div>

              <button
                onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper hover:border-lime hover:text-lime focus-lime"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
