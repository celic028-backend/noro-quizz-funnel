import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost";

export function buttonClasses(variant: Variant = "primary", extra = ""): string {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-bold transition active:scale-[.98] disabled:opacity-50 disabled:pointer-events-none";
  const v =
    variant === "primary"
      ? "bg-brand-gradient text-white shadow-lg shadow-brand-purple/20 hover:brightness-105"
      : "text-brand-navy hover:bg-brand-mist";
  return `${base} ${v} ${extra}`.trim();
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: { variant?: Variant } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={buttonClasses(variant, className)} {...props} />;
}
