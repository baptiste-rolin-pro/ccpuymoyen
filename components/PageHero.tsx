import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Photo } from "./Photo";
import { JsonLd } from "./JsonLd";
import type { PhotoKey } from "@/data/media";
import { site } from "@/data/site";

type Crumb = { label: string; href: string };

type Props = {
  title: ReactNode;
  eyebrow: string;
  intro?: ReactNode;
  photo: PhotoKey;
  crumbs: Crumb[];
  children?: ReactNode;
  compact?: boolean;
};

/** En-tête des pages intérieures : photo, fil d'Ariane (+ BreadcrumbList), H1. */
export function PageHero({ title, eyebrow, intro, photo, crumbs, children, compact }: Props) {
  const all = [{ label: "Accueil", href: "/" }, ...crumbs];
  return (
    <section className={`on-dark relative isolate flex items-end overflow-hidden bg-ink text-white ${compact ? "min-h-[52svh]" : "min-h-[64svh] lg:min-h-[72svh]"}`}>
      <div className="absolute inset-0 -z-10">
        <Photo k={photo} fill priority sizes="100vw" className="animate-hero-zoom object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/25" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />
      </div>
      <div aria-hidden className="pointer-events-none absolute -bottom-8 right-[6%] -z-10 hidden h-56 w-24 -skew-x-[24deg] bg-red lg:block" />
      <div className="wrap pb-14 pt-32 sm:pb-16 lg:pb-20">
        <nav aria-label="Fil d'Ariane" className="animate-rise mb-6 text-sm text-white/70 [--delay:50ms]">
          <ol className="flex flex-wrap items-center gap-1.5">
            {all.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight aria-hidden size={14} />}
                {i < all.length - 1 ? (
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow animate-rise text-white/85 [--delay:120ms]">{eyebrow}</p>
        <h1 className="display mt-4 max-w-5xl animate-rise text-[clamp(3rem,9vw,7.5rem)] [--delay:200ms]">{title}</h1>
        {intro && <div className="mt-6 max-w-2xl animate-rise text-lg leading-relaxed text-white/85 [--delay:320ms] sm:text-xl">{intro}</div>}
        {children && <div className="mt-8 animate-rise [--delay:420ms]">{children}</div>}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${site.url}${c.href}` })),
        }}
      />
    </section>
  );
}
