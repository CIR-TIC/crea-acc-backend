const { User } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const SAFE_ATTRIBUTES = [
    'id', 'identity_number', 'producer_code', 'name', 'last_name',
    'email', 'birthday', 'role', 'association_id', 'property_id'
];

exports.getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, { attributes: SAFE_ATTRIBUTES });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Ocurrió un error al obtener el perfil.' });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Se requiere la contraseña actual y la nueva.' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'La nueva contraseña debe tener al menos 6 caracteres.' });
        }

        const user = await User.findByPk(req.userId);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

        const isMatch = bcrypt.compareSync(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'La contraseña actual es incorrecta.' });
        }

        user.password = newPassword; // El hook beforeUpdate del modelo la hashea al guardar.
        user.audUpdatedAt = new Date();
        await user.save();

        res.status(200).json({ message: 'Contraseña actualizada correctamente.' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Ocurrió un error al cambiar la contraseña.' });
    }
};

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
