export function ProofStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-semibold text-brand-navy/70">
      <span>⭐ 75.000+ kupaca</span>
      <span className="opacity-40">•</span>
      <span>🛡️ Garancija 30 dana</span>
      <span className="opacity-40">•</span>
      <span>🔬 Naučno dokazano</span>
    </div>
  );
}

// TODO: zameniti placeholder-e pravim materijalima (logoi sponzorstava,
// fotke/izjave boraca i influensera, recenzije + ocene, video/UGC).
export function SocialProofSection() {
  const faces = ["Đina Džinović", "Marko Bojković", "Crvena Zvezda"];
  return (
    <div className="mx-auto max-w-md px-5">
      <div className="rounded-2xl border border-brand-mist bg-white p-5 text-center">
        <p className="text-sm font-semibold text-brand-ink">
          Veruju nam sportisti, borci i 75.000+ korisnika
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 opacity-70">
          {faces.map((n) => (
            <div
              key={n}
              className="flex items-center justify-center rounded-xl bg-brand-mist px-2 py-4 text-[11px] font-medium text-brand-ink/70"
            >
              {n}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-brand-ink/40">
          * placeholder - ubaciti prave fotke / logoe / recenzije
        </p>
      </div>
    </div>
  );
}
