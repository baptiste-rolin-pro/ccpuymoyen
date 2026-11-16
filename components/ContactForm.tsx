"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Formulaire de contact envoyé vers un service tiers compatible (Formspree, Web3Forms, Basin…)
 * défini par NEXT_PUBLIC_CONTACT_ENDPOINT. Ce composant n'est rendu que si l'URL est configurée.
 */
export function ContactForm({ endpoint }: { endpoint: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // pot de miel anti-spam
    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex gap-4 border border-stone-2 bg-white p-8">
        <CheckCircle2 aria-hidden className="shrink-0 text-red" size={28} />
        <div>
          <p className="font-display text-2xl font-bold uppercase">Message envoyé</p>
          <p className="mt-2 text-mute">Merci ! Un membre du bureau vous répondra dès que possible.</p>
        </div>
      </div>
    );
  }

  const field = "mt-2 block w-full border border-ink/20 bg-white px-4 py-3 text-base outline-none transition focus:border-ink focus:ring-2 focus:ring-red/40";
  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate={false}>
      <div>
        <label htmlFor="cf-name" className="font-medium">Nom <span aria-hidden className="text-red">*</span></label>
        <input id="cf-name" name="nom" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="cf-email" className="font-medium">E-mail <span aria-hidden className="text-red">*</span></label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-subject" className="font-medium">Sujet</label>
        <select id="cf-subject" name="sujet" className={field} defaultValue="Rejoindre le club">
          <option>Rejoindre le club</option>
          <option>Sortie d&apos;essai</option>
          <option>Partenariat</option>
          <option>Autre demande</option>
        </select>
      </div>
      <fieldset className="sm:col-span-2">
        <legend className="font-medium">Êtes-vous déjà licencié UFOLEP ?</legend>
        <div className="mt-2 flex gap-6">
          <label className="inline-flex items-center gap-2"><input type="radio" name="licencie_ufolep" value="oui" className="h-4 w-4 accent-[#e10600]" /> Oui</label>
          <label className="inline-flex items-center gap-2"><input type="radio" name="licencie_ufolep" value="non" defaultChecked className="h-4 w-4 accent-[#e10600]" /> Non</label>
        </div>
      </fieldset>
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className="font-medium">Message <span aria-hidden className="text-red">*</span></label>
        <textarea id="cf-message" name="message" required rows={6} className={field} />
      </div>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-mute">
          <span aria-hidden className="text-red">*</span> Champs obligatoires. Vos données servent uniquement à vous répondre.
        </p>
        <button type="submit" className="btn btn-red" disabled={status === "sending"}>
          {status === "sending" ? <Loader2 aria-hidden size={18} className="animate-spin" /> : <Send aria-hidden size={18} />}
          {status === "sending" ? "Envoi…" : "Envoyer"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="border-l-4 border-red bg-stone p-4 text-sm sm:col-span-2">
          L&apos;envoi a échoué. Réessayez dans un instant ou contactez-nous via les autres moyens indiqués.
        </p>
      )}
    </form>
  );
}
