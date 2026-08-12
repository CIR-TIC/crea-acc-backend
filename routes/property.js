// routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/property.controller');
const { verifyToken } = require('../middlewares/authJWT');

router.post('/', verifyToken, propertyController.createProperty);

router.get('/', verifyToken, propertyController.getAllProperties);

// Debe ir antes de '/:propertyId' para que Express no interprete 'me' como un id.
router.get('/me', verifyToken, propertyController.getMyAssociatedProperty);

router.get('/:propertyId', verifyToken, propertyController.getPropertyById);

router.put('/:propertyId', verifyToken, propertyController.updateProperty);

module.exports = router;