"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudy } from "@/lib/content/types";

const storyBlocks: { key: keyof CaseStudy; label: string }[] = [
  { key: "background", label: "Client Background" },
  { key: "challenge", label: "The Challenge" },
  { key: "strategy", label: "Creative Strategy" },
  { key: "production", label: "Production Process" },
  { key: "execution", label: "Final Execution" },
  { key: "deliverables", label: "Deliverables" },
];

function CaseStudyModal({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] overflow-y-auto bg-ink/95 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="min-h-full px-4 py-16 sm:px-8">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="mx-auto max-w-4xl rounded-3xl border border-line bg-ink-soft p-6 sm:p-10"
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
                {study.clientName}
              </p>
              <h3 className="mt-2 text-3xl font-black uppercase leading-tight text-paper sm:text-4xl">
                {study.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-paper hover:border-lime hover:text-lime focus-lime"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl bg-ink">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={study.coverImageUrl} alt={study.title} className="h-full w-full object-cover" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {storyBlocks.map((block) => {
              const text = study[block.key];
              if (!text || typeof text !== "string") return null;
              return (
                <div key={block.label}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lime">
                    {block.label}
                  </p>
                  <p className="mt-2 text-sm text-gray-soft">{text}</p>
                </div>
              );
            })}
          </div>

          {study.results && (
            <div className="mt-10 rounded-2xl border border-lime/30 bg-lime/5 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lime">
                Verified Performance Results
              </p>
              <p className="mt-2 text-base text-paper">{study.results}</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function CaseStudies({ studies }: { studies: CaseStudy[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const activeStudy = studies.find((s) => s.slug === openSlug) ?? null;

  if (studies.length === 0) return null;

  return (
    <section id="case-studies" className="scroll-mt-20 bg-ink-soft/30 py-28">
      <div className="container-edge">
        <SectionHeading
          eyebrow="Case Studies"
          headline="CREATIVE THAT MAKES A DIFFERENCE."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {studies.map((study, i) => (
            <Reveal key={study.id} delay={i * 0.05}>
              <button
                onClick={() => setOpenSlug(study.slug)}
                className="group relative block w-full overflow-hidden rounded-3xl border border-line text-left focus-lime"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={study.coverImageUrl}
                    alt={study.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
                    {study.clientName}
                  </p>
                  <h3 className="mt-2 text-2xl font-black uppercase leading-tight text-paper sm:text-3xl">
                    {study.title}
                  </h3>
                  <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wide text-paper/70 group-hover:text-lime">
                    Read Case Study →
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeStudy && (
          <CaseStudyModal study={activeStudy} onClose={() => setOpenSlug(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
