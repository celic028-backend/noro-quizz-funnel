import type { CategoryId, Recommendation } from "./types";

/**
 * Engine preporuke = default po kategoriji + korekcija po izabranim pod-problemima.
 * Primarno 1 proizvod; bundle gde ima smisla (potvrđeno u CONTENT-SPEC).
 */
export function recommend(categoryId: CategoryId, codes: string[]): Recommendation {
  switch (categoryId) {
    case "hrkanje":
      return { products: ["mouth_tape"], isBundle: false };

    case "los_san": {
      const hasNoise = codes.includes("sleep_C");
      if (hasNoise && codes.length === 1) {
        // Problem je spoljna buka, ne sopstveno disanje → EarPlugs
        return { products: ["earplugs"], isBundle: false };
      }
      if (hasNoise) {
        return {
          products: ["mouth_tape", "earplugs"],
          isBundle: true,
          bundleName: "San paket",
        };
      }
      return { products: ["mouth_tape"], isBundle: false };
    }

    case "sport":
      if (codes.includes("sport_C")) {
        return {
          products: ["trakice", "mouth_tape"],
          isBundle: true,
          bundleName: "Sport & Recovery",
        };
      }
      return { products: ["trakice"], isBundle: false };

    case "disanje_nos":
      if (codes.includes("nose_D")) {
        return {
          products: ["trakice", "mouth_tape"],
          isBundle: true,
          bundleName: "Disanje 24/7",
        };
      }
      return { products: ["trakice"], isBundle: false };

    case "optimizacija":
      if (codes.length === 1 && codes.includes("opt_B")) {
        return { products: ["drops"], isBundle: false };
      }
      return {
        products: ["drops", "mouth_tape"],
        isBundle: true,
        bundleName: "Optimizacija",
      };

    case "estetika":
      return {
        products: ["trakice", "mouth_tape"],
        isBundle: true,
        bundleName: "Estetika 24/7",
      };

    default:
      return { products: ["mouth_tape"], isBundle: false };
  }
}
