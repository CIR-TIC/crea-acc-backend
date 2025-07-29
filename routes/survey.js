const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJWT');
const surveyController = require('../controllers/survey.controller');

router.post('/', verifyToken, surveyController.submitSurvey);
router.post('/getSurveySubmissionDetails', surveyController.getSurveySubmissionDetails);
router.put('/:id', surveyController.updateSurvey);
router.delete('/:id', surveyController.deleteSurvey);

module.exports = router;
