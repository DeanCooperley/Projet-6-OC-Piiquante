const Sauce = require('../models/Sauce');
const fs = require('fs');

// Création d'une sauce (POST)
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id; // On supprime l'id généré automatiquement et envoyé par le frontend
    const sauce = new Sauce({ // On crée une instance de notre modèle Sauce
        ...sauceObject, 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`// On modifie l'URL de l'image en ajoutant le nom de fichier généré par multer
    });
    sauce.save() // Sauvegarde la nouvelle sauce dans la BDD
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};

// Recherche une sauce via son id dans la requête (GET)
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Recherche toutes les sauces dans la BDD (GET)
exports.getAllSauces = (req, res, next) => {
    Sauce.find() // find() permet de trouver tous les éléments dans la base de données
        .then((sauces) => {
            res.status(200).json(sauces);
        })
        .catch((error) => {
            res.status(400).json({
            error: error,
        });
    });
};

// Modifie une sauce (PUT)
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? { // Si req.file existe, on modifie l'image
        ...JSON.parse(req.body.sauce), // On récupère les propriétés de la sauce dans le corps de la requête et on les étale (spread) dans l'objet sauceObject, qui sera utilisé pour mettre à jour la sauce
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    } : { ...req.body }; 
    // mise à jour de la sauce correspondante (BDD) en utilisant l'objet sauceObject, en s'assurant que l'identifiant de la sauce ne change pas
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) 
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
};

// Supprime une sauce (DELETE)
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1]; // Récupération du deuxième élément du fractionnement (.split) de l'URL de l'image
        fs.unlink(`images/${filename}`, () => { // Suppression du fichier 'images' avec fs.unlink
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json( 'Sauce supprimée !' ))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
};

/* fs */
// fs.readFile permet de lire un fichier
// fs.writeFile permet d'écrire dans un fichier
// fs.stat permet de récupérer des informations sur un fichier
// fs.readdir permet de lire le contenu d'un dossier



