const express = require ('express');
const router = express.Router();

//Importation des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer')

//importation des controllers
const controllerPost = require ('../controllers/posts');
//const controllerComments = require ('../controllers/comments');
//const controllerLikes = require ('../controllers/likes');

//Création des routes pour envoyer les requêtes au controller concerné

/*router.post('/', (req,res) => {
    res.status(200).json({message: 'data arrivé au fichier route'});
    console.log(req.data);
})*/
router.post('/', auth, multer, controllerPost.createPost);
/*router.post('/',multer, (req, res) => {
    console.log('Le fichier passe bien le middleware multer, aller vérifier si le fichier est dans le dossier multimedia')
    console.log(req.file)
    res.status(200);
});*/
router.get('/:id', auth,  controllerPost.getOnePost);
router.get('/', auth, controllerPost.getAllPosts);
router.delete('/:id', auth,  controllerPost.deleteOnePost);
/*router.modify('/:id', auth, controllerPost.modifyOnePost);
router.delete('/:userId/posts', auth, controllerPost.deleteAllPosts);


router.post('/:postId/comments', auth, multer, controllerComments.createComment);
router.get('/:postId/:comments/:Id', auth, controllerComments.getOnecomment);
router.get('/:postId/comments', auth, controllerComments.getAllComments);
router.modify('/postId/comments/:id', auth, controllerComments.modifyOneComment);
router.delete('/postId/comments/:id', auth, controllerComments.deleteOneComment);

router.post('./postId/likes', auth, controllerLikes.likeOnePost);
router.get('./postId/likes', auth, controllerLikes.getAllLikes);*/

//exporter les routes pour qu'elles soient utilisable partout
module.exports = router