import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, Lock } from "lucide-react";
import { LoginForm } from "@/components/LoginForm";
import { authConfigured, getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Connexion à l'espace membres",
  description: "Espace réservé aux licenciés du Cyclo Club de Puymoyen.",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ deconnecte?: string }> }) {
  if (await getSession()) redirect("/espace-membre/");
  const { deconnecte } = await searchParams;
  const ready = authConfigured();

  return (
    <section className="on-dark speed-lines relative overflow-hidden bg-ink pb-20 pt-32 text-white sm:pt-40">
      <div aria-hidden className="absolute -right-10 top-0 hidden h-full w-40 -skew-x-[24deg] bg-red lg:block" />
      <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <p className="eyebrow text-white/70">Réservé aux licenciés</p>
          <h1 className="display mt-4 text-[clamp(3rem,8vw,6.5rem)]">Espace membres</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
            Connectez-vous pour télécharger les parcours du club. Les comptes sont créés par le bureau pour les membres
            licenciés.
          </p>
          <p className="mt-6 text-sm text-white/60">
            Pas encore de compte ? Demandez-le au bureau lors d&apos;une sortie ou via la{" "}
            <Link href="/nous-rejoindre/#contact" className="link text-white">page contact</Link>.
          </p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="bg-white p-6 text-ink sm:p-10">
            <p className="flex items-center gap-3 font-display text-2xl font-bold uppercase">
              <Lock aria-hidden size={22} className="text-red" /> Connexion
            </p>
            {deconnecte && (
              <p role="status" className="mt-5 flex items-center gap-2 bg-stone p-3 text-sm">
                <CheckCircle2 aria-hidden size={18} className="text-red" /> Vous êtes déconnecté.
              </p>
            )}
            <div className="mt-6">
              {ready ? (
                <LoginForm />
              ) : (
                <p className="text-mute">
                  L&apos;espace membres n&apos;est pas encore activé sur ce site. Le bureau du club doit créer les comptes
                  membres (voir le README du projet).
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
