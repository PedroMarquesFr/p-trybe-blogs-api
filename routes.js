const express = require('express');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const postController = require('./controllers/postController');
const { validateJWT } = require('./middlewares');

const router = express.Router();

router.post('/user', userController.newUser);
router.get('/user', validateJWT(false), userController.listUser);
router.get('/user/:id', validateJWT(false), userController.listSingleUser);
router.delete('/user/me', validateJWT(false), userController.deleteUser);

router.post('/login', loginController.newLogin);

router.post('/post', validateJWT(false), postController.newPost);
router.get('/post', validateJWT(false), postController.getPosts);
router.get('/post/search', validateJWT(false), postController.serachPostByTerm);
router.get('/post/:id', validateJWT(false), postController.getPost);
router.put('/post/:id', validateJWT(false), postController.editPost);
router.delete('/post/:id', validateJWT(false), postController.deletePost);

module.exports = router;
