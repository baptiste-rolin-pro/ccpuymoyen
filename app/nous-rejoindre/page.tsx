import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bike, HardHat, IdCard, Mail, MapPin, MessageCircle, Plus } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { FacebookIcon } from "@/components/icons";
import { mapsUrl, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nous rejoindre : sorties d'essai et adhésion",
  description:
    "Rejoindre un club cycliste près d'Angoulême : venez rouler avec le Cyclo Club de Puymoyen le mercredi ou le samedi à 13h30. Une ou deux sorties d'essai offertes, licence UFOLEP.",
  path: "/nous-rejoindre/",
  image: "/img/sortie-groupe-2-2024-1200.webp",
});

const reasons = [
  { t: "Tous les niveaux", d: "Deux groupes le samedi et des coéquipiers pour chaque pratique, du loisir à la compétition." },
  { t: "Route, VTT, ultra", d: "Routiers, vététistes, cyclo-crossmen et adeptes de longues distances roulent sous le même maillot." },
  { t: "Des parcours tout prêts", d: "Un calendrier annuel de parcours autour d'Angoulême, à télécharger dans l'espace membres." },
  { t: "La convivialité", d: "Séjours, repas de fin d'année, soirées et randonnées : le vélo, mais pas seulement." },
];

const steps = [
  {
    Icon: Bike,
    t: "Venez rouler avec nous",
    d: "Rendez-vous un mercredi ou un samedi à 13h30, place de la Mairie de Puymoyen, avec votre vélo et votre casque. Une ou deux sorties d'essai vous sont offertes.",
  },
  {
    Icon: HardHat,
    t: "Trouvez votre groupe",
    d: "Choisissez votre groupe et votre distance en fonction de votre forme du moment. Les membres se feront un plaisir de vous faire découvrir le club.",
  },
  {
    Icon: IdCard,
    t: "Prenez votre licence",
    d: "Le club est affilié à l'UFOLEP : prenez votre licence au club, ou simplement votre carte de membre si vous êtes déjà licencié UFOLEP.",
  },
];

const faq = [
  {
    q: "Faut-il faire de la compétition pour adhérer ?",
    a: "Non. Le club pratique le cyclotourisme, le cyclosport et le VTT, en loisir ou en compétition. Chacun roule selon ses envies.",
  },
  {
    q: "Quel matériel faut-il pour une sortie d'essai ?",
    a: "Votre vélo (route ou VTT) en bon état et un casque : son port est obligatoire pour toutes les sorties club.",
  },
  {
    q: "Quels sont les tarifs de l'adhésion ?",
    a: "Le montant de la licence UFOLEP et de la cotisation du club n'est pas encore publié sur ce site (à confirmer). Renseignez-vous auprès des membres lors d'une sortie d'essai ou via le formulaire de contact.",
  },
  {
    q: "Peut-on rejoindre le club en cours de saison ?",
    a: "Oui, tout cycliste qui souhaite rejoindre le peloton est le bienvenu tout au long de l'année.",
  },
  {
    q: "Je fais surtout du VTT, y a-t-il une place pour moi ?",
    a: "Bien sûr : les entraînements du mercredi et du samedi concernent les routiers comme les vététistes, et plusieurs membres participent à des randonnées VTT et à des cyclo-cross.",
  },
];

