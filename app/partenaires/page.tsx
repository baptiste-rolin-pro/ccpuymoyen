import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PartnerGrid } from "@/components/PartnerGrid";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Partenaires",
  description:
    "Eiffage Énergie Systèmes, Berton Aluminium, Bouticycle Angoulême, Nuances Unikalo, ADB Bâtiment et la Ville de Puymoyen soutiennent le Cyclo Club de Puymoyen. Devenez partenaire.",
  path: "/partenaires/",
  image: "/img/maillot-2026-dos-1200.webp",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero
        compact
        photo="maillot-2026-groupe"
        eyebrow="Ils nous soutiennent"
        title={<>Partenaires</>}
        intro="Leur soutien contribue au développement du club et à la poursuite de ses actions en faveur de la pratique du cyclisme."
        crumbs={[{ label: "Partenaires", href: "/partenaires/" }]}
      />
      <section aria-labelledby="officiels" className="py-20 sm:py-28">
        <div className="wrap">
          <SectionHeading eyebrow="Partenaires officiels" id="officiels" title={<>Merci à eux</>} intro="Sur les routes de Charente, de France et d'ailleurs, les Rouges et Blancs sont fiers de porter leurs couleurs." />
          <div className="mt-12">
            <PartnerGrid detailed />
          </div>
        </div>
      </section>

      <section id="devenir-partenaire" aria-labelledby="devenir" className="scroll-mt-24 bg-stone py-20 sm:py-28">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow text-mute" data-reveal>Devenir partenaire</p>
            <h2 id="devenir" className="display mt-4 text-[clamp(2.4rem,5vw,4.25rem)]" data-reveal>
              Votre marque<br />
              <span className="text-red">dans le peloton</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80" data-reveal>
              Vous souhaitez devenir partenaire du Cyclo Club de Puymoyen ? Nous pouvons vous proposer différentes formules
              de partenariat. N&apos;hésitez pas à nous contacter !
            </p>
            <ul className="mt-8 space-y-3" data-reveal>
              {[
                "Visibilité sur les maillots portés lors des sorties, cyclosportives et courses",
                "Présence de votre logo sur le site du club",
                "Un soutien concret au tissu associatif et sportif local",
              ].map((x) => (
                <li key={x} className="flex gap-3">
                  <Check aria-hidden size={20} className="mt-0.5 shrink-0 text-red" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-mute">Formules et contreparties détaillées : à définir avec le bureau du club.</p>
            <Link href="/nous-rejoindre/#contact" className="btn btn-red mt-9" data-reveal>
              Contacter le club <ArrowRight aria-hidden size={18} />
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden lg:col-span-6 cut-tl" data-reveal>
            <Photo k="maillot-2026-dos" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
