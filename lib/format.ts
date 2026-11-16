const fmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
export function articleDate(a: { date: string; approxDate?: string }) {
  return a.approxDate ?? fmt.format(new Date(`${a.date}T12:00:00Z`));
}
export function withBase(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
