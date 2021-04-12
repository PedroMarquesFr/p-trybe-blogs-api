const express = require('express');
const loginController = require('./controllers/loginController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('ta funcionando');
});

router.post('/user', loginController.newUser);

module.exports = router;
