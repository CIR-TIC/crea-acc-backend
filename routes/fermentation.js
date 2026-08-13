const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const fermentationController = require('../controllers/fermentation.controller');

router.post('/get', verifyToken, fermentationController.getFermentations);
router.post('/create', verifyToken, fermentationController.createFermentation);
router.post('/update', verifyToken, fermentationController.updateFermentation);
router.post('/delete', verifyToken, fermentationController.deleteFermentation);

module.exports = router;
