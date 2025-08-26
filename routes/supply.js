const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const supplyController = require('../controllers/supplies.controller');

router.post('/create', verifyToken, supplyController.createSupply);
router.get('/get', verifyToken, supplyController.getSupplies);
router.post('/update', verifyToken, supplyController.updateSupply);

module.exports = router;
