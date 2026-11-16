import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Photo } from "@/components/Photo";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticle, sortedArticles } from "@/data/news";
import { photo } from "@/data/media";
import { site } from "@/data/site";
import { articleDate } from "@/lib/format";
import { toGalleryItems } from "@/lib/gallery";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return sortedArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return pageMetadata({
    title: a.title,
    description: a.excerpt,
    path: `/actualites/${a.slug}/`,
    image: `/img/${a.cover}-1200.webp`,
    type: "article",
    publishedTime: a.approxDate ? undefined : a.date,
  });
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const all = sortedArticles();
  const i = all.findIndex((x) => x.slug === slug);
  const newer = all[i - 1];
  const older = all[i + 1];
  const related = all.filter((x) => x.slug !== slug && x.category === a.category).slice(0, 3);
  const cover = photo(a.cover);

  return (
    <article>
      <header className="on-dark relative isolate overflow-hidden bg-ink pb-14 pt-32 text-white sm:pt-40">
        <div aria-hidden className="speed-lines absolute inset-0 -z-10" />
        <div aria-hidden className="absolute -right-10 top-0 -z-10 hidden h-full w-40 -skew-x-[24deg] bg-red/90 lg:block" />
        <div className="wrap max-w-5xl">
          <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-white/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white">Accueil</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/actualites/" className="hover:text-white">Actualités</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="line-clamp-1 text-white/90">{a.title}</li>
            </ol>
          </nav>
          <p className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em]">
            <span className="bg-red px-3 py-1 font-display text-base tracking-[0.12em]">{a.category}</span>
            <time dateTime={a.date} className="text-white/75">{articleDate(a)}</time>
          </p>
          <h1 className="display mt-6 animate-rise text-[clamp(2.5rem,6.5vw,5.5rem)]">{a.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80 sm:text-xl">{a.excerpt}</p>
        </div>
      </header>

      <div className="wrap max-w-5xl">
        <figure className="-mt-px">
          <div className="relative overflow-hidden bg-stone" style={{ aspectRatio: `${Math.max(cover.width / cover.height, 4 / 3)}` }}>
            <Photo k={a.cover} fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
          </div>
          {cover.caption && <figcaption className="mt-3 text-sm text-mute">{cover.caption}</figcaption>}
        </figure>

        <div className="prose-club mx-auto mt-12 max-w-[68ch] text-ink/90">
          {a.body.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>

        {a.images && a.images.length > 0 && (
          <section aria-labelledby="photos-article" className="mt-16">
            <h2 id="photos-article" className="font-display text-3xl font-bold uppercase">En images</h2>
            <div className="mt-6">
              <Gallery items={toGalleryItems(a.images)} layout="masonry" />
            </div>
          </section>
        )}

        <nav aria-label="Articles précédent et suivant" className="mt-20 grid gap-px border-y border-stone-2 bg-stone-2 sm:grid-cols-2">
          {older ? (
            <Link href={`/actualites/${older.slug}/`} className="group bg-white p-6">
              <span className="arrow-link text-sm text-mute"><ArrowLeft aria-hidden size={16} /> Article précédent</span>
              <span className="mt-2 block font-display text-xl font-bold uppercase leading-tight group-hover:text-red-deep">{older.title}</span>
            </Link>
          ) : <span className="bg-white" />}
          {newer ? (
            <Link href={`/actualites/${newer.slug}/`} className="group bg-white p-6 text-right">
              <span className="arrow-link justify-end text-sm text-mute">Article suivant <ArrowRight aria-hidden size={16} /></span>
              <span className="mt-2 block font-display text-xl font-bold uppercase leading-tight group-hover:text-red-deep">{newer.title}</span>
            </Link>
          ) : <span className="bg-white" />}
        </nav>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="mt-20 bg-stone py-16 sm:py-20">
          <div className="wrap">
            <h2 id="related" className="display text-[clamp(2rem,4vw,3.25rem)]">À lire aussi</h2>
            <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}><ArticleCard article={r} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <div className={related.length ? "" : "pb-20"} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: a.title,
          description: a.excerpt,
          image: [`${site.url}/img/${a.cover}-1200.webp`],
          ...(a.approxDate ? {} : { datePublished: a.date }),
          inLanguage: "fr-FR",
          mainEntityOfPage: `${site.url}/actualites/${a.slug}/`,
          author: { "@type": "Organization", name: site.name, url: `${site.url}/` },
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />
    </article>
  );
}
