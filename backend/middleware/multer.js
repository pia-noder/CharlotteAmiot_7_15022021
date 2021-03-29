//fichier qui définit où vont être stocker les fichiers multimedia
const multer = require('multer');


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

//indication de l'endroit où enregistrer les fichiers entrants et sous quel nom
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'multimedia');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + '_' + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('multimedia');