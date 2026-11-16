import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/Photo";
import { site } from "@/data/site";
import { stats } from "@/lib/sorties";

const figures = [
  { value: String(site.foundingYear), label: "Année de création du club" },
  { value: "2", label: "Sorties club par semaine, toute l'année" },
  { value: String(stats.routes), label: "Parcours au calendrier officiel 2026" },
  { value: "97 600", label: "Kilomètres cumulés par les membres en 2023*" },
];

const values = [
  { title: "Convivialité", text: "Le plaisir des découvertes et des rencontres, sur le vélo comme autour d'une table." },
  { title: "Entraide", text: "Chaque groupe est responsable de tous ses membres : on part ensemble, on rentre ensemble." },
  { title: "Saine émulation", text: "Du cyclotourisme à la compétition UFOLEP, chacun progresse à son rythme." },
];

export function Intro() {
  return (
    <section id="le-club" aria-labelledby="intro-title" className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      <div className="wrap grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Photos */}
        <div className="relative lg:col-span-6" data-reveal>
          <div className="cut-br relative aspect-[4/3.4] overflow-hidden bg-stone">
            <Photo k="col-croix-saint-robert-2025" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-10 right-4 w-[44%] border-[6px] border-white bg-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)] sm:-right-2 lg:-right-10">
            <div className="relative aspect-square overflow-hidden">
              <Photo k="maillot-2026-trio" fill sizes="(min-width: 1024px) 22vw, 44vw" className="object-cover" />
            </div>
          </div>
          <p className="absolute left-0 top-6 -translate-x-1 bg-red px-4 py-2 font-display text-lg font-bold uppercase tracking-[0.14em] text-white">
            Depuis {site.foundingYear}
          </p>
          <p className="mt-4 max-w-[46%] text-sm text-mute">Les Rouges et Blancs au col de la Croix Saint-Robert (1451 m), Ascension 2025.</p>
        </div>

        {/* Texte */}
        <div className="lg:col-span-6 lg:pl-10">
          <p className="eyebrow text-mute" data-reveal>
            <span className="text-ink">01</span> Le club
          </p>
          <h2 id="intro-title" className="display mt-4 text-[clamp(2.7rem,6vw,5rem)]" data-reveal>
            Des kilomètres.
            <br />
            Des souvenirs.
            <br />
            <span className="text-red">Un collectif.</span>
          </h2>
          <div className="mt-7 space-y-4 text-lg leading-relaxed text-ink/80" data-reveal>
            <p>
              Le Cyclo Club de Puymoyen est un club cycliste basé à Puymoyen, dans l&apos;agglomération d&apos;Angoulême.
              Affilié à l&apos;{site.federation}, il réunit depuis {site.foundingYear} des passionnés de cyclotourisme, de
              cyclosport et de VTT, en loisir comme en compétition.
            </p>
            <p>
              Deux sorties club partent chaque semaine de la place de la Mairie. Entre séjours à la montagne, randonnées,
              cyclosportives et aventures d&apos;ultra-distance, chacun trouve des coéquipiers à son niveau.
            </p>
          </div>

          <ul className="mt-9 grid gap-5 sm:grid-cols-3" data-reveal>
            {values.map((v) => (
              <li key={v.title} className="border-t-2 border-ink pt-4">
                <h3 className="font-display text-xl font-bold uppercase">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{v.text}</p>
              </li>
            ))}
          </ul>

          <Link href="/le-club/" className="btn btn-ink mt-10" data-reveal>
            Découvrir le club <ArrowRight aria-hidden size={18} />
          </Link>
        </div>
      </div>

      {/* Chiffres clés */}
      <div className="wrap mt-24 lg:mt-32">
        <dl className="grid grid-cols-2 border-l border-t border-stone-2 lg:grid-cols-4">
          {figures.map((f, i) => (
            <div key={f.label} className="flex flex-col border-b border-r border-stone-2 p-5 sm:p-8" data-reveal style={{ ["--delay" as string]: `${i * 90}ms` }}>
              <dt className="order-2 mt-2 text-sm leading-snug text-mute">{f.label}</dt>
              <dd className="font-display text-[clamp(2.6rem,5vw,4.25rem)] font-extrabold leading-none text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-mute">
          * Bilan présenté lors du repas de fin d&apos;année du 15 décembre 2023.
        </p>
      </div>
    </section>
  );
}
