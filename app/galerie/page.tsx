import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Gallery } from "@/components/Gallery";
import { gallery } from "@/data/gallery";
import { toGalleryItems } from "@/lib/gallery";
import { pageMetadata } from "@/lib/seo";
import { SocialLinks } from "@/components/SocialLinks";

export const metadata: Metadata = pageMetadata({
  title: "Galerie photos",
  description: "Les photos des Rouges et Blancs du Cyclo Club de Puymoyen : sorties, cols, séjours, VTT, ultra-distance et vie du club.",
  path: "/galerie/",
  image: "/img/col-croix-saint-robert-2025-1200.webp",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        compact
        photo="col-croix-saint-robert-2025"
        eyebrow="Vie du club"
        title={<>Galerie</>}
        intro="Cols, chemins boueux, séjours et soirées : une sélection de photos des membres du club. Cliquez sur une photo pour l'agrandir."
        crumbs={[
          { label: "Actualités", href: "/actualites/" },
          { label: "Galerie", href: "/galerie/" },
        ]}
      />
      <section className="on-dark bg-ink py-12 text-white sm:py-16">
        <div className="wrap">
          <Gallery items={toGalleryItems(gallery)} layout="masonry" />
          <div className="mt-14 flex flex-col items-start gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-white/75">Retrouvez les photos les plus récentes des sorties sur nos réseaux.</p>
            <SocialLinks />
          </div>
        </div>
      </section>
    </>
  );
}
