const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware pour vérifier le token
module.exports = (req, res, next) => {
   try {
        const token = req.headers.authorization.split(' ')[1]; // Récupère le token dans le header Authorization
        const decodedToken = jwt.verify(token, `${config.APP_SECRET}`); // Décodage du token
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) { // Si l'ID utilisateur n'est pas le même que celui du token
            throw 'Invalid user ID'; // On renvoie une erreur
        } else {
            next(); // Sinon on passe au middleware suivant
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};