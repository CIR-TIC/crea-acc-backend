const request = require('supertest');
const app = require('../app');
const { models, truncateAll, closeDb } = require('./helpers/db');
const {
  createUser,
  createProperty,
  createLot,
  createActivity,
  createHarvest,
  createDrying,
  createFermentation,
  createSale,
  tokenFor,
} = require('./helpers/factories');

beforeEach(async () => {
  await truncateAll();
});

afterAll(async () => {
  await closeDb();
});

const EIGHT_DAYS_AGO = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000);

describe('PUT/DELETE /harvests (ventana de edición de 7 días)', () => {
  it('permite actualizar una cosecha reciente del propio usuario', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const harvest = await createHarvest({ id_lot: lot.id });

    const res = await request(app)
      .post('/harvests/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: harvest.id, product: 'Cacao', amount: 200, unit_measure: 'Kilogramo' });

    expect(res.status).toBe(200);
    expect(res.body.product).toBe('Cacao');
  });

  it('responde 403 si la cosecha no pertenece a la propiedad del usuario', async () => {
    const ownProperty = await createProperty();
    const otherProperty = await createProperty({ community: 'Otra comunidad' });
    const user = await createUser({ property_id: ownProperty.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: otherProperty.id });
    const harvest = await createHarvest({ id_lot: lot.id });

    const res = await request(app)
      .post('/harvests/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: harvest.id, product: 'Intento no autorizado' });

    expect(res.status).toBe(403);
  });

  it('responde 409 y no permite editar una cosecha de hace más de 7 días', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const harvest = await createHarvest({ id_lot: lot.id, audCreatedAt: EIGHT_DAYS_AGO });

    const res = await request(app)
      .post('/harvests/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: harvest.id, product: 'Ya no debería poder cambiar esto' });

    expect(res.status).toBe(409);

    const unchanged = await models.Harvest.findByPk(harvest.id);
    expect(unchanged.product).toBe('Café');
  });

  it('responde 409 y no permite eliminar una cosecha de hace más de 7 días', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const harvest = await createHarvest({ id_lot: lot.id, audCreatedAt: EIGHT_DAYS_AGO });

    const res = await request(app)
      .post('/harvests/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: harvest.id });

    expect(res.status).toBe(409);

    const stillThere = await models.Harvest.findByPk(harvest.id);
    expect(stillThere).not.toBeNull();
  });

  it('elimina una cosecha reciente del propio usuario', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const harvest = await createHarvest({ id_lot: lot.id });

    const res = await request(app)
      .post('/harvests/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: harvest.id });

    expect(res.status).toBe(204);

    const deleted = await models.Harvest.findByPk(harvest.id);
    expect(deleted).toBeNull();
  });
});

describe('PUT/DELETE /activities (ventana de edición de 7 días, actividad de Campo)', () => {
  it('permite actualizar una actividad de campo reciente del propio usuario', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const activity = await createActivity({ id_lot: lot.id, equipment: 'Machete' });

    const res = await request(app)
      .post('/activities/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: activity.id, equipment: 'Bomba de fumigar' });

    expect(res.status).toBe(200);
    expect(res.body.equipment).toBe('Bomba de fumigar');
  });

  it('responde 403 si la actividad de campo no pertenece a la propiedad del usuario', async () => {
    const ownProperty = await createProperty();
    const otherProperty = await createProperty({ community: 'Otra comunidad' });
    const user = await createUser({ property_id: ownProperty.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: otherProperty.id });
    const activity = await createActivity({ id_lot: lot.id });

    const res = await request(app)
      .post('/activities/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: activity.id, equipment: 'Intento no autorizado' });

    expect(res.status).toBe(403);
  });

  it('responde 409 y no permite editar una actividad de campo de hace más de 7 días', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const activity = await createActivity({
      id_lot: lot.id,
      equipment: 'Machete',
      audCreatedAt: EIGHT_DAYS_AGO,
    });

    const res = await request(app)
      .post('/activities/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: activity.id, equipment: 'Ya no debería poder cambiar esto' });

    expect(res.status).toBe(409);

    const unchanged = await models.Activity.findByPk(activity.id);
    expect(unchanged.equipment).toBe('Machete');
  });

  it('responde 409 y no permite eliminar una actividad de campo de hace más de 7 días', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const activity = await createActivity({ id_lot: lot.id, audCreatedAt: EIGHT_DAYS_AGO });

    const res = await request(app)
      .post('/activities/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: activity.id });

    expect(res.status).toBe(409);

    const stillThere = await models.Activity.findByPk(activity.id);
    expect(stillThere).not.toBeNull();
  });

  it('elimina una actividad de campo reciente del propio usuario', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const activity = await createActivity({ id_lot: lot.id });

    const res = await request(app)
      .post('/activities/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: activity.id });

    expect(res.status).toBe(204);

    const deleted = await models.Activity.findByPk(activity.id);
    expect(deleted).toBeNull();
  });
});

describe('PUT/DELETE /dryings (ventana de edición de 7 días)', () => {
  it('permite actualizar un secado reciente del propio usuario', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const drying = await createDrying({ id_lot: lot.id });

    const res = await request(app)
      .post('/dryings/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: drying.id, method: 'Secado en zarandas' });

    expect(res.status).toBe(200);
    expect(res.body.method).toBe('Secado en zarandas');
  });

  it('responde 403 si el secado no pertenece a la propiedad del usuario', async () => {
    const ownProperty = await createProperty();
    const otherProperty = await createProperty({ community: 'Otra comunidad' });
    const user = await createUser({ property_id: ownProperty.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: otherProperty.id });
    const drying = await createDrying({ id_lot: lot.id });

    const res = await request(app)
      .post('/dryings/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: drying.id, method: 'Intento no autorizado' });

    expect(res.status).toBe(403);
  });

  it('responde 409 y no permite editar un secado de hace más de 7 días', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const drying = await createDrying({ id_lot: lot.id, audCreatedAt: EIGHT_DAYS_AGO });

    const res = await request(app)
      .post('/dryings/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: drying.id, method: 'Ya no debería poder cambiar esto' });

    expect(res.status).toBe(409);

    const unchanged = await models.Drying.findByPk(drying.id);
    expect(unchanged.method).toBe('Secado al sol');
  });

  it('responde 409 y no permite eliminar un secado de hace más de 7 días', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const drying = await createDrying({ id_lot: lot.id, audCreatedAt: EIGHT_DAYS_AGO });

    const res = await request(app)
      .post('/dryings/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: drying.id });

    expect(res.status).toBe(409);

    const stillThere = await models.Drying.findByPk(drying.id);
    expect(stillThere).not.toBeNull();
  });

  it('elimina un secado reciente del propio usuario', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const drying = await createDrying({ id_lot: lot.id });

    const res = await request(app)
      .post('/dryings/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: drying.id });

    expect(res.status).toBe(204);

    const deleted = await models.Drying.findByPk(drying.id);
    expect(deleted).toBeNull();
  });
});

describe('PUT/DELETE /fermentations (ventana de edición de 7 días)', () => {
  it('permite actualizar una fermentación reciente del propio usuario', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const fermentation = await createFermentation({ id_lot: lot.id });

    const res = await request(app)
      .post('/fermentations/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: fermentation.id, days: '8' });

    expect(res.status).toBe(200);
    expect(res.body.days).toBe('8');
  });

  it('responde 403 si la fermentación no pertenece a la propiedad del usuario', async () => {
    const ownProperty = await createProperty();
    const otherProperty = await createProperty({ community: 'Otra comunidad' });
    const user = await createUser({ property_id: ownProperty.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: otherProperty.id });
    const fermentation = await createFermentation({ id_lot: lot.id });

    const res = await request(app)
      .post('/fermentations/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: fermentation.id, days: '99' });

    expect(res.status).toBe(403);
  });

  it('responde 409 y no permite editar una fermentación de hace más de 7 días', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const fermentation = await createFermentation({ id_lot: lot.id, audCreatedAt: EIGHT_DAYS_AGO });

    const res = await request(app)
      .post('/fermentations/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: fermentation.id, days: '99' });

    expect(res.status).toBe(409);

    const unchanged = await models.Fermentation.findByPk(fermentation.id);
    expect(unchanged.days).toBe('6');
  });

  it('responde 409 y no permite eliminar una fermentación de hace más de 7 días', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const fermentation = await createFermentation({ id_lot: lot.id, audCreatedAt: EIGHT_DAYS_AGO });

    const res = await request(app)
      .post('/fermentations/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: fermentation.id });

    expect(res.status).toBe(409);

    const stillThere = await models.Fermentation.findByPk(fermentation.id);
    expect(stillThere).not.toBeNull();
  });

  it('elimina una fermentación reciente del propio usuario', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const fermentation = await createFermentation({ id_lot: lot.id });

    const res = await request(app)
      .post('/fermentations/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: fermentation.id });

    expect(res.status).toBe(204);

    const deleted = await models.Fermentation.findByPk(fermentation.id);
    expect(deleted).toBeNull();
  });
});

describe('PUT/DELETE /sales (misma regla, para confirmar que el patrón se generaliza)', () => {
  it('permite actualizar una venta reciente del propio usuario', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const sale = await createSale({ id_lot: lot.id });

    const res = await request(app)
      .post('/sales/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: sale.id, cacao_state: 'Seco' });

    expect(res.status).toBe(200);
    expect(res.body.cacao_state).toBe('Seco');
  });

  it('responde 409 y no permite eliminar una venta de hace más de 7 días', async () => {
    const property = await createProperty();
    const user = await createUser({ property_id: property.id });
    const token = tokenFor(user.id);
    const lot = await createLot({ id_property: property.id });
    const sale = await createSale({ id_lot: lot.id, audCreatedAt: EIGHT_DAYS_AGO });

    const res = await request(app)
      .post('/sales/delete')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: sale.id });

    expect(res.status).toBe(409);

    const stillThere = await models.Sale.findByPk(sale.id);
    expect(stillThere).not.toBeNull();
  });
});
