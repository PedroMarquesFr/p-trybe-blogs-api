const express = require('express');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const { validateJWT } = require('./middlewares');

const router = express.Router();

router.post('/user', userController.newUser);
router.get('/user', validateJWT(false), userController.listUser);
router.get('/user/:id', validateJWT(false), userController.listSingleUser);
router.delete('/user/me', validateJWT(false), userController.deleteUser);
router.post('/login', loginController.newLogin);

module.exports = router;
