var express = require('express');
var router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const usersController = require('../controllers/user.controller');

router.get('/hasProperty', verifyToken, usersController.hasProperty);

module.exports = router;
