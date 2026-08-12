const request = require('supertest');
const app = require('../app');
const { truncateAll, closeDb } = require('./helpers/db');
const { createAssociation, createUser } = require('./helpers/factories');

beforeEach(async () => {
  await truncateAll();
});

afterAll(async () => {
  await closeDb();
});

describe('POST /auth/signup', () => {
  it('registra un usuario nuevo y responde en español', async () => {
    const association = await createAssociation();

    const res = await request(app).post('/auth/signup').send({
      identity_number: '0102030405',
      producer_code: 'PC-001',
      name: 'Juan',
      last_name: 'Pérez',
      email: 'juan.perez@test.com',
      password: 'secret123',
      birthday: '1990-05-15',
      role: 'producer',
      association_id: association.id,
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Usuario registrado exitosamente.');
  });

  it('rechaza un correo duplicado con mensaje en español', async () => {
    const association = await createAssociation();
    await createUser({ email: 'duplicado@test.com', association_id: association.id });

    const res = await request(app).post('/auth/signup').send({
      identity_number: 'OTRO-ID',
      producer_code: 'OTRO-PC',
      name: 'Otro',
      last_name: 'Usuario',
      email: 'duplicado@test.com',
      password: 'secret123',
      birthday: '1990-05-15',
      role: 'producer',
      association_id: association.id,
    });

    expect(res.status).toBe(409);
    expect(res.body.message).toBe('El correo electrónico ya está registrado.');
  });

  it('rechaza un número de identificación duplicado con mensaje específico', async () => {
    const association = await createAssociation();
    await createUser({ identity_number: 'DUP-ID', association_id: association.id });

    const res = await request(app).post('/auth/signup').send({
      identity_number: 'DUP-ID',
      producer_code: 'PC-UNICO',
      name: 'Otro',
      last_name: 'Usuario',
      email: 'unico@test.com',
      password: 'secret123',
      birthday: '1990-05-15',
      role: 'producer',
      association_id: association.id,
    });

    expect(res.status).toBe(409);
    expect(res.body.message).toBe('El número de identificación ya está registrado.');
  });
});

describe('POST /auth/signin', () => {
  it('inicia sesión con credenciales válidas y devuelve tokens', async () => {
    const association = await createAssociation();
    await createUser({ email: 'login@test.com', password: 'correcta123', association_id: association.id });

    const res = await request(app).post('/auth/signin').send({
      email: 'login@test.com',
      password: 'correcta123',
    });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.refreshToken).toBeTruthy();
    expect(res.body.email).toBe('login@test.com');
  });

  it('responde 401 con mensaje en español cuando la contraseña es incorrecta', async () => {
    const association = await createAssociation();
    await createUser({ email: 'login2@test.com', password: 'correcta123', association_id: association.id });

    const res = await request(app).post('/auth/signin').send({
      email: 'login2@test.com',
      password: 'incorrecta',
    });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Contraseña incorrecta.');
  });

  it('responde 404 con mensaje en español cuando el usuario no existe', async () => {
    const res = await request(app).post('/auth/signin').send({
      email: 'no-existe@test.com',
      password: 'cualquiera',
    });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Usuario no encontrado.');
  });
});
