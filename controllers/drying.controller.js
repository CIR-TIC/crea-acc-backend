const { where } = require('sequelize');
const { Drying, Lot } = require('../models');

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
