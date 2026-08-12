const models = require('../../models');

async function truncateAll() {
  const tableNames = Object.keys(models)
    .filter((key) => key !== 'sequelize' && key !== 'Sequelize')
    .map((key) => {
      const model = models[key];
      const schema = model.options.schema;
      const tableName = model.tableName;
      return `"${schema}"."${tableName}"`;
    });

  if (tableNames.length === 0) return;
  await models.sequelize.query(`TRUNCATE TABLE ${tableNames.join(', ')} RESTART IDENTITY CASCADE`);
}

async function closeDb() {
  await models.sequelize.close();
}

module.exports = { models, truncateAll, closeDb };
