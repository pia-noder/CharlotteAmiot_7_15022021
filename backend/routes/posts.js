const express = require ('express');
const router = express.Router();

//Importation des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer')

//importation des controllers
const controllerPost = require ('../controllers/posts');
const controllerComments = require ('../controllers/comments');
//const controllerComments = require ('../controllers/comments');
//const controllerLikes = require ('../controllers/likes');


router.post('/', auth, multer, controllerPost.createPost);
router.get('/:id', auth,  controllerPost.getOnePost);
router.get('/', auth, controllerPost.getAllPosts);
router.delete('/:id', auth,  controllerPost.deleteOnePost);
/*router.modify('/:id', auth, controllerPost.modifyOnePost);
router.delete('/:userId/posts', auth, controllerPost.deleteAllPosts);*/


router.post('/:postId/comments', auth, multer, controllerComments.createComment);
/*router.get('/:postId/:comments/:Id', auth, controllerComments.getOnecomment);*/
router.get('/:id/comments', auth, controllerComments.getAllComments);
/*router.modify('/postId/comments/:id', auth, controllerComments.modifyOneComment);*/
router.delete('/:postId/comments/:id', auth, controllerComments.deleteOneComment);

router.put('/:id/likes', auth, controllerPost.likeOnePost);
router.put('/:id/dislikes', auth, controllerPost.dislikeOnePost);
router.post('/:id/likes', auth, controllerPost.likesStatusInfo);

//exporter les routes pour qu'elles soient utilisable partout
module.exports = router