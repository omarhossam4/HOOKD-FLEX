"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import clsx from "clsx";
import {
  budgetOptions,
  industryOptions,
  serviceInterestOptions,
} from "@/lib/content/defaults";
import { leadSchema } from "@/lib/validation/lead";
import { trackEvent } from "@/lib/analytics";

type FormState = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  services: string[];
  budget: string;
  message: string;
  website_hp: string;
};

const initialState: FormState = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  industry: "",
  services: [],
  budget: "",
  message: "",
  website_hp: "",
};

const inputClass =
  "w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-paper placeholder:text-gray-soft/70 transition-colors focus:border-lime focus:outline-none";
const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-gray-soft";
const errorClass = "mt-1.5 text-xs text-red-400";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const hasStarted = useRef(false);

  function markStarted() {
    if (!hasStarted.current) {
      hasStarted.current = true;
      trackEvent("form_start");
    }
  }

  function toggleService(value: string) {
    markStarted();
    setForm((f) => ({
      ...f,
      services: f.services.includes(value)
        ? f.services.filter((s) => s !== value)
        : [...f.services, value],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0]])
        ) as Partial<Record<keyof FormState, string>>
      );
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      trackEvent("form_submit", { industry: form.industry, services: form.services });
      setStatus("success");
      setForm(initialState);
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-lime/40 bg-lime/5 p-10 text-center sm:p-14"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime">
          <Check className="h-7 w-7 text-ink" />
        </div>
        <h3 className="mt-6 text-2xl font-black uppercase text-paper">Thanks — we got it.</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-gray-soft">
          Your project inquiry has been sent to our team. We typically reply within 1–2 business
          days. In the meantime, feel free to reach out directly on WhatsApp.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-xs font-semibold uppercase tracking-wide text-lime hover:underline focus-lime"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocus={markStarted} noValidate className="space-y-6">
      {/* Honeypot — hidden from real users, catches basic bots */}
      <input
        type="text"
        name="website_hp"
        value={form.website_hp}
        onChange={(e) => setForm((f) => ({ ...f, website_hp: e.target.value }))}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            className={inputClass}
            value={form.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
            placeholder="Jane Doe"
          />
          {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="company">
            Brand / Company Name
          </label>
          <input
            id="company"
            className={inputClass}
            value={form.company}
            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
            placeholder="Your Brand"
          />
          {errors.company && <p className={errorClass}>{errors.company}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@brand.com"
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            className={inputClass}
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="+20 1XX XXX XXXX"
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="website">
          Website or Social Media Link{" "}
          <span className="normal-case text-gray-soft/60">(optional)</span>
        </label>
        <input
          id="website"
          className={inputClass}
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
          placeholder="instagram.com/yourbrand"
        />
        {errors.website && <p className={errorClass}>{errors.website}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="industry">
            Industry
          </label>
          <select
            id="industry"
            className={inputClass}
            value={form.industry}
            onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
          >
            <option value="">Select industry</option>
            {industryOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errors.industry && <p className={errorClass}>{errors.industry}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="budget">
            Approximate Monthly Budget{" "}
            <span className="normal-case text-gray-soft/60">(optional)</span>
          </label>
          <select
            id="budget"
            className={inputClass}
            value={form.budget}
            onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
          >
            <option value="">Prefer not to say</option>
            {budgetOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <span className={labelClass}>Services Interested In</span>
        <div className="flex flex-wrap gap-2">
          {serviceInterestOptions.map((option) => {
            const checked = form.services.includes(option);
            return (
              <button
                type="button"
                key={option}
                onClick={() => toggleService(option)}
                className={clsx(
                  "rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-lime",
                  checked
                    ? "border-lime bg-lime text-ink"
                    : "border-line text-paper/70 hover:border-paper/40 hover:text-paper"
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
        {errors.services && <p className={errorClass}>{errors.services}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          Tell Us About Your Project
        </label>
        <textarea
          id="message"
          rows={5}
          className={clsx(inputClass, "resize-none")}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="What are you trying to grow, and what does success look like?"
        />
        {errors.message && <p className={errorClass}>{errors.message}</p>}
      </div>

      {serverError && (
        <div className="rounded-xl border border-red-400/30 bg-red-400/5 p-4 text-sm text-red-300">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-8 py-4 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-paper disabled:opacity-60 sm:w-auto focus-lime"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "submitting" ? "Sending..." : "Start Your Project"}
      </button>
      <p className="text-xs text-gray-soft">
        By submitting, you agree to be contacted about your inquiry. We don&rsquo;t share your
        information with third parties.
      </p>
    </form>
  );
}
