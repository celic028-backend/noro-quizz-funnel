"use client";

import { useEffect, useState } from "react";

/** Vizuelni countdown (utisak hitnosti - ponuda realno ostaje aktivna). */
export function Countdown({ seconds = 900 }: { seconds?: number }) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    const t = setInterval(() => {
      setLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return (
    <span className="tabular-nums font-extrabold">
      {mm}:{ss}
    </span>
  );
}
