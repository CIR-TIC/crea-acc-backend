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

function tokenFor(userId) {
  return jwt.sign({ id: userId }, authConfig.secret, { expiresIn: authConfig.jwtExpiration });
}

module.exports = { createAssociation, createUser, createProperty, tokenFor };
