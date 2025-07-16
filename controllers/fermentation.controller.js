const { Fermentation, Lot } = require('../models');

exports.createFermentation = async (req, res) => {
  try {
    const {
      start_date,
      end_date,
      observations,
      id_lot
    } = req.body;

    const fermentation = await Fermentation.create({
      start_date,
      end_date,
      observations,
      id_lot
    });

    res.status(201).json(fermentation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFermentations = async (req, res) => {
  try {
    const fermentations = await Fermentation.findAll({
      include: [{ model: Lot, as: 'lot' }]
    });
    res.status(200).json(fermentations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFermentationById = async (req, res) => {
  try {
    const { id } = req.body.id;
    const fermentation = await Fermentation.findByPk(id, {
      include: [{ model: Lot, as: 'lot' }]
    });
    if (!fermentation) return res.status(404).json({ error: 'Fermentation not found' });

    res.status(200).json(fermentation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFermentation = async (req, res) => {
  try {
    const { id } = req.body.id;
    const fermentation = await Fermentation.findByPk(id);
    if (!fermentation) return res.status(404).json({ error: 'Fermentation not found' });

    await fermentation.update(req.body);
    res.status(200).json(fermentation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFermentation = async (req, res) => {
  try {
    const { id } = req.body.id;
    const fermentation = await Fermentation.findByPk(id);
    if (!fermentation) return res.status(404).json({ error: 'Fermentation not found' });

    await fermentation.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
