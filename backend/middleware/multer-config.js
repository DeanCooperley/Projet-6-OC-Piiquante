const multer = require('multer');

// Dictionnaire des types MIME
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
// Configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // Remplace les espaces dans le nom de fichier par des underscores
    const extension = MIME_TYPES[file.mimetype]; // Obtenir l'extension du fichier à partir de son type MIME
    callback(null, name + Date.now() + '.' + extension); // Appelle la fonction de rappel avec le nom de fichier généré comme argument
  }
});

module.exports = multer({storage: storage}).single('image');