import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="on-dark speed-lines relative flex min-h-[80svh] items-center overflow-hidden bg-ink text-white">
      <div aria-hidden className="absolute -right-10 top-0 h-full w-48 -skew-x-[24deg] bg-red" />
      <div className="wrap relative py-32">
        <p className="eyebrow text-white/70">Erreur 404</p>
        <h1 className="display mt-4 text-[clamp(3.5rem,12vw,10rem)]">Hors parcours.</h1>
        <p className="mt-6 max-w-xl text-lg text-white/80">
          Cette page n&apos;existe pas ou a été déplacée lors de la refonte du site. Reprenez la route depuis l&apos;accueil.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-red">Retour à l&apos;accueil <ArrowRight aria-hidden size={18} /></Link>
          <Link href="/sorties/" className="btn btn-ghost text-white">Nos sorties</Link>
        </div>
      </div>
    </section>
  );
}
