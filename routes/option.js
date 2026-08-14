const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const optionController = require('../controllers/option.controller');

// No tenía ningún middleware de auth: cualquiera podía leer/crear/editar/
// borrar cualquier opción de cualquier pregunta sin loguearse.
router.post('/', verifyToken, optionController.createOption);
router.get('/', verifyToken, optionController.getOptions);
router.get('/:id', verifyToken, optionController.getOptionById);
router.put('/:id', verifyToken, optionController.updateOption);
router.delete('/:id', verifyToken, optionController.deleteOption);

module.exports = router;
