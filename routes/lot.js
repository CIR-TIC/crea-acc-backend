const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const lotController = require('../controllers/lot.controller');

router.get('/', verifyToken, lotController.getLotByPropertyId);
router.post('/', verifyToken, lotController.createLot);
router.put('/', verifyToken, lotController.updateLot);
router.delete('/', verifyToken, lotController.deleteLot);

module.exports = router;
