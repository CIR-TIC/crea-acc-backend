const { Supply_Type, Supplies } = require('../models');

exports.createSupplyType = async (req, res) => {
  try {
    const { name, description } = req.body;
    const supplyType = await Supply_Type.create({ name, description });
    res.status(201).json(supplyType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSupplyTypes = async (req, res) => {
  try {
    const types = await Supply_Type.findAll();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSupplyTypeById = async (req, res) => {
  try {
    const { id } = req.body.id;
    const type = await Supply_Type.findByPk(id, {
      include: [{ model: Supplies, as: 'supplies' }]
    });
    if (!type) return res.status(404).json({ error: 'Supply type not found' });

    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSupplyType = async (req, res) => {
  try {
    const { id } = req.body.id;
    const type = await Supply_Type.findByPk(id);
    if (!type) return res.status(404).json({ error: 'Supply type not found' });

    await type.update(req.body);
    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSupplyType = async (req, res) => {
  try {
    const { id } = req.body.id;
    const type = await Supply_Type.findByPk(id);
    if (!type) return res.status(404).json({ error: 'Supply type not found' });

    await type.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
