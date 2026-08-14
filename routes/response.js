// routes/responseRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const responseController = require('../controllers/response.controller');

// No tenía ningún middleware de auth: cualquiera podía leer o escribir
// respuestas de encuestas de cualquier usuario sin loguearse.
router.post('/', verifyToken, responseController.createResponse);
router.get('/', verifyToken, responseController.getResponses);
router.get('/:id', verifyToken, responseController.getResponseById);
router.put('/:id', verifyToken, responseController.updateResponse);
router.delete('/:id', verifyToken, responseController.deleteResponse);

module.exports = router;
