import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PartnerGrid } from "@/components/PartnerGrid";
import { SectionHeading } from "@/components/SectionHeading";

export function Partners() {
  return (
    <section aria-labelledby="partenaires-title" className="py-20 sm:py-28">
      <div className="wrap">
        <SectionHeading
          index="06"
          eyebrow="Partenaires"
          id="partenaires-title"
          title={<>Ils roulent avec nous</>}
          intro="Merci aux entreprises et à la commune qui accompagnent les Rouges et Blancs et portent leurs couleurs sur nos maillots."
          action={
            <Link href="/partenaires/#devenir-partenaire" className="arrow-link text-ink">
              Devenir partenaire <ArrowRight aria-hidden size={18} />
            </Link>
          }
        />
        <div className="mt-12">
          <PartnerGrid />
        </div>
      </div>
    </section>
  );
}
