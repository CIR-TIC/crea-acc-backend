const express = require('express');
const { verifyToken } = require('../middlewares/authJWT');
const router = express.Router();
const formController = require('../controllers/form.controller');

//router.post('/', formController.createForm);
router.get('/', verifyToken, formController.getForms);
// getFormDetails, updateForm y deleteForm no tenían ningún middleware de
// auth: cualquiera podía leer, editar o borrar cualquier formulario sin
// loguearse (mismo hueco ya cerrado en survey.js/response.js/response_option.js).
router.post('/', verifyToken, formController.getFormDetails);
router.put('/:id', verifyToken, formController.updateForm);
router.delete('/:id', verifyToken, formController.deleteForm);

module.exports = router;
