import type { PhotoKey } from "./media";

/**
 * Actualités du club.
 * Source : page « La vie du Club » de l'ancien site (textes repris à l'identique,
 * coquilles évidentes corrigées). Chaque article a désormais sa propre URL.
 *
 * Pour ajouter un article : copier un bloc, choisir un `slug` unique (minuscules,
 * tirets), une `date` AAAA-MM-JJ et des paragraphes. Le plus récent s'affiche en premier.
 * `approxDate` : à renseigner quand l'ancien site ne précisait pas de date de
 * publication (affiché à la place de la date exacte).
 */
export type Category = "Vie du club" | "Ultra-distance" | "Compétition" | "Séjours" | "VTT & cyclo-cross";

export type Article = {
  slug: string;
  title: string;
  date: string;
  approxDate?: string;
  category: Category;
  excerpt: string;
  cover: PhotoKey;
  body: string[];
  images?: PhotoKey[];
};

export const articles: Article[] = [
  {
    slug: "race-across-france-2026-deux-aventures-une-meme-passion",
    title: "Deux aventures, une même passion",
    date: "2026-07-13",
    category: "Ultra-distance",
    excerpt:
      "Race Across France 2026 sous la canicule : Christian sait dire stop au bon moment, Robin transforme la déception en premier 1 000 km vers Compostelle.",
    cover: "robin-chemin-compostelle-2026",
    images: ["robin-chemin-compostelle-2026", "christian-col-aubisque-2026"],
    body: [
      "L'édition 2026 de la Race Across France, fin juin, aura été profondément marquée par la canicule. Deux cyclistes Puymoyennais, engagés sur des formats différents, ont vu leurs plans bouleversés… mais ont chacun trouvé leur manière de transformer cette épreuve.",
      "Au départ de la RAF 2500 km, Christian Mazou atteint la première base de vie à Créon après 527 km et 6300 m de dénivelé positif parcourus en 39 heures. Face à une chaleur accablante et à des prévisions annonçant plusieurs jours de canicule sans réelle possibilité de récupération, il choisit de s'arrêter. Une décision mûrement réfléchie, confortée quelques heures plus tard par la neutralisation de la course et la modification du tracé initialement prévu.",
      "De son côté, Robin devait prendre le départ de la RAF 1000 km. Les adaptations imposées à l'épreuve l'empêchent finalement de vivre son objectif. Plutôt que de renoncer, il crée son propre défi : un parcours de 1 000 km et 15 000 m de dénivelé positif sur le chemin espagnol de Saint-Jacques-de-Compostelle. Il boucle cette aventure en 72 heures à allure course, signant son tout premier 1 000 kilomètres.",
      "Ces deux parcours rappellent que l'ultradistance ne se résume pas à une ligne d'arrivée. Elle récompense aussi la capacité à s'adapter, à faire les bons choix et à rebondir face à l'imprévu. Pour l'un, la réussite aura été de savoir dire stop au bon moment ; pour l'autre, de transformer une déception en un exploit personnel. Deux histoires différentes, mais une même passion de l'ultra.",
    ],
  },
  {
    slug: "premier-ultra-christophe-bordeaux-saint-malo",
    title: "Pour son premier ultra, Christophe découvre là où tout commence : la deuxième nuit",
    date: "2026-06-08",
    category: "Ultra-distance",
    excerpt:
      "815 km entre Bordeaux et Saint-Malo en 42 heures : Christophe Ravaud boucle son tout premier ultra.",
    cover: "christophe-bordeaux-saint-malo-2026",
    body: [
      "Boucler 815 km entre Bordeaux et Saint-Malo en 42 heures est déjà une performance. Le faire pour un premier ultra donne une autre dimension, mission accomplie par Christophe Ravaud qui est arrivé au bout de son premier ultra lors de l'épreuve d'ultra cyclisme Bordeaux Saint-Malo.",
      "Départ le mercredi 20 mai à 22h30, arrivée le vendredi 22 mai à 16h30. Deux nuits sur le vélo et une réalité simple : la course commence vraiment à la deuxième nuit.",
      "La première nuit passe encore sur l'élan. Le corps répond, la tête suit. Puis la fatigue s'installe, la lucidité baisse, et tout bascule. La deuxième nuit, c'est le moment clé. Le corps est entamé, les repères disparaissent, la moindre erreur coûte.",
      "On ne parle plus de vitesse, mais de capacité à continuer. « À un moment donné j'étais à la dérive complète, complètement à l'ouest, et du coup j'ai dormi 2 h, 2 h 30 » explique Christophe.",
      "C'est là que les écarts se font. Rester lucide, continuer à s'alimenter, garder une allure propre sans subir, savoir se poser avant qu'il ne soit trop tard, que ça devienne trop dangereux. Sur ce Bordeaux – Saint-Malo, la performance s'est construite ici : dans la régularité et la maîtrise, sans rupture.",
      "Boucler un premier ultra, ce n'est pas un hasard, c'est le signe d'une gestion juste du début à la fin. Des bases solides. Et forcément, une suite à écrire.",
    ],
  },
  {
    slug: "robin-finisher-race-across-paris-500-km",
    title: "Robin finisher de la Race Across Paris 500 km",
    date: "2026-05-04",
    category: "Ultra-distance",
    excerpt:
      "550 km et 4 791 m de D+ en 27h59 malgré une roue endommagée. Pendant ce temps, une partie du club roulait du côté de Cambrils.",
    cover: "robin-race-across-paris-2026",
    images: ["robin-race-across-paris-2026", "espagne-alt-de-la-mussara-2026"],
    body: [
      "Robin Talbot a pris le départ le 24 avril de la Race Across Paris sur le format 500 km, une aventure qui n'a pas été un long fleuve tranquille. En effet, dès le kilomètre 150 il a endommagé sa roue avant sur un passage à niveau, engendrant fuite du préventif tubeless puis 400 km à rouler avec le doute qu'elle lâche à tout moment. Ensuite, avec le froid et la fatigue, la nuit a été très compliquée mais au petit matin du deuxième jour, le lever du soleil lui a donné de l'énergie et de bonnes sensations pour aller chercher la ligne d'arrivée.",
      "Notre Rouge et Blanc aura bouclé son parcours avec un compteur affichant 550 km et 4 791 m de dénivelé positif en 27h59, réalisant ainsi une performance solide, lucide et engagée jusqu'au bout.",
      "Finisher dans ces conditions, c'est du mental pur. S'adapter, encaisser, continuer malgré l'incertitude, sont quelques-uns des ingrédients qui permettent d'aller au bout d'une épreuve d'ultra distance.",
      "À peu près au même moment, quelques membres du club avaient pris la direction de la région de Cambrils pour une semaine placée sous le signe du vélo… et du plaisir. Au programme : belles sorties sur des routes exigeantes, passages emblématiques comme l'Alt de la Mussara, mais aussi détente, balades touristiques et découvertes gastronomiques locales. Une parenthèse sportive et conviviale, fidèle à l'esprit du club : rouler, partager et profiter.",
      "La saison des Rouges et Blancs a bien débuté et chacun, selon son niveau de pratique, avance sereinement dans sa préparation et dans son calendrier sportif.",
    ],
  },
  {
    slug: "la-saison-2026-est-lancee",
    title: "La saison est lancée",
    date: "2026-03-16",
    category: "Vie du club",
    excerpt:
      "Retour des beaux jours, reprise des sorties et premiers objectifs : Limousine Challenge, Race Across Paris, Race Across France…",
    cover: "sortie-saison-2026",
    body: [
      "Si la saison cycliste redémarre avec l'arrivée des beaux jours, certains n'ont pourtant jamais vraiment rangé le vélo durant l'hiver. Quelques membres ont continué à rouler malgré la météo hivernale pour garder le rythme et préparer les objectifs à venir.",
      "Avec le retour de conditions plus clémentes, les sorties reprennent plus régulièrement et le calendrier commence déjà à se remplir.",
      "Plusieurs membres du club ont d'ores et déjà posé leurs premiers objectifs de l'année. Certains se préparent pour les cyclosportives de la saison, d'autres visent des randonnées ou des projets personnels. Quelques-uns ont déjà la tête dans des épreuves estivales importantes, voici d'ailleurs les premières échéances annoncées :",
      "• Hervé, Laurent et Olivier participeront à la Limousine Challenge 206 km début juin, une épreuve qu'ils affectionnent.",
      "• Robin sera également sur la Limousine mais débutera sa saison avec les 500 km de la Race Across Paris en avril avant de se jeter fin juin dans la gueule d'une des épreuves phares du calendrier ultra cycliste, la Race Across France, sur le format 1000 km.",
      "• Christian sera également au départ de la Race Across France, sur le format 2500 km pour la deuxième année consécutive ; il s'élancera mi-juin pour cette traversée mythique de la France.",
    ],
  },
  {
    slug: "nouveau-maillot-2026",
    title: "Mars 2026, un nouveau maillot pour une nouvelle saison !",
    date: "2026-03-09",
    category: "Vie du club",
    excerpt:
      "Soirée de présentation du nouveau maillot et arrivée de deux nouveaux partenaires : Nuances Unikalo et ADB Bâtiment.",
    cover: "presentation-maillot-2026",
    images: ["maillot-2026-trio", "maillot-2026-dos", "maillot-2026-face", "maillot-2026-groupe"],
    body: [
      "Le Cyclo Club de Puymoyen a récemment organisé une soirée conviviale afin de présenter officiellement son nouveau maillot pour la saison à venir. Ce moment a permis aux membres présents de découvrir la nouvelle tenue du club, fidèle aux couleurs qui représentent l'identité du club.",
      "Cette présentation a également été l'occasion de rencontrer deux nouveaux partenaires, Nuances Unikalo et ADB Bâtiment, qui accompagneront désormais le club dans ses activités et ses projets sportifs, aux côtés d'Eiffage Énergie Systèmes, de Berton Aluminium, de Bouticycle Angoulême et de la municipalité de Puymoyen. Le soutien de l'ensemble de ces partenaires contribuera au développement du club et à la poursuite de ses actions en faveur de la pratique du cyclisme.",
      "Sur les routes de Charente, de France et d'ailleurs, les Rouges et Blancs seront fiers de porter les couleurs de ces partenaires, qui, par leur accompagnement, montrent leur attachement au tissu associatif local.",
      "Une vingtaine de personnes avaient répondu présent pour ce moment de partage autour de cette nouveauté importante pour la vie du club et la soirée s'est conclue dans une ambiance chaleureuse autour du pot de l'amitié, permettant aux participants d'échanger et de prolonger ce moment convivial.",
    ],
  },
  {
    slug: "rando-anniversaire-40-ans-sous-la-pluie",
    title: "La pluie, coupable de la (très) petite affluence à la rando anniversaire du Cyclo Club !",
    date: "2025-09-22",
    category: "Vie du club",
    excerpt:
      "40 ans du club : barbecue et Paris-Brest le samedi, rando sous une pluie battante le dimanche pour huit courageux.",
    cover: "rando-anniversaire-40-ans-2025",
    body: [
      "Seulement 8 courageux cyclistes, dont 3 du club, ont bravé la pluie ce dimanche matin pour la Rando du Cyclo Club de Puymoyen… ça nous fait grosso modo plus d'un bénévole pour un cycliste (le top de l'accueil) !",
      "Au programme, départ à 8 h pour ces guerriers sous une pluie battante avec 90 km (1400 m D+) au menu pour 5 d'entre eux et 75 km (1000 m D+) pour les 3 autres.",
      "Jean, Charles, Jean-Marie, Paul, Emmanuel, Benjamin, Laurent et Christian se sont bien trempés sur environ 3/4 du circuit avant de terminer sous un ciel bleu presque insolent qui a pu les sécher et leur permettre de finir sur une note agréable et la satisfaction d'avoir passé un bon moment sur le vélo, sur les belles routes d'entraînement du club.",
      "Le parcours était top, les bénévoles aux petits soins, le ravito royal, le verre de l'amitié fastueux, bref dommage que d'autres cyclistes n'aient pas pu profiter de cette Rando anniversaire…",
      "Pour les bénévoles, ce week-end d'anniversaire avait commencé la veille lors de la matinée consacrée au balisage des deux circuits avant de passer un moment convivial autour du barbecue, moment auquel les membres et anciens membres du club avaient été conviés. Une quarantaine de personnes ont répondu présent à cette invitation et sous le soleil de ce samedi après-midi, les convives ont partagé l'apéritif puis les grillades avant de souffler les bougies et de déguster l'excellent Paris-Brest confectionné pour l'occasion de ce quarantième anniversaire.",
      "Le lendemain, sur le plan sportif, la météo avait donc décidé de gâcher la fin de la fête.",
    ],
  },
  {
    slug: "christian-mazou-finisher-race-across-france-2025",
    title: "Un Puymoyennais parcourt 2600 km et grimpe 36 000 m en 10 jours sur une course à travers la France",
    date: "2025-06-29",
    category: "Ultra-distance",
    excerpt:
      "Christian Mazou finisher de la Race Across France 2600 km, de Dinan à Mandelieu-la-Napoule, pour sa première participation.",
    cover: "christian-race-across-france-2025",
    body: [
      "Christian Mazou a participé à la Race Across France, épreuve d'ultracyclisme traversant la France à boucler dans un délai de 10 jours maximum.",
      "Le 11 juin, il a pris le départ de la course à Dinan, pour un tracé de 2600 km menant les coureurs à Mandelieu-la-Napoule et traversant Bretagne, Pays de la Loire, Limousin, Aquitaine, Midi-Pyrénées, Auvergne, Rhône-Alpes et Provence-Alpes-Côte d'Azur. Il est arrivé à destination 239 heures après son départ et a donc réussi son pari de se classer finisher de cette épreuve pour sa première participation.",
      "« Entre les orages bretons et limousins et la canicule sur le reste du parcours, la tâche n'a pas été simple, il a fallu faire le dos rond pour avancer chaque jour jusqu'à la libération de la ligne d'arrivée. Le parcours était génial, sur des routes à faible trafic et tout au long de l'épreuve nous avons eu droit à une sélection des plus belles bosses et cols de chaque région, comme le Mur de Bretagne, le Pas de Peyrol ou encore la Cime de la Bonette. Je n'ai pas eu de souci de santé majeur, mon matériel n'a pas bronché et je suis vraiment heureux d'avoir réussi ce défi » explique Christian Mazou.",
      "Un autre cycliste du club, Robin Talbot, était également engagé sur cette épreuve sur le format 350 km qu'il devait réaliser en moins de 24 h mais malheureusement, victime d'un coup de chaud dans l'avant-dernier col de l'épreuve, Robin a été contraint à l'abandon après avoir parcouru 270 km et gravi 6000 m de dénivelé en un peu plus de 14 h, une belle performance tout de même.",
      "Après l'épreuve, nos deux cyclistes Rouges et Blancs ont débriefé leurs aventures respectives et il y a fort à parier que la confiance prise par Christian sur cette épreuve et la revanche que Robin aura à cœur de mettre en place leur permettront de s'aligner sur d'autres épreuves dans le futur.",
    ],
  },
  {
    slug: "ascension-2025-la-bourboule",
    title: "Pour l'Ascension, le CCP déboule à La Bourboule !",
    date: "2025-06-01",
    approxDate: "Ascension 2025",
    category: "Séjours",
    excerpt:
      "250 km et 4700 m de D+ en quatre jours sur les cols d'Auvergne, entre Croix Saint-Robert et Croix Morand.",
    cover: "col-croix-saint-robert-2025",
    images: ["auvergne-groupe-2025", "auvergne-route-2025", "auvergne-la-bourboule-2025", "auvergne-montee-2025"],
    body: [
      "Une petite dizaine de licenciés du Cyclo Club de Puymoyen et leurs conjointes se sont retrouvés en Auvergne à La Bourboule pour le week-end de l'Ascension placé sous le signe de la convivialité.",
      "Arrivés à leur hôtel le jeudi, les cyclistes ont pu s'échauffer avec une petite sortie d'une quarantaine de kilomètres histoire de se mettre en jambes pour le week-end. Le vendredi et le samedi, les Rouges et Blancs avaient à leur planning deux sorties d'environ 80 kilomètres et le dimanche une nouvelle sortie d'environ 40 km avant le retour en Charente était également programmée.",
      "Au total, les cyclos Puymoyennais ont parcouru 250 kilomètres et avalé 4700 m de dénivelé positif sur l'ensemble du week-end et certains ont même rallongé un peu histoire de parfaire leur préparation estivale. Le soleil a été au rendez-vous tous les jours, les sorties se sont déroulées dans de magnifiques paysages auvergnats sur des routes empruntant les cols bien connus des cyclistes comme la Croix Saint-Robert ou la Croix Morand et également sur les routes qu'empruntera le peloton du Tour de France lors de l'étape du 14 juillet qui mènera les pros d'Ennezat jusqu'au Mont-Dore.",
      "Entre belles sorties vélo, balades touristiques aux alentours du Mont-Dore, moments de détente en famille et ravitaillements en bons produits régionaux, les Puymoyennais à l'unanimité ont décrété qu'ils ont passé un agréable séjour bourboulien pour ce week-end de l'Ascension, ce que confirme Robin Talbot, président du Cyclo Club de Puymoyen : « J'ai mal aux jambes, un frigo bien rempli de fromage, et des souvenirs d'avoir grimpé les plus beaux cols de l'Auvergne entouré d'une super équipe de licenciés du CCP. De manière générale, un week-end dont on se souviendra. »",
    ],
  },
  {
    slug: "ultra-bacchus-2025-robin-et-christian-finishers",
    title: "Robin et Christian finishers de la première édition « diluvienne » de l'Ultra Bacchus 444 km",
    date: "2025-04-25",
    approxDate: "Avril 2025",
    category: "Ultra-distance",
    excerpt:
      "444 km à travers le vignoble bordelais sous une pluie non-stop : 13e temps pour le duo Puymoyennais, quand deux tiers des participants ont abandonné.",
    cover: "ultra-bacchus-chateau-2025",
    images: ["ultra-bacchus-nuit-2025", "ultra-bacchus-route-2025", "ultra-bacchus-vignoble-2025"],
    body: [
      "Le week-end de Pâques, souvenez-vous, sûrement le week-end le plus pluvieux de ce début d'année 2025 dans le Sud-Ouest avec une pluie diluvienne non-stop et de belles rafales de vent, était le week-end qu'avaient choisi Robin et Christian pour partir à l'assaut de l'Ultra Bacchus, une épreuve ultra-distance de 444 km à parcourir en 35 h maximum sur un parcours en boucle partant du Teich et traversant l'essentiel du vignoble bordelais comme le Sauternais, Sainte-Croix-du-Mont, Loupiac, l'Entre-deux-Mers, Saint-Émilion, Pessac-Léognan, ou encore la route des vins de Graves.",
      "Nos deux Rouges et Blancs se sont inscrits à cette épreuve afin de construire une base solide d'entraînement pour un de leurs grands objectifs de l'année qui sera leur participation à la Race Across France en juin avec pour Robin le format 300 km (6500 m D+ / 24 h max) et pour Christian le format 2500 km (30 000 m D+ / 240 h max).",
      "Après une soirée pasta chez le pizzaiolo local le vendredi soir et une bonne nuit de sommeil, Robin et Christian se sont élancés du Teich le samedi matin à 7 h lors du départ du peloton composé d'une centaine de cyclistes. Après environ deux heures de route à rouler de petits groupes en petits groupes, le premier checkpoint a été le bienvenu pour un bon café chaud puis le gros du peloton s'est disséminé à partir de ce moment-là laissant plus d'autonomie à chacun.",
      "Vers midi, au km 121 à Saint-Macaire, une boulangerie a permis à nos deux cyclistes de faire une pause sandwich-café chaud mais également un réajustement de leurs vêtements qui étaient déjà trempés… « Les clients de la boulangerie se demandaient ce qui nous passait par la tête pour faire du vélo par une telle journée, une personne nous a même proposé de venir chez elle pour nous réchauffer un moment, nous avons bien entendu décliné l'invitation, il nous restait encore 323 km à parcourir ! » explique Christian.",
      "La base de vie du village de Vignonet leur aura permis de se réchauffer un peu, de se restaurer avec un bon plat de pâtes pendant que leurs vêtements trempés séchaient sur les radiateurs de la salle des fêtes. Le retour à la base de vie au km 293 vers 23 h a été très apprécié : nos Rouges et Blancs y resteront 3 h 10 au chaud et Robin dormira 45 minutes, Christian ne dormira pas.",
      "Les deux cyclistes reprendront ensuite la route de nuit et sous la pluie pour les 151 km les séparant de la ligne d'arrivée, traversant une portion de route d'environ 300 m inondée d'une trentaine de centimètres d'eau. Nos Rouges et Blancs franchiront la ligne d'arrivée au Teich le dimanche vers 11 h 15, soit un peu plus de 28 h après leur départ la veille et environ 20 h sur le vélo.",
      "Ils partaient pour boucler l'aventure en 24 h max pauses comprises mais vu les conditions météorologiques rencontrées tout au long du parcours, ils sont très satisfaits de leur chrono qui place le duo Puymoyennais au 13e temps des participants et sont encore plus satisfaits d'être allés au bout de l'aventure alors que deux tiers des participants ont abandonné l'épreuve.",
    ],
  },
  {
    slug: "patrice-moreau-challenge-cyclo-cross-poitou-charentes",
    title: "Patrice Moreau s'empare de la 1re place du challenge Cyclo-Cross Poitou-Charentes",
    date: "2025-02-10",
    approxDate: "Hiver 2025",
    category: "VTT & cyclo-cross",
    excerpt:
      "Après une saison de cyclo-cross UFOLEP aux quatre coins de la région, Patrice remporte le challenge en 4e catégorie.",
    cover: "podium-challenge-cyclo-cross-2025",
    body: [
      "Si la saison hivernale est synonyme de récupération pour bon nombre de cyclistes, c'est aussi la période qu'apprécient les cyclistes qui aiment malmener leur matériel dans la boue, glisser dans les sous-bois, lutter sur leur vélo contre le vent et le froid sur des parcours techniques et accidentés à avaler le plus rapidement possible en faisant preuve de maîtrise tout au long de la course, autrement dit : les cyclo-crossmen.",
      "À ce jeu, le représentant des Rouges et Blancs sur les circuits de la région se nomme Patrice Moreau. Depuis de nombreuses années, Patrice est un fidèle de la discipline. Il se déplace entre octobre et la fin de l'hiver sur les compétitions de cyclo-cross UFOLEP organisées aux quatre coins de la région. Le Château-d'Oléron, Châtillon-sur-Sèvre, Grandjean, Brie, Saint-Léger-de-la-Martinière, Rom, Réparsac, Thollet, Brouage, Le Gond-Pontouvre, La Mothe-Saint-Héray, Aiffres, Bignay, Saint-Maixent-l'École, Couhé sont autant de courses qui ont permis à Patrice cet hiver de pratiquer sa discipline avec assiduité en se classant régulièrement à de belles places.",
      "Après sa 3e place aux Interdépartementaux à Neuville-du-Poitou début décembre et son top 10 au Régional à Latillé le 12 janvier, Patrice est monté fin janvier sur la première marche du podium du Challenge Cyclo-Cross Poitou-Charentes en 4e catégorie. Ses points engrangés tout au long de son beau parcours cette saison lui ont permis de remporter ce challenge.",
      "BRAVO CHAMPION !",
    ],
  },
  {
    slug: "en-route-pour-2025",
    title: "En route pour 2025…",
    date: "2025-01-15",
    approxDate: "Début 2025",
    category: "Vie du club",
    excerpt:
      "Assemblée générale : bureau reconduit, projets pour les 40 ans du club, sortie montagne, rando route et nouveau maillot.",
    cover: "reunion-club-2025",
    body: [
      "Le Cyclo Club de Puymoyen a récemment tenu son assemblée générale. Les finances se tiennent, le nombre de licenciés également, le bureau est maintenu à l'identique pour une nouvelle saison. Certains projets sont dans les tuyaux pour 2025 afin notamment de célébrer le quarantième anniversaire des cyclistes Rouges et Blancs. Ainsi, une fête se prépare avec un repas convivial pour la deuxième partie de la saison.",
      "Pour le reste des projets, une sortie club à la montagne en mai et une randonnée route en septembre devraient voir le jour. Un renouvellement des partenaires est également prévu et permettra de proposer aux cyclistes Rouges et Blancs un renouvellement de leur garde-robe avec l'arrivée d'un nouveau maillot.",
      "Sur le plan sportif, « no pain, no gain » comme dirait dans sa langue maternelle le président Robin Talbot, qui entame sa deuxième saison à la tête du club : les entraînements s'enchaînent donc les mercredis et samedis pour les routiers et les vététistes afin de se maintenir en forme durant l'hiver et de préparer au mieux l'année sportive 2025 avec des objectifs déjà programmés pour certains licenciés.",
      "Bien entendu, tout cycliste qui souhaiterait rejoindre le peloton du Cyclo Club de Puymoyen est le bienvenu tout au long de l'année. Qu'il soit vététiste ou routier, qu'il recherche une pratique loisir ou compétitive, il trouvera parmi la quarantaine de licenciés des coéquipiers de son niveau de pratique. Pour cela il lui suffit de venir avec son vélo et son casque pour une ou deux sorties d'essai offertes les mercredis et samedis au départ de la place de Puymoyen à 13h30 (devant la supérette).",
    ],
  },
  {
    slug: "50-nuances-de-boue",
    title: "50 nuances de boue…",
    date: "2024-11-05",
    approxDate: "Automne 2024",
    category: "VTT & cyclo-cross",
    excerpt:
      "Randonnée VTT de Fouquebrune puis Skoda Cup à La Couronne : les vététistes du club ont eu leur dose de gadoue.",
    cover: "vtt-rando-fouquebrune-2024",
    body: [
      "C'est la saison des feuilles mortes et des chemins boueux et certains de nos cyclistes Puymoyennais adorent ça, à l'image de Baptiste, Hervé, Laurent, Patrick et Simon qui ont mis leur plus belle tenue, fait briller leur vélo pour aller ensuite plonger directement le tout dans la boue lors de la randonnée de Fouquebrune fin octobre.",
      "Sur le parcours de 53 km ils ont pu bénéficier d'un beau ciel bleu pour s'en donner à cœur joie dans les sous-bois et les chemins proposés par le Vélo Sud Est Charente, organisateur de l'évènement. La matinée a été bonne pour nos cyclistes qui sont repartis avec un large sourire et qui n'ont pas hésité une seconde pour se donner rendez-vous la semaine suivante à la Skoda Cup à La Couronne histoire de reprendre une bonne dose de gadoue.",
      "Côté route, c'est moins boueux et avec la très belle météo de cette fin octobre début novembre, nos licenciés profitent pleinement de cette belle arrière-saison avant l'entrée dans l'hiver.",
      "Vous aussi, que vous soyez plutôt chemin ou plutôt asphalte, plutôt vélo balade ou plutôt sportif et que vous recherchiez un club pour vos sorties vélo, n'hésitez pas à nous contacter : il nous reste quelques places pour vous accueillir dans les différents groupes de la team Rouges et Blancs et ainsi profiter de nos parcours variés lors de nos sorties hebdomadaires.",
    ],
  },
  {
    slug: "mb-race-2024-samuel-et-gatien",
    title: "C'est la fin de l'été…",
    date: "2024-09-01",
    approxDate: "Fin de l'été 2024",
    category: "VTT & cyclo-cross",
    excerpt:
      "Samuel Conil et Gatien Meillan au départ de la MB Race à Megève, « la course VTT la plus difficile au monde ».",
    cover: "vtt-mb-race-2024",
    body: [
      "L'été a permis à certains de nos licenciés une pratique du cyclisme sur des parcours sortant de l'ordinaire des sorties charentaises.",
      "En début d'été, deux de nos licenciés, Samuel Conil et Gatien Meillan, ont pris le départ du côté de Megève de la course VTT la plus difficile au monde, la bien nommée MB Race, dont l'objectif est de boucler la course en respectant les barrières horaires aux 70, 100 et 140 km pour ne pas être éliminé.",
      "Nos deux vététistes ont pris le départ à 6 h 15 du matin dans un peloton rassemblant 1500 cyclistes, dont des pros, sur un parcours technique grimpant entre 10 et 15 % avec des passages à 20 % ! Samuel et Gatien ont passé la barrière des 70 km leur permettant de poursuivre l'aventure en entrant dans une phase plus difficile après les nombreuses heures de selle et la fatigue qui s'installe.",
      "« C'est tellement raide, je marche, je pousse, je pédale et je marche… » explique Samuel qui arrivera à la barrière des 100 km en 10 h 11 min 8 s et décidera de ne pas repartir pour boucler les 140 km. « Je suis cuit, je n'irai pas plus loin et mon objectif est rempli » s'est dit Samuel à ce moment précis après avoir grimpé 5000 m de dénivelé. Gatien était arrivé un peu plus tôt en bouclant les 100 km en 10 h 01 min 24 s sans repartir pour les 40 km supplémentaires.",
      "Bravo à nos deux Rouges et Blancs pour ce beau challenge où Gatien se classe 287e et Samuel 297e sur 1500 partants, et respectivement 104e et 114e sur le 100 km et 11e et 14e de leur catégorie d'âge.",
    ],
  },
  {
    slug: "juin-2024-course-semi-nocturne-et-cyclosportives",
    title: "Quoi de neuf au dimanche 9 juin 2024 ?",
    date: "2024-06-09",
    category: "Compétition",
    excerpt:
      "Course semi-nocturne UFOLEP à Puymoyen, La Limousine, 24 h Vélocité en Angoumois, tour de la Sarthe en solitaire et la Périgordine.",
    cover: "perigordine-2024",
    images: ["velocite-angoumois-2024", "sortie-groupe-2-2024"],
    body: [
      "Le Cyclo Club de Puymoyen est dans la dernière ligne droite pour l'organisation de sa course semi-nocturne UFOLEP ce vendredi 14 juin à 19 heures. Cette course organisée dans le quartier de la Combe de Vouillac se déroulera sur un circuit d'environ 1 km et empruntera les rues du Petit Rochefort, des Grands Champs et de Vouillac. Conscients que cette course pourra engendrer quelques difficultés de circulation à compter de 18 h, les organisateurs ne doutent pas un instant que les consignes qui seront données par les signaleurs positionnés aux abords du circuit seront respectées pour la sécurité des cyclistes et des usagers de la route.",
      "Le 1er juin, un groupe composé de Patrick Marsaud, Hervé Rolin, Laurent Trimouille et Olivier Gouedo est allé arpenter les routes haut-viennoises lors de la célèbre cyclosportive La Limousine. « Le départ a été donné sous la pluie à 7 h mais le parcours s'est déroulé avec des éclaircies » explique Hervé qui avait pris le départ des 204 km pour 3200 mètres de dénivelé positif avec Laurent. Patrick s'était lui élancé sur le 123 km (1800 D+) et Olivier sur le 164 km (2500 D+).",
      "Samedi 1er juin toujours, Christian Mazou s'est rendu à Angoulême, sur une manifestation visant à promouvoir l'usage du vélo organisée par l'association Vélocité en Angoumois : parcourir le plus de tours possibles en 24 h d'un circuit tracé entre les Halles d'Angoulême et la place New-York. Christian roulera 15 h 38 sur le circuit pour un total de 253 tours, gonflant ainsi de près de 330 km le compteur de l'association.",
      "Ce samedi 8 juin, Laurent Trimouille, notre licencié tourangeau, a décidé de partir à l'aventure et de « faire une grosse sortie sur des routes inconnues ». Il s'est donc lancé dans un tour de la Sarthe et a parcouru 384 km en un peu plus de 14 h… et en solitaire ! Chapeau !",
      "Ce dimanche 9 juin, Robin Talbot est allé se classer 12e au scratch et 5e de sa catégorie des 180 km de la cyclosportive la Périgordine avalés en 5 h 31. « C'était un peu dur ! Je suis très content de mon résultat. 5 h de pluie, de tonnerre, d'éclairs… je n'ai jamais fait de vélo avec un temps pareil, c'était une journée adaptée pour les Anglais ! » explique Robin.",
      "Les sorties club vont bon train également à l'image de René Landreau, un des pionniers du club dans les années 80, qui n'a pas manqué la sortie du groupe 2 ce samedi à la veille de son 82e anniversaire. Bon anniversaire Néné !",
    ],
  },
  {
    slug: "printemps-2024-precedemment-chez-les-rouges-et-blancs",
    title: "Précédemment chez les Rouges et Blancs…",
    date: "2024-05-27",
    approxDate: "Printemps 2024",
    category: "Compétition",
    excerpt:
      "Marathon de Paris en 2h57 pour le président, Amstel Gold Race Experience, Race Across Paris 1000 km et séjour à Calpe.",
    cover: "christian-race-across-paris-2024",
    images: ["marathon-paris-2024"],
    body: [
      "Avec la sortie de l'hiver et les beaux jours qui arrivent, la saison cycliste reprend progressivement son chemin en fonction des objectifs de chacun. Ainsi, quelques-uns de nos licenciés avaient des échéances ces dernières semaines.",
      "Les choses sérieuses ont donc commencé début avril avec Robin Talbot, président du Cyclo Club, qui n'a pas hésité à mouiller le maillot… mais sans son vélo ! Notre président a échangé ses pédales pour des baskets pour courir le Marathon de Paris. Bien qu'il soit plus à l'aise sur une selle, il a terminé son premier marathon avec un chrono de 2 h 57, franchissant ainsi la fameuse barrière des trois heures et se classant dans le top 3 % des compétiteurs.",
      "Quelques jours plus tard, mi-avril, Laurent Trimouille a de son côté pris le départ, avec son vélo, de l'Amstel Gold Race Experience aux Pays-Bas. Il aura passé 8 h 40 sur sa selle avant de franchir la ligne d'arrivée 245 km après le départ, en empruntant les monts rendus célèbres par la course des professionnels, pour un total de 3000 mètres d'ascension.",
      "Le 23 avril, Christian Mazou a pris le départ pour la deuxième année consécutive de la Race Across Paris 1000 km, épreuve qui consiste à boucler le parcours seul, en autonomie entre chaque base de vie, en moins de 96 h. Christian a bouclé les 1035 km et 8000 m de dénivelé de la course en 70 h 27 dont 49 h 59 de vélo, se classant 24e de l'épreuve. « L'organisation était parfaite, les parcours variés et l'ambiance était vraiment sympa, c'était top ! »",
      "Pour les autres licenciés du club, un groupe de Rouges et Blancs a pu profiter fin avril d'un séjour à Calpe en Espagne afin d'aller chercher un peu de soleil, de kilomètres et de dénivelé positif lors d'une semaine durant laquelle la convivialité était au rendez-vous sur et en dehors du vélo.",
      "Enfin, le 26 mai, Robin Talbot et Jean-Marie Vallantin ont pris le départ du Championnat départemental UFOLEP organisé cette année chez nos voisins de Saint-Michel. Nos deux coursiers ont terminé dans le peloton. Sur nos routes charentaises, les traditionnelles sorties d'entraînement du club du mercredi et du samedi après-midi comptent au fil des semaines un nombre croissant de participants. BONNE SAISON À TOUS !",
    ],
  },
  {
    slug: "repas-fin-annee-2023-bilan-sportif",
    title: "15 décembre 2023 : bilan sportif autour d'un bon repas",
    date: "2023-12-15",
    category: "Vie du club",
    excerpt:
      "97 600 km et 980 000 m de D+ cumulés dans l'année, et le podium du « Serial Borneur » dévoilé par le nouveau président.",
    cover: "repas-fin-annee-2023",
    images: ["repas-fin-annee-2023-discours"],
    body: [
      "Une trentaine de personnes se sont retrouvées ce vendredi soir pour partager le traditionnel repas de fin d'année du Cyclo Club de Puymoyen, occasion pour les cyclistes et leur famille de papoter exploits sportifs et autres sujets autour d'une bonne table de restaurant.",
      "Ce repas fut le premier de Robin Talbot en qualité de président du club, suite à sa récente élection. Dans son discours, le président a tenu à rendre hommage à deux hommes qui ont souhaité céder leurs postes cette année : Christian Seguin, qui a géré durant de nombreuses années la « boutique vêtements » du club, et Olivier Gouedo, président durant cinq années. Les deux hommes ont été félicités pour leur engagement pour le club.",
      "Robin Talbot aime bien les chiffres et en a dévoilé quelques-uns liés à l'activité de l'année des sportifs présents à la soirée. Ils ont cumulé 97 600 km pour 980 000 mètres de dénivelé positif, soit l'équivalent d'environ 2,5 fois le tour de la Terre avec 111 ascensions de l'Everest, de quoi avoir le vertige ! La route des cyclistes est notamment passée par 32 cols (Télégraphe, Galibier, Granon, Tourmalet, Portet, Alpe d'Huez, Croix de Fer, Pailhères, Aubisque).",
      "Le président a ensuite dévoilé le podium du « Serial Borneur » de l'année arrêté au 15 décembre : 3e Jean-François Chatelier avec 10 635 km ; 2e Jean-Marie Vallantin avec 11 759 km dont 18 courses UFOLEP avec le maillot du club ; 1er Christian Mazou avec 12 815 km dont quelques sorties en ultra-distance.",
    ],
  },
  {
    slug: "patrice-moreau-cyclo-cross-2023",
    title: "Patrice Moreau, fidèle des terrains de cyclo-cross",
    date: "2023-12-01",
    approxDate: "Saison 2023-2024",
    category: "VTT & cyclo-cross",
    excerpt:
      "5e à Réparsac, 10e à La Mothe-Saint-Héray et 3e du championnat départemental de Charente.",
    cover: "cyclo-cross-patrice-moreau",
    body: [
      "Patrice Moreau adore les bains de boue et il nous le montre régulièrement depuis de nombreuses années sur les terrains de cyclo-cross de la région.",
      "Passionné de cette discipline dont les courses se pratiquent sur des terrains herbeux, des chemins ou encore des sous-bois et très souvent dans des conditions humides, Patrice a notamment participé récemment aux épreuves de 4e catégorie de Réparsac en terminant à la 5e place, de La Mothe-Saint-Héray (79) où il prend la dixième place et plus récemment au Championnat départemental de Charente organisé par l'Amicale Cycliste de Saint-Michel (16) avec une belle prestation qui lui permet de monter sur la troisième marche du podium.",
      "BRAVO à toi Patrice, pour ta motivation, ta régularité et force à toi pour la suite de cette saison de cyclo-cross !",
    ],
  },
  {
    slug: "paul-poux-2023",
    title: "Paul Poux 2023",
    date: "2023-04-29",
    category: "Compétition",
    excerpt: "Dix membres du club présents pour la 7e édition de la Paul Poux.",
    cover: "paul-poux-2023",
    body: [
      "Samedi 29 avril 2023 s'est tenue la 7e édition de la Paul Poux, avec deux épreuves chronométrées et classées, et trois randonnées cyclotouristes. 10 membres du club étaient présents pour porter haut nos couleurs.",
    ],
  },
];

export const categories: Category[] = ["Vie du club", "Ultra-distance", "Compétition", "Séjours", "VTT & cyclo-cross"];

export function sortedArticles() {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}
export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
