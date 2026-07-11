export type CategoryId =
  | "los_san"
  | "hrkanje"
  | "sport"
  | "disanje_nos"
  | "optimizacija"
  | "estetika";

export type ProductId = "trakice" | "mouth_tape" | "drops" | "earplugs";

export interface Problem {
  code: string;
  label: string;
}

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
  subtitle: string;
  question: string;
  problems: Problem[];
  scoreBase: number;
}

export interface Product {
  id: ProductId;
  name: string;
  handle: string; // Shopify product handle
  variantId: string; // TODO: pravi Shopify variant ID (klijent daje)
  price: number; // RSD
  benefits: string[];
}

export interface Recommendation {
  products: ProductId[]; // 1 proizvod, ili 2 za bundle
  isBundle: boolean;
  bundleName?: string;
}

export interface Contact {
  ime: string;
  prezime: string;
  email: string;
  telefon?: string;
}

export type Tier = "Hot" | "Warm" | "Cold";

export interface Scoring {
  score: number;
  tier: Tier;
}

export interface UTM {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  ttclid?: string;
  landing_url?: string;
  referrer?: string;
}

export interface Personalization {
  headline: string;
  body: string;
}
