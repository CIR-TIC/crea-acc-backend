const request = require('supertest');
const app = require('../app');
const { models, truncateAll, closeDb } = require('./helpers/db');
const {
  createUser,
  createQuestion,
  createOption,
  createSurveySubmission,
  createResponse,
  tokenFor,
} = require('./helpers/factories');

beforeEach(async () => {
  await truncateAll();
});

afterAll(async () => {
  await closeDb();
});

describe('POST /submissions (createResponse)', () => {
  it('crea una respuesta de texto', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const submission = await createSurveySubmission();
    const question = await createQuestion({ form_id: submission.form_id, input_type: 'text' });

    const res = await request(app)
      .post('/submissions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        survey_submission_id: submission.id,
        question_id: question.id,
        text_value: 'Respuesta libre',
      });

    expect(res.status).toBe(201);
    expect(res.body.text_value).toBe('Respuesta libre');
  });

  it('responde 400 si la opción no pertenece a la pregunta indicada', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const submission = await createSurveySubmission();
    const question = await createQuestion({ form_id: submission.form_id, input_type: 'radio' });
    const otherQuestion = await createQuestion({ form_id: submission.form_id, input_type: 'radio' });
    const foreignOption = await createOption({ question_id: otherQuestion.id });

    const res = await request(app)
      .post('/submissions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        survey_submission_id: submission.id,
        question_id: question.id,
        option_id: foreignOption.id,
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/does not belong to question/i);
  });

  it('responde 409 si ya existe una respuesta para esa pregunta en ese envío', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const submission = await createSurveySubmission();
    const question = await createQuestion({ form_id: submission.form_id, input_type: 'text' });
    await createResponse({ survey_submission_id: submission.id, question_id: question.id });

    const res = await request(app)
      .post('/submissions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        survey_submission_id: submission.id,
        question_id: question.id,
        text_value: 'Otra respuesta',
      });

    expect(res.status).toBe(409);
  });

  it('responde 403 sin un token de acceso', async () => {
    const res = await request(app).post('/submissions').send({});
    expect(res.status).toBe(403);
  });
});

describe('GET /submissions/:id', () => {
  it('devuelve una respuesta existente', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const response = await createResponse();

    const res = await request(app).get(`/submissions/${response.id}`).set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(response.id);
  });

  it('responde 404 si la respuesta no existe', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);

    const res = await request(app).get('/submissions/999999').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
  });
});

describe('PUT /submissions/:id', () => {
  it('actualiza el texto de una respuesta', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const response = await createResponse({ text_value: 'Original' });

    const res = await request(app)
      .put(`/submissions/${response.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ text_value: 'Editado' });

    expect(res.status).toBe(200);
    expect(res.body.text_value).toBe('Editado');
  });

  it('responde 400 si la nueva opción no pertenece a la pregunta de la respuesta', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const question = await createQuestion({ input_type: 'radio' });
    const response = await createResponse({ question_id: question.id });
    const otherQuestion = await createQuestion({ form_id: question.form_id, input_type: 'radio' });
    const foreignOption = await createOption({ question_id: otherQuestion.id });

    const res = await request(app)
      .put(`/submissions/${response.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ option_id: foreignOption.id });

    expect(res.status).toBe(400);
  });
});

describe('DELETE /submissions/:id', () => {
  it('elimina una respuesta existente', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const response = await createResponse();

    const res = await request(app).delete(`/submissions/${response.id}`).set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
    const deleted = await models.Response.findByPk(response.id);
    expect(deleted).toBeNull();
  });
});

describe('POST /response_options (createResponseOption)', () => {
  it('crea una selección de opción válida para la pregunta de la respuesta', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const question = await createQuestion({ input_type: 'radio' });
    const option = await createOption({ question_id: question.id });
    const response = await createResponse({ question_id: question.id, text_value: null });

    const res = await request(app)
      .post('/response_options')
      .set('Authorization', `Bearer ${token}`)
      .send({ response_id: response.id, option_id: option.id });

    expect(res.status).toBe(201);
  });

  it('responde 400 si la opción no pertenece a la pregunta de la respuesta', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const question = await createQuestion({ input_type: 'radio' });
    const response = await createResponse({ question_id: question.id, text_value: null });
    const otherQuestion = await createQuestion({ form_id: question.form_id, input_type: 'radio' });
    const foreignOption = await createOption({ question_id: otherQuestion.id });

    const res = await request(app)
      .post('/response_options')
      .set('Authorization', `Bearer ${token}`)
      .send({ response_id: response.id, option_id: foreignOption.id });

    expect(res.status).toBe(400);
  });

  it('responde 409 si esa opción ya fue seleccionada para esa respuesta', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const question = await createQuestion({ input_type: 'checkbox' });
    const option = await createOption({ question_id: question.id });
    const response = await createResponse({ question_id: question.id, text_value: null });
    await models.Response_Selected_Option.create({ response_id: response.id, option_id: option.id });

    const res = await request(app)
      .post('/response_options')
      .set('Authorization', `Bearer ${token}`)
      .send({ response_id: response.id, option_id: option.id });

    expect(res.status).toBe(409);
  });

  it('responde 403 sin un token de acceso', async () => {
    const res = await request(app).post('/response_options').send({});
    expect(res.status).toBe(403);
  });
});
