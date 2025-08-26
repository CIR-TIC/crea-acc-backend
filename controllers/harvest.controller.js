const { Harvest } = require('../models');

exports.createHarvest = async (req, res) => {
  try {
    const {
      date,
      unit_measure,
      product,
      amount,
      observation,
      id_lot,
    } = req.body;

    const harvest = await Harvest.create({
      date,
      unit_measure,
      product,
      amount,
      observation,
      id_lot,
    });

    res.status(201).json(harvest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHarvest = async (req, res) => {
  try {
    const harvests = await Harvest.findAll({
      where: {id_lot: req.body.id_lot}
    });
    res.status(200).json(harvests);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};
