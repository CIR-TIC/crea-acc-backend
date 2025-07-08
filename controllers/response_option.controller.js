const { ResponseOption } = require('../models');

exports.createResponseOption = async (req, res) => {
  try {
    const { response_id, option_id } = req.body;
    const responseOption = await ResponseOption.create({ response_id, option_id });
    res.status(201).json(responseOption);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResponseOptions = async (req, res) => {
  try {
    const data = await ResponseOption.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResponseOptionById = async (req, res) => {
  try {
    const { id } = req.body.id;
    const item = await ResponseOption.findByPk(id);
    if (!item) return res.status(404).json({ error: 'ResponseOption not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateResponseOption = async (req, res) => {
  try {
    const { id, response_id, option_id } = req.body;
    const item = await ResponseOption.findByPk(id);
    if (!item) return res.status(404).json({ error: 'ResponseOption not found' });

    await item.update({ response_id, option_id });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteResponseOption = async (req, res) => {
  try {
    const { id } = req.body.id;
    const item = await ResponseOption.findByPk(id);
    if (!item) return res.status(404).json({ error: 'ResponseOption not found' });

    await item.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
