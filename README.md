![Logo du projet Piiquante](banniere_piiquante.PNG)

# Projet 6 - OC - Piiquante

Ce projet a pour but de construire une API sécurisée pour une application d'avis gastronomiques.

Il nécessite l'utilisation d'un serveur NodeJS et les outils de développement suivants :

- Le framework Express
- La base de données MongoDB
- Le pack Mongoose

La sécurité de ce projet doit être conforme aux règles RGPD et aux recommandations de l'OWASP.

## Installation Frontend

- Ouvrir un terminal dans le répertoire "frontend" et taper : npm install

## Installation Backend

- Ouvrir un terminal dans le répertoire "backend" et taper : npm install

## Vous connecter à votre base de données MongoDB ou en créer une (Gratuit)

- Se connecter à sa base de données pour récupérer le lien de connexion
- L'inclure dans le fichier app.js au niveau de la variable dbUrl
- Créer un fichier .env et redéfinir les variables d'environnement des fichiers server.js, app.js, auth.js, user.js (controllers)

## Création d'un répertoire "images" dans le répertoire "backend"

## Lancement du Frontend

- Taper npm run start ou npm start
- Ouvrir une page sur le navigateur de son choix à l'url suivante : http://localhost:4200/

## Lancement du Backend

- Taper nodemon server
- Ou node server (obligation de relancer le serveur pour prendre en compte toute modification)

## Information de sécurité

Avant tout enregistrement sur un repository GitHub, IMPORTANT de vérifier que le lien de connexion à la BDD et la clé secrète (variable APP_SECRET) sont correctement configurés dans les fichiers mentionnés plus haut, et qu'ils sont enregistrés dans le fichier .env que vous aurez créé. J'ai mis un fichier .env-example pour info.

## Licence

Ce projet est sous licence MIT.
