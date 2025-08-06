const { Variety, Crop } = require('../models');

exports.getVarieties = async (req, res) => {
  try {
    const varieties = await Variety.findAll();
    res.status(200).json(varieties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVarietyById = async (req, res) => {
  try {
    const { id } = req.body.id;
    const variety = await Variety.findByPk(id);
    if (!variety) return res.status(404).json({ error: 'Variety not found' });

    res.status(200).json(variety);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
