import Link from "next/link";
import { ArrowRight, Clock, Download, HardHat, MapPin, Navigation } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { UpcomingOutings } from "@/components/UpcomingOutings";
import { calendarSource, outingDays, todayISO } from "@/lib/sorties";
import { mapsUrl, site } from "@/data/site";
import { withBase } from "@/lib/format";

export function NextRides() {
  // sorties restantes à la date de génération, sans itinéraires (allège le JS client)
  const remaining = outingDays()
    .filter((d) => d.date >= todayISO())
    .map((d) => ({ ...d, outings: d.outings.map((o) => ({ ...o, itinerary: "" })) }));
  return (
    <section aria-labelledby="sorties-title" className="speed-lines-dark bg-stone py-20 sm:py-28 lg:py-32">
      <div className="wrap">
        <SectionHeading
          index="03"
          eyebrow="Prochaines sorties"
          id="sorties-title"
          title={
            <>
              Rendez-vous
              <br />
              <span className="text-red">à 13h30.</span>
            </>
          }
          action={
            <Link href="/sorties/" className="btn btn-ink">
              Calendrier complet <ArrowRight aria-hidden size={18} />
            </Link>
          }
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Carte rendez-vous */}
          <aside className="on-dark relative overflow-hidden bg-ink p-7 text-white sm:p-9 lg:col-span-4" data-reveal aria-label="Rendez-vous hebdomadaire">
            <div aria-hidden className="absolute -bottom-12 -right-6 h-40 w-16 -skew-x-[24deg] bg-red" />
            <p className="eyebrow relative text-white/70">Toute l&apos;année</p>
            <ul className="relative mt-6 space-y-5">
              {site.weeklyRides.map((r) => (
                <li key={r.day} className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-4">
                  <span className="font-display text-3xl font-bold uppercase">{r.day}</span>
                  <span className="inline-flex items-center gap-2 font-display text-3xl font-bold text-white">
                    <Clock aria-hidden size={20} className="text-red" /> {r.time}
                  </span>
                </li>
              ))}
            </ul>
            <p className="relative mt-6 flex gap-3 text-white/85">
              <MapPin aria-hidden size={20} className="mt-0.5 shrink-0 text-red" />
              <span>
                <strong className="font-semibold text-white">{site.meetingPoint.label}</strong>
                <br />
                Devant la supérette, 16400 Puymoyen
              </span>
            </p>
            <p className="relative mt-4 flex gap-3 text-white/85">
              <HardHat aria-hidden size={20} className="mt-0.5 shrink-0 text-red" />
              <span>Casque obligatoire pour toutes les sorties club.</span>
            </p>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <a href={mapsUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-red !min-h-11 !text-base">
                <Navigation aria-hidden size={16} /> Itinéraire
                <span className="sr-only">(Google Maps, nouvel onglet)</span>
              </a>
            </div>
          </aside>

          {/* Samedis à venir */}
          <div className="lg:col-span-8" data-reveal style={{ ["--delay" as string]: "120ms" }}>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <h3 className="font-display text-2xl font-bold uppercase">Les samedis à venir</h3>
              <a href={withBase(calendarSource.document)} className="arrow-link text-sm text-ink" download>
                <Download aria-hidden size={16} /> Parcours 2026 (PDF, 119 Ko)
              </a>
            </div>
            <UpcomingOutings days={remaining} />
            <p className="mt-4 text-sm text-mute">
              Source : calendrier officiel « {calendarSource.title} » ({calendarSource.version}). Le parcours du mercredi
              est fixé au départ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
