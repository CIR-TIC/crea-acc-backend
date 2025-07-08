const { Survey } = require('../models');

exports.createSurvey = async (req, res) => {
  try {
    const { code, date } = req.body;
    const survey = await Survey.create({ code, date });
    res.status(201).json(survey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.findAll();
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSurveyById = async (req, res) => {
  try {
    const { id } = req.body.id;
    const survey = await Survey.findByPk(id);
    if (!survey) return res.status(404).json({ error: 'Survey not found' });
    res.status(200).json(survey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSurvey = async (req, res) => {
  try {
    const { id, code, date } = req.body;
    const survey = await Survey.findByPk(id);
    if (!survey) return res.status(404).json({ error: 'Survey not found' });

    await survey.update({ code, date });
    res.status(200).json(survey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSurvey = async (req, res) => {
  try {
    const { id } = req.body.id;
    const survey = await Survey.findByPk(id);
    if (!survey) return res.status(404).json({ error: 'Survey not found' });

    await survey.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
