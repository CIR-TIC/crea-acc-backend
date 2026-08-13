const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const saleController = require('../controllers/sale.controller');

router.post('/get', verifyToken, saleController.getSales);
router.post('/create', verifyToken, saleController.createSale);
router.post('/update', verifyToken, saleController.updateSale);
router.post('/delete', verifyToken, saleController.deleteSale);

module.exports = router;
