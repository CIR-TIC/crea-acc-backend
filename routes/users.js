var express = require('express');
var router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const usersController = require('../controllers/user.controller');

router.get('/hasProperty', verifyToken, usersController.hasProperty);
router.get('/me', verifyToken, usersController.getMe);
router.put('/me/password', verifyToken, usersController.changePassword);

module.exports = router;
