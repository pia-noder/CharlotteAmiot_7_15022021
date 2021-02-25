const express = require ('express');
const router = express.Router();

//importation middleware
const auth = require('../middleware/auth');

//importation des controllers
const controllerUsers =  require ('../controllers/users');

//Création des routes pour envoyer les requêtes vers le controller concerné

router.post('/signup', controllerUsers.signup);
router.get('/login', controllerUsers.login);

router.put('/:userId', auth, multer, controllerUsers.modifyOneUser);
router.delete('/:userId', auth, controllerUsers.deleteOneUser)

module.exports = router;