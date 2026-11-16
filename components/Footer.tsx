import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { nav, site, mapsUrl } from "@/data/site";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  return (
    <footer className="on-dark speed-lines relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="absolute -right-24 top-0 h-full w-72 -skew-x-[24deg] bg-red/90 opacity-[0.07]" />
      <div className="wrap relative grid gap-12 py-16 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-5">
          <Logo className="h-12 w-auto" />
          <p className="mt-6 max-w-sm leading-relaxed text-white/70">
            Les Rouges et Blancs roulent depuis {site.foundingYear} au départ de Puymoyen, aux portes d&apos;Angoulême.
            Route, VTT et cyclotourisme, en loisir ou en compétition. Club affilié {site.federation}.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label="Plan du site" className="md:col-span-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/50">Le site</h2>
          <ul className="mt-4 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-white/85 hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/galerie/" className="text-white/85 hover:text-white">Galerie photos</Link>
            </li>
            <li>
              <Link href="/le-club/reglement-interieur/" className="text-white/85 hover:text-white">Règlement intérieur</Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/50">Nous trouver</h2>
          <address className="mt-4 space-y-4 not-italic text-white/85">
            <p className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 shrink-0 text-red" size={20} />
              <span>
                {site.address.name}
                <br />
                {site.address.street}, {site.address.postalCode} {site.address.city}
              </span>
            </p>
            <p className="flex gap-3">
              <Clock aria-hidden className="mt-0.5 shrink-0 text-red" size={20} />
              <span>
                Départs mercredi &amp; samedi à 13h30
                <br />
                {site.meetingPoint.label}, Puymoyen
              </span>
            </p>
            <a href={mapsUrl()} target="_blank" rel="noopener noreferrer" className="arrow-link text-sm text-white">
              Itinéraire vers le départ <span className="sr-only">(Google Maps, nouvel onglet)</span>
            </a>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear fallback={new Date().getFullYear()} /> {site.name}. Tous droits réservés.
          </p>
          <ul className="flex gap-5">
            <li>
              <Link href="/mentions-legales/" className="hover:text-white">Mentions légales</Link>
            </li>
            <li>
              <Link href="/nous-rejoindre/#contact" className="hover:text-white">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
