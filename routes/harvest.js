const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const harvestController = require('../controllers/harvest.controller');

router.post('/get', verifyToken, harvestController.getHarvest);
router.post('/create', verifyToken, harvestController.createHarvest);
router.post('/update', verifyToken, harvestController.updateHarvest);
router.post('/delete', verifyToken, harvestController.deleteHarvest);

module.exports = router;
