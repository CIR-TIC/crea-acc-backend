const { Response, Option } = require('../models');

// No hay FK/CHECK que impida guardar una respuesta con un option_id que en
// realidad pertenece a OTRA pregunta — hay que revisarlo a mano antes de
// escribir. Devuelve un mensaje de error si no es válido, o null si está bien.
async function validateOptionBelongsToQuestion(optionId, questionId, transaction) {
  if (optionId === undefined || optionId === null) return null;
  const option = await Option.findByPk(optionId, { transaction });
  if (!option) return `Option ${optionId} does not exist.`;
  if (option.question_id !== Number(questionId)) {
    return `Option ${optionId} does not belong to question ${questionId}.`;
  }
  return null;
}

exports.createResponse = async (req, res) => {
  try {
    const { survey_submission_id, question_id, text_value, option_id } = req.body;

    const optionError = await validateOptionBelongsToQuestion(option_id, question_id);
    if (optionError) {
      return res.status(400).json({ error: optionError });
    }

    const response = await Response.create({
      survey_submission_id,
      question_id,
      text_value,
      option_id,
    });
    res.status(201).json(response);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'A response for this question already exists in this submission.' });
    }
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

    const effectiveQuestionId = question_id ?? response.question_id;
    const effectiveOptionId = option_id === undefined ? response.option_id : option_id;
    const optionError = await validateOptionBelongsToQuestion(effectiveOptionId, effectiveQuestionId);
    if (optionError) {
      return res.status(400).json({ error: optionError });
    }

    await response.update({ text_value, question_id, survey_submission_id, option_id });
    res.status(200).json(response);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'A response for this question already exists in this submission.' });
    }
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
