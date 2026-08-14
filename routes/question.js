const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const questionController = require('../controllers/question.controller');

// No tenía ningún middleware de auth: cualquiera podía leer/crear/editar/
// borrar cualquier pregunta de cualquier encuesta sin loguearse.
router.post('/', verifyToken, questionController.createQuestion);
router.get('/', verifyToken, questionController.getQuestions);
router.get('/:id', verifyToken, questionController.getQuestionById);
router.put('/:id', verifyToken, questionController.updateQuestion);
router.delete('/:id', verifyToken, questionController.deleteQuestion);

module.exports = router;
