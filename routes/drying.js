const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const dryingController = require('../controllers/drying.controller');

router.post('/get', verifyToken, dryingController.getDrying);
router.post('/create', verifyToken, dryingController.createDrying);
router.post('/update', verifyToken, dryingController.updateDrying);
router.post('/delete', verifyToken, dryingController.deleteDrying);

module.exports = router;
