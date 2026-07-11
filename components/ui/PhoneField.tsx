"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "@/components/ui/icons";

// Kurirana lista (Srbija default + region + česte zemlje). Kolega može dopuniti.
const COUNTRIES = [
  { iso: "RS", name: "Srbija", dial: "381", flag: "🇷🇸" },
  { iso: "BA", name: "Bosna i Hercegovina", dial: "387", flag: "🇧🇦" },
  { iso: "ME", name: "Crna Gora", dial: "382", flag: "🇲🇪" },
  { iso: "HR", name: "Hrvatska", dial: "385", flag: "🇭🇷" },
  { iso: "MK", name: "Severna Makedonija", dial: "389", flag: "🇲🇰" },
  { iso: "SI", name: "Slovenija", dial: "386", flag: "🇸🇮" },
  { iso: "DE", name: "Nemačka", dial: "49", flag: "🇩🇪" },
  { iso: "AT", name: "Austrija", dial: "43", flag: "🇦🇹" },
  { iso: "CH", name: "Švajcarska", dial: "41", flag: "🇨🇭" },
  { iso: "FR", name: "Francuska", dial: "33", flag: "🇫🇷" },
  { iso: "IT", name: "Italija", dial: "39", flag: "🇮🇹" },
  { iso: "GB", name: "Velika Britanija", dial: "44", flag: "🇬🇧" },
  { iso: "SE", name: "Švedska", dial: "46", flag: "🇸🇪" },
  { iso: "US", name: "SAD / Kanada", dial: "1", flag: "🇺🇸" },
];

/**
 * Telefon: custom dropdown za državu (zastava + naziv + pozivni broj) + input.
 * Emituje E.164 (+{dial}{broj}) parent-u, ili "" ako je prazno.
 */
export function PhoneField({
  onChange,
  error,
}: {
  onChange: (v: string) => void;
  error?: string;
}) {
  const [iso, setIso] = useState("RS");
  const [num, setNum] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const country = COUNTRIES.find((c) => c.iso === iso)!;

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function emit(nextIso: string, raw: string) {
    const c = COUNTRIES.find((x) => x.iso === nextIso)!;
    const digits = raw.replace(/\D/g, "").replace(/^0+/, "");
    onChange(digits ? `+${c.dial}${digits}` : "");
  }

  function pick(nextIso: string) {
    setIso(nextIso);
    setOpen(false);
    emit(nextIso, num);
  }

  return (
    <div ref={ref} className="relative">
      <div
        className={`flex items-stretch overflow-hidden rounded-xl border-2 bg-white transition focus-within:border-brand-purple ${
          error ? "border-brand-danger" : "border-brand-mist"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Izaberi državu"
          aria-expanded={open}
          className="flex flex-none items-center gap-1.5 border-r-2 border-brand-mist px-3 text-brand-ink transition hover:bg-brand-mist/50"
        >
          <span className="text-lg leading-none">{country.flag}</span>
          <span className="text-sm font-semibold">+{country.dial}</span>
          <ChevronDown className={`h-3.5 w-3.5 text-brand-ink/40 transition ${open ? "rotate-180" : ""}`} />
        </button>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={num}
          onChange={(e) => {
            setNum(e.target.value);
            emit(iso, e.target.value);
          }}
          placeholder="64 123 4567"
          className="w-full px-4 py-3 text-base outline-none"
        />
      </div>

      {open && (
        <div className="absolute z-20 mt-1.5 max-h-64 w-full overflow-auto rounded-xl border border-brand-mist bg-white py-1 shadow-xl">
          {COUNTRIES.map((c) => (
            <button
              key={c.iso}
              type="button"
              onClick={() => pick(c.iso)}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-brand-mist ${
                c.iso === iso ? "bg-brand-purple/5" : ""
              }`}
            >
              <span className="text-lg leading-none">{c.flag}</span>
              <span className="flex-1 font-medium text-brand-ink">{c.name}</span>
              <span className="text-brand-ink/50">+{c.dial}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
