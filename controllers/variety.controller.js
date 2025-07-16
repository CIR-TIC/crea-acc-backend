const { Variety, Crop } = require('../models');

exports.createVariety = async (req, res) => {
  try {
    const { name, description } = req.body;
    const variety = await Variety.create({ name, description });
    res.status(201).json(variety);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVarieties = async (req, res) => {
  try {
    const varieties = await Variety.findAll({
      include: [{ model: Crop, as: 'crops' }]
    });
    res.status(200).json(varieties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVarietyById = async (req, res) => {
  try {
    const { id } = req.body.id;
    const variety = await Variety.findByPk(id, {
      include: [{ model: Crop, as: 'crops' }]
    });
    if (!variety) return res.status(404).json({ error: 'Variety not found' });

    res.status(200).json(variety);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateVariety = async (req, res) => {
  try {
    const { id } = req.body.id;
    const variety = await Variety.findByPk(id);
    if (!variety) return res.status(404).json({ error: 'Variety not found' });

    await variety.update(req.body);
    res.status(200).json(variety);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVariety = async (req, res) => {
  try {
    const { id } = req.body.id;
    const variety = await Variety.findByPk(id);
    if (!variety) return res.status(404).json({ error: 'Variety not found' });

    await variety.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
