const express = require ('express');
const router = express.Router();

//Importation des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer')

//importation des controllers
const controllerUsers =  require ('../controllers/user');


//Création des routes pour envoyer les requêtes vers le controller concerné
router.post('/signup', controllerUsers.signup);
router.post('/login', controllerUsers.login);


router.get('/:id/posts', auth, controllerUsers.getAllPosts);
router.get('/:id', auth, controllerUsers.getOneUser);
router.put('/:id', auth, multer, controllerUsers.updateUser);
router.delete('/:id', auth, controllerUsers.deleteUser);

module.exports = router;