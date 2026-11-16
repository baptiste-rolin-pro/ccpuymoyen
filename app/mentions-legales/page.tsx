import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Mentions légales",
    description: "Mentions légales et politique de confidentialité du site du Cyclo Club de Puymoyen.",
    path: "/mentions-legales/",
  }),
  robots: { index: true, follow: true },
};

const TODO = <mark className="bg-[#fff3c4] px-1 text-ink">à confirmer par le bureau</mark>;

export default function LegalPage() {
  const l = site.legal;
  return (
    <>
      <PageHero compact photo="cycliste-campagne" eyebrow="Informations" title={<>Mentions légales</>} crumbs={[{ label: "Mentions légales", href: "/mentions-legales/" }]} />
      <section className="py-16 sm:py-24">
        <div className="wrap max-w-3xl space-y-12 leading-relaxed text-ink/85 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-ink">
          <div>
            <h2>Éditeur du site</h2>
            <p className="mt-3">
              {l.publisher}, association affiliée à l&apos;UFOLEP.
              <br />
              Siège : {site.address.street}, {site.address.postalCode} {site.address.city}.
              <br />
              Numéro RNA / SIRET : {l.rna ?? TODO}
              <br />
              Directeur·rice de la publication : {l.publicationDirector ?? TODO}
            </p>
          </div>
          <div>
            <h2>Hébergement</h2>
            <p className="mt-3">{l.host ?? TODO}</p>
          </div>
          <div>
            <h2>Propriété intellectuelle</h2>
            <p className="mt-3">
              Les textes et photographies publiés sur ce site appartiennent au Cyclo Club de Puymoyen et à leurs auteurs. Les
              logos des partenaires sont la propriété de leurs détenteurs respectifs. Toute reproduction sans autorisation est
              interdite.
            </p>
          </div>
          <div>
            <h2>Données personnelles</h2>
            <p className="mt-3">
              Ce site ne dépose aucun cookie de mesure d&apos;audience ni de publicité. La carte du point de rendez-vous
              (OpenStreetMap) n&apos;est chargée que sur demande. Les informations éventuellement transmises via le
              formulaire de contact sont utilisées uniquement pour répondre à votre demande et ne sont pas cédées à des
              tiers. Conformément au RGPD, vous pouvez demander l&apos;accès, la rectification ou la suppression de vos
              données en contactant le club.
            </p>
          </div>
          <div>
            <h2>Liens externes</h2>
            <p className="mt-3">
              Le site renvoie vers des services tiers (Facebook, OpenStreetMap, Google Maps, sites des
              partenaires) soumis à leurs propres conditions d&apos;utilisation.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
