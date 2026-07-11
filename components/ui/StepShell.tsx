import type { ReactNode } from "react";

export function StepShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-md px-5 py-8">
      <h2 className="text-2xl font-extrabold leading-tight text-brand-ink">{title}</h2>
      {subtitle && <p className="mt-1.5 text-sm text-brand-ink/60">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}
