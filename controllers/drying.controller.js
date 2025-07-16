const { Drying, Lot } = require('../models');

exports.createDrying = async (req, res) => {
  try {
    const {
      start_date,
      end_date,
      method,
      observations,
      id_lot
    } = req.body;

    const drying = await Drying.create({
      start_date,
      end_date,
      method,
      observations,
      id_lot
    });

    res.status(201).json(drying);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDrying = async (req, res) => {
  try {
    const dryings = await Drying.findAll({
      include: [{ model: Lot, as: 'lot' }]
    });
    res.status(200).json(dryings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDryingById = async (req, res) => {
  try {
    const { id } = req.body.id;
    const drying = await Drying.findByPk(id, {
      include: [{ model: Lot, as: 'lot' }]
    });
    if (!fermentation) return res.status(404).json({ error: 'Drying not found' });

    res.status(200).json(drying);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFermentation = async (req, res) => {
  try {
    const { id } = req.body.id;
    const drying = await Drying.findByPk(id);
    if (!drying) return res.status(404).json({ error: 'Drying not found' });

    await drying.update(req.body);
    res.status(200).json(drying);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFermentation = async (req, res) => {
  try {
    const { id } = req.body.id;
    const drying = await Drying.findByPk(id);
    if (!drying) return res.status(404).json({ error: 'Drying not found' });

    await drying.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
