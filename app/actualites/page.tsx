import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { NewsList } from "@/components/NewsList";
import { categories, sortedArticles } from "@/data/news";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Actualités : la vie du club",
  description:
    "Toute l'actualité des Rouges et Blancs du Cyclo Club de Puymoyen : ultra-distance, cyclosportives, VTT, cyclo-cross, séjours et vie associative.",
  path: "/actualites/",
  image: "/img/robin-chemin-compostelle-2026-1200.webp",
});

export default function NewsPage() {
  return (
    <>
      <PageHero
        photo="auvergne-groupe-2025"
        eyebrow="Vie du club"
        title={<>Actualités</>}
        intro="Exploits d'ultra-distance, cyclosportives, boue et cyclo-cross, séjours et soirées : les nouvelles des Rouges et Blancs."
        crumbs={[{ label: "Actualités", href: "/actualites/" }]}
      >
        <Link href="/galerie/" className="btn btn-light">
          Galerie photos <ArrowRight aria-hidden size={18} />
        </Link>
      </PageHero>
      <section className="py-16 sm:py-24">
        <div className="wrap">
          <NewsList articles={sortedArticles()} categories={categories} />
        </div>
      </section>
    </>
  );
}
