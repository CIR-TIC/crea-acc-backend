const { Harvest } = require('../models');
const { checkActivityEditable } = require('../utils/activityEditGuard');

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

exports.updateHarvest = async (req, res) => {
  try {
    const { id } = req.body;
    const harvest = await Harvest.findByPk(id);
    if (!harvest) return res.status(404).json({ error: 'Harvest not found' });

    const guardError = await checkActivityEditable(harvest, req.userId);
    if (guardError) return res.status(guardError.status).json({ error: guardError.message });

    const { date, unit_measure, product, amount, observation } = req.body;
    await harvest.update({ date, unit_measure, product, amount, observation });
    res.status(200).json(harvest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteHarvest = async (req, res) => {
  try {
    const { id } = req.body;
    const harvest = await Harvest.findByPk(id);
    if (!harvest) return res.status(404).json({ error: 'Harvest not found' });

    const guardError = await checkActivityEditable(harvest, req.userId);
    if (guardError) return res.status(guardError.status).json({ error: guardError.message });

    await harvest.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
