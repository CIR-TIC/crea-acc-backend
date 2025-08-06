// routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/property.controller');
const { verifyToken } = require('../middlewares/authJWT');

router.post('/', verifyToken, propertyController.createProperty);

router.get('/', verifyToken, propertyController.getAllProperties);

module.exports = router;