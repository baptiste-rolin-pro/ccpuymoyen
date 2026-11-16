import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Gallery } from "@/components/Gallery";
import { SectionHeading } from "@/components/SectionHeading";
import { gallery } from "@/data/gallery";
import { toGalleryItems } from "@/lib/gallery";

export function GalleryPreview() {
  return (
    <section aria-labelledby="galerie-title" className="on-dark bg-ink py-20 text-white sm:py-28 lg:py-32">
      <div className="wrap">
        <SectionHeading
          index="05"
          eyebrow="Galerie"
          id="galerie-title"
          dark
          title={
            <>
              Instants
              <br />
              <span className="text-red">partagés</span>
            </>
          }
          action={
            <Link href="/galerie/" className="btn btn-light">
              Voir la galerie <ArrowRight aria-hidden size={18} />
            </Link>
          }
        />
        <div className="mt-14">
          <Gallery items={toGalleryItems(gallery.slice(0, 7))} />
        </div>
      </div>
    </section>
  );
}
