import { Mountain, Route } from "lucide-react";
import type { Outing } from "@/lib/sorties";

/** Un parcours du calendrier (groupe, destination, distance, dénivelé) — consultation uniquement. */
export function OutingRoute({ o, compact = false, dark = false }: { o: Outing; compact?: boolean; dark?: boolean }) {
  const muted = dark ? "text-white/65" : "text-mute";
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {o.groups.map((g) => (
          <span
            key={g}
            className={`inline-flex h-6 items-center px-2 font-display text-sm font-bold tracking-wider ${
              g === "CCP1" ? "bg-red text-white" : dark ? "bg-white text-ink" : "bg-ink text-white"
            }`}
          >
            {g}
          </span>
        ))}
        <span className={`text-sm ${muted}`}>
          {o.groups.length > 1 ? "Parcours commun" : o.groups[0] === "CCP1" ? "Groupe 1" : "Groupe 2"}
        </span>
      </div>
      <p className={`font-display font-bold uppercase leading-none ${compact ? "text-2xl" : "text-3xl"}`}>{o.name}</p>
      <p className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm ${muted}`}>
        {o.distanceKm && (
          <span className="inline-flex items-center gap-1.5">
            <Route aria-hidden size={15} /> {o.distanceKm} km
          </span>
        )}
        {o.elevationM && (
          <span className="inline-flex items-center gap-1.5">
            <Mountain aria-hidden size={15} /> {o.elevationM} m D+
          </span>
        )}
      </p>
    </div>
  );
}
