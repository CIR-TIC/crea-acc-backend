const { Fermentation } = require('../models');
const { checkActivityEditable } = require('../utils/activityEditGuard');

exports.createFermentation = async (req, res) => {
  try {
    const {
      date,
      amount,
      unit_measure,
      days,
      observation,
      id_lot,
    } = req.body;

    const fermentation = await Fermentation.create({
      date,
      amount,
      unit_measure,
      days,
      observation,
      id_lot,
    });

    res.status(201).json(fermentation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFermentations = async (req, res) => {
  try {
    const fermentations = await Fermentation.findAll({
      where: {id_lot: req.body.id_lot}
    });
    res.status(200).json(fermentations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFermentation = async (req, res) => {
  try {
    const { id } = req.body;
    const fermentation = await Fermentation.findByPk(id);
    if (!fermentation) return res.status(404).json({ error: 'Fermentation not found' });

    const guardError = await checkActivityEditable(fermentation, req.userId);
    if (guardError) return res.status(guardError.status).json({ error: guardError.message });

    const { date, amount, unit_measure, days, observation } = req.body;
    await fermentation.update({ date, amount, unit_measure, days, observation });
    res.status(200).json(fermentation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFermentation = async (req, res) => {
  try {
    const { id } = req.body;
    const fermentation = await Fermentation.findByPk(id);
    if (!fermentation) return res.status(404).json({ error: 'Fermentation not found' });

    const guardError = await checkActivityEditable(fermentation, req.userId);
    if (guardError) return res.status(guardError.status).json({ error: guardError.message });

    await fermentation.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
