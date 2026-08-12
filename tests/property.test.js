const request = require('supertest');
const app = require('../app');
const { models, truncateAll, closeDb } = require('./helpers/db');
const { createUser, createProperty, tokenFor } = require('./helpers/factories');

beforeEach(async () => {
  await truncateAll();
});

afterAll(async () => {
  await closeDb();
});

describe('POST /properties', () => {
  it('crea una propiedad y la asocia al usuario autenticado', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);

    const res = await request(app)
      .post('/properties')
      .set('Authorization', `Bearer ${token}`)
      .send({
        province: 'Guayas',
        canton: 'Guayaquil',
        parish: 'Tarqui',
        community: 'Comunidad de prueba',
        coordinates_x: -79.9,
        coordinates_y: -2.19,
      });

    expect(res.status).toBe(201);
    expect(res.body.property.id).toBeTruthy();

    const updatedUser = await models.User.findByPk(user.id);
    expect(updatedUser.property_id).toBe(res.body.property.id);
  });

  it('responde 400 si faltan campos requeridos', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);

    const res = await request(app)
      .post('/properties')
      .set('Authorization', `Bearer ${token}`)
      .send({ province: 'Guayas' });

    expect(res.status).toBe(400);
  });

  it('responde 403 sin un token de acceso', async () => {
    const res = await request(app).post('/properties').send({
      province: 'Guayas',
      canton: 'Guayaquil',
      parish: 'Tarqui',
      community: 'Comunidad de prueba',
    });

    expect(res.status).toBe(403);
  });

  it('responde 409 si el usuario ya tiene una propiedad asociada, sin crear una nueva', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);

    const res = await request(app)
      .post('/properties')
      .set('Authorization', `Bearer ${token}`)
      .send({
        province: 'Guayas',
        canton: 'Guayaquil',
        parish: 'Tarqui',
        community: 'Otra comunidad',
      });

    expect(res.status).toBe(409);

    const propertyCount = await models.Property.count();
    expect(propertyCount).toBe(1);

    const unchangedUser = await models.User.findByPk(user.id);
    expect(unchangedUser.property_id).toBe(property.id);
  });
});

describe('GET /properties', () => {
  it('responde 403 para un usuario que no es administrador', async () => {
    const user = await createUser({ role: 'producer' });
    const token = tokenFor(user.id);

    const res = await request(app).get('/properties').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/administrators/i);
  });
});

describe('GET /properties/:propertyId', () => {
  it('permite a un producer ver su propia propiedad', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);

    const res = await request(app)
      .get(`/properties/${property.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(property.id);
  });

  it('responde 403 si el producer intenta ver una propiedad que no es la suya', async () => {
    const ownProperty = await createProperty();
    const otherProperty = await createProperty({ community: 'Otra comunidad' });
    const user = await createUser({ property_id: ownProperty.id });
    const token = tokenFor(user.id);

    const res = await request(app)
      .get(`/properties/${otherProperty.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(403);
  });

  it('responde 404 si la propiedad no existe', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);

    const res = await request(app).get('/properties/999999').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
  });
});

describe('GET /properties/me', () => {
  it('devuelve la propiedad asociada al usuario autenticado', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);

    const res = await request(app).get('/properties/me').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(property.id);
  });

  it('responde 404 si el usuario no tiene ninguna propiedad asociada', async () => {
    const user = await createUser({ property_id: null });
    const token = tokenFor(user.id);

    const res = await request(app).get('/properties/me').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
  });
});
