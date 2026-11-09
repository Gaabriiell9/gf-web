# GF Web : site professionnel

Site personnel de Joao Gabriel Farias Gomes Franca, GF Web Micro Entreprise.

## Stack

- **React 18** + **Vite** : SPA, pages secondaires chargées à la demande
- **GSAP** : rotation du carrousel des réalisations
- **Plus Jakarta Sans** auto-hébergée (`@fontsource-variable`)
- **Supabase** : avis clients avec connexion Google
- **Vercel Serverless Functions** + **Resend** : formulaire de contact (`/api/contact.js`)
- CSS Modules, aucune librairie UI

## Où modifier le contenu

- Projets et études de cas : `src/data/projects.js`
- Captures des projets (ordinateur, tablette, mobile) : générées par `scripts/screenshots.mjs` via GitHub Actions (onglet Actions, "Captures des projets")
- Services, montage PC, navigation : `src/data/site.js`
- Couleurs et typographie : variables en haut de `src/index.css`

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

1. Créer un compte sur [resend.com](https://resend.com), plan gratuit suffisant
2. Vérifier le domaine `gf-web.fr` (ajouter les enregistrements DNS fournis)
3. Créer une API key et l'ajouter dans les env vars Vercel

