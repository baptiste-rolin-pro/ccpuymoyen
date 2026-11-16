# Audit du site actuel — www.ccpuymoyen.com

> Audit réalisé le 16 novembre 2026 par exploration automatisée du site (sitemap.xml, menus, ~420 pages téléchargées) et lecture des documents PDF.
> Plateforme : **e-monsite** (thème « designlines », Bootstrap 4 / jQuery 3.6). Polices du thème : Rubik et Poppins (Google Fonts).

## 1. Pages détectées et arborescence

Le `sitemap.xml` ne liste que les modules Agenda / Album / Blog / Vidéos. **Les pages éditoriales principales (`/pages/...`) n'y figurent pas** : elles ne sont accessibles qu'à partir du menu.

| Rubrique (menu) | URL | Contenu relevé | Décision |
| --- | --- | --- | --- |
| Accueil « Fil d'actualités rouges et blanches » | `/` | Texte de bienvenue (« roule depuis 1985 », pratique cyclotouriste, cyclosportive et vététiste), widget Instagram (12 publications), lien PDF calendrier, lien galerie, lien vidéos, Street View du point de RDV, **widget météo**, colonne partenaires | **Améliorer** (refonte complète) |
| Les activités | `/pages/les-activites/` | Simple sommaire | **Supprimer** (fusion dans « Nos sorties ») |
| La vie du Club | `/pages/les-activites/la-vie-du-club.html` | **18 actualités datées 2023 → juillet 2026 sur une seule page très longue** + photos | **Améliorer** : un article = une URL (`/actualites/<slug>/`) |
| Calendrier 2026 | `/pages/les-activites/calendrier-2020.html` | Lien vers un PDF (voir § 5) | **Améliorer** : calendrier HTML filtrable + PDF |
| Le club | `/pages/le-club/` | Sommaire | Fusionner dans `/le-club/` |
| Qui sommes-nous ? | `/pages/le-club/presentation.html` | UFOLEP, « environ une cinquantaine de licenciés », pratiques, sorties mer./sam. 13h30 place de la Mairie | **Conserver** → `/le-club/` |
| Où sommes-nous ? | `/pages/le-club/ou-sommes-nous.html` | « Cyclo Club Puymoyen, Mairie, 16400 PUYMOYEN » + carte Google Maps (API) | **Fusionner** → `/sorties/#rendez-vous` |
| Nous rejoindre | `/pages/le-club/rejoindre-l-association.html` | 2 possibilités : contact ou venir rouler mer./sam. 13h30 ; licence ou carte de membre si déjà UFOLEP | **Améliorer** → `/nous-rejoindre/` |
| Règlement intérieur | `/pages/le-club/reglement-interieur.html` | 10 règles (casque obligatoire, choix du groupe…) | **Conserver** intégralement → `/le-club/reglement-interieur/` |
| La tenue du club | `/pages/le-club/la-tenue-du-club.html` | Photos maillot 2026 + maillot collector 2017 | **Fusionner** → `/le-club/#tenue` |
| Nos partenaires | `/pages/le-club/nos-sponsors.html` | « Différentes formules de partenariat » + logos ; image « Maillot 2025 en cours de création » obsolète | **Améliorer** → `/partenaires/` |
| *(rubrique exclue)* | `/pages/elles-…/` | Rubrique exclue par le cahier des charges | **Supprimer** (aucune reprise : ni page, ni menu, ni lien, ni donnée) |
| Contact | `/contact/`, `/contact/contacter-l-association.html` | Formulaire e-monsite (nom, e-mail, sujet, message, « Êtes-vous adhérent »), **aucune adresse e-mail ni téléphone publiés** | **Améliorer** → `/nous-rejoindre/#contact` |
| Agenda | `/agenda/`, `/agenda/assemblees-generales/`, `/agenda/evenements-organises-par-l-association/` | **Vides** (« Aucun évènement à afficher ») ; seul événement archivé : course cycliste du 22/06/2014 | **Supprimer** (repris dans l'historique) |
| Blog | `/blog/`, `/blog/l-association/`, `/blog/nouveau-site-internet.html` | Un seul billet du 07/11/2013 « site en construction » | **Supprimer** (obsolète) |
| Album photos | `/album-photos/` + 13 catégories + ~330 pages photo | Albums 2012 → 2023 (catégorie 2024 « coming soon » vide), album « 1985-2015 : 30 ans », beaucoup de liens vers Google Photos / Picasa / Google+ / Flickr | **Fusionner** → `/galerie/` |
| Vidéos | `/videos/` + 9 catégories + ~50 pages | Vidéos 2012-2016 (YouTube/Vimeo), catégories 2019 et 2023 **vides**, vidéos « les pros » et « humour » sans lien avec le club | **Supprimer** (redirigées vers la galerie) |

## 2. Informations vérifiées reprises dans le nouveau site

- **Fondation : 1985** (accueil « roule depuis 1985 », album « 1985-2015 : 30 ans », 40e anniversaire fêté en 2025, mention « Depuis 1985 » sur le maillot).
- **Affiliation : UFOLEP.** Pratiques : cyclotourisme, cyclosport, VTT, en loisir ou en compétition (+ cyclo-cross et ultra-distance attestés par les actualités).
- **Sorties : mercredi et samedi à 13h30, toute l'année, place de la Mairie de Puymoyen** (« devant la supérette » selon l'article de début 2025). Coordonnées GPS issues du Street View intégré : 45.61491, 0.17998.
- **Une ou deux sorties d'essai offertes** avant la prise de licence.
- **Casque obligatoire** pour les sorties club (règlement).
- **Adresse postale :** Cyclo Club Puymoyen, Mairie, 16400 Puymoyen.
- **Partenaires** (confirmés par l'article du 9 mars 2026) : Eiffage Énergie Systèmes, Berton Aluminium, Bouticycle Angoulême, Nuances Unikalo, ADB Bâtiment, Ville de Puymoyen.
- **Réseau social officiel :** page Facebook `facebook.com/profile.php?id=61554023938940` (présente sur toutes les pages).
- **Calendrier 2026 :** 52 samedis, 103 parcours (groupes CCP1 / CCP2), distances, dénivelés partiels, liens Garmin Connect et itinéraires — extraits du PDF officiel « Parcours CCP 2026, version 1.0 du 5 janvier 2026 ».
- **Président :** Robin Talbot, élu fin 2023 (succède à Olivier Gouedo, président 5 ans) — mentionné dans l'historique, pas comme donnée de contact.

## 3. Médias

- **Logo** : `logo-ccp-noir.jpg` (1581×460, fond noir). Rouge mesuré : **#FD0209**. Le logo a été détouré (PNG/WebP transparent) pour le nouveau site. **Fichier vectoriel (SVG/PDF) à demander au club.**
- **38 photos du club** récupérées (articles 2023-2026, maillots, séjours) — renommées de façon descriptive, textes alternatifs rédigés.
- **Logos partenaires** : 6 fichiers (dont Bouticycle en 230×230 seulement → à remplacer par une version HD).
- Les albums 2012-2019 pointent surtout vers des services externes (Google+ et Picasa **n'existent plus** : liens morts).

## 4. Fonctionnalités existantes et dépendances

| Fonctionnalité | Dépendance | Sort dans la refonte |
| --- | --- | --- |
| Formulaire de contact | Module e-monsite (disparaît avec l'hébergement) | Formulaire connectable à un service d'envoi (Formspree, Web3Forms…) via `NEXT_PUBLIC_CONTACT_ENDPOINT` ; **masqué tant qu'il n'est pas configuré** (repli : Facebook + rendez-vous) |
| Widget Instagram | Jetons Instagram/Facebook (images CDN signées et expirantes) | Non repris (fragile) — lien vers le compte dès que son adresse est confirmée |
| Widget météo | e-monsite | **Supprimé** (non essentiel, script tiers) |
| **Compteur de visiteurs** (« Vous êtes le 175 828ème visiteur », bas de page) | e-monsite | **Supprimé** sur tout le site (exigence du cahier des charges) |
| Google Analytics + bannière cookies | e-monsite ; **lien vers la politique de confidentialité vide** | Non repris : nouveau site **sans cookie ni traceur** |
| Cartes Google Maps / Street View | API Google | Remplacées par une carte OpenStreetMap **chargée au clic** + liens Google Maps / OSM |

## 5. Contenus obsolètes, doublons, erreurs et manques

1. **Fichiers PDF du calendrier inversés** : le lien « Calendrier 2026 » de la page calendrier pointe vers `parcours-ccp-2026.pdf` qui contient en réalité **le calendrier 2025** ; le vrai calendrier 2026 est publié sous le nom `parcours-ccp-2028.pdf` (lien de l'accueil). Corrigé : le PDF 2026 est servi sous `/documents/parcours-ccp-2026.pdf`.
2. **URL trompeuse** : la page « Calendrier Route 2026 » a pour URL `calendrier-2020.html`.
3. **Nombre de licenciés contradictoire** : « environ une cinquantaine » (présentation) vs « la quarantaine de licenciés » (article de début 2025). → **à confirmer**.
4. **Point de RDV formulé de deux façons** (« place de la Mairie » / « place de Puymoyen, devant la supérette ») — cohérent mais à harmoniser.
5. Pas de **title/meta description** spécifiques (titre de l'accueil : « Fil d'actualités rouges et blanches »), pas de H1 sur l'accueil (seulement des H2), plusieurs H1 sur « La vie du Club » dont un H1 contenant un paragraphe entier.
6. Toutes les actualités sur **une seule page** (pas d'URL partageable, pas d'indexation par article).
7. Agenda et blog vides ou datés de 2013 ; catégories vidéo vides ; album 2024 « coming soon ».
8. Image « Maillot 2025 en cours de création — images non contractuelles » encore affichée sur la page partenaires.
9. Liens externes morts (Google+, Picasa).
10. **Manques** : aucune adresse e-mail/téléphone, pas de mentions légales, pas de tarifs d'adhésion, pas de lien direct Instagram/YouTube (bien que mentionnés), pas de traces GPX hébergées, pas de parcours du mercredi.
11. Coquilles corrigées dans la reprise des textes (ex. « cyclopsortive », « chrnométrées », « pas sion », « ciel bleu presque isolant » → « insolent »). L'article Ultra Bacchus a été **légèrement condensé** (anecdotes du parcours).

## 6. Intérêt SEO des anciennes pages

- Pages à valeur : accueil, présentation, nous rejoindre, calendrier, partenaires, la vie du club (contenu riche et récent). Toutes reçoivent une redirection 301 vers leur équivalent (voir `PLAN_REDIRECTIONS.md`).
- ~380 pages photo/vidéo quasi vides (titre = nom de fichier type « dsc-0030 ») : sans valeur SEO, redirigées en bloc vers `/galerie/`.

## 7. Risques liés à la migration

- **Perte du formulaire de contact** au moment de la bascule si aucun service d'envoi n'est configuré → configurer `NEXT_PUBLIC_CONTACT_ENDPOINT` ou publier une adresse e-mail avant la mise en ligne.
- **Nom de domaine** : vérifier qui détient `ccpuymoyen.com` (souvent rattaché au compte e-monsite) et le transférer ou le pointer vers le nouvel hébergeur **avant** de résilier e-monsite.
- **Redirections** : effectives seulement sur un hébergeur qui les supporte (Netlify, Cloudflare Pages, Apache). Sur GitHub Pages, seules des pages de redirection HTML (meta refresh) sont possibles.
- **Droits à l'image** : photos issues du site du club, avec des personnes identifiables → confirmer l'accord de réutilisation.
- Fin de l'export Instagram : les publications récentes n'apparaîtront plus sur le site.

## 8. Éléments à vérifier par le club

- [ ] Nombre actuel de licenciés et composition du bureau 2026.
- [ ] Adresse e-mail de contact (et/ou service d'envoi du formulaire).
- [ ] Adresse des comptes Instagram et YouTube officiels.
- [ ] Tarifs licence + cotisation 2026-2027.
- [ ] Mentions légales : n° RNA, directeur·rice de publication, hébergeur.
- [ ] Logo vectoriel et logos partenaires HD (Bouticycle notamment), site web d'ADB Bâtiment.
- [ ] Accord de diffusion des photos (droit à l'image).
- [ ] Calendrier 2027 dès sa parution (mise à jour de `data/`).
