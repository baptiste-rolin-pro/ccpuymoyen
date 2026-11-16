# Plan de redirections — anciennes URL → nouvelles URL

Source : URL réellement relevées sur www.ccpuymoyen.com le 16/11/2026 (menu, sitemap.xml, crawl).
Toutes les redirections sont **permanentes** (code 308, traité comme une 301 par les moteurs de recherche). Elles sont définies dans **`data/redirects.json`** et appliquées par `next.config.ts` (hébergement Vercel).

## Pages principales

| Ancienne URL | Nouvelle URL | Remarque |
| --- | --- | --- |
| `/` | `/` | inchangée |
| `/pages/` | `/` | |
| `/pages/les-activites/` | `/sorties/` | |
| `/pages/les-activites/la-vie-du-club.html` | `/actualites/` | les 18 articles ont désormais chacun leur URL |
| `/pages/les-activites/calendrier-2020.html` | `/sorties/` | calendrier HTML (ancre `#calendrier`) |
| `/pages/le-club/` | `/le-club/` | |
| `/pages/le-club/presentation.html` | `/le-club/` | |
| `/pages/le-club/ou-sommes-nous.html` | `/sorties/` | section `#rendez-vous` |
| `/pages/le-club/rejoindre-l-association.html` | `/nous-rejoindre/` | |
| `/pages/le-club/reglement-interieur.html` | `/le-club/reglement-interieur/` | |
| `/pages/le-club/la-tenue-du-club.html` | `/le-club/` | section `#tenue` |
| `/pages/le-club/nos-sponsors.html` | `/partenaires/` | |
| `/contact/` et `/contact/contacter-l-association.html` | `/nous-rejoindre/` | section `#contact` |

## Modules supprimés (redirection en bloc, préfixe)

| Ancien préfixe | Nouvelle URL | Pages concernées |
| --- | --- | --- |
| `/agenda/*` | `/actualites/` | agenda vide + événement 2014 (repris dans l'historique du club) |
| `/blog/*` | `/actualites/` | billet unique de 2013 |
| `/album-photos/*` | `/galerie/` | 13 catégories + ~330 pages photo |
| `/videos/*` | `/galerie/` | 9 catégories + ~50 pages vidéo |

## Documents

| Ancienne URL | Nouvelle URL | Remarque |
| --- | --- | --- |
| `/medias/files/parcours-ccp-2028.pdf` | `/sorties/` | le PDF des parcours est désormais réservé à l'espace membres |
| `/medias/files/parcours-ccp-2026.pdf` | `/sorties/` | idem (ce fichier contenait en réalité le calendrier 2025) |

## Contenus volontairement non redirigés (404)

- La rubrique exclue par le cahier des charges (`/pages/elles-…/` et ses sous-pages) : **aucune redirection**, la page renvoie une 404. Si l'hébergeur le permet, un code **410 Gone** est préférable pour accélérer la désindexation (règle à ajouter manuellement dans la configuration serveur ; elle n'est volontairement pas intégrée au code du site).
- Les images de l'ancien site `/medias/images/*` (les photos utiles ont été reprises sous `/img/`).
- Le compteur de visiteurs et le widget météo n'avaient pas d'URL propre.

## Après la mise en ligne

1. Vérifier quelques redirections : `curl -I https://www.ccpuymoyen.com/pages/le-club/presentation.html` doit renvoyer `308` vers `/le-club/`.
2. Déclarer `https://www.ccpuymoyen.com/sitemap.xml` dans Google Search Console et Bing Webmaster Tools.
3. Surveiller le rapport « Pages » de la Search Console pendant 2 à 3 mois (404 inattendues).
