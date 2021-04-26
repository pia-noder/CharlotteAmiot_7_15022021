const express = require ('express');
const router = express.Router();

//Importation des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer')

//importation des controllers
const controllerPost = require ('../controllers/posts');
const controllerComments = require ('../controllers/comments');



router.post('/', auth, multer, controllerPost.createPost);
router.get('/:id', auth,  controllerPost.getOnePost);
router.get('/', auth, controllerPost.getAllPosts);
router.delete('/:id', auth,  controllerPost.deleteOnePost);



router.post('/:postId/comments', auth, multer, controllerComments.createComment);
router.get('/:id/comments', auth, controllerComments.getAllComments);
router.delete('/:postId/comments/:id', auth, controllerComments.deleteOneComment);

router.put('/:id/likes', auth, controllerPost.likeOnePost);
router.put('/:id/dislikes', auth, controllerPost.dislikeOnePost);
router.post('/:id/likes', auth, controllerPost.likesStatusInfo);

module.exports = router