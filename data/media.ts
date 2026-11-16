import generated from "./images.generated.json";

/**
 * Photothèque. Toutes les photos proviennent de l'ancien site du club
 * (rubrique « La vie du Club », « La tenue du club », accueil).
 * Pour remplacer/ajouter une photo : déposer le fichier dans assets/photos/,
 * puis ajouter une entrée ici (clé = nom du fichier sans extension).
 * Les variantes WebP sont générées automatiquement (npm run images).
 */
export type Photo = {
  key: keyof typeof generated;
  alt: string;
  caption?: string;
  /** Point focal pour le recadrage (CSS object-position) */
  focus?: string;
};

const photos = {
  "sortie-route-groupe": {
    alt: "Cyclistes du club en maillot rouge et blanc roulant en file sur une petite route de campagne",
    caption: "Sortie sur les routes charentaises",
    focus: "50% 55%",
  },
  "col-croix-saint-robert-2025": {
    alt: "Les Rouges et Blancs posent au col de la Croix Saint-Robert (1451 m) en Auvergne",
    caption: "Col de la Croix Saint-Robert — Ascension 2025",
    focus: "50% 40%",
  },
  "auvergne-groupe-2025": {
    alt: "Groupe de cyclistes du club devant un panorama montagneux en Auvergne",
    caption: "Week-end de l'Ascension à La Bourboule, 2025",
  },
  "auvergne-route-2025": {
    alt: "Deux cyclistes du club gravissent une route boisée en Auvergne",
    caption: "Sur les routes d'Auvergne, 2025",
  },
  "auvergne-la-bourboule-2025": {
    alt: "Cyclistes du club roulant dans une rue de La Bourboule",
    caption: "La Bourboule, 2025",
  },
  "auvergne-montee-2025": {
    alt: "Cyclistes du club en montée, souriants, sur une route d'Auvergne",
    caption: "Ascension 2025",
  },
  "espagne-alt-de-la-mussara-2026": {
    alt: "Membres du club au panneau de l'Alt de la Mussara (958 m), en Catalogne",
    caption: "Alt de la Mussara — séjour en Espagne, printemps 2026",
  },
  "presentation-maillot-2026": {
    alt: "Une vingtaine de membres du club réunis pour la présentation du maillot 2026",
    caption: "Présentation du maillot 2026",
  },
  "maillot-2026-trio": {
    alt: "Trois membres du club portant le nouveau maillot rouge, blanc et noir",
    caption: "Le maillot 2026",
  },
  "maillot-2026-groupe": {
    alt: "Membres du club présentant le nouveau maillot lors de la soirée de lancement",
    caption: "Soirée de présentation du maillot, mars 2026",
  },
  "maillot-2026-face": {
    alt: "Maillot 2026 du club vu de face, blanc avec bandes rouge et noire et logo CCPuymoyen",
    caption: "Maillot 2026 — face",
  },
  "maillot-2026-dos": {
    alt: "Maillot 2026 du club vu de dos, avec les logos des partenaires et la mention Depuis 1985",
    caption: "Maillot 2026 — dos",
  },
  "maillot-collector-2017": {
    alt: "Illustration du maillot collector 2017, blanc, rouge et noir, face et dos",
    caption: "Le maillot collector 2017",
  },
  "reunion-club-2025": {
    alt: "Membres du club réunis dans une salle",
    caption: "Les Rouges et Blancs réunis — début de saison 2025",
  },
  "vtt-mb-race-2024": {
    alt: "Vététistes poussant leur vélo dans une forte pente en forêt lors de la MB Race",
    caption: "MB Race 2024",
    focus: "60% 50%",
  },
  "vtt-rando-fouquebrune-2024": {
    alt: "Vététistes du club, couverts de boue et souriants, lors de la randonnée de Fouquebrune",
    caption: "Randonnée VTT de Fouquebrune, octobre 2024",
  },
  "cyclo-cross-patrice-moreau": {
    alt: "Patrice Moreau en course de cyclo-cross sur un terrain herbeux",
    caption: "Patrice Moreau en cyclo-cross",
  },
  "podium-challenge-cyclo-cross-2025": {
    alt: "Patrice Moreau sur le podium du challenge cyclo-cross Poitou-Charentes",
    caption: "Podium du Challenge Cyclo-Cross Poitou-Charentes",
  },
  "robin-chemin-compostelle-2026": {
    alt: "Robin de nuit avec son vélo à côté d'une borne du chemin de Saint-Jacques-de-Compostelle",
    caption: "Robin sur la route de Compostelle",
  },
  "christian-col-aubisque-2026": {
    alt: "Christian au passage du col d'Aubisque, face à un cheval sur la route",
    caption: "Christian au passage du col d'Aubisque",
  },
  "christophe-bordeaux-saint-malo-2026": {
    alt: "Christophe Ravaud en maillot du club, souriant",
    caption: "Christophe, finisher de Bordeaux – Saint-Malo",
  },
  "robin-race-across-paris-2026": {
    alt: "Robin, médaille au cou, devant le panneau finisher de la Race Across Paris",
    caption: "Robin, finisher de la Race Across Paris 500 km",
  },
  "sortie-saison-2026": {
    alt: "Cyclistes du club roulant sur une route de campagne, vue depuis le peloton",
    caption: "La saison 2026 est lancée",
  },
  "rando-anniversaire-40-ans-2025": {
    alt: "Membres et bénévoles du club réunis autour d'une table pour les 40 ans du club",
    caption: "Rando anniversaire des 40 ans, septembre 2025",
  },
  "christian-race-across-france-2025": {
    alt: "Christian Mazou devant le panneau finisher de la Race Across France",
    caption: "Christian, finisher de la Race Across France 2025",
  },
  "ultra-bacchus-nuit-2025": {
    alt: "Cyclistes en tenue de pluie et lampes frontales à la base de vie de l'Ultra Bacchus",
    caption: "Ultra Bacchus 2025, départ sous la pluie",
  },
  "ultra-bacchus-chateau-2025": {
    alt: "Cycliste sous la pluie devant un château fort en Gironde",
    caption: "Ultra Bacchus 2025",
  },
  "ultra-bacchus-vignoble-2025": {
    alt: "Allée mouillée menant à un château du vignoble bordelais",
    caption: "Traversée du vignoble bordelais",
  },
  "ultra-bacchus-route-2025": {
    alt: "Route mouillée vue depuis le guidon, avec un cycliste devant",
    caption: "Ultra Bacchus 2025",
  },
  "velocite-angoumois-2024": {
    alt: "Christian Mazou roulant sur le circuit des 24 heures de Vélocité en Angoumois",
    caption: "24 h Vélocité en Angoumois, juin 2024",
  },
  "perigordine-2024": {
    alt: "Robin Talbot sous l'arche d'arrivée de la Périgordine",
    caption: "La Périgordine, juin 2024",
  },
  "sortie-groupe-2-2024": {
    alt: "Cyclistes du groupe 2 réunis place de la Mairie avant une sortie",
    caption: "Sortie du groupe 2, juin 2024",
  },
  "marathon-paris-2024": {
    alt: "Robin Talbot, médaille du marathon de Paris autour du cou",
    caption: "Marathon de Paris 2024",
  },
  "christian-race-across-paris-2024": {
    alt: "Christian Mazou, finisher de la Race Across Paris 1000 km",
    caption: "Race Across Paris 1000 km, 2024",
  },
  "repas-fin-annee-2023-discours": {
    alt: "Le président du club prononce son discours lors du repas de fin d'année",
    caption: "Repas de fin d'année, décembre 2023",
  },
  "repas-fin-annee-2023": {
    alt: "Membres du club et leurs familles à table lors du repas de fin d'année",
    caption: "Repas de fin d'année, décembre 2023",
  },
  "paul-poux-2023": {
    alt: "Membres du club au départ de la Paul Poux",
    caption: "La Paul Poux, avril 2023",
  },
  "cycliste-campagne": {
    alt: "Cycliste en maillot du club roulant au milieu des champs",
    caption: "Sur les routes de Charente",
  },
} satisfies Record<keyof typeof generated, Omit<Photo, "key">>;

export type PhotoKey = keyof typeof photos;

export function photo(key: PhotoKey) {
  const g = generated[key];
  const p = photos[key] as Omit<Photo, "key">;
  return { key, src: `/img/${key}`, width: g.width, height: g.height, blur: g.blur, ...p };
}

export const allPhotoKeys = Object.keys(photos) as PhotoKey[];
