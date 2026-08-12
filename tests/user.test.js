const request = require('supertest');
const app = require('../app');
const { models, truncateAll, closeDb } = require('./helpers/db');
const { createUser, tokenFor } = require('./helpers/factories');

beforeEach(async () => {
  await truncateAll();
});

afterAll(async () => {
  await closeDb();
});

describe('GET /users/me', () => {
  it('devuelve el perfil del usuario autenticado sin exponer la contraseña', async () => {
    const user = await createUser({ email: 'perfil@test.com', name: 'Ana' });
    const token = tokenFor(user.id);

    const res = await request(app).get('/users/me').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe('perfil@test.com');
    expect(res.body.name).toBe('Ana');
    expect(res.body.password).toBeUndefined();
  });

  it('responde 403 sin un token de acceso', async () => {
    const res = await request(app).get('/users/me');
    expect(res.status).toBe(403);
  });
});

describe('PUT /users/me/password', () => {
  it('cambia la contraseña cuando la actual es correcta', async () => {
    const user = await createUser({ email: 'cambio@test.com', password: 'password123' });
    const token = tokenFor(user.id);

    const res = await request(app)
      .put('/users/me/password')
      .set('Authorization', `Bearer ${token}`)
      .send({ currentPassword: 'password123', newPassword: 'nuevaClave456' });

    expect(res.status).toBe(200);

    const loginRes = await request(app)
      .post('/auth/signin')
      .send({ email: 'cambio@test.com', password: 'nuevaClave456' });
    expect(loginRes.status).toBe(200);
  });

  it('responde 401 y no cambia nada si la contraseña actual es incorrecta', async () => {
    const user = await createUser({ email: 'cambio2@test.com', password: 'password123' });
    const token = tokenFor(user.id);

    const res = await request(app)
      .put('/users/me/password')
      .set('Authorization', `Bearer ${token}`)
      .send({ currentPassword: 'incorrecta', newPassword: 'nuevaClave456' });

    expect(res.status).toBe(401);

    const loginRes = await request(app)
      .post('/auth/signin')
      .send({ email: 'cambio2@test.com', password: 'password123' });
    expect(loginRes.status).toBe(200);
  });

  it('responde 400 si la nueva contraseña tiene menos de 6 caracteres', async () => {
    const user = await createUser({ email: 'cambio3@test.com', password: 'password123' });
    const token = tokenFor(user.id);

    const res = await request(app)
      .put('/users/me/password')
      .set('Authorization', `Bearer ${token}`)
      .send({ currentPassword: 'password123', newPassword: '123' });

    expect(res.status).toBe(400);
  });
});
