import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { rules } from "@/data/history";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Règlement intérieur",
  description:
    "Règlement intérieur du Cyclo Club de Puymoyen : esprit d'entraide, choix du groupe, sécurité, horaires des sorties et port du casque obligatoire.",
  path: "/le-club/reglement-interieur/",
});

export default function RulesPage() {
  return (
    <>
      <PageHero
        compact
        photo="auvergne-route-2025"
        eyebrow="Le club"
        title={<>Règlement intérieur</>}
        intro="Les règles communes qui permettent à chacun de rouler en sécurité et dans la bonne humeur."
        crumbs={[
          { label: "Le club", href: "/le-club/" },
          { label: "Règlement intérieur", href: "/le-club/reglement-interieur/" },
        ]}
      />
      <section className="py-16 sm:py-24">
        <div className="wrap max-w-4xl">
          <ol className="divide-y divide-stone-2 border-y border-stone-2">
            {rules.map((r, i) => (
              <li key={r} className="grid grid-cols-[3.5rem_1fr] gap-4 py-6 sm:grid-cols-[5rem_1fr]" data-reveal>
                <span className="font-display text-4xl font-extrabold leading-none text-red">{String(i + 1).padStart(2, "0")}</span>
                <p className={`text-lg leading-relaxed ${i === rules.length - 1 ? "font-semibold" : "text-ink/85"}`}>{r}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <Link href="/le-club/" className="arrow-link text-ink">
              <ArrowLeft aria-hidden size={18} /> Retour au club
            </Link>
            <p className="inline-flex items-center gap-2 text-sm text-mute">
              <Printer aria-hidden size={16} /> Cette page est optimisée pour l&apos;impression (Ctrl/Cmd + P).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
