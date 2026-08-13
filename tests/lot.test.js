const request = require('supertest');
const app = require('../app');
const { models, truncateAll, closeDb } = require('./helpers/db');
const { createUser, createProperty, createLot, createActivity, tokenFor } = require('./helpers/factories');

beforeEach(async () => {
  await truncateAll();
});

afterAll(async () => {
  await closeDb();
});

describe('PUT /lots', () => {
  it('actualiza un lote del propio usuario', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });

    const res = await request(app)
      .put('/lots')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: lot.id, lot_name: 'Lote actualizado', area: 5 });

    expect(res.status).toBe(200);
    expect(res.body.lot_name).toBe('Lote actualizado');

    const updated = await models.Lot.findByPk(lot.id);
    expect(updated.area).toBe(5);
  });

  it('responde 403 si el lote no pertenece a la propiedad del usuario', async () => {
    const ownProperty = await createProperty();
    const otherProperty = await createProperty({ community: 'Otra comunidad' });
    const user = await createUser({ property_id: ownProperty.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: otherProperty.id });

    const res = await request(app)
      .put('/lots')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: lot.id, lot_name: 'Intento no autorizado' });

    expect(res.status).toBe(403);

    const unchanged = await models.Lot.findByPk(lot.id);
    expect(unchanged.lot_name).toBe('Lote de prueba');
  });

  it('no permite reasignar el lote a otra propiedad vía id_property', async () => {
    const property = await createProperty();
    const otherProperty = await createProperty({ community: 'Otra comunidad' });
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });

    const res = await request(app)
      .put('/lots')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: lot.id, id_property: otherProperty.id });

    expect(res.status).toBe(200);

    const unchanged = await models.Lot.findByPk(lot.id);
    expect(unchanged.id_property).toBe(property.id);
  });

  it('responde 404 si el lote no existe', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);

    const res = await request(app)
      .put('/lots')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: 999999, lot_name: 'No existe' });

    expect(res.status).toBe(404);
  });
});

describe('DELETE /lots', () => {
  it('elimina un lote sin actividades registradas', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });

    const res = await request(app)
      .delete('/lots')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: lot.id });

    expect(res.status).toBe(204);

    const deleted = await models.Lot.findByPk(lot.id);
    expect(deleted).toBeNull();
  });

  it('responde 409 y no elimina un lote con actividades registradas', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    await createActivity({ id_lot: lot.id });

    const res = await request(app)
      .delete('/lots')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: lot.id });

    expect(res.status).toBe(409);

    const stillThere = await models.Lot.findByPk(lot.id);
    expect(stillThere).not.toBeNull();
  });

  it('responde 403 si el lote no pertenece a la propiedad del usuario', async () => {
    const ownProperty = await createProperty();
    const otherProperty = await createProperty({ community: 'Otra comunidad' });
    const user = await createUser({ property_id: ownProperty.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: otherProperty.id });

    const res = await request(app)
      .delete('/lots')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: lot.id });

    expect(res.status).toBe(403);

    const stillThere = await models.Lot.findByPk(lot.id);
    expect(stillThere).not.toBeNull();
  });
});
