"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { HookMark } from "@/components/ui/Logo";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { defaultFinalCta } from "@/lib/content/defaults";
import { trackEvent } from "@/lib/analytics";

export function Contact({
  contact,
  content = defaultFinalCta,
}: {
  contact: { whatsappNumber: string; whatsappDisplay: string; email: string; isPlaceholder: boolean };
  content?: typeof defaultFinalCta;
}) {
  const waHref = `https://wa.me/${contact.whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    "Hi HOOKD, I'd like to talk about my brand."
  )}`;

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-ink py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,255,69,0.1),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, rotate: -6 }}
          whileInView={{ opacity: 0.4, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute -left-20 bottom-0 hidden lg:block"
        >
          <HookMark className="glow-lime h-[380px] w-[380px]" />
        </motion.div>
      </div>

      <div className="container-edge">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-lime">
              Let&rsquo;s Work Together
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-black uppercase leading-[0.95] tracking-tight text-paper text-[clamp(2rem,6vw,4.5rem)]">
              {content.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-lg text-base text-gray-soft sm:text-lg">
              {content.subtext}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "contact_section" })}
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-xs font-bold uppercase tracking-wide text-paper transition-colors hover:border-lime hover:text-lime focus-lime"
              >
                <MessageCircle className="h-4 w-4" />
                {content.secondaryCta}
              </a>
            </div>
            {contact.isPlaceholder && (
              <p className="mt-3 text-[11px] text-lime/70">
                WhatsApp number is a placeholder — set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local,
                or edit defaultContact in src/lib/content/defaults.ts.
              </p>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.3} className="mx-auto mt-16 max-w-2xl rounded-3xl border border-line bg-ink-soft/60 p-6 backdrop-blur-sm sm:p-10">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
