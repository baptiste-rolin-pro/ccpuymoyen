import data from "@/data/sorties-2026.json";

export type Outing = {
  date: string;
  groups: string[];
  name: string;
  distanceKm: number | null;
  elevationM?: number;
  itinerary: string;
};

export type OutingDay = { date: string; outings: Outing[] };

export const calendarSource = data.source;
export const outings = data.outings as Outing[];

/** Regroupe les parcours par date (un samedi = CCP1 + CCP2). */
export function outingDays(list: Outing[] = outings): OutingDay[] {
  const map = new Map<string, Outing[]>();
  for (const o of list) {
    if (!map.has(o.date)) map.set(o.date, []);
    map.get(o.date)!.push(o);
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, outings]) => ({ date, outings }));
}

export function upcomingDays(from: string = todayISO(), count = 3) {
  return outingDays().filter((d) => d.date >= from).slice(0, count);
}

export { todayISO, formatLongDate, formatShortDate, formatMonth, dayNumber, monthShort } from "./dates";
import { todayISO } from "./dates";

export const stats = {
  routes: outings.length,
  days: outingDays().length,
  longest: Math.max(...outings.map((o) => o.distanceKm ?? 0)),
  totalKm: outings.reduce((s, o) => s + (o.distanceKm ?? 0), 0),
};

export function uniqueDestinations() {
  return [...new Set(outings.map((o) => o.name.replace(/\s\d{4}$/, "")))];
}
