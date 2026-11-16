import data from "@/data/sorties-2026.json";

export type Outing = {
  date: string;
  groups: string[];
  name: string;
  distanceKm: number | null;
  elevationM?: number;
  garminUrl: string | null;
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

/** Date du jour au format AAAA-MM-JJ (fuseau Europe/Paris). */
export function todayISO(d = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Paris" }).format(d);
}

export function upcomingDays(from: string, count = 3) {
  return outingDays().filter((d) => d.date >= from).slice(0, count);
}

const dateFmt = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
const shortFmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" });
const monthFmt = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" });

const toDate = (iso: string) => new Date(`${iso}T12:00:00Z`);
export const formatLongDate = (iso: string) => dateFmt.format(toDate(iso));
export const formatShortDate = (iso: string) => shortFmt.format(toDate(iso));
export const formatMonth = (iso: string) => monthFmt.format(toDate(iso));
export const dayNumber = (iso: string) => String(toDate(iso).getUTCDate());
export const monthShort = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { month: "short", timeZone: "UTC" }).format(toDate(iso)).replace(".", "");

export const stats = {
  routes: outings.length,
  days: outingDays().length,
  longest: Math.max(...outings.map((o) => o.distanceKm ?? 0)),
  totalKm: outings.reduce((s, o) => s + (o.distanceKm ?? 0), 0),
};

export function uniqueDestinations() {
  return [...new Set(outings.map((o) => o.name.replace(/\s\d{4}$/, "")))];
}
