import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import { JoinCta } from "@/sections/home/JoinCta";
import { disciplines } from "@/sections/home/Disciplines";
import { milestones, rules } from "@/data/history";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Le club : histoire, valeurs et pratiques",
  description:
    "Fondé en 1985, le Cyclo Club de Puymoyen (UFOLEP) réunit près d'Angoulême des cyclistes sur route, en VTT et en cyclotourisme. Histoire, valeurs, maillot et règlement.",
  path: "/le-club/",
  image: "/img/presentation-maillot-2026-1200.webp",
});

const facts = [
  { label: "Création", value: String(site.foundingYear) },
  { label: "Affiliation", value: site.federation },
  { label: "Siège", value: "Mairie, 16400 Puymoyen" },
  { label: "Licenciés", value: "Une quarantaine*" },
  { label: "Sorties club", value: "Mercredi & samedi, 13h30" },
  { label: "Départ", value: "Place de la Mairie" },
];

const pratiqueDetails: Record<string, string[]> = {
  route: [
    "Deux sorties club par semaine, toute l'année, au départ de Puymoyen.",
    "Le samedi, deux groupes de niveau (CCP1 et CCP2) sur des parcours publiés à l'avance.",
    "Cyclosportives (La Limousine, La Périgordine, Amstel Gold Race Experience…) et courses UFOLEP.",
  ],
  vtt: [
    "Entraînements du mercredi et du samedi pour les vététistes aussi.",
    "Randonnées VTT régionales (Fouquebrune, Skoda Cup à La Couronne…) et défis comme la MB Race.",
    "Cyclo-cross UFOLEP : Patrice Moreau a remporté le Challenge Poitou-Charentes en 4e catégorie (2025).",
  ],
  cyclotourisme: [
    "Séjours du club : La Bourboule (2025), Calpe (2024), Cambrils et l'Alt de la Mussara (2026)…",
    "Randonnées organisées par le club, comme la rando anniversaire des 40 ans en 2025.",
    "Ultra-distance : Race Across France, Race Across Paris, Bordeaux – Saint-Malo, Ultra Bacchus.",
  ],
};

