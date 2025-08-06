const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const varietyController = require('../controllers/variety.controller');

router.get('/', verifyToken, varietyController.getVarieties);
router.post('/getById', verifyToken, varietyController.getVarietyById);

module.exports = router;
