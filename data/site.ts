/**
 * Informations générales du club.
 * Chaque donnée provient de l'ancien site (audit du 16/11/2026) — la source est
 * indiquée en commentaire. Les champs `null` sont « à confirmer » : ils ne sont
 * pas affichés tant qu'ils ne sont pas renseignés.
 */

export const site = {
  name: "Cyclo Club de Puymoyen",
  shortName: "CC Puymoyen",
  nickname: "Les Rouges et Blancs", // titre du site actuel « Site officiel des rouges et blancs »
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ccpuymoyen.com").replace(/\/$/, ""),
  locale: "fr_FR",
  foundingYear: 1985, // accueil : « qui roule depuis 1985 » + album « 1985 - 2015 : 30 ans » + 40e anniversaire en 2025
  federation: "UFOLEP", // page Présentation : « Affilié à l'UFOLEP »
  description:
    "Club cycliste affilié UFOLEP basé à Puymoyen, aux portes d'Angoulême (Charente). Route, cyclosport, VTT et cyclotourisme, en loisir ou en compétition. Sorties le mercredi et le samedi à 13h30.",

  address: {
    // page « Où sommes-nous ? »
    name: "Cyclo Club Puymoyen",
    street: "Mairie",
    postalCode: "16400",
    city: "Puymoyen",
    region: "Nouvelle-Aquitaine",
    department: "Charente",
    country: "FR",
  },

  meetingPoint: {
    // Présentation + Règlement : « place de la Mairie de Puymoyen », article jan. 2025 : « devant la supérette »
    label: "Place de la Mairie",
    detail: "Devant la supérette, place de la Mairie, 16400 Puymoyen",
    // Coordonnées issues du Street View intégré sur l'accueil de l'ancien site
    lat: 45.61491,
    lng: 0.17998,
  },

  /** Sorties club hebdomadaires — Présentation, Règlement, Nous rejoindre */
  weeklyRides: [
    { day: "Mercredi", time: "13h30", note: "Toute l'année" },
    { day: "Samedi", time: "13h30", note: "Toute l'année — parcours CCP1 / CCP2 publiés dans le calendrier" },
  ],

  social: {
    // lien présent dans la colonne de toutes les pages
    facebook: "https://www.facebook.com/profile.php?id=61554023938940",
    // À CONFIRMER : l'ancien site affiche des publications Instagram mais pas l'adresse du compte
    instagram: null as string | null,
    // À CONFIRMER : chaîne mentionnée sur l'accueil mais aucun lien direct trouvé
    youtube: null as string | null,
  },

  contact: {
    // À CONFIRMER : l'ancien site n'utilisait qu'un formulaire e-monsite, aucune adresse publiée
    email: null as string | null,
    phone: null as string | null,
    /** Point de terminaison du formulaire (Formspree, Web3Forms, Basin…). Vide = formulaire masqué. */
    formEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "",
  },

  legal: {
    // À CONFIRMER par le bureau avant mise en ligne
    publisher: "Association Cyclo Club de Puymoyen",
    publicationDirector: null as string | null,
    rna: null as string | null,
    host: null as string | null,
  },
} as const;

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/le-club/", label: "Le club" },
  { href: "/sorties/", label: "Nos sorties" },
  { href: "/actualites/", label: "Actualités" },
  { href: "/partenaires/", label: "Partenaires" },
  { href: "/nous-rejoindre/", label: "Nous rejoindre" },
] as const;

export function mapsUrl() {
  const { lat, lng } = site.meetingPoint;
  return `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`;
}
export function osmUrl() {
  const { lat, lng } = site.meetingPoint;
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`;
}
export function osmEmbedUrl() {
  const { lat, lng } = site.meetingPoint;
  const d = 0.004;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d}%2C${lat - d / 2}%2C${lng + d}%2C${lat + d / 2}&layer=mapnik&marker=${lat}%2C${lng}`;
}
