"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { Logo } from "@/components/ui/Logo";
import { CtaButton } from "@/components/ui/CtaButton";
import { navLinks } from "@/lib/content/defaults";
import { trackEvent } from "@/lib/analytics";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-ink/80 backdrop-blur-md border-b border-line py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="container-edge flex items-center justify-between">
        <a
          href="#home"
          className="focus-lime"
          onClick={() => trackEvent("nav_click", { target: "#home" })}
        >
          <Logo imgClassName="h-8 sm:h-9 w-auto" priority />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => trackEvent("nav_click", { target: link.href })}
                className={clsx(
                  "text-xs font-semibold uppercase tracking-[0.2em] transition-colors focus-lime",
                  active === link.href ? "text-lime" : "text-paper/70 hover:text-paper"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <CtaButton href="#contact" size="md" trackLabel="nav_cta">
            Let&rsquo;s Talk
          </CtaButton>
        </div>

        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-paper focus-lime"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-ink border-t border-line"
          >
            <ul className="container-edge flex flex-col gap-1 py-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => {
                      trackEvent("nav_click", { target: link.href, source: "mobile" });
                      setMenuOpen(false);
                    }}
                    className={clsx(
                      "block py-3 text-2xl font-bold uppercase tracking-tight focus-lime",
                      active === link.href ? "text-lime" : "text-paper"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <CtaButton
                  href="#contact"
                  size="lg"
                  className="w-full"
                  trackLabel="mobile_nav_cta"
                  onClick={() => setMenuOpen(false)}
                >
                  Let&rsquo;s Talk
                </CtaButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