export default function ClubPage() {
  return (
    <>
      <PageHero
        photo="presentation-maillot-2026"
        eyebrow={`Depuis ${site.foundingYear}`}
        title={<>Le club</>}
        intro="Une histoire de copains, de kilomètres et de maillots rouges et blancs, écrite depuis 1985 sur les routes de Charente."
        crumbs={[{ label: "Le club", href: "/le-club/" }]}
      />

      {/* Présentation */}
      <section aria-labelledby="presentation" className="py-20 sm:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-mute" data-reveal>Présentation</p>
            <h2 id="presentation" className="display mt-4 text-[clamp(2.4rem,5vw,4.25rem)]" data-reveal>
              Les Rouges et Blancs
            </h2>
            <div className="prose-club mt-8 max-w-2xl text-ink/85" data-reveal>
              <p>
                Le Cyclo Club Puymoyen est un club cycliste basé à Puymoyen (16400), dans l&apos;agglomération
                d&apos;Angoulême. Affilié à l&apos;UFOLEP, il pratique le cyclotourisme, le cyclosport et le VTT, en loisir
                ou en compétition.
              </p>
              <p>
                Deux sorties club au départ de la place de la Mairie de Puymoyen sont organisées toute l&apos;année, avec un
                départ à 13h30 chaque mercredi et samedi. Qu&apos;il soit vététiste ou routier, qu&apos;il recherche une
                pratique loisir ou compétitive, chaque cycliste trouve des coéquipiers de son niveau.
              </p>
              <p>
                Au-delà du vélo, le club vit au rythme de ses rendez-vous conviviaux : assemblée générale, repas de fin
                d&apos;année, séjours à la montagne, présentation du nouveau maillot… et, en 2025, une grande fête pour ses
                40 ans.
              </p>
            </div>
          </div>
          <aside className="lg:col-span-5" data-reveal aria-label="Le club en bref">
            <dl className="grid grid-cols-2 border-l border-t border-stone-2">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col border-b border-r border-stone-2 p-5">
                  <dt className="order-2 mt-1 text-sm text-mute">{f.label}</dt>
                  <dd className="font-display text-2xl font-bold uppercase leading-tight">{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-mute">* Chiffre cité lors de l&apos;assemblée générale de début 2025 (« une cinquantaine » selon l&apos;ancienne page de présentation) — à actualiser.</p>
          </aside>
        </div>
      </section>

      {/* Valeurs */}
      <section aria-labelledby="valeurs" className="on-dark speed-lines bg-ink py-20 text-white sm:py-28">
        <div className="wrap">
          <SectionHeading dark eyebrow="Nos valeurs" id="valeurs" title={<>Rouler ensemble,<br />rentrer ensemble</>} />
          <ol className="mt-14 grid gap-px bg-white/10 md:grid-cols-3">
            {[
              { t: "Convivialité", d: "Le plaisir des découvertes et des rencontres sous-entend une convivialité sans faille." },
              { t: "Entraide & sécurité", d: "Chaque groupe est responsable de tous ses membres et doit s'assurer du bon fonctionnement de la sortie." },
              { t: "Saine émulation", d: "Sans encourager l'esprit de compétition, le club n'empêche pas une saine émulation entre les participants." },
            ].map((v, i) => (
              <li key={v.t} className="bg-ink p-8 lg:p-10" data-reveal style={{ ["--delay" as string]: `${i * 100}ms` }}>
                <span className="font-display text-6xl font-extrabold text-red">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-3xl font-bold uppercase">{v.t}</h3>
                <p className="mt-3 leading-relaxed text-white/75">{v.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-white/60">Extraits du règlement intérieur du club.</p>
        </div>
      </section>

      {/* Pratiques */}
      <section aria-labelledby="pratiques" className="py-20 sm:py-28" id="pratiques">
        <div className="wrap">
          <SectionHeading eyebrow="Nos pratiques" id="pratiques-title" title={<>Trois façons<br />de vivre le vélo</>} />
          <div className="mt-16 space-y-20 lg:space-y-28">
            {disciplines.map((d, i) => (
              <article key={d.slug} id={`pratique-${d.slug}`} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12">
                <div className={`relative aspect-[4/3] overflow-hidden bg-stone lg:col-span-7 ${i % 2 ? "lg:order-2 cut-tl" : "cut-br"}`} data-reveal>
                  <Photo k={d.photo} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
                </div>
                <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`} data-reveal>
                  <span className="font-display text-sm font-bold tracking-[0.2em] text-red">{String(i + 1).padStart(2, "0")} / 03</span>
                  <h3 className="display mt-2 text-[clamp(2.2rem,4vw,3.5rem)]">{d.title}</h3>
                  <p className="mt-5 text-lg leading-relaxed text-ink/80">{d.text}</p>
                  <ul className="mt-6 space-y-3">
                    {pratiqueDetails[d.slug].map((x) => (
                      <li key={x} className="flex gap-3">
                        <Check aria-hidden size={20} className="mt-0.5 shrink-0 text-red" />
                        <span className="text-ink/85">{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section aria-labelledby="histoire" id="histoire" className="speed-lines-dark bg-stone py-20 sm:py-28">
        <div className="wrap">
          <SectionHeading eyebrow="Histoire" id="histoire-title" title={<>Plus de 40 ans<br />sur les routes</>} intro="Quelques repères tirés des archives du club. Vous avez des photos ou des souvenirs des débuts ? Partagez-les avec nous." />
          <ol className="relative mt-14 border-l-2 border-ink/15 pl-8 sm:pl-12">
            {milestones.map((m, i) => (
              <li key={m.year} className="relative pb-10 last:pb-0" data-reveal style={{ ["--delay" as string]: `${(i % 3) * 80}ms` }}>
                <span aria-hidden className="absolute -left-[2.6rem] top-2 h-4 w-4 -skew-x-[24deg] bg-red sm:-left-[3.6rem]" />
                <div className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <p className="font-display text-3xl font-extrabold text-red">{m.year}</p>
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase">{m.title}</h3>
                    <p className="mt-1.5 max-w-2xl leading-relaxed text-ink/75">{m.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tenue */}
      <section aria-labelledby="tenue" id="tenue" className="py-20 sm:py-28">
        <div className="wrap">
          <SectionHeading
            eyebrow="La tenue du club"
            id="tenue-title"
            title={<>Le maillot 2026</>}
            intro="Présenté en mars 2026, le nouveau maillot reste fidèle aux couleurs rouge, blanc et noir du club et porte les logos de nos partenaires."
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
            <figure className="relative aspect-[4/3] overflow-hidden bg-stone lg:col-span-5" data-reveal>
              <Photo k="maillot-2026-face" fill sizes="(min-width: 1024px) 40vw, 50vw" className="object-cover" />
              <figcaption className="absolute bottom-0 left-0 bg-ink px-3 py-1.5 text-sm text-white">Face</figcaption>
            </figure>
            <figure className="relative aspect-[4/3] overflow-hidden bg-stone lg:col-span-4" data-reveal>
              <Photo k="maillot-2026-dos" fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
              <figcaption className="absolute bottom-0 left-0 bg-ink px-3 py-1.5 text-sm text-white">Dos</figcaption>
            </figure>
            <figure className="relative aspect-[4/3] overflow-hidden bg-stone sm:col-span-2 lg:col-span-3 lg:aspect-auto" data-reveal>
              <Photo k="maillot-collector-2017" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-contain bg-white p-3" />
              <figcaption className="absolute bottom-0 left-0 bg-red px-3 py-1.5 text-sm text-white">Collector 2017</figcaption>
            </figure>
          </div>
          <p className="mt-6 text-mute">
            Commande de tenues : renseignez-vous auprès du bureau lors d&apos;une sortie ou via la{" "}
            <Link href="/nous-rejoindre/#contact" className="link text-ink">page contact</Link>.
          </p>
        </div>
      </section>

      {/* Règlement */}
      <section aria-labelledby="reglement" className="pb-20 sm:pb-28">
        <div className="wrap">
          <div className="on-dark relative overflow-hidden bg-ink p-8 text-white sm:p-12 lg:p-16" data-reveal>
            <div aria-hidden className="absolute -right-8 top-0 h-full w-28 -skew-x-[24deg] bg-red" />
            <div className="relative max-w-3xl">
              <p className="eyebrow text-white/70">Règlement intérieur</p>
              <h2 id="reglement" className="display mt-4 text-[clamp(2.2rem,4.5vw,3.75rem)]">Les règles de la route</h2>
              <ul className="mt-8 space-y-3 text-white/85">
                {rules.slice(3, 7).map((r) => (
                  <li key={r} className="flex gap-3">
                    <Check aria-hidden size={20} className="mt-0.5 shrink-0 text-red" />
                    <span>{r}</span>
                  </li>
                ))}
                <li className="flex gap-3 font-semibold text-white">
                  <Check aria-hidden size={20} className="mt-0.5 shrink-0 text-red" />
                  <span>{rules[9]}</span>
                </li>
              </ul>
              <Link href="/le-club/reglement-interieur/" className="btn btn-light mt-10">
                Lire le règlement complet <ArrowRight aria-hidden size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <JoinCta />
    </>
  );
}
