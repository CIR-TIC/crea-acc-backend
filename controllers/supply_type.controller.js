const { Supply_Type } = require('../models');

exports.getSupplyTypes = async (req, res) => {
  try {
    const types = await Supply_Type.findAll();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
