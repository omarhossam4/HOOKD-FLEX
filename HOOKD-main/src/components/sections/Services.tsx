"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import clsx from "clsx";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButton } from "@/components/ui/CtaButton";
import { trackEvent } from "@/lib/analytics";
import type { Service } from "@/lib/content/types";

export function Services({ services }: { services: Service[] }) {
  const [activeId, setActiveId] = useState(services[0]?.id ?? "");

  return (
    <section id="services" className="scroll-mt-20 bg-ink py-28">
      <div className="container-edge">
        <SectionHeading
          eyebrow="Services"
          headline="EVERYTHING YOUR BRAND NEEDS TO GROW."
          subtext="From the first creative concept to the final deliverable, we bring the strategy, production, and creative execution together."
        />

        <div className="mt-16 divide-y divide-line border-y border-line">
          {services.map((service) => {
            const isOpen = activeId === service.id;
            return (
              <div key={service.id}>
                <button
                  onClick={() => {
                    const next = isOpen ? "" : service.id;
                    setActiveId(next);
                    if (next) {
                      trackEvent("service_interest_select", { service: service.title });
                    }
                  }}
                  className="flex w-full items-center gap-6 py-8 text-left focus-lime sm:gap-10"
                  aria-expanded={isOpen}
                >
                  <span
                    className={clsx(
                      "font-black tracking-tight transition-colors text-[clamp(2rem,4vw,3.5rem)]",
                      isOpen ? "text-lime" : "text-paper/25"
                    )}
                  >
                    {service.number}
                  </span>
                  <span
                    className={clsx(
                      "flex-1 font-black uppercase leading-none tracking-tight transition-colors text-[clamp(1.4rem,3.2vw,2.75rem)]",
                      isOpen ? "text-paper" : "text-paper/70"
                    )}
                  >
                    {service.title}
                  </span>
                  <Plus
                    className={clsx(
                      "h-6 w-6 shrink-0 text-lime transition-transform duration-300",
                      isOpen && "rotate-45"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-10 pb-10 pl-0 sm:pl-[calc(clamp(2rem,4vw,3.5rem)+2.5rem)] lg:grid-cols-12">
                        <div className="lg:col-span-7">
                          <p className="max-w-xl text-base text-gray-soft sm:text-lg">
                            {service.description}
                          </p>
                          <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                            {service.deliverables.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-sm text-paper/80"
                              >
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lime" />
                                {item}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-8">
                            <CtaButton
                              href="#contact"
                              variant="secondary"
                              trackLabel={`service_inquiry_${service.slug}`}
                            >
                              Discuss {service.title}
                            </CtaButton>
                          </div>
                        </div>
                        <div className="lg:col-span-5">
                          {service.mediaUrl && /\.(mp4|webm|mov)$/i.test(service.mediaUrl) ? (
                            <div className="flex max-h-[70vh] items-center justify-center overflow-hidden rounded-2xl border border-line bg-ink-soft">
                              <video
                                src={service.mediaUrl}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="max-h-[70vh] w-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-ink-soft">
                              {service.mediaUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={service.mediaUrl}
                                  alt={service.title}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center p-6 text-center text-xs uppercase tracking-[0.2em] text-gray-soft">
                                  Preview media — add a mediaUrl in src/lib/content/defaults.ts
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
