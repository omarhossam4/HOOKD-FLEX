"use client";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | "cta_click"
  | "whatsapp_click"
  | "form_start"
  | "form_submit"
  | "service_interest_select"
  | "nav_click";

/**
 * Pushes to GTM's dataLayer and mirrors to gtag/fbq when those scripts are present.
 * Safe to call even when no analytics IDs are configured — becomes a no-op.
 */
export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });

  window.gtag?.("event", event, params);

  const metaEventMap: Partial<Record<AnalyticsEvent, string>> = {
    form_submit: "Lead",
    whatsapp_click: "Contact",
    cta_click: "Contact",
  };
  const metaEvent = metaEventMap[event];
  if (metaEvent) window.fbq?.("track", metaEvent, params);
}
