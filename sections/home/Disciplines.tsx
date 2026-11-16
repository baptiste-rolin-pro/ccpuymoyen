import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import type { PhotoKey } from "@/data/media";

/** Pratiques confirmées par l'ancien site : cyclotourisme, cyclosport, VTT, loisir ou compétition. */
export const disciplines: { slug: string; title: string; photo: PhotoKey; text: string; tags: string[] }[] = [
  {
    slug: "route",
    title: "Route & cyclosport",
    photo: "auvergne-route-2025",
    text: "Sorties club le mercredi et le samedi en deux groupes de niveau, cyclosportives (La Limousine, La Périgordine…) et courses UFOLEP pour qui aime épingler un dossard.",
    tags: ["CCP1 · CCP2", "Cyclosportives", "UFOLEP"],
  },
  {
    slug: "vtt",
    title: "VTT & cyclo-cross",
    photo: "vtt-mb-race-2024",
    text: "Randonnées VTT dans les chemins charentais, défis comme la MB Race, et un fidèle des cyclo-cross UFOLEP de la région, vainqueur du challenge Poitou-Charentes.",
    tags: ["Randonnées", "Cyclo-cross", "Défis"],
  },
  {
    slug: "cyclotourisme",
    title: "Cyclotourisme & longues distances",
    photo: "espagne-alt-de-la-mussara-2026",
    text: "Séjours à la montagne et à l'étranger, randonnées organisées par le club, et des aventures d'ultra-distance : Race Across France, Bordeaux – Saint-Malo, Ultra Bacchus…",
    tags: ["Séjours", "Randonnées", "Ultra"],
  },
];

export function Disciplines() {
  return (
    <section aria-labelledby="disciplines-title" className="on-dark speed-lines relative bg-ink py-20 text-white sm:py-28 lg:py-32">
      <div className="wrap">
        <SectionHeading
          index="02"
          eyebrow="Nos pratiques"
          id="disciplines-title"
          dark
          title={
            <>
              Route, chemins
              <br />
              ou grands espaces
            </>
          }
          intro="Loisir ou compétition, bitume ou terre : au Cyclo Club de Puymoyen, toutes les façons de rouler ont leur place."
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
          {disciplines.map((d, i) => (
            <li key={d.slug} data-reveal style={{ ["--delay" as string]: `${i * 110}ms` }} className={i === 1 ? "md:mt-12" : ""}>
              <article className="group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden p-6 sm:aspect-[4/5] md:aspect-[3/4.4] lg:p-8">
                <Photo
                  k={d.photo}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="-z-20 object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-quart)] group-hover:scale-[1.06]"
                />
                <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/0" />
                <span aria-hidden className="font-display text-sm font-bold tracking-[0.2em] text-white/70">
                  {String(i + 1).padStart(2, "0")} / 03
                </span>
                <h3 className="mt-2 font-display text-[2.1rem] font-extrabold uppercase leading-[0.92] lg:text-[2.6rem]">
                  <Link href={`/le-club/#pratique-${d.slug}`} className="after:absolute after:inset-0">
                    {d.title}
                  </Link>
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-white/80">{d.text}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <ul className="flex flex-wrap gap-1.5">
                    {d.tags.map((t) => (
                      <li key={t} className="border border-white/25 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-white/85">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <span aria-hidden className="inline-flex h-11 w-11 shrink-0 items-center justify-center bg-red transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
