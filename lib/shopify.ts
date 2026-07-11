import { PRODUCTS } from "./segments";
import type { Contact, ProductId } from "./types";

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "noro.rs";
const DISCOUNT = process.env.NEXT_PUBLIC_DISCOUNT_CODE || "";

/**
 * Gradi Shopify checkout link sa pre-fill podacima + kodom za popust.
 *
 * Kad postoje pravi variantId-jevi → cart permalink:
 *   /cart/{variant}:1,{variant2}:1?discount=CODE&checkout[email]=...&checkout[shipping_address][first_name]=...
 * Dok ih nema (placeholder) → fallback na product stranicu (bar prenese popust).
 *
 * NAPOMENA: tačan skup checkout[...] parametara verifikovati na živom Shopify
 * checkoutu; nova one-page varijanta ume da menja podršku.
 */
export function buildCheckoutUrl(products: ProductId[], contact: Contact): string {
  const hasAllVariants = products.every((p) => PRODUCTS[p].variantId);

  const params = new URLSearchParams();
  if (DISCOUNT) params.set("discount", DISCOUNT);
  params.set("checkout[email]", contact.email);
  params.set("checkout[shipping_address][first_name]", contact.ime);
  params.set("checkout[shipping_address][last_name]", contact.prezime);
  if (contact.telefon) {
    params.set("checkout[shipping_address][phone]", contact.telefon);
  }

  if (hasAllVariants) {
    const line = products.map((p) => `${PRODUCTS[p].variantId}:1`).join(",");
    return `https://${DOMAIN}/cart/${line}?${params.toString()}`;
  }

  // Fallback dok nemamo variant ID-jeve: product stranica prvog proizvoda + popust
  const handle = PRODUCTS[products[0]].handle;
  const fallback = new URLSearchParams();
  if (DISCOUNT) fallback.set("discount", DISCOUNT);
  return `https://${DOMAIN}/products/${handle}?${fallback.toString()}`;
}
