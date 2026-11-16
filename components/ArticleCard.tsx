import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/data/news";
import { articleDate } from "@/lib/format";
import { Photo } from "./Photo";

type Props = { article: Article; featured?: boolean; headingLevel?: "h2" | "h3"; sizes?: string };

export function ArticleCard({ article, featured, headingLevel: H = "h3", sizes }: Props) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className={`relative overflow-hidden bg-stone ${featured ? "aspect-[4/3] lg:aspect-auto lg:min-h-[28rem] lg:flex-1" : "aspect-[16/10]"}`}>
        <Photo
          k={article.cover}
          fill
          sizes={sizes ?? (featured ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw")}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-quart)] group-hover:scale-[1.04]"
        />
        <span className="absolute left-0 top-4 bg-red px-3 py-1.5 font-display text-sm font-bold uppercase tracking-[0.12em] text-white">
          {article.category}
        </span>
      </div>
      <div className={`flex flex-1 flex-col ${featured ? "pt-6" : "pt-5"}`}>
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-mute">
          <time dateTime={article.date}>{articleDate(article)}</time>
        </p>
        <H className={`mt-2 font-display font-bold uppercase leading-[0.98] ${featured ? "text-[clamp(1.9rem,3.4vw,2.9rem)]" : "text-2xl"}`}>
          <Link href={`/actualites/${article.slug}/`} className="after:absolute after:inset-0 group-hover:text-red-deep">
            {article.title}
          </Link>
        </H>
        <p className={`mt-3 leading-relaxed text-mute ${featured ? "max-w-xl text-lg" : ""}`}>{article.excerpt}</p>
        <span aria-hidden className="arrow-link mt-auto pt-5 text-sm text-ink">
          Lire l&apos;article <ArrowUpRight size={16} />
        </span>
      </div>
    </article>
  );
}
