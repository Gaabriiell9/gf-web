export const site = {
  name: 'GF Web',
  owner: 'Joao Gabriel Farias Gomes Franca',
  email: 'contact@gf-web.fr',
  city: 'Bordeaux',
}

export const nav = [
  { label: 'À propos', to: '/about' },
  { label: 'Services', to: '/#services' },
  { label: 'Réalisations', to: '/#realisations' },
  { label: 'Contact', to: '/#contact' },
]

export const services = [
  {
    id: 'vitrine',
    title: 'Site vitrine',
    desc: 'Un site clair et rapide qui présente votre activité, vos réalisations et vos coordonnées. Parfait sur mobile et bien référencé sur Google.',
    icon: 'monitor',
  },
  {
    id: 'ecommerce',
    title: 'Boutique en ligne',
    desc: 'Catalogue, panier et paiement sécurisé par carte. Vous gérez vos produits et vos commandes depuis un espace simple.',
    icon: 'bag',
  },
  {
    id: 'app',
    title: 'Application web',
    desc: 'Espace client, réservations, devis, tableau de bord : un outil sur mesure pour votre activité.',
    icon: 'layers',
  },
  {
    id: 'pc',
    title: 'Montage PC',
    desc: 'Gaming, poste de travail ou serveur maison : je choisis les composants selon votre usage, j’assemble, je teste et je configure.',
    icon: 'cpu',
    to: '/montage-pc',
  },
]

export const build = {
  intro: 'Du gaming au serveur maison, je sélectionne chaque composant selon votre usage et votre budget, puis j’assemble, je teste et je configure pour que la machine soit prête dès le premier démarrage.',
  builds: [
    { title: 'Gaming', desc: 'Pour les jeux récents et le streaming. Refroidissement adapté, câblage soigné, le meilleur rapport qualité/prix pour votre budget.' },
    { title: 'Poste de travail', desc: 'Pour les créatifs, les développeurs et les professionnels : montage vidéo, 3D, virtualisation. Des machines qui tiennent la charge.' },
    { title: 'Serveur maison', desc: 'NAS, Plex, auto-hébergement, domotique. Silencieux, économe et fiable, avec Linux installé et configuré.' },
  ],
  steps: [
    { title: 'On définit le besoin', desc: 'Votre usage, vos envies et votre budget. Je vous propose une configuration détaillée.' },
    { title: 'Assemblage', desc: 'Montage soigné, câblage propre, bonne circulation de l’air.' },
    { title: 'Tests', desc: 'Tests de charge et de températures : la machine est validée avant de vous être remise.' },
    { title: 'Prête à l’emploi', desc: 'Windows ou Linux installé, pilotes et logiciels essentiels configurés.' },
  ],
}
