"use client";

import { useState } from "react";
import { Map as MapIcon, Navigation } from "lucide-react";
import { mapsUrl, osmEmbedUrl, osmUrl, site } from "@/data/site";

/**
 * Carte du point de départ. L'iframe OpenStreetMap n'est chargée qu'à la demande
 * (pas de cookie ni de requête tierce sans action de l'internaute).
 */
export function MeetingMap() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative overflow-hidden border border-stone-2 bg-stone">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
        {show ? (
          <iframe
            title={`Carte : ${site.meetingPoint.detail}`}
            src={osmEmbedUrl()}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="speed-lines-dark absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <span aria-hidden className="inline-flex h-14 w-14 items-center justify-center bg-red text-white">
              <MapIcon size={26} />
            </span>
            <p className="font-display text-2xl font-bold uppercase">{site.meetingPoint.label}</p>
            <p className="max-w-sm text-sm text-mute">
              La carte interactive est fournie par OpenStreetMap. Elle n&apos;est chargée que si vous le demandez.
            </p>
            <button type="button" onClick={() => setShow(true)} className="btn btn-ink !min-h-11 !text-base">
              Afficher la carte
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-stone-2 bg-white p-4 text-sm">
        <a href={mapsUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium hover:text-red-deep">
          <Navigation aria-hidden size={16} /> Itinéraire Google Maps <span className="sr-only">(nouvel onglet)</span>
        </a>
        <a href={osmUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium hover:text-red-deep">
          <MapIcon aria-hidden size={16} /> Ouvrir dans OpenStreetMap <span className="sr-only">(nouvel onglet)</span>
        </a>
      </div>
    </div>
  );
}
