import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeading } from "@/components/SectionHeading";
import { sortedArticles } from "@/data/news";

export function LatestNews() {
  const [first, ...rest] = sortedArticles().slice(0, 3);
  return (
    <section aria-labelledby="actus-title" className="py-20 sm:py-28 lg:py-32">
      <div className="wrap">
        <SectionHeading
          index="04"
          eyebrow="Vie du club"
          id="actus-title"
          title={
            <>
              Sur la route
              <br />
              des Rouges et Blancs
            </>
          }
          action={
            <Link href="/actualites/" className="btn btn-ink">
              Toutes les actualités <ArrowRight aria-hidden size={18} />
            </Link>
          }
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7" data-reveal>
            <ArticleCard article={first} featured />
          </div>
          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-10">
            {rest.map((a, i) => (
              <div key={a.slug} data-reveal style={{ ["--delay" as string]: `${(i + 1) * 110}ms` }}>
                <ArticleCard article={a} sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
