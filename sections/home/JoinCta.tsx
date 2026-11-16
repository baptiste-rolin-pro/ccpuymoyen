import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/Photo";

export function JoinCta({ headingId = "rejoindre-title" }: { headingId?: string }) {
  return (
    <section aria-labelledby={headingId} className="on-dark relative isolate overflow-hidden bg-red text-white">
      <div aria-hidden className="speed-lines absolute inset-0 -z-10" />
      <div className="grid lg:grid-cols-12">
        <div className="wrap relative py-20 sm:py-24 lg:col-span-7 lg:py-32 lg:pr-12 lg:[margin-inline:0] lg:[padding-left:max(2.5rem,calc((100vw-84rem)/2+2.5rem))]">
          <p className="eyebrow text-white/85 [&::before]:bg-white" data-reveal>
            Rejoindre le club
          </p>
          <h2 id={headingId} className="display mt-5 text-[clamp(3rem,7.5vw,6.5rem)]" data-reveal>
            Votre prochaine sortie commence ici.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl" data-reveal>
            Envie de partager votre passion du vélo&nbsp;? Découvrez le Cyclo Club de Puymoyen et venez rouler avec nous.
            Une ou deux sorties d&apos;essai vous sont offertes avant de prendre votre licence.
          </p>
          <div className="mt-9 flex flex-wrap gap-3" data-reveal>
            <Link href="/nous-rejoindre/" className="btn btn-ink">
              Rejoindre le club <ArrowRight aria-hidden size={18} />
            </Link>
            <Link href="/nous-rejoindre/#contact" className="btn btn-ghost text-white">
              Nous contacter
            </Link>
          </div>
        </div>
        <div className="relative hidden min-h-[30rem] lg:col-span-5 lg:block">
          <div className="absolute inset-0 [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]">
            <Photo k="sortie-groupe-2-2024" fill sizes="42vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
