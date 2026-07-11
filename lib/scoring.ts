import type { Scoring, Tier } from "./types";

/**
 * score(0-100) = baza_segmenta + (broj_pod_problema × 8) + (telefon ? 10 : 0)
 * Tier: Hot ≥ 70 · Warm 45-69 · Cold < 45
 */
export const PROBLEM_WEIGHT = 8;
export const PHONE_BONUS = 10;

export function computeScore(
  categoryBase: number,
  problemCount: number,
  phoneLeft: boolean,
): Scoring {
  const raw = categoryBase + problemCount * PROBLEM_WEIGHT + (phoneLeft ? PHONE_BONUS : 0);
  const score = Math.max(0, Math.min(100, raw));
  const tier: Tier = score >= 70 ? "Hot" : score >= 45 ? "Warm" : "Cold";
  return { score, tier };
}
