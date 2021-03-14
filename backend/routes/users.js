const express = require ('express');
const router = express.Router();

//importation middleware
//Importation des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer')

//importation des controllers
const controllerUsers =  require ('../controllers/user');


//Création des routes pour envoyer les requêtes vers le controller concerné
router.post('/signup', controllerUsers.signup);
router.post('/login', controllerUsers.login);

//Pour débugger
/*router.post('/login', (req, res) => {
    res.status(200).json({message :"Info du front envoyer jusqu au fichier router !"})
})*/
router.get('/:id', auth, controllerUsers.getAllPosts);
router.put('/:id', auth, multer, controllerUsers.updateUser)
/*router.put('/:userId', auth, multer, controllerUsers.modifyOneUser);
router.delete('/:userId', auth, controllerUsers.deleteOneUser)*/

module.exports = router;