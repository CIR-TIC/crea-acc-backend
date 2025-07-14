const { User } = require('../models');
const { Op } = require('sequelize');

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
        audDeletedAt: { [Op.is]: null }
      }
    });

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
        audDeletedAt: { [Op.is]: null }
      }
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.update({
      ...req.body,
      audUpdatedAt: new Date()
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
