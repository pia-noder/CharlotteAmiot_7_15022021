//fichier qui définit où vont être stocker les fichiers multimedia
const multer = require('multer');


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'video/x-flv': 'flv',
  'video/mp4': 'mp4',
  'video/x-msvideo': 'avi',
  'video/quicktime': 'mov',
  'video/x-ms-wmv': 'wmv'
};

//indication de l'endroit où enregistrer les fichiers entrants et sous quel nom
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'multimedia_file');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + '_' + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('multimedia_file');