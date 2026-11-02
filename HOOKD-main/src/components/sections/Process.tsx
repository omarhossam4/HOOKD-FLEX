"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProcessStep } from "@/lib/content/types";

export function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="scroll-mt-20 bg-ink-soft/30 py-28">
      <div className="container-edge">
        <SectionHeading eyebrow="Our Process" headline="FROM FIRST IDEA TO FINAL IMPACT." />

        {/* Desktop: horizontal timeline */}
        <div className="relative mt-20 hidden lg:block">
          <div className="absolute left-0 right-0 top-6 h-px bg-line" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 right-0 top-6 h-px bg-lime"
          />
          <div className="grid grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="relative mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-lime bg-ink text-xs font-bold text-lime">
                  {step.number}
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-paper">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-gray-soft">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="relative mt-14 space-y-10 lg:hidden">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-line" />
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex gap-6 pl-0"
            >
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-lime bg-ink text-xs font-bold text-lime">
                {step.number}
              </div>
              <div className="pt-1.5">
                <h3 className="text-sm font-bold uppercase tracking-wide text-paper">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-soft">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
