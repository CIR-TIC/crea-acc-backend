const jwt = require('jsonwebtoken');
const { models } = require('./db');
const authConfig = require('../../config/auth.config');

async function createAssociation(overrides = {}) {
  return models.Association.create({
    name: 'Asociación de Prueba',
    description: 'Asociación creada para pruebas automatizadas',
    code: `ASSOC-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    ...overrides,
  });
}

async function createUser(overrides = {}) {
  let associationId = overrides.association_id;
  if (!associationId) {
    const association = await createAssociation();
    associationId = association.id;
  }

  return models.User.create({
    identity_number: `ID-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    producer_code: `PROD-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    name: 'Nombre',
    last_name: 'Apellido',
    email: `user-${Date.now()}-${Math.floor(Math.random() * 100000)}@test.com`,
    password: 'password123',
    birthday: '1990-01-01',
    role: 'producer',
    property_id: null,
    ...overrides,
    association_id: associationId,
  });
}

async function createProperty(overrides = {}) {
  return models.Property.create({
    province: 'Guayas',
    canton: 'Guayaquil',
    parish: 'Tarqui',
    community: 'Comunidad de prueba',
    coordinates_x: -79.9,
    coordinates_y: -2.19,
    ...overrides,
  });
}

async function createLot(overrides = {}) {
  let propertyId = overrides.id_property;
  if (!propertyId) {
    const property = await createProperty();
    propertyId = property.id;
  }

  return models.Lot.create({
    lot_name: 'Lote de prueba',
    area: 2.5,
    associated_crop: null,
    age: 12,
    sowing_date: '2023-01-01',
    irrigation_system: 'Goteo',
    id_variety: null,
    ...overrides,
    id_property: propertyId,
  });
}

async function createActivity(overrides = {}) {
  let idLot = overrides.id_lot;
  if (!idLot) {
    const lot = await createLot();
    idLot = lot.id;
  }

  let idTypeActivity = overrides.id_type_activity;
  if (!idTypeActivity) {
    const typeActivity = await models.Type_activity.create({
      name: 'Poda',
      description: 'Poda de prueba',
    });
    idTypeActivity = typeActivity.id;
  }

  return models.Activity.create({
    name: 'Actividad de prueba',
    date: new Date(),
    ...overrides,
    id_lot: idLot,
    id_type_activity: idTypeActivity,
  });
}

async function createHarvest(overrides = {}) {
  let idLot = overrides.id_lot;
  if (!idLot) {
    const lot = await createLot();
    idLot = lot.id;
  }

  return models.Harvest.create({
    date: new Date(),
    unit_measure: 'Kilogramo',
    product: 'Café',
    amount: 100,
    observation: null,
    ...overrides,
    id_lot: idLot,
  });
}

async function createDrying(overrides = {}) {
  let idLot = overrides.id_lot;
  if (!idLot) {
    const lot = await createLot();
    idLot = lot.id;
  }

  return models.Drying.create({
    date: new Date(),
    amount: 100,
    unit_measure: 'Kilogramo',
    days: '5',
    method: 'Secado al sol',
    observation: null,
    ...overrides,
    id_lot: idLot,
  });
}

async function createFermentation(overrides = {}) {
  let idLot = overrides.id_lot;
  if (!idLot) {
    const lot = await createLot();
    idLot = lot.id;
  }

  return models.Fermentation.create({
    date: new Date(),
    amount: 100,
    unit_measure: 'Kilogramo',
    days: '6',
    observation: null,
    ...overrides,
    id_lot: idLot,
  });
}

async function createSale(overrides = {}) {
  let idLot = overrides.id_lot;
  if (!idLot) {
    const lot = await createLot();
    idLot = lot.id;
  }

  return models.Sale.create({
    date: new Date(),
    unit_measure: 'Kilogramo',
    quantity: 50,
    income: 100,
    destination: 'Cliente de prueba',
    description: null,
    transportation_type: null,
    observation: null,
    cacao_state: null,
    ...overrides,
    id_lot: idLot,
  });
}

function tokenFor(userId) {
  return jwt.sign({ id: userId }, authConfig.secret, { expiresIn: authConfig.jwtExpiration });
}

module.exports = {
  createAssociation,
  createUser,
  createProperty,
  createLot,
  createActivity,
  createHarvest,
  createDrying,
  createFermentation,
  createSale,
  tokenFor,
};
