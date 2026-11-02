"use client";

import { motion, type Variants } from "framer-motion";
import { HookMark } from "@/components/ui/Logo";
import { CtaButton } from "@/components/ui/CtaButton";
import { defaultHero } from "@/lib/content/defaults";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const line: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.1, ease: EASE_OUT },
  }),
};

export function Hero({ content = defaultHero }: { content?: typeof defaultHero }) {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] scroll-mt-20 flex-col justify-center overflow-hidden bg-ink pt-28 pb-16"
    >
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(214,255,69,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(214,255,69,0.08),transparent_50%)]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
          animate={{ opacity: 0.5, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -right-24 top-1/2 hidden -translate-y-1/2 md:block"
        >
          <HookMark className="glow-lime h-[480px] w-[480px] opacity-70" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(11,11,11,0.6)_85%,#0b0b0b_100%)]" />
      </div>

      <div className="container-edge relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-lime"
        >
          {content.eyebrow}
        </motion.p>

        <h1 className="max-w-5xl font-black uppercase leading-[0.92] tracking-tight text-paper text-[clamp(2.75rem,8.5vw,7rem)]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={line}
            >
              {content.headlineLine1}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-lime glow-lime"
              custom={1}
              initial="hidden"
              animate="visible"
              variants={line}
            >
              {content.headlineLine2}
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 max-w-xl text-base text-gray-soft sm:text-lg"
        >
          {content.subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <CtaButton href="#contact" size="lg" trackLabel="hero_primary">
            {content.primaryCta}
          </CtaButton>
          <CtaButton href="#services" variant="secondary" size="lg" trackLabel="hero_secondary">
            {content.secondaryCta}
          </CtaButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-10 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-soft"
        >
          {content.credibility}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-soft">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-lime to-transparent" />
      </motion.div>
    </section>
  );
}
