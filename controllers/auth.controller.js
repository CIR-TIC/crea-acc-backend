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
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
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
    res.status(500).send({ message: err.message });
  }
};

exports.signup = async (req, res) => {
  let tmp_user = await User.findOne({
    where: { email: req.body.email },
    attributes: ['id']
  })

  if (tmp_user) {
    res.status(418).send({ message: "User already exists" })
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
      dirthday: req.body.dirthday,
      role: req.body.role,
      association_id: req.body.association_id,
      property_id: req.body.property_id,
    })
      .then(user => {
        res.status(200).send({ message: "User created" })
        return
      }
      ).catch(err => {
        res.status(500).send({ message: err.message })
      })
  }
}

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (!requestToken) {
    return res.status(403).send({ message: 'Refresh Token is required!' });
  }

  try {
    const refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

    if (!refreshToken) {
      return res.status(403).send({ message: 'Refresh Token not found!' });
    }

    if (refreshToken.expiryDate < new Date()) {
      await RefreshToken.destroy({ where: { id: refreshToken.id } });
      return res.status(403).send({ message: 'Refresh Token was expired. Please make a new signin request' });
    }

    const user = await User.findByPk(refreshToken.user_id);
    if (!user) {
      return res.status(404).send({ message: 'User not found for this Refresh Token.' });
    }

    await RefreshToken.destroy({ where: { id: refreshToken.id } });

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = await generateAndStoreRefreshToken(user.id);

    return res.status(200).send({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};