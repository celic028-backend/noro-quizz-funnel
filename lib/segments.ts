import type { Category, CategoryId, Product, ProductId } from "./types";

/**
 * Proizvodi (4). Cene i variantId su PLACEHOLDER - klijent daje prave.
 * benefits preuzeti sa sajta ("Benefiti Noro Proizvoda").
 */
export const PRODUCTS: Record<ProductId, Product> = {
  trakice: {
    id: "trakice",
    name: "Noro Trakice za Nos",
    handle: "noro-trakice-za-disanje",
    variantId: "", // TODO
    price: 1990, // TODO placeholder
    benefits: ["Instant olakšanje disanja", "Do 80% više kiseonika", "Bolje performanse"],
  },
  mouth_tape: {
    id: "mouth_tape",
    name: "Noro Mouth Tape",
    handle: "noro-mouth-tape",
    variantId: "", // TODO
    price: 1990,
    benefits: ["Kvalitetan san i REM faza", "Smiruje hrkanje", "Breathable™ materijal"],
  },
  drops: {
    id: "drops",
    name: "Noro Drops",
    handle: "noro-drops",
    variantId: "", // TODO
    price: 2490, // TODO placeholder
    benefits: ["Instant boost za 3 sek.", "Otključava dublje disanje", "Veći fokus"],
  },
  earplugs: {
    id: "earplugs",
    name: "Noro EarPlugs",
    handle: "noro-earplugs",
    variantId: "", // TODO
    price: 1990, // TODO placeholder
    benefits: ["Premium zaštita sluha", "Umanjuje do -25dB", "Čist san bez buke"],
  },
};

/**
 * 6 segmenata. Redosled = redosled prikaza na landingu (Korak 1).
 * Pod-problemi izvedeni iz FigJam "Primer segmenata".
 */
export const CATEGORIES: Category[] = [
  {
    id: "los_san",
    label: "Loš san",
    emoji: "😴",
    subtitle: "Ne spavam kvalitetno, budim se umoran",
    question: "Kako izgleda tvoj san?",
    scoreBase: 38,
    problems: [
      { code: "sleep_A", label: "Budim se umoran" },
      { code: "sleep_B", label: "Budim se tokom noći" },
      { code: "sleep_C", label: "Partner mi remeti san (hrkanje / buka)" },
      { code: "sleep_D", label: "Umoran sam tokom dana" },
    ],
  },
  {
    id: "hrkanje",
    label: "Hrkanje",
    emoji: "💤",
    subtitle: "Ja ili partner hrčemo",
    question: "Kako izgleda tvoje hrkanje?",
    scoreBase: 40,
    problems: [
      { code: "snore_A", label: "Spavam s partnerom - smeta meni" },
      { code: "snore_B", label: "Spavam s partnerom - smeta partneru" },
      { code: "snore_C", label: "Spavam sam, suva usta ujutru" },
      { code: "snore_D", label: "Spavam sam, budim se umoran" },
    ],
  },
  {
    id: "sport",
    label: "Sport i performanse",
    emoji: "🏋️",
    subtitle: "Želim više kiseonika i bolji oporavak",
    question: "Šta ti je najvažnije u treningu?",
    scoreBase: 28,
    problems: [
      { code: "sport_A", label: "Gubim vazduh pred kraj treninga" },
      { code: "sport_B", label: "Dišem na usta tokom treninga" },
      { code: "sport_C", label: "Želim brži oporavak" },
      { code: "sport_D", label: "Želim bolji kardio i izdržljivost" },
    ],
  },
  {
    id: "disanje_nos",
    label: "Teško dišem na nos",
    emoji: "👃",
    subtitle: "Zapušen nos, alergije, devijacija",
    question: "Zašto ti je nos zapušen?",
    scoreBase: 32,
    problems: [
      { code: "nose_A", label: "Sezonske alergije" },
      { code: "nose_B", label: "Devijacija septuma" },
      { code: "nose_C", label: "Privremena prehlada" },
      { code: "nose_D", label: "Loše dišem dok spavam" },
    ],
  },
  {
    id: "optimizacija",
    label: "Optimizacija i fokus",
    emoji: "📈",
    subtitle: "Pratim san/recovery, hoću maksimum",
    question: "Šta želiš da podigneš na viši nivo?",
    scoreBase: 30,
    problems: [
      { code: "opt_A", label: "Veći recovery i bolje performanse" },
      { code: "opt_B", label: "Bolji fokus i bistrina" },
      { code: "opt_C", label: "Kvalitetniji san (HRV)" },
      { code: "opt_D", label: "Manje stresa" },
    ],
  },
  {
    id: "estetika",
    label: "Estetika lica i disanje",
    emoji: "✨",
    subtitle: "Pravilno disanje i izgled lica",
    question: "Šta ti je cilj?",
    scoreBase: 25,
    problems: [
      { code: "face_A", label: 'Da ne razvijem „mouthbreather" izgled' },
      { code: "face_B", label: "Pravilno disanje na nos" },
      { code: "face_C", label: "Definisanija linija vilice" },
    ],
  },
];

export function getCategory(id: CategoryId): Category {
  const c = CATEGORIES.find((x) => x.id === id);
  if (!c) throw new Error(`Nepoznata kategorija: ${id}`);
  return c;
}

export function getProduct(id: ProductId): Product {
  return PRODUCTS[id];
}
