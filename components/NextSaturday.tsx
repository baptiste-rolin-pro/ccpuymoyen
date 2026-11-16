import { Clock, MapPin, Mountain, Route } from "lucide-react";
import { formatLongDate, todayISO, upcomingDays } from "@/lib/sorties";

/** Découpe l'itinéraire en étapes (séparées par des virgules dans le document officiel). */
function steps(itinerary: string) {
  return itinerary
    .replace(/\s*\.\s*$/, "")
    .split(/\s*,\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Mise en avant du prochain samedi : parcours CCP1 / CCP2 en consultation seule
 * (aucun fichier ni tracé téléchargeable). Calculé côté serveur à chaque
 * régénération de la page.
 */
export function NextSaturday({ headingLevel: H = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const [next] = upcomingDays(todayISO(), 1);
  if (!next) {
    return (
      <div className="border border-stone-2 bg-white p-8">
        <p className="font-display text-2xl font-bold uppercase">Calendrier 2026 terminé</p>
        <p className="mt-2 text-mute">Les parcours de la nouvelle saison seront publiés ici dès leur diffusion par le club.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-px overflow-hidden bg-stone-2 lg:grid-cols-12">
      <div className="on-dark relative flex flex-col justify-between overflow-hidden bg-red p-8 text-white lg:col-span-4 lg:p-10">
        <div aria-hidden className="speed-lines absolute inset-0" />
        <div className="relative">
          <p className="eyebrow text-white/85 [&::before]:bg-white">Prochain parcours</p>
          <H className="display mt-5 text-[clamp(2.6rem,5vw,4.5rem)] first-letter:uppercase">
            <time dateTime={next.date}>{formatLongDate(next.date)}</time>
          </H>
        </div>
        <ul className="relative mt-10 space-y-3 text-white/90">
          <li className="flex items-center gap-3">
            <Clock aria-hidden size={20} /> Départ 13h30
          </li>
          <li className="flex items-center gap-3">
            <MapPin aria-hidden size={20} /> Place de la Mairie, Puymoyen
          </li>
        </ul>
      </div>

      <div className="grid gap-px bg-stone-2 md:grid-cols-2 lg:col-span-8">
        {next.outings.map((o) => (
          <article key={o.groups.join() + o.name} className="bg-white p-7 lg:p-9">
            <div className="flex flex-wrap items-center gap-2">
              {o.groups.map((g) => (
                <span key={g} className={`inline-flex h-7 items-center px-2.5 font-display text-base font-bold tracking-wider text-white ${g === "CCP1" ? "bg-red" : "bg-ink"}`}>
                  {g}
                </span>
              ))}
              <span className="text-sm text-mute">
                {o.groups.length > 1 ? "Parcours commun" : o.groups[0] === "CCP1" ? "Groupe 1" : "Groupe 2"}
              </span>
            </div>
            <h3 className="mt-4 font-display text-4xl font-extrabold uppercase leading-none">{o.name}</h3>
            <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {o.distanceKm && (
                <span className="inline-flex items-center gap-2 font-display text-3xl font-bold">
                  <Route aria-hidden size={22} className="text-red" /> {o.distanceKm} km
                </span>
              )}
              {o.elevationM && (
                <span className="inline-flex items-center gap-2 font-display text-3xl font-bold">
                  <Mountain aria-hidden size={22} className="text-red" /> {o.elevationM} m D+
                </span>
              )}
            </p>
            <h4 className="mt-7 font-display text-sm font-bold uppercase tracking-[0.18em] text-mute">Itinéraire</h4>
            <ol className="relative mt-3 space-y-1.5 border-l-2 border-stone-2 pl-5">
              {steps(o.itinerary).map((s, i, arr) => (
                <li key={i} className="relative text-[0.95rem] leading-snug text-ink/85">
                  <span
                    aria-hidden
                    className={`absolute -left-[1.62rem] top-1.5 h-2.5 w-2.5 ${i === 0 || i === arr.length - 1 ? "bg-red" : "bg-ink/30"}`}
                  />
                  {s}
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </div>
  );
}
