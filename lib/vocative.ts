/**
 * Heuristika za srpski vokativ (obraćanje). Cilj: prirodno obraćanje
 * u personalizaciji (Lazar -> Lazare, Ivan -> Ivane, Milica -> Milice).
 * Nije 100% za sva imena; retki izuzeci (npr. "pokretno a") su u mapi.
 * Napomena: menja se SAMO prikaz — u webhook payload ide originalno ime.
 */

const EXCEPTIONS: Record<string, string> = {
  petar: "Petre",
  aleksandar: "Aleksandre",
  vuk: "Vuče",
  pavle: "Pavle",
  đorđe: "Đorđe",
  ognjen: "Ognjene",
};

function vocativeToken(name: string): string {
  const lower = name.toLowerCase();
  if (EXCEPTIONS[lower]) return EXCEPTIONS[lower];

  const last = lower[lower.length - 1];

  // -ica -> -ice (Milica -> Milice, Jovica -> Jovice)
  if (lower.endsWith("ica") && lower.length > 3) return name.slice(0, -1) + "e";

  // imena na -a (Ana, Marija, Nikola, Luka) i na -o/-e/-i/-u: ostavljamo kako jesu
  if (last === "a" || "oeiuy".includes(last)) return name;

  // muška imena na suglasnik: + e (Lazar -> Lazare, Ivan -> Ivane, Miloš -> Miloše)
  return name + "e";
}

export function vocative(raw: string): string {
  const name = (raw || "").trim();
  if (!name) return "";
  const first = name.split(/\s+/)[0];
  const v = vocativeToken(first);
  const capped = v.charAt(0).toUpperCase() + v.slice(1);
  return capped + name.slice(first.length);
}
