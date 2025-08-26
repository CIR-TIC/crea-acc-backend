const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const dryingController = require('../controllers/drying.controller');

router.post('/get', verifyToken, dryingController.getDrying);
router.post('/create', verifyToken, dryingController.createDrying);

module.exports = router;
