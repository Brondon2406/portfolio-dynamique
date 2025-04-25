# Portfolio Dynamique

Un projet de portfolio en ligne dynamique avec interface d'administration intégrée, permettant de mettre à jour facilement votre contenu professionnel sans toucher au code.

## Structure du projet

```
portfolio-dynamique/
├── client/                 <-- Frontend public (site portfolio)
│   ├── index.html
│   ├── style.css
│   ├── main.ts
│   ├── .nojekyll
│
├── admin/                  <-- Interface d'administration (frontend admin)
│   ├── index.html
│   ├── style.css
│   ├── admin.ts
│
├── server/                 <-- Backend Node/Express/TypeScript
│   ├── index.ts
│   ├── profileData.json    <-- Données du portfolio (DB + modèle)
│   ├── routes/
│   │   ├── profile.ts      <-- GET /api/profile
│   │   ├── admin.ts        <-- POST /api/admin/update-profile
│   ├── controllers/
│   │   ├── profileController.ts
│   ├── package.json
│   ├── tsconfig.json
│
├── README.md
```

## Fonctionnalités

- **Frontend public** : Affichage élégant et responsive de votre profil professionnel
- **Interface d'administration** : Panel admin sécurisé pour mettre à jour votre contenu
- **Backend API** : API RESTful pour gérer les données du portfolio
- **Stockage des données** : Sauvegarde dans un fichier JSON (facilement extensible vers une base de données)

## URLs de déploiement

- **Frontend** : [https://portfolio-dynamique-1.onrender.com](https://portfolio-dynamique-1.onrender.com)
- **Backend** : [https://portfolio-dynamique.onrender.com](https://portfolio-dynamique.onrender.com)

## Technologies utilisées

- **Frontend** : HTML, CSS, TypeScript
- **Backend** : Node.js, Express, TypeScript
- **Hébergement** : Render.com

## Prérequis pour le développement local

- Node.js (v14 ou supérieur)
- npm ou yarn
- TypeScript

## Installation pour développement local

1. Clonez le dépôt :
   ```bash
   git clone <votre-repo-url>
   cd portfolio-dynamique
   ```

2. Installez les dépendances du serveur :
   ```bash
   cd server
   npm install
   ```

3. Lancez le serveur backend en mode développement :
   ```bash
   npm run dev
   ```

4. Dans un autre terminal, servez le frontend client et admin avec un serveur statique :
   ```bash
   npx serve client
   ```

   Et dans un autre terminal :
   ```bash
   npx serve admin
   ```

## Configuration pour le déploiement sur Render

### Backend (Node.js)

1. Créez un nouveau service "Web Service" sur Render
2. Connectez votre dépôt GitHub
3. Configurez comme suit :
   - **Nom** : portfolio-dynamique 
   - **Root Directory** : server
   - **Environment** : Node
   - **Build Command** : `npm install && npm run build`
   - **Start Command** : `npm start`
   - **Variables d'environnement** :
     - `NODE_ENV` : production
     - `PORT` : 10000 (ou laissez Render choisir)
     - `JWT_SECRET` : votre-clé-secrète-pour-jwt

### Frontend Client & Admin (Site Statique)

1. Créez un nouveau service "Static Site" sur Render pour le client
2. Configurez comme suit :
   - **Nom** : portfolio-dynamique-1
   - **Root Directory** : client
   - **Build Command** : `npm install -g typescript && tsc main.ts`
   - **Publish Directory** : .

3. Créez un autre service "Static Site" pour l'admin (optionnel, peut être intégré au même service que le client)
   - **Nom** : portfolio-dynamique-admin
   - **Root Directory** : admin
   - **Build Command** : `npm install -g typescript && tsc admin.ts`
   - **Publish Directory** : .

## Sécurité

L'interface d'administration est protégée par authentification JWT. Assurez-vous de :
1. Modifier les identifiants par défaut
2. Utiliser une clé JWT_SECRET forte dans les variables d'environnement
3. Configurer HTTPS pour toutes les communications

## Personnalisation

Vous pouvez personnaliser votre portfolio en :
1. Modifiant les styles CSS dans client/style.css
2. Ajoutant des sections supplémentaires dans le modèle de données (server/profileData.json)
3. Étendant l'interface d'administration pour prendre en charge ces nouvelles sections

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

MIT