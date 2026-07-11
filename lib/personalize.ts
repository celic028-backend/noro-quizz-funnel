import type { CategoryId, Personalization } from "./types";
import { vocative } from "./vocative";

/**
 * Gradi personalizovanu Thank You poruku iz kategorije + izabranih pod-problema.
 * Uslovni delovi zavise od čekiranih kodova (v. CONTENT-SPEC).
 */
export function personalize(
  categoryId: CategoryId,
  ime: string,
  codes: string[],
): Personalization {
  const name = vocative(ime) || "Zdravo";
  const has = (c: string) => codes.includes(c);

  switch (categoryId) {
    case "hrkanje": {
      const partner = has("snore_A") || has("snore_B");
      const dry = has("snore_C");
      return {
        headline: `${name}, hrkanje ti kvari san${partner ? " - i partneru pored tebe" : ""}.`,
        body: `Noro Mouth Tape forsira disanje na nos i smiruje hrkanje već prve noći.${
          dry ? " I ona suva usta ujutru - nestaju." : ""
        }`,
      };
    }

    case "los_san": {
      const onlyNoise = codes.length === 1 && has("sleep_C");
      const hasNoise = has("sleep_C");
      if (onlyNoise) {
        return {
          headline: `${name}, buka ti prekida san.`,
          body: "Noro EarPlugs blokiraju partnera i buku koja te budi - čist, neprekinut san (do -25dB).",
        };
      }
      return {
        headline: `${name}, tvoj san ti ne vraća energiju.`,
        body: `Noro Mouth Tape forsira disanje na nos za dublji, mirniji san - osetićeš razliku već prve nedelje.${
          hasNoise ? " A Noro EarPlugs blokiraju buku i partnera koji te budi." : ""
        }`,
      };
    }

    case "sport": {
      const recovery = has("sport_C");
      return {
        headline: `${name}, tvoje telo traži više kiseonika.`,
        body: `Noro Trakice za Nos otvaraju disanje i daju do 80% više protoka vazduha - bolji kardio i veća izdržljivost.${
          recovery ? " A Mouth Tape noću ubrzava oporavak kroz kvalitetniji san." : ""
        }`,
      };
    }

    case "disanje_nos": {
      const sleep = has("nose_D");
      return {
        headline: `${name}, zapušen nos ti otežava${sleep ? " i dan i san" : " svaki dan"}.`,
        body: `Noro Trakice za Nos mehanički šire nozdrve i otvaraju protok vazduha - instant olakšanje, bez lekova.${
          sleep ? " A Mouth Tape ti pomaže da dišeš na nos i dok spavaš." : ""
        }`,
      };
    }

    case "optimizacija": {
      const onlyFocus = codes.length === 1 && has("opt_B");
      if (onlyFocus) {
        return {
          headline: `${name}, otključaj fokus za 3 sekunde.`,
          body: "Noro Drops otključavaju dublje disanje i bistrinu - instant boost kad ti treba.",
        };
      }
      return {
        headline: `${name}, ti već pratiš svoje telo - sad mu daj alat.`,
        body: "Noro Drops otključavaju dublje disanje i fokus za 3 sekunde, a Mouth Tape podiže recovery kroz kvalitetniji san. Tvoj HRV će to osetiti.",
      };
    }

    case "estetika":
      return {
        headline: `${name}, disanje na usta vremenom menja crte lica.`,
        body: "Noro kombinacija - Trakice danju + Mouth Tape noću - trenira nazalno disanje 24/7 i čuva pravilan položaj vilice i lica.",
      };

    default:
      return {
        headline: `${name}, evo tvoje preporuke.`,
        body: "Napravili smo izbor na osnovu tvojih odgovora.",
      };
  }
}
