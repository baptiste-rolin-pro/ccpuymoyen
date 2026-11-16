"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { formatLongDate, formatMonth, outingDays, todayISO, type OutingDay } from "@/lib/sorties";
import { OutingRoute } from "./OutingRoute";

type Filter = "upcoming" | "all";

/** Calendrier complet des samedis 2026, filtrable, avec itinéraires détaillés dépliables. */
export function OutingCalendar({ buildDate }: { buildDate: string }) {
  const [today, setToday] = useState(buildDate);
  const [filter, setFilter] = useState<Filter>("upcoming");
  const [group, setGroup] = useState<"all" | "CCP1" | "CCP2">("all");
  useEffect(() => setToday(todayISO()), []);

  const days = useMemo(() => {
    let list: OutingDay[] = outingDays();
    if (filter === "upcoming") list = list.filter((d) => d.date >= today);
    if (group !== "all") list = list.map((d) => ({ ...d, outings: d.outings.filter((o) => o.groups.includes(group)) })).filter((d) => d.outings.length);
    return list;
  }, [filter, group, today]);

  const byMonth = useMemo(() => {
    const m = new Map<string, OutingDay[]>();
    for (const d of days) {
      const k = d.date.slice(0, 7);
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(d);
    }
    return [...m.entries()];
  }, [days]);

  const chip = (active: boolean) =>
    `inline-flex h-10 items-center px-4 font-display text-base font-bold uppercase tracking-wider transition-colors ${
      active ? "bg-ink text-white" : "bg-white text-ink hover:bg-stone-2"
    }`;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-stone-2 py-4">
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="sr-only">Période</legend>
          <button type="button" className={chip(filter === "upcoming")} aria-pressed={filter === "upcoming"} onClick={() => setFilter("upcoming")}>
            À venir
          </button>
          <button type="button" className={chip(filter === "all")} aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
            Toute la saison
          </button>
        </fieldset>
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="sr-only">Groupe</legend>
          {(["all", "CCP1", "CCP2"] as const).map((g) => (
            <button key={g} type="button" className={chip(group === g)} aria-pressed={group === g} onClick={() => setGroup(g)}>
              {g === "all" ? "Tous les groupes" : g}
            </button>
          ))}
        </fieldset>
        <p className="text-sm text-mute" aria-live="polite">
          {days.length} samedi{days.length > 1 ? "s" : ""} affiché{days.length > 1 ? "s" : ""}
        </p>
      </div>

      {byMonth.length === 0 && (
        <p className="py-10 text-mute">
          Plus aucune sortie à venir dans le calendrier 2026. Affichez « Toute la saison » pour consulter les parcours passés.
        </p>
      )}

      {byMonth.map(([month, list]) => (
        <section key={month} aria-labelledby={`m-${month}`} className="mt-10">
          <h3 id={`m-${month}`} className="font-display text-3xl font-extrabold uppercase first-letter:uppercase">
            {formatMonth(`${month}-01`)}
          </h3>
          <ul className="mt-4 space-y-3">
            {list.map((d) => {
              const past = d.date < today;
              return (
                <li key={d.date} className={`border border-stone-2 bg-white ${past ? "opacity-70" : ""}`}>
                  <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[14rem_1fr]">
                    <p className="font-display text-xl font-bold uppercase leading-tight first-letter:uppercase">
                      <time dateTime={d.date}>{formatLongDate(d.date)}</time>
                      <span className="mt-1 block text-sm font-semibold tracking-wider text-mute">
                        {past ? "Sortie passée" : "Départ 13h30"}
                      </span>
                    </p>
                    <div className="grid gap-6 md:grid-cols-2">
                      {d.outings.map((o) => (
                        <div key={o.name + o.groups.join()}>
                          <OutingRoute o={o} compact />
                          <details className="group mt-3">
                            <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-ink hover:text-red-deep [&::-webkit-details-marker]:hidden">
                              Itinéraire détaillé
                              <ChevronDown aria-hidden size={16} className="transition-transform group-open:rotate-180" />
                            </summary>
                            <p className="mt-2 text-sm leading-relaxed text-mute">{o.itinerary}</p>
                          </details>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
