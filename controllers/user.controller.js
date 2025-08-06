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

exports.hasProperty = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ error: 'User not found' });

    const userPropertyId = user.property_id;

    if (userPropertyId === null) {
      return res.status(200).json({
        hasProperty: false,
        message: 'User does not have an associated property (property_id is null).'
      });
    } else {
      return res.status(200).json({
        hasProperty: true,
        propertyId: userPropertyId,
        message: 'User has an associated property.'
      });
    }

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
