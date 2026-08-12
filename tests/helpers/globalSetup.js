require('dotenv').config({ path: require('path').join(__dirname, '../../.env.test') });

module.exports = async () => {
  const models = require('../../models');

  await models.sequelize.query('DROP SCHEMA IF EXISTS app CASCADE');
  await models.sequelize.query('DROP SCHEMA IF EXISTS form CASCADE');
  await models.sequelize.query('CREATE SCHEMA app');
  await models.sequelize.query('CREATE SCHEMA form');
  await models.sequelize.sync();

  await models.sequelize.close();
};
