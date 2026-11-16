// Fonctions de date sans dépendance aux données (utilisables côté client sans alourdir le bundle)
/** Date du jour au format AAAA-MM-JJ (fuseau Europe/Paris). */
export function todayISO(d = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Paris" }).format(d);
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

