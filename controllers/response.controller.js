const { Response } = require('../models');

exports.createResponse = async (req, res) => {
  try {
    const { survey_submission_id, question_id, text_value, option_id } = req.body;
    const response = await Response.create({
      survey_submission_id,
      question_id,
      text_value,
      option_id,
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResponses = async (req, res) => {
  try {
    const responses = await Response.findAll();
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResponseById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Response.findByPk(id);
    if (!response) return res.status(404).json({ error: 'Response not found' });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResponseByQuestionId = async (req, res) => {
  try {
    const { id } = req.body;
    const response = await Response.findAll({
            where: { question_id: id }
        }
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { text_value, question_id, survey_submission_id, option_id } = req.body;
    const response = await Response.findByPk(id);
    if (!response) return res.status(404).json({ error: 'Response not found' });

    await response.update({ text_value, question_id, survey_submission_id, option_id });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Response.findByPk(id);
    if (!response) return res.status(404).json({ error: 'Response not found' });

    await response.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
