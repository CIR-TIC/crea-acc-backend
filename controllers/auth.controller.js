const db = require('../models')
const User = db.User
const RefreshToken = db.RefreshToken;
const config = require('../config/auth.config')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid');

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, config.secret, {
    expiresIn: config.jwtExpiration,
  });
};

const generateAndStoreRefreshToken = async (user_id) => {
  const refreshToken = uuidv4();
  const expiryDate = new Date();
  expiryDate.setSeconds(expiryDate.getSeconds() + config.jwtRefreshExpiration);

  await RefreshToken.create({
    token: refreshToken,
    user_id: user_id,
    expiryDate: expiryDate,
  });

  return refreshToken;
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Contraseña incorrecta.',
      });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = await generateAndStoreRefreshToken(user.id);

    const json = {
      id: user.id,
      identity_number: user.identity_number,
      producer_code: user.producer_code,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      birthday: user.birthday,
      role: user.role,
      association_id: user.association_id,
      property_id: user.property_id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    res.status(200).send(json);
  } catch (err) {
    console.error('Error en signin:', err);
    res.status(500).send({ message: 'Ocurrió un error al iniciar sesión. Intente de nuevo más tarde.' });
  }
};

exports.signup = async (req, res) => {
  let tmp_user = await User.findOne({
    where: { email: req.body.email },
    attributes: ['id']
  })

  if (tmp_user) {
    res.status(409).send({ message: "El correo electrónico ya está registrado." })
    return
  }
  else {
    await User.create({
      identity_number: req.body.identity_number,
      producer_code: req.body.producer_code,
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      birthday: req.body.birthday,
      role: req.body.role,
      association_id: req.body.association_id,
      property_id: req.body.property_id,
    })
      .then(user => {
        res.status(200).send({ message: "Usuario registrado exitosamente." })
        return
      }
      ).catch(err => {
        console.error('Error en signup:', err);
        if (err.name === 'SequelizeUniqueConstraintError') {
          const field = err.errors?.[0]?.path;
          const fieldLabels = {
            identity_number: 'El número de identificación',
            producer_code: 'El código de productor',
            email: 'El correo electrónico',
          };
          const label = fieldLabels[field] || 'Uno de los datos ingresados';
          return res.status(409).send({ message: `${label} ya está registrado.` });
        }
        res.status(500).send({ message: 'Ocurrió un error al registrar el usuario. Intente de nuevo más tarde.' })
      })
  }
}

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (!requestToken) {
    return res.status(403).send({ message: 'Se requiere el token de actualización.' });
  }

  try {
    const refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

    if (!refreshToken) {
      return res.status(403).send({ message: 'Token de actualización no encontrado.' });
    }

    if (refreshToken.expiryDate < new Date()) {
      await RefreshToken.destroy({ where: { id: refreshToken.id } });
      return res.status(403).send({ message: 'El token de actualización expiró. Por favor, inicie sesión de nuevo.' });
    }

    const user = await User.findByPk(refreshToken.user_id);
    if (!user) {
      return res.status(404).send({ message: 'No se encontró el usuario para este token.' });
    }

    await RefreshToken.destroy({ where: { id: refreshToken.id } });

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = await generateAndStoreRefreshToken(user.id);

    return res.status(200).send({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    console.error('Error en refreshToken:', err);
    return res.status(500).send({ message: 'Ocurrió un error al renovar la sesión. Intente de nuevo más tarde.' });
  }
};