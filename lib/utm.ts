import type { UTM } from "./types";

const KEY = "noro_utm";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/** Pročita UTM/click-id iz trenutnog URL-a. */
export function readUTMFromUrl(): UTM {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const utm: UTM = {};
  for (const k of UTM_KEYS) {
    const v = p.get(k);
    if (v) (utm as Record<string, string>)[k] = v;
  }
  const fbclid = p.get("fbclid");
  const ttclid = p.get("ttclid");
  if (fbclid) utm.fbclid = fbclid;
  if (ttclid) utm.ttclid = ttclid;
  utm.landing_url = window.location.href;
  if (document.referrer) utm.referrer = document.referrer;
  return utm;
}

/** Snimi UTM u sessionStorage na prvom učitavanju (da preživi ceo tok). */
export function persistUTM(): void {
  if (typeof window === "undefined") return;
  try {
    if (!sessionStorage.getItem(KEY)) {
      sessionStorage.setItem(KEY, JSON.stringify(readUTMFromUrl()));
    }
  } catch {
    /* sessionStorage nedostupan - ignoriši */
  }
}

/** Vrati snimljeni UTM (ili pročita iz URL-a kao fallback). */
export function getStoredUTM(): UTM {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as UTM;
  } catch {
    /* ignoriši */
  }
  return readUTMFromUrl();
}
