const Sauce = require("../models/Sauce");

// Fonction pour ajouter un like à une sauce
exports.addLikeOrDislike = (req, res, next) => {
  if (req.body.like == 1) {
    Sauce.updateOne( // Recherche la sauce avec l'ID fourni dans la requête
      { _id: req.params.id },
      {
        $push: { usersLiked: req.body.userId }, // Ajoute l'ID de l'utilisateur dans le tableau usersLiked
        $inc: { likes: req.body.like }, // Incrémente le nombre de likes de 1
      }
    )
      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(400).json({ error }));
  }
// Fonction pour ajouter un dislike à une sauce
  if (req.body.like == -1) {
    Sauce.updateOne(
      { _id: req.params.id },
      {
        $push: { usersDisliked: req.body.userId },
        $inc: { dislikes: 1 }, // Incrémente le nombre de dislikes de 1
      }
    )
      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(400).json({ error }));
  }
// Fonction pour retirer un like ou un dislike à une sauce
  if (req.body.like == 0) {
    Sauce.findOne({ _id: req.params.id }).then((sauce) => { // findOne() permet de trouver un élément dans la base de données
      let isUserLiked = false; 
      for (index = 0; index < sauce.usersLiked.length; index++) { // Parcours le tableau usersLiked
        if (sauce.usersLiked[index] == req.body.userId) { // Si l'utilisateur a déjà liké la sauce
          isUserLiked = true; // On passe la variable à true
        }
      }
      
      if (isUserLiked == false) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $pull: { usersDisliked: req.body.userId },
            $inc: { dislikes: -1 },
          }
        )
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $pull: { usersLiked: req.body.userId },
            $inc: { likes: -1 },
          }
        )
          .then(() => res.status(200).json({ message: "Objet modifié !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    });
  }
};