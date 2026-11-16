"use client";

import { useMemo, useState } from "react";
import type { Article, Category } from "@/data/news";
import { ArticleCard } from "./ArticleCard";

const PAGE = 9;

/** Liste chronologique avec filtre par catégorie et « Charger plus ». */
export function NewsList({ articles, categories }: { articles: Article[]; categories: Category[] }) {
  const [cat, setCat] = useState<Category | "all">("all");
  const [limit, setLimit] = useState(PAGE);
  const list = useMemo(() => (cat === "all" ? articles : articles.filter((a) => a.category === cat)), [articles, cat]);
  const counts = useMemo(() => Object.fromEntries(categories.map((c) => [c, articles.filter((a) => a.category === c).length])), [articles, categories]);

  const chip = (active: boolean) =>
    `inline-flex h-10 items-center gap-2 px-4 font-display text-base font-bold uppercase tracking-wider transition-colors ${
      active ? "bg-ink text-white" : "bg-stone text-ink hover:bg-stone-2"
    }`;

  return (
    <div>
      <div role="group" aria-label="Filtrer par catégorie" className="flex flex-wrap gap-2">
        <button type="button" className={chip(cat === "all")} aria-pressed={cat === "all"} onClick={() => { setCat("all"); setLimit(PAGE); }}>
          Tout <span className="text-sm opacity-60">{articles.length}</span>
        </button>
        {categories.map((c) => (
          <button key={c} type="button" className={chip(cat === c)} aria-pressed={cat === c} onClick={() => { setCat(c); setLimit(PAGE); }}>
            {c} <span className="text-sm opacity-60">{counts[c]}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{list.length} article(s) affiché(s)</p>
      <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {list.slice(0, limit).map((a) => (
          <li key={a.slug}>
            <ArticleCard article={a} headingLevel="h2" />
          </li>
        ))}
      </ul>
      {list.length > limit && (
        <div className="mt-14 text-center">
          <button type="button" className="btn btn-ink" onClick={() => setLimit((l) => l + PAGE)}>
            Afficher plus d&apos;articles
          </button>
        </div>
      )}
    </div>
  );
}
