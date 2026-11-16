import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, CalendarDays, Clock, Download, ExternalLink, HardHat, MapPin, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { MeetingMap } from "@/components/MeetingMap";
import { OutingCalendar } from "@/components/OutingCalendar";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { calendarSource, outings, stats, todayISO } from "@/lib/sorties";
import { pageMetadata } from "@/lib/seo";
import { withBase } from "@/lib/format";

export const metadata: Metadata = pageMetadata({
  title: "Nos sorties : calendrier 2026, parcours et rendez-vous",
  description:
    "Sorties vélo du Cyclo Club de Puymoyen le mercredi et le samedi à 13h30, place de la Mairie. Calendrier 2026 des parcours CCP1 et CCP2 autour d'Angoulême, tracés Garmin et PDF.",
  path: "/sorties/",
  image: "/img/sortie-saison-2026-1200.webp",
});

function range(group: string) {
  const km = outings.filter((o) => o.groups.includes(group) && o.distanceKm).map((o) => o.distanceKm!);
  return { min: Math.min(...km), max: Math.max(...km) };
}

export default function SortiesPage() {
  const g1 = range("CCP1");
  const g2 = range("CCP2");
  return (
    <>
      <PageHero
        photo="sortie-saison-2026"
        eyebrow="Calendrier & parcours"
        title={<>Nos sorties</>}
        intro="Deux rendez-vous par semaine, toute l'année, au départ de la place de la Mairie de Puymoyen."
        crumbs={[{ label: "Nos sorties", href: "/sorties/" }]}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#calendrier" className="btn btn-red">
            <CalendarDays aria-hidden size={18} /> Voir le calendrier
          </a>
          <a href={withBase(calendarSource.document)} className="btn btn-ghost text-white" download>
            <Download aria-hidden size={18} /> PDF 2026
          </a>
        </div>
      </PageHero>

      {/* Rendez-vous */}
      <section id="rendez-vous" aria-labelledby="rdv-title" className="scroll-mt-24 py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow text-mute" data-reveal>Rendez-vous</p>
            <h2 id="rdv-title" className="display mt-4 text-[clamp(2.4rem,5vw,4.25rem)]" data-reveal>
              Mercredi & samedi,
              <br />
              <span className="text-red">13h30</span>
            </h2>
            <ul className="mt-8 space-y-5" data-reveal>
              <li className="flex gap-4">
                <MapPin aria-hidden className="mt-1 shrink-0 text-red" />
                <p>
                  <strong className="block font-semibold">{site.meetingPoint.label}, Puymoyen</strong>
                  <span className="text-mute">Devant la supérette — 16400 Puymoyen</span>
                </p>
              </li>
              <li className="flex gap-4">
                <Clock aria-hidden className="mt-1 shrink-0 text-red" />
                <p>
                  <strong className="block font-semibold">Départ à 13h30 précises</strong>
                  <span className="text-mute">Toute l&apos;année, le mercredi et le samedi.</span>
                </p>
              </li>
              <li className="flex gap-4">
                <HardHat aria-hidden className="mt-1 shrink-0 text-red" />
                <p>
                  <strong className="block font-semibold">Casque obligatoire</strong>
                  <span className="text-mute">Pour toutes les sorties club, et vivement recommandé en solo.</span>
                </p>
              </li>
              <li className="flex gap-4">
                <Users aria-hidden className="mt-1 shrink-0 text-red" />
                <p>
                  <strong className="block font-semibold">Nouveau ? Venez essayer</strong>
                  <span className="text-mute">Une ou deux sorties d&apos;essai offertes avant de prendre votre licence.</span>{" "}
                  <Link href="/nous-rejoindre/" className="link text-ink">En savoir plus</Link>
                </p>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7" data-reveal>
            <MeetingMap />
          </div>
        </div>
      </section>

      {/* Groupes */}
      <section aria-labelledby="groupes-title" className="on-dark speed-lines bg-ink py-20 text-white sm:py-24">
        <div className="wrap">
          <SectionHeading dark eyebrow="Les groupes du samedi" id="groupes-title" title={<>Choisissez votre groupe</>} intro="Chaque cyclo choisit son groupe et sa distance en fonction de sa forme du moment. Les distances ci-dessous sont celles du calendrier 2026." />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              { g: "CCP1", label: "Groupe 1", r: g1, text: "Les parcours les plus longs, qui s'allongent au fil de la saison avec les beaux jours." },
              { g: "CCP2", label: "Groupe 2", r: g2, text: "Des parcours plus courts, pour rouler en groupe à un rythme accessible." },
            ].map((x, i) => (
              <article key={x.g} className="relative overflow-hidden border border-white/15 p-8 lg:p-10" data-reveal style={{ ["--delay" as string]: `${i * 100}ms` }}>
                <span className={`inline-flex h-8 items-center px-3 font-display text-lg font-bold tracking-wider ${i === 0 ? "bg-red" : "bg-white text-ink"}`}>{x.g}</span>
                <h3 className="mt-5 font-display text-4xl font-extrabold uppercase">{x.label}</h3>
                <p className="mt-2 font-display text-6xl font-extrabold leading-none text-white lg:text-7xl">
                  {x.r.min}–{x.r.max}
                  <span className="ml-2 text-2xl text-white/60">km</span>
                </p>
                <p className="mt-4 max-w-md text-white/75">{x.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 flex gap-2 text-sm text-white/65">
            <AlertTriangle aria-hidden size={16} className="mt-0.5 shrink-0" />
            Le mercredi, le parcours est défini au départ : aucun tracé n&apos;est publié à l&apos;avance.
          </p>
        </div>
      </section>

      {/* Calendrier */}
      <section id="calendrier" aria-labelledby="calendrier-title" className="scroll-mt-24 speed-lines-dark bg-stone py-20 sm:py-28">
        <div className="wrap">
          <SectionHeading
            eyebrow="Saison 2026"
            id="calendrier-title"
            title={<>Le calendrier<br />des samedis</>}
            intro={
              <>
                {stats.days} samedis, {stats.routes} parcours et jusqu&apos;à {stats.longest} km. Données issues du document officiel
                « {calendarSource.title} » ({calendarSource.version}). Les tracés sont consultables et exportables sur Garmin Connect.
              </>
            }
          />
          <div className="mt-12">
            <OutingCalendar buildDate={todayISO()} />
          </div>
        </div>
      </section>

      {/* Documents */}
      <section aria-labelledby="docs-title" className="py-20 sm:py-24">
        <div className="wrap">
          <SectionHeading eyebrow="Documents" id="docs-title" title={<>À télécharger</>} />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            <li data-reveal>
              <a href={withBase(calendarSource.document)} download className="group flex h-full items-center gap-5 border border-stone-2 p-6 transition-colors hover:border-ink">
                <span className="inline-flex h-16 w-14 shrink-0 items-center justify-center bg-red font-display text-lg font-bold text-white">PDF</span>
                <span>
                  <span className="block font-display text-2xl font-bold uppercase group-hover:text-red-deep">Parcours CCP 2026</span>
                  <span className="text-sm text-mute">{calendarSource.version} · 13 pages · 119 Ko</span>
                </span>
                <Download aria-hidden className="ml-auto shrink-0" />
              </a>
            </li>
            <li data-reveal style={{ ["--delay" as string]: "100ms" }}>
              <Link href="/le-club/reglement-interieur/" className="group flex h-full items-center gap-5 border border-stone-2 p-6 transition-colors hover:border-ink">
                <span className="inline-flex h-16 w-14 shrink-0 items-center justify-center bg-ink font-display text-lg font-bold text-white">§</span>
                <span>
                  <span className="block font-display text-2xl font-bold uppercase group-hover:text-red-deep">Règlement intérieur</span>
                  <span className="text-sm text-mute">Sécurité, groupes, horaires</span>
                </span>
                <ExternalLink aria-hidden className="ml-auto shrink-0" />
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-sm text-mute">
            Fichiers GPX : les tracés de chaque parcours peuvent être exportés depuis Garmin Connect (lien « Tracé Garmin
            Connect » sous chaque sortie). Le club ne publie pas encore de fichiers GPX directement sur le site.
          </p>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SportsActivityLocation",
          name: `Point de départ des sorties — ${site.name}`,
          address: { "@type": "PostalAddress", streetAddress: site.meetingPoint.label, postalCode: "16400", addressLocality: "Puymoyen", addressCountry: "FR" },
          geo: { "@type": "GeoCoordinates", latitude: site.meetingPoint.lat, longitude: site.meetingPoint.lng },
        }}
      />
    </>
  );
}
