const { where } = require('sequelize');
const { Drying, Lot } = require('../models');
const { checkActivityEditable } = require('../utils/activityEditGuard');

exports.createDrying = async (req, res) => {
  try {
    const {
      date,
      amount,
      unit_measure,
      days,
      method,
      observation,
      id_lot,
    } = req.body;

    const drying = await Drying.create({
      date,
      amount,
      unit_measure,
      days,
      method,
      observation,
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
      where: {id_lot: req.body.id_lot}
    });
    res.status(200).json(dryings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDrying = async (req, res) => {
  try {
    const { id } = req.body;
    const drying = await Drying.findByPk(id);
    if (!drying) return res.status(404).json({ error: 'Drying not found' });

    const guardError = await checkActivityEditable(drying, req.userId);
    if (guardError) return res.status(guardError.status).json({ error: guardError.message });

    const { date, amount, unit_measure, days, method, observation } = req.body;
    await drying.update({ date, amount, unit_measure, days, method, observation });
    res.status(200).json(drying);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDrying = async (req, res) => {
  try {
    const { id } = req.body;
    const drying = await Drying.findByPk(id);
    if (!drying) return res.status(404).json({ error: 'Drying not found' });

    const guardError = await checkActivityEditable(drying, req.userId);
    if (guardError) return res.status(guardError.status).json({ error: guardError.message });

    await drying.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
