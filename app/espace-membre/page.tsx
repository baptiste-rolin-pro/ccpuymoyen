import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarDays, Download, FileText, LogOut } from "lucide-react";
import { getSession } from "@/lib/auth";
import { logout } from "@/app/connexion/actions";
import { memberDocuments } from "@/data/member-documents";
import { NextSaturday } from "@/components/NextSaturday";

export const metadata: Metadata = {
  title: "Espace membres",
  robots: { index: false, follow: false },
};

export default async function MemberPage() {
  const session = await getSession();
  if (!session) redirect("/connexion/");
  const first = session.name.split(" ")[0];

  return (
    <>
      <section className="on-dark speed-lines relative overflow-hidden bg-ink pb-14 pt-32 text-white sm:pt-40">
        <div aria-hidden className="absolute -right-10 top-0 hidden h-full w-40 -skew-x-[24deg] bg-red lg:block" />
        <div className="wrap relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-white/70">Espace membres</p>
            <h1 className="display mt-4 text-[clamp(2.8rem,7vw,5.5rem)]">Bonjour {first}&nbsp;!</h1>
            <p className="mt-4 text-white/75">Connecté en tant que {session.email}</p>
          </div>
          <form action={logout}>
            <button type="submit" className="btn btn-ghost text-white">
              <LogOut aria-hidden size={18} /> Se déconnecter
            </button>
          </form>
        </div>
      </section>

      <section aria-labelledby="docs" className="py-16 sm:py-20">
        <div className="wrap">
          <h2 id="docs" className="display text-[clamp(2.2rem,4.5vw,3.5rem)]">Parcours à télécharger</h2>
          <p className="mt-3 max-w-2xl text-mute">
            Ces documents sont réservés aux membres du club : merci de ne pas les diffuser en dehors du club.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {memberDocuments.map((d) => (
              <li key={d.id}>
                <a
                  href={`/api/membres/documents/${d.id}/`}
                  className="group flex h-full items-center gap-5 border border-stone-2 p-6 transition-colors hover:border-ink"
                >
                  <span className="inline-flex h-16 w-14 shrink-0 items-center justify-center bg-red text-white">
                    <FileText aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-2xl font-bold uppercase group-hover:text-red-deep">{d.title}</span>
                    <span className="mt-1 block text-sm text-mute">{d.description}</span>
                    <span className="mt-1 block text-sm font-medium">PDF · {d.size}</span>
                  </span>
                  <Download aria-hidden className="ml-auto shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="prochain" className="bg-stone py-16 sm:py-20">
        <div className="wrap">
          <h2 id="prochain" className="sr-only">Prochain parcours</h2>
          <NextSaturday />
          <Link href="/sorties/#calendrier" className="arrow-link mt-8 text-ink">
            <CalendarDays aria-hidden size={18} /> Tout le calendrier
          </Link>
        </div>
      </section>
    </>
  );
}
