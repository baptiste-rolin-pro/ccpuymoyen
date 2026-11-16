import type { Metadata } from "next";
import { Hero } from "@/sections/home/Hero";
import { Intro } from "@/sections/home/Intro";
import { Disciplines } from "@/sections/home/Disciplines";
import { DestinationsBand } from "@/sections/home/DestinationsBand";
import { NextRides } from "@/sections/home/NextRides";
import { LatestNews } from "@/sections/home/LatestNews";
import { GalleryPreview } from "@/sections/home/GalleryPreview";
import { JoinCta } from "@/sections/home/JoinCta";
import { Partners } from "@/sections/home/Partners";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Cyclo Club de Puymoyen — Club de cyclisme près d'Angoulême",
    description:
      "Club cycliste affilié UFOLEP à Puymoyen (Charente), depuis 1985 : route, VTT, cyclotourisme. Sorties le mercredi et le samedi à 13h30, place de la Mairie. Sorties d'essai offertes.",
    path: "/",
  }),
  title: { absolute: "Cyclo Club de Puymoyen — Club de cyclisme près d'Angoulême" },
};

// régénérée toutes les heures (prochaines sorties)
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Disciplines />
      <NextRides />
      <DestinationsBand />
      <LatestNews />
      <GalleryPreview />
      <JoinCta />
      <Partners />
    </>
  );
}
