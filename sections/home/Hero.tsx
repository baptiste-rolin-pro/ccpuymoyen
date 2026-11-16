import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Photo } from "@/components/Photo";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="on-dark relative isolate flex min-h-[88svh] items-end overflow-hidden bg-ink text-white lg:min-h-[100svh]">
      <div className="absolute inset-0 -z-10">
        <Photo
          k="sortie-route-groupe"
          fill
          priority
          sizes="100vw"
          className="animate-hero-zoom object-cover"
        />
        {/* voiles de contraste */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent" />
      </div>

      {/* motif angulaire */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-[8%] -z-10 hidden w-40 -skew-x-[24deg] bg-red/80 mix-blend-multiply lg:block" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-[calc(8%+11rem)] -z-10 hidden w-3 -skew-x-[24deg] bg-white/50 lg:block" />

      <div className="wrap relative pb-20 pt-36 sm:pb-24 lg:pb-28">
        <p className="eyebrow animate-rise text-white/90 [--delay:100ms]">
          Depuis {site.foundingYear} · Puymoyen
        </p>
        <h1 id="hero-title" className="display mt-5 text-[clamp(3.3rem,11vw,9.5rem)]">
          <span className="block animate-rise [--delay:200ms]">Plus qu&apos;un club.</span>
          <span className="block animate-rise text-white [--delay:330ms]">
            Une passion <span className="relative inline-block">
              <span className="relative z-10">commune.</span>
              <span aria-hidden className="absolute -inset-x-2 bottom-[0.08em] top-[0.55em] -z-0 -skew-x-[18deg] bg-red" />
            </span>
          </span>
        </h1>
        <p className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-white/85 [--delay:460ms] sm:text-xl">
          Découvrez le Cyclo Club de Puymoyen. Route, VTT, cyclotourisme ou compétition&nbsp;: partageons ensemble le
          plaisir de rouler.
        </p>
        <div className="mt-9 flex animate-rise flex-wrap gap-3 [--delay:580ms]">
          <Link href="/le-club/" className="btn btn-light">
            Découvrir le club <ArrowRight aria-hidden size={18} />
          </Link>
          <Link href="/nous-rejoindre/" className="btn btn-red">
            Nous rejoindre <ArrowRight aria-hidden size={18} />
          </Link>
        </div>

        <div className="mt-14 hidden animate-rise items-center gap-3 text-sm text-white/80 [--delay:720ms] sm:flex">
          <MapPin aria-hidden size={18} className="text-red" />
          <span>
            Départs <strong className="font-semibold text-white">mercredi &amp; samedi à 13h30</strong> — place de la
            Mairie, Puymoyen
          </span>
        </div>
      </div>

      {/* indicateur de scroll */}
      <a
        href="#le-club"
        className="absolute bottom-6 right-4 hidden flex-col items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 hover:text-white sm:right-8 md:flex"
      >
        <span className="[writing-mode:vertical-rl]">Défiler</span>
        <span aria-hidden className="relative block h-14 w-px overflow-hidden bg-white/25">
          <span className="animate-scroll-cue absolute inset-0 bg-white" />
        </span>
      </a>
    </section>
  );
}
