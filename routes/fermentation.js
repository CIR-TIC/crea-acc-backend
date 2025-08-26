const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const fermentationController = require('../controllers/fermentation.controller');

router.post('/get', verifyToken, fermentationController.getFermentations);
router.post('/create', verifyToken, fermentationController.createFermentation);

module.exports = router;
