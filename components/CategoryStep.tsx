import { CATEGORIES } from "@/lib/segments";
import type { CategoryId } from "@/lib/types";
import { StepShell } from "@/components/ui/StepShell";

export function CategoryStep({ onSelect }: { onSelect: (id: CategoryId) => void }) {
  return (
    <StepShell title="Šta te najviše muči?">
      <div className="grid gap-3">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c.id)}
            className="group flex items-center gap-4 rounded-2xl border-2 border-brand-mist bg-white p-4 text-left transition hover:border-brand-purple hover:shadow-md"
          >
            <span className="text-3xl">{c.emoji}</span>
            <span className="flex-1">
              <span className="block font-bold text-brand-ink">{c.label}</span>
              <span className="block text-sm text-brand-ink/60">{c.subtitle}</span>
            </span>
            <span className="text-xl text-brand-purple opacity-0 transition group-hover:opacity-100">
              →
            </span>
          </button>
        ))}
      </div>
    </StepShell>
  );
}
