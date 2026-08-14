const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const controller = require('../controllers/response_option.controller');

// No tenía ningún middleware de auth: cualquiera podía leer o escribir
// selecciones de opciones de encuestas de cualquier usuario sin loguearse.
router.post('/', verifyToken, controller.createResponseOption);
router.get('/', verifyToken, controller.getResponseOptions);
router.get('/:id', verifyToken, controller.getResponseOptionById);
router.put('/:id', verifyToken, controller.updateResponseOption);
router.delete('/:id', verifyToken, controller.deleteResponseOption);

module.exports = router;
