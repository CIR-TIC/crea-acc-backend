const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const surveyController = require('../controllers/survey.controller');

router.post('/', verifyToken, surveyController.submitSurvey);
// Estas tres no tenían ningún middleware de auth: cualquiera podía leer el
// detalle de un envío ajeno, o editar/borrar cualquier envío sin loguearse.
router.post('/getSurveySubmissionDetails', verifyToken, surveyController.getSurveySubmissionDetails);
router.put('/:id', verifyToken, surveyController.updateSurvey);
router.delete('/:id', verifyToken, surveyController.deleteSurvey);

module.exports = router;
