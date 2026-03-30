# GF Web — Site professionnel

Site personnel de Joao Gabriel Farias Gomes Franca — GF Web Micro Entreprise.

## Stack

- **React 18** + **Vite** — frontend SPA
- **Vercel Serverless Functions** — API contact (`/api/contact.js`)
- **Resend** — envoi d'emails transactionnels (gratuit jusqu'à 3000/mois)
- CSS Modules — styles scopés, zéro dépendance UI

## Structure

```
gf-web/
├── api/
│   └── contact.js          # Serverless function Vercel (envoi email)
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / .module.css
│   │   ├── Hero.jsx / .module.css
│   │   ├── Services.jsx / .module.css
│   │   ├── Portfolio.jsx / .module.css
│   │   ├── Contact.jsx / .module.css
│   │   └── Footer.jsx / .module.css
│   ├── hooks/
│   │   └── useReveal.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

## Installation locale

```bash
npm install
npm run dev
```

## Déploiement Vercel

### 1. Pousser sur GitHub / Gitea
```bash
git init
git add .
git commit -m "feat: site gf-web v2"
git remote add origin https://git.gf-web.fr/Gabriel/gf-web-site.git
git push -u origin main
```

### 2. Importer sur Vercel
- Connecter le repo depuis vercel.com
- Framework preset : **Vite**
- Build command : `npm run build`
- Output directory : `dist`

### 3. Variables d'environnement (Settings > Environment Variables)

| Variable | Valeur |
|---|---|
| `RESEND_API_KEY` | Ta clé API sur resend.com (gratuit) |
| `CONTACT_EMAIL` | `joaofarias20@icloud.com` |

### 4. Domaine personnalisé
Ajouter `gf-web.fr` dans Vercel > Domains, puis configurer les DNS chez ton registrar :
```
A     @    76.76.21.21
CNAME www  cname.vercel-dns.com
```

## Configurer Resend (pour le formulaire contact)

1. Créer un compte sur [resend.com](https://resend.com) — plan gratuit suffisant
2. Vérifier le domaine `gf-web.fr` (ajouter les enregistrements DNS fournis)
3. Créer une API key et l'ajouter dans les env vars Vercel

## Personnalisation

- **Projets** : modifier le tableau `projects` dans `Portfolio.jsx`
- **Services** : modifier le tableau `services` dans `Services.jsx`
- **Couleur accent** : changer `--accent: #c8f135` dans `index.css`
- **Email** : changer `joaofarias20@icloud.com` dans `Contact.jsx` et `Footer.jsx`
