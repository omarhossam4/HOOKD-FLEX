"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    const contact = document.getElementById("contact");
    if (!hero || !contact) return;

    let heroPassed = false;
    let contactReached = false;

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroPassed = !entry.isIntersecting;
        setVisible(heroPassed && !contactReached);
      },
      { threshold: 0 }
    );
    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        contactReached = entry.isIntersecting;
        setVisible(heroPassed && !contactReached);
      },
      { threshold: 0.15 }
    );

    heroObserver.observe(hero);
    contactObserver.observe(contact);
    return () => {
      heroObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-40 md:hidden"
        >
          <a
            href="#contact"
            onClick={() => trackEvent("cta_click", { label: "sticky_mobile_cta" })}
            className="flex items-center justify-center rounded-full bg-lime px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-ink shadow-[0_8px_30px_rgba(214,255,69,0.35)] focus-lime"
          >
            Let&rsquo;s Talk About Your Brand
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