export default function JoinPage() {
  const endpoint = site.contact.formEndpoint;
  return (
    <>
      <PageHero
        photo="sortie-groupe-2-2024"
        eyebrow="Rejoindre le club"
        title={<>Nous rejoindre</>}
        intro="Vous souhaitez rouler avec le Cyclo Club de Puymoyen et devenir licencié ? Vous pouvez nous rejoindre dès maintenant."
        crumbs={[{ label: "Nous rejoindre", href: "/nous-rejoindre/" }]}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#etapes" className="btn btn-red">Comment ça marche <ArrowRight aria-hidden size={18} /></a>
          <a href="#contact" className="btn btn-ghost text-white">Nous contacter</a>
        </div>
      </PageHero>

      {/* Pourquoi */}
      <section aria-labelledby="pourquoi" className="py-20 sm:py-28">
        <div className="wrap">
          <SectionHeading eyebrow="Pourquoi nous rejoindre" id="pourquoi" title={<>Rouler mieux,<br /><span className="text-red">rouler ensemble</span></>} />
          <ul className="mt-14 grid gap-px border border-stone-2 bg-stone-2 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <li key={r.t} className="bg-white p-7" data-reveal style={{ ["--delay" as string]: `${i * 80}ms` }}>
                <span className="font-display text-5xl font-extrabold text-red">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase">{r.t}</h3>
                <p className="mt-2 leading-relaxed text-mute">{r.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Étapes */}
      <section id="etapes" aria-labelledby="etapes-title" className="on-dark scroll-mt-24 overflow-hidden bg-ink text-white">
        <div className="grid lg:grid-cols-12">
          <div className="relative min-h-[18rem] lg:col-span-5">
            <Photo k="auvergne-montee-2025" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
          </div>
          <div className="speed-lines px-4 py-20 sm:px-10 lg:col-span-7 lg:px-16 lg:py-28">
            <p className="eyebrow text-white/70" data-reveal>En trois étapes</p>
            <h2 id="etapes-title" className="display mt-4 text-[clamp(2.4rem,5vw,4.25rem)]" data-reveal>Comment ça marche</h2>
            <ol className="mt-12 space-y-10">
              {steps.map(({ Icon, t, d }, i) => (
                <li key={t} className="grid grid-cols-[3.5rem_1fr] gap-5" data-reveal style={{ ["--delay" as string]: `${i * 100}ms` }}>
                  <span className="inline-flex h-14 w-14 items-center justify-center bg-red">
                    <Icon aria-hidden size={26} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold tracking-[0.2em] text-white/60">Étape {i + 1}</p>
                    <h3 className="font-display text-3xl font-bold uppercase">{t}</h3>
                    <p className="mt-2 max-w-xl leading-relaxed text-white/80">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a href={mapsUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-12">
              <MapPin aria-hidden size={18} /> Itinéraire vers le départ
              <span className="sr-only">(Google Maps, nouvel onglet)</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-mute">Questions fréquentes</p>
            <h2 id="faq-title" className="display mt-4 text-[clamp(2.4rem,5vw,4rem)]">Bon à savoir</h2>
          </div>
          <div className="lg:col-span-8">
            {faq.map((f) => (
              <details key={f.q} className="group border-b border-stone-2 py-5 first:border-t">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl font-bold uppercase leading-tight hover:text-red-deep [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus aria-hidden className="shrink-0 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 bg-stone py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-mute">Contact</p>
            <h2 id="contact-title" className="display mt-4 text-[clamp(2.4rem,5vw,4.25rem)]">Une question&nbsp;?</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Le plus simple reste de venir nous rencontrer au départ d&apos;une sortie. Vous pouvez aussi nous écrire.
            </p>
            <ul className="mt-8 space-y-5">
              <li className="flex gap-4">
                <MapPin aria-hidden className="mt-1 shrink-0 text-red" />
                <p>
                  <strong className="block font-semibold">Au départ des sorties</strong>
                  <span className="text-mute">Mercredi et samedi, 13h30 — place de la Mairie, Puymoyen</span>
                </p>
              </li>
              {site.social.facebook && (
                <li className="flex gap-4">
                  <span className="mt-1 shrink-0 text-red"><FacebookIcon size={24} /></span>
                  <p>
                    <strong className="block font-semibold">Sur Facebook</strong>
                    <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="link text-ink">
                      Cyclo Club de Puymoyen — Nouvelle-Aquitaine<span className="sr-only"> (nouvel onglet)</span>
                    </a>
                  </p>
                </li>
              )}
              {site.contact.email && (
                <li className="flex gap-4">
                  <Mail aria-hidden className="mt-1 shrink-0 text-red" />
                  <p>
                    <strong className="block font-semibold">Par e-mail</strong>
                    <a href={`mailto:${site.contact.email}`} className="link text-ink">{site.contact.email}</a>
                  </p>
                </li>
              )}
              <li className="flex gap-4">
                <MessageCircle aria-hidden className="mt-1 shrink-0 text-red" />
                <p>
                  <strong className="block font-semibold">Courrier</strong>
                  <span className="text-mute">{site.address.name}, {site.address.street}, {site.address.postalCode} {site.address.city}</span>
                </p>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="border border-stone-2 bg-white p-6 sm:p-10">
              {endpoint ? (
                <ContactForm endpoint={endpoint} />
              ) : (
                <div>
                  <h3 className="font-display text-3xl font-bold uppercase">Écrire au club</h3>
                  <p className="mt-4 leading-relaxed text-ink/80">
                    Le formulaire de contact en ligne sera activé dès que l&apos;adresse de réception du club aura été configurée.
                    En attendant, contactez-nous par message sur Facebook ou venez nous voir au départ d&apos;une sortie.
                  </p>
                  {site.social.facebook && (
                    <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-red mt-8">
                      <FacebookIcon size={18} /> Écrire sur Facebook
                      <span className="sr-only">(nouvel onglet)</span>
                    </a>
                  )}
                  <p className="mt-6 text-sm text-mute">
                    <Link href="/sorties/#rendez-vous" className="link text-ink">Voir le point de rendez-vous</Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </>
  );
}
