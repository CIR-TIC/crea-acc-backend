const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/survey.controller');

router.post('/', surveyController.createSurvey);
router.get('/', surveyController.getSurveys);
router.get('/:id', surveyController.getSurveyById);
router.put('/:id', surveyController.updateSurvey);
router.delete('/:id', surveyController.deleteSurvey);

module.exports = router;
