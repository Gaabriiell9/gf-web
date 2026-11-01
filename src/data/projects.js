// Projets présentés sur le site.
// `image` : capture réelle de la page d'accueil (générée par scripts/screenshots.mjs via GitHub Actions).
// Sans `image`, une maquette dessinée (`mock`) est affichée à la place.

export const projects = [
  {
    slug: 'sena-electricite',
    name: 'Sena Électricité',
    url: 'https://senaelec.fr',
    domain: 'senaelec.fr',
    type: 'Site vitrine',
    client: 'Électricien artisan, région bordelaise',
    summary: 'Refonte complète du site d’un électricien artisan de la région bordelaise.',
    context:
      'Un artisan qui travaille surtout par le bouche-à-oreille a besoin d’un site qui inspire confiance au premier coup d’œil, qui montre ses chantiers et qui transforme une visite en demande de devis.',
    built: [
      { title: 'Un site rapide et clair', desc: 'Une seule idée par écran, des appels à l’action visibles et un chargement léger, y compris sur mobile en 4G.' },
      { title: 'Formulaire de devis relié à la boîte mail', desc: 'Chaque demande arrive directement par email, avec une confirmation envoyée au client.' },
      { title: 'Galerie de chantiers en défilement continu', desc: 'Un carrousel d’images qui tourne en boucle pour montrer le travail réalisé sans surcharger la page.' },
      { title: 'Référencement local', desc: 'Balises, données structurées et nom de domaine configuré pour être trouvé sur les recherches locales.' },
    ],
    stack: ['React', 'Vite', 'CSS', 'Resend', 'Cloudflare', 'Vercel'],
    mock: 'sena',
    image: '/projets/senaelec.jpg',
    accent: '#E8A040',
    tint: '#1C1A17',
  },
  {
    slug: 'susy-modas',
    name: 'Susy Modas Evangélicas',
    url: 'https://susymodas.com',
    domain: 'susymodas.com',
    type: 'E-commerce',
    client: 'Boutique de mode, Kourou (Guyane)',
    summary: 'Boutique en ligne de mode chrétienne à Kourou, en Guyane.',
    context:
      'Une boutique physique qui veut vendre au-delà de son quartier : il fallait un catalogue agréable à parcourir, un paiement fiable et une gestion simple pour une seule personne au quotidien.',
    built: [
      { title: 'Catalogue et fiches produits', desc: 'Tailles, couleurs et stock par variante, pour ne jamais vendre un article qui n’est plus en rayon.' },
      { title: 'Paiement sécurisé', desc: 'Encaissement par carte via Stripe, avec choix entre livraison à domicile et retrait en boutique.' },
      { title: 'Administration en un compte', desc: 'Ajout des articles et suivi des ventes depuis un seul compte, sans outil compliqué à apprendre.' },
      { title: 'Application mobile en préparation', desc: 'La même boutique déclinée en application, branchée sur la même base de données.' },
    ],
    stack: ['Next.js', 'Supabase', 'Stripe', 'Vercel'],
    mock: 'susy',
    image: '/projets/susymodas.jpg',
    accent: '#E87A90',
    tint: '#FBF1EE',
  },
  {
    slug: 'quickdevis-pro',
    name: 'QuickDevis Pro',
    url: 'https://quickdevis.gf-web.fr',
    domain: 'quickdevis.gf-web.fr',
    type: 'SaaS',
    client: 'Produit GF Web',
    summary: 'Devis et facturation pour indépendants et TPE françaises.',
    context:
      'Les indépendants perdent du temps sur leurs devis dans des tableurs ou des logiciels trop lourds. QuickDevis Pro permet de créer un document propre en quelques minutes et de le transformer en facture.',
    built: [
      { title: 'Éditeur en deux panneaux', desc: 'On remplit à gauche, on voit le document final à droite, mis à jour en direct.' },
      { title: 'Export PDF et modèles', desc: 'Plusieurs modèles de mise en page, un PDF prêt à envoyer au client.' },
      { title: 'Clients, devis et factures', desc: 'Toute la gestion au même endroit, avec connexion Google pour démarrer en un clic.' },
      { title: 'Abonnements', desc: 'Plans payants gérés par Stripe, emails transactionnels envoyés automatiquement.' },
    ],
    stack: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'Resend'],
    mock: 'quickdevis',
    image: '/projets/quickdevis.jpg',
    accent: '#2F6BFF',
    tint: '#F2F5FF',
  },
  {
    slug: 'cv-pro',
    name: 'CV Pro',
    url: 'https://cv-pro.gf-web.fr',
    domain: 'cv-pro.gf-web.fr',
    type: 'SaaS',
    client: 'Produit GF Web',
    summary: 'Générateur de CV gratuit : un beau CV en cinq minutes, sur téléphone comme sur ordinateur.',
    context:
      'Faire un CV propre ne devrait demander ni logiciel de mise en page ni abonnement. CV Pro permet de créer un beau CV en cinq minutes, gratuitement.',
    built: [
      { title: '18 modèles gratuits, sans filigrane', desc: 'Des mises en page variées pour chaque candidature, sans abonnement caché.' },
      { title: 'Un PDF A4 lisible par les logiciels de recrutement', desc: 'Le CV reste propre une fois imprimé et passe les filtres automatiques des recruteurs.' },
      { title: 'Connexion par code e-mail', desc: 'Pas de mot de passe à retenir : un code arrive par email à chaque connexion.' },
      { title: 'Sur téléphone comme sur ordinateur', desc: 'Le CV est enregistré dans le compte et se retrouve sur tous les appareils.' },
    ],
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'Vercel'],
    mock: 'cvpro',
    image: '/projets/cvpro.jpg',
    accent: '#5B8DEE',
    tint: '#EEF3FD',
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
