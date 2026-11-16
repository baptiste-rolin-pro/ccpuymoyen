"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import { dayNumber, formatLongDate, monthShort, todayISO, upcomingDays, type OutingDay } from "@/lib/sorties";
import { OutingRoute } from "./OutingRoute";

/**
 * Prochains samedis du calendrier officiel.
 * Le rendu initial est calculé à la génération du site, puis recalculé dans
 * le navigateur avec la date du jour : la liste reste à jour sans recompiler.
 */
export function UpcomingOutings({ initial, count = 3 }: { initial: OutingDay[]; count?: number }) {
  const [days, setDays] = useState(initial);
  useEffect(() => setDays(upcomingDays(todayISO(), count)), [count]);

  if (!days.length) {
    return (
      <div className="flex items-start gap-4 border border-stone-2 bg-white p-6">
        <CalendarClock aria-hidden className="mt-1 shrink-0 text-red" />
        <p className="text-mute">
          Le calendrier 2026 est terminé. Le programme des parcours de la nouvelle saison sera publié ici dès sa
          diffusion par le club. Les départs du mercredi et du samedi à 13h30 continuent toute l&apos;année.
        </p>
      </div>
    );
  }

  return (
    <ol className="divide-y divide-stone-2 border-y border-stone-2">
      {days.map((d, i) => (
        <li key={d.date} className="grid grid-cols-[4.5rem_1fr] gap-4 py-6 sm:grid-cols-[6rem_1fr] sm:gap-6">
          <div className={`flex flex-col items-center justify-center py-3 text-center ${i === 0 ? "bg-red text-white" : "bg-ink text-white"}`}>
            <span className="font-display text-4xl font-extrabold leading-none sm:text-5xl">{dayNumber(d.date)}</span>
            <span className="font-display text-sm font-semibold uppercase tracking-widest">{monthShort(d.date)}</span>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-mute">
              <time dateTime={d.date}>{formatLongDate(d.date)}</time> · départ 13h30
              {i === 0 && <span className="ml-2 inline-block bg-ink px-2 py-0.5 text-white">Prochaine sortie</span>}
            </p>
            <div className="mt-3 grid gap-5 lg:grid-cols-2">
              {d.outings.map((o) => (
                <OutingRoute key={o.groups.join() + o.name} o={o} compact />
              ))}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
