const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const cropController = require('../controllers/crop.controller');

router.get('/', verifyToken, cropController.getCrops);
router.post('/getById', verifyToken, cropController.getCropById);

module.exports = router;
