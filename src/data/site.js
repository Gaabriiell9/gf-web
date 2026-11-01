export const site = {
  name: 'GF Web',
  owner: 'Joao Gabriel Farias Gomes Franca',
  firstName: 'Gabriel',
  email: 'contact@gf-web.fr',
  city: 'Bordeaux',
  domain: 'gf-web.fr',
  tva: 'TVA non applicable, art. 293 B du CGI.',
}

export const nav = [
  { label: 'Réalisations', to: '/#realisations' },
  { label: 'Services', to: '/#services' },
  { label: 'Tarifs', to: '/#tarifs' },
  { label: 'À propos', to: '/about' },
]

export const services = [
  {
    id: 'web',
    title: 'Sites et applications web',
    desc: 'Du site vitrine au SaaS complet : architecture solide, chargement rapide, expérience soignée sur mobile comme sur ordinateur.',
    tags: ['Next.js', 'React', 'TypeScript'],
    to: '/site-vitrine',
    linkLabel: 'Voir l’offre site vitrine',
  },
  {
    id: 'app',
    title: 'Boutiques et outils métier',
    desc: 'Paiement en ligne, espace client, réservations, tableau de bord. Un outil taillé pour votre activité, pas un logiciel générique.',
    tags: ['Supabase', 'Stripe', 'PostgreSQL'],
    to: '/application-web',
    linkLabel: 'Voir l’offre application web',
  },
  {
    id: 'infra',
    title: 'Infrastructure et serveurs',
    desc: 'Serveurs auto-hébergés, VPN WireGuard, reverse proxy, sauvegardes automatisées, monitoring et sécurité. Votre infra, sous contrôle.',
    tags: ['Linux', 'Cloudflare', 'Docker'],
    to: '/#contact',
    linkLabel: 'En parler',
  },
  {
    id: 'repair',
    title: 'Réparation d’ordinateur',
    desc: 'Diagnostic matériel et logiciel, remplacement de composants, réinstallation système, récupération de données. Intervention rapide sur Bordeaux.',
    tags: ['Hardware', 'Windows', 'Linux'],
    to: '/reparation-pc',
    linkLabel: 'Voir la réparation PC',
  },
  {
    id: 'build',
    title: 'Assemblage PC sur mesure',
    desc: 'Gaming, workstation ou home server : des composants choisis pour votre usage et votre budget, montés, testés et configurés.',
    tags: ['Gaming', 'Workstation', 'Home server'],
    to: '/montage-pc',
    linkLabel: 'Voir le montage PC',
  },
  {
    id: 'auto',
    title: 'Automatisation et scripts',
    desc: 'Scraping, pipelines de données, bots, intégrations API, tâches planifiées. Si c’est répétitif, c’est automatisable.',
    tags: ['Python', 'Node.js', 'API'],
    to: '/#contact',
    linkLabel: 'En parler',
  },
]

export const steps = [
  {
    title: 'On échange',
    desc: 'Vous me parlez de votre activité et de vos attentes. Je vous envoie un devis gratuit et détaillé sous 24 h.',
  },
  {
    title: 'Je conçois',
    desc: 'Je prépare une maquette complète que vous validez avant que la moindre ligne de code soit écrite.',
  },
  {
    title: 'Je développe',
    desc: 'Développement par étapes avec des démos régulières. Vous suivez l’avancement et ajustez à tout moment.',
  },
  {
    title: 'C’est en ligne',
    desc: 'Mise en ligne, tests finaux, prise en main. Vous recevez les clés et je reste joignable après.',
  },
]

export const plans = [
  {
    name: 'Site vitrine',
    from: 'À partir de',
    price: '400 €',
    monthly: 'ou 35 €/mois avec engagement 1 an',
    desc: 'Pour les artisans, indépendants et associations qui veulent une présence web professionnelle.',
    items: [
      'Un site beau et professionnel',
      'Parfait sur mobile et tablette',
      'Formulaire de contact intégré',
      'Référencé sur Google',
      'Livré en 1 à 2 semaines',
    ],
    cta: 'Voir le détail',
    to: '/site-vitrine',
    featured: true,
  },
  {
    name: 'Application web',
    from: 'À partir de',
    price: '900 €',
    monthly: 'ou 80 €/mois avec engagement 1 an',
    desc: 'Pour les projets qui demandent une logique métier, une base de données ou des paiements.',
    items: [
      'Espace client ou membre',
      'Paiement en ligne',
      'Gestion de commandes ou réservations',
      'Tableau de bord sur mesure',
      'Livré en 3 à 6 semaines',
    ],
    cta: 'Voir le détail',
    to: '/application-web',
  },
  {
    name: 'Maintenance et support',
    from: 'À partir de',
    price: '30 €/mois',
    desc: 'Pour garder votre site à jour, sécurisé et fonctionnel sur la durée.',
    items: [
      'Je m’occupe de toute la technique',
      'Votre site reste rapide et sécurisé',
      'Vous écrivez, je réponds',
      'Sans engagement',
    ],
    cta: 'En parler',
    to: '/#contact',
  },
]

export const faq = [
  {
    q: 'Quels sont vos délais de livraison ?',
    a: 'Un site vitrine simple est livré en 1 à 2 semaines. Une application web ou un SaaS prend généralement 3 à 8 semaines selon la complexité. Je fournis un calendrier précis avant chaque démarrage de projet.',
  },
  {
    q: 'Proposez-vous la maintenance après livraison ?',
    a: 'Oui. Je propose des forfaits de maintenance mensuelle incluant mises à jour, corrections de bugs, sauvegardes et monitoring. Le tarif dépend du type de projet.',
  },
  {
    q: 'Comment se passe le paiement ?',
    a: 'Je demande généralement 30 à 50 % d’acompte au démarrage, et le solde à la livraison. Je peux m’adapter selon la nature et la durée du projet.',
  },
  {
    q: 'Puis-je modifier mon site moi-même après livraison ?',
    a: 'Oui, si vous le souhaitez. Je peux intégrer un espace d’administration simple ou vous former à l’utilisation du projet. Je peux aussi tout gérer pour vous dans le cadre d’un contrat de maintenance.',
  },
  {
    q: 'Travaillez-vous avec des clients hors Bordeaux ?',
    a: 'Absolument. Je travaille à distance avec des clients partout en France et dans les DOM-TOM. On échange par email, visio ou messagerie, selon vos préférences.',
  },
]
