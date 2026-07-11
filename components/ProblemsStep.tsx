import type { Category } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { StepShell } from "@/components/ui/StepShell";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";

export function ProblemsStep({
  category,
  selected,
  onToggle,
  onNext,
  onBack,
}: {
  category: Category;
  selected: string[];
  onToggle: (code: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <StepShell title={category.question} subtitle="Izaberi sve što važi">
      <div className="grid gap-3">
        {category.problems.map((p) => {
          const on = selected.includes(p.code);
          return (
            <button
              key={p.code}
              type="button"
              onClick={() => onToggle(p.code)}
              className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition ${
                on
                  ? "border-brand-purple bg-brand-purple/5"
                  : "border-brand-mist bg-white hover:border-brand-purple/40"
              }`}
            >
              <span
                className={`flex h-6 w-6 flex-none items-center justify-center rounded-md border-2 text-sm font-bold ${
                  on
                    ? "border-brand-purple bg-brand-purple text-white"
                    : "border-brand-ink/20 text-transparent"
                }`}
              >
                ✓
              </span>
              <span className="font-medium text-brand-ink">{p.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex gap-3">
        <Button type="button" variant="ghost" onClick={onBack} aria-label="Nazad">
          <ChevronLeft />
        </Button>
        <Button type="button" className="flex-1" onClick={onNext} disabled={selected.length === 0}>
          Dalje <ChevronRight />
        </Button>
      </div>
    </StepShell>
  );
}
