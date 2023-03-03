const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const isPasswordValid = require('../controllers/password');
const config = require('../config');


// Fonction pour créer un nouvel utilisateur
exports.signup = (req, res, next) => {
  try { // Vérifie que le mot de passe est valide
    isPasswordValid(req.body.password); 
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  // Vérifie que l'adresse mail n'est pas déjà utilisée
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Fonction pour connecter un utilisateur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
      }

      bcrypt.compare(req.body.password, user.password) // Compare le mot de passe entré avec celui de la base de données
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
          }
          // Si le mot de passe est correct, on renvoie un objet contenant l'ID utilisateur et un token
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              `${config.APP_SECRET}`, // Clé secrète pour encoder le token
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};