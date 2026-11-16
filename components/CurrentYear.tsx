"use client";
import { useEffect, useState } from "react";

/** Année courante, recalculée côté navigateur (le site est statique). */
export function CurrentYear({ fallback }: { fallback: number }) {
  const [year, setYear] = useState(fallback);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
