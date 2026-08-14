const { Response_Selected_Option, Response, Option } = require('../models');

// Igual que en response.controller.js: nada a nivel de base impide marcar
// para una Response una Option que en realidad es de otra pregunta.
async function validateOptionMatchesResponseQuestion(responseId, optionId) {
  const [response, option] = await Promise.all([
    Response.findByPk(responseId),
    Option.findByPk(optionId),
  ]);
  if (!response) return `Response ${responseId} does not exist.`;
  if (!option) return `Option ${optionId} does not exist.`;
  if (option.question_id !== response.question_id) {
    return `Option ${optionId} does not belong to the question answered by response ${responseId}.`;
  }
  return null;
}

exports.createResponseOption = async (req, res) => {
  try {
    const { response_id, option_id } = req.body;

    const validationError = await validateOptionMatchesResponseQuestion(response_id, option_id);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const responseOption = await Response_Selected_Option.create({ response_id, option_id });
    res.status(201).json(responseOption);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'This option is already selected for this response.' });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.getResponseOptions = async (req, res) => {
  try {
    const data = await Response_Selected_Option.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResponseOptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Response_Selected_Option.findByPk(id);
    if (!item) return res.status(404).json({ error: 'ResponseOption not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateResponseOption = async (req, res) => {
  try {
    const { id } = req.params;
    const { response_id, option_id } = req.body;
    const item = await Response_Selected_Option.findByPk(id);
    if (!item) return res.status(404).json({ error: 'ResponseOption not found' });

    const effectiveResponseId = response_id ?? item.response_id;
    const effectiveOptionId = option_id ?? item.option_id;
    const validationError = await validateOptionMatchesResponseQuestion(effectiveResponseId, effectiveOptionId);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    await item.update({ response_id, option_id });
    res.status(200).json(item);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'This option is already selected for this response.' });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.deleteResponseOption = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Response_Selected_Option.findByPk(id);
    if (!item) return res.status(404).json({ error: 'ResponseOption not found' });

    await item.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
