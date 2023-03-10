const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xml2js = require('xml2js');

const config = require('./config');

// Chemin de connexion à la base de données MongoDB
const dbUrl = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PW}@${config.MONGO_HOST}/${config.MONGO_DBNAME}?retryWrites=true&w=majority`;

// Connexion à la base de données MongoDB avec Mongoose
mongoose.connect(`${dbUrl}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Configuration du CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Configuration du parser XML
const parser = new xml2js.Parser({
  explicitEntitites: false, // désactiver l'analyse des entités
  ignoreComments: true, // ignorer les commentaires
  ignoreProcessingInstructions: true // ignorer les instructions de traitement
});

// Route pour traiter les requêtes XML
app.post('/xml', (req, res) => {
  // Récupérer le corps de la requête
  let xml = '';
  req.on('data', chunk => {
    xml += chunk.toString(); // convertir le Buffer en chaîne
  });
  req.on('end', () => {
    // Parser le XML avec xml2js
    parser.parseString(xml, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur de traitement du XML');
      } else {
        console.log(result);
        res.send('XML correctement traité');
      }
    });
  });
});

// Middleware pour récupérer les données JSON envoyées dans le corps de la requête avec une limite de taille de 10kb
app.use(bodyParser.json({ limit: '10kb' }));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })); // Middleware pour protéger contre les attaques de type Cross-Site-Scripting (XSS)
app.use(mongoSanitize()); // Middleware pour protéger contre les injections NoSQL, JavaScript et HTML (Insertion de caractères spéciaux)

// Routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;