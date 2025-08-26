const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const supplyTypeController = require('../controllers/supply_type.controller');

router.get('/get', verifyToken, supplyTypeController.getSupplyTypes);

module.exports = router;
