const request = require('supertest');
const app = require('../app');
const { models, truncateAll, closeDb } = require('./helpers/db');
const {
  createUser,
  createForm,
  createSection,
  createQuestion,
  createOption,
  tokenFor,
} = require('./helpers/factories');

beforeEach(async () => {
  await truncateAll();
});

afterAll(async () => {
  await closeDb();
});

describe('POST /forms (getFormDetails)', () => {
  it('devuelve el formulario con sus secciones, preguntas y opciones anidadas', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const form = await createForm();
    const section = await createSection({ form_id: form.id, title: 'Datos Generales', index: 1 });
    const question = await createQuestion({
      form_id: form.id,
      section_id: section.id,
      label: '¿Cumple la norma?',
      input_type: 'radio',
      question_type: 'boolean',
      index: 1,
    });
    await createOption({ question_id: question.id, value: 'Sí', index: 1 });
    await createOption({ question_id: question.id, value: 'No', index: 2 });

    const res = await request(app)
      .post('/forms')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: form.id });

    expect(res.status).toBe(200);
    expect(res.body.sections).toHaveLength(1);
    expect(res.body.sections[0].title).toBe('Datos Generales');
    expect(res.body.questions).toHaveLength(1);
    expect(res.body.questions[0].options).toHaveLength(2);
  });

  it('responde 400 si falta el id del formulario', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);

    const res = await request(app).post('/forms').set('Authorization', `Bearer ${token}`).send({});

    expect(res.status).toBe(400);
  });

  it('responde 404 si el formulario no existe', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);

    const res = await request(app)
      .post('/forms')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: 999999 });

    expect(res.status).toBe(404);
  });

  it('responde 403 sin un token de acceso', async () => {
    const form = await createForm();
    const res = await request(app).post('/forms').send({ id: form.id });

    expect(res.status).toBe(403);
  });
});

describe('GET /forms', () => {
  it('responde 403 sin un token de acceso', async () => {
    const res = await request(app).get('/forms');
    expect(res.status).toBe(403);
  });
});

describe('POST /surveys (submitSurvey)', () => {
  async function buildForm() {
    const form = await createForm();
    const textQuestion = await createQuestion({
      form_id: form.id,
      label: 'Nombre de la asociación',
      input_type: 'text',
      question_type: 'short_answer',
      index: 1,
      is_required: true,
    });
    const numberQuestion = await createQuestion({
      form_id: form.id,
      label: 'Número de productores',
      input_type: 'number',
      question_type: 'short_answer',
      index: 2,
      is_required: true,
    });
    const percentQuestion = await createQuestion({
      form_id: form.id,
      label: '% de mujeres',
      input_type: 'number',
      question_type: 'short_answer',
      index: 3,
      is_required: false,
      min_value: 0,
      max_value: 100,
    });
    const radioQuestion = await createQuestion({
      form_id: form.id,
      label: '¿Cumple la norma?',
      input_type: 'radio',
      question_type: 'boolean',
      index: 4,
      is_required: true,
    });
    const yesOption = await createOption({ question_id: radioQuestion.id, value: 'Sí', index: 1 });
    const noOption = await createOption({ question_id: radioQuestion.id, value: 'No', index: 2 });
    const checkboxQuestion = await createQuestion({
      form_id: form.id,
      label: 'Documentos entregados',
      input_type: 'checkbox',
      question_type: 'single_choice',
      index: 5,
      is_required: false,
    });
    const docOptionA = await createOption({ question_id: checkboxQuestion.id, value: 'Acta', index: 1 });
    const docOptionB = await createOption({ question_id: checkboxQuestion.id, value: 'RUC', index: 2 });

    return {
      form,
      textQuestion,
      numberQuestion,
      percentQuestion,
      radioQuestion,
      yesOption,
      noOption,
      checkboxQuestion,
      docOptionA,
      docOptionB,
    };
  }

  function baseAnswers({ textQuestion, numberQuestion, radioQuestion, yesOption }) {
    return {
      [textQuestion.id]: 'Asociación de prueba',
      [numberQuestion.id]: '12',
      [radioQuestion.id]: String(yesOption.id),
    };
  }

  it('crea el envío y sus respuestas para texto, número, radio y checkbox', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const ctx = await buildForm();

    const res = await request(app)
      .post('/surveys')
      .set('Authorization', `Bearer ${token}`)
      .send({
        formId: ctx.form.id,
        submittedAt: new Date().toISOString(),
        submissionCode: 'AUD-001',
        answers: {
          ...baseAnswers(ctx),
          [ctx.checkboxQuestion.id]: [String(ctx.docOptionA.id), String(ctx.docOptionB.id)],
        },
      });

    expect(res.status).toBe(201);
    expect(res.body.submissionCode).toBe('AUD-001');

    const submission = await models.Survey_Submission.findByPk(res.body.submissionId);
    expect(submission).not.toBeNull();
    expect(submission.pollster_id).toBe(user.id);

    const responses = await models.Response.findAll({
      where: { survey_submission_id: submission.id },
    });
    expect(responses).toHaveLength(4);

    const radioResponse = responses.find((r) => r.question_id === ctx.radioQuestion.id);
    const selectedOptions = await models.Response_Selected_Option.findAll({
      where: { response_id: radioResponse.id },
    });
    expect(selectedOptions).toHaveLength(1);
    expect(selectedOptions[0].option_id).toBe(ctx.yesOption.id);

    const checkboxResponse = responses.find((r) => r.question_id === ctx.checkboxQuestion.id);
    const checkboxSelections = await models.Response_Selected_Option.findAll({
      where: { response_id: checkboxResponse.id },
    });
    expect(checkboxSelections).toHaveLength(2);
  });

  it('no crea respuesta para un checkbox opcional enviado como array vacío', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const ctx = await buildForm();

    const res = await request(app)
      .post('/surveys')
      .set('Authorization', `Bearer ${token}`)
      .send({
        formId: ctx.form.id,
        submittedAt: new Date().toISOString(),
        submissionCode: 'AUD-002',
        answers: { ...baseAnswers(ctx), [ctx.checkboxQuestion.id]: [] },
      });

    expect(res.status).toBe(201);
    const responses = await models.Response.findAll({
      where: { survey_submission_id: res.body.submissionId },
    });
    expect(responses.find((r) => r.question_id === ctx.checkboxQuestion.id)).toBeUndefined();
  });

  it('responde 400 si falta una pregunta obligatoria del formulario, aunque no venga en el body', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const ctx = await buildForm();
    const answers = baseAnswers(ctx);
    delete answers[ctx.radioQuestion.id];

    const res = await request(app)
      .post('/surveys')
      .set('Authorization', `Bearer ${token}`)
      .send({
        formId: ctx.form.id,
        submittedAt: new Date().toISOString(),
        submissionCode: 'AUD-003',
        answers,
      });

    expect(res.status).toBe(400);
    expect(res.body.missingQuestionIds).toContain(ctx.radioQuestion.id);

    const submissionCount = await models.Survey_Submission.count();
    expect(submissionCount).toBe(0);
  });

  it('responde 400 si la respuesta numérica no es un número válido', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const ctx = await buildForm();

    const res = await request(app)
      .post('/surveys')
      .set('Authorization', `Bearer ${token}`)
      .send({
        formId: ctx.form.id,
        submittedAt: new Date().toISOString(),
        submissionCode: 'AUD-004',
        answers: { ...baseAnswers(ctx), [ctx.numberQuestion.id]: 'no-es-un-numero' },
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/valid number/i);
  });

  it('responde 400 si la respuesta numérica queda fuera del rango min/max', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const ctx = await buildForm();

    const res = await request(app)
      .post('/surveys')
      .set('Authorization', `Bearer ${token}`)
      .send({
        formId: ctx.form.id,
        submittedAt: new Date().toISOString(),
        submissionCode: 'AUD-005',
        answers: { ...baseAnswers(ctx), [ctx.percentQuestion.id]: '150' },
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/less than or equal to/i);

    const submissionCount = await models.Survey_Submission.count();
    expect(submissionCount).toBe(0);
  });

  it('responde 400 si la opción elegida no pertenece a la pregunta', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const ctx = await buildForm();
    const otherQuestion = await createQuestion({
      form_id: ctx.form.id,
      input_type: 'radio',
      question_type: 'boolean',
      index: 6,
      is_required: false,
    });
    const foreignOption = await createOption({ question_id: otherQuestion.id, value: 'Otra', index: 1 });

    const res = await request(app)
      .post('/surveys')
      .set('Authorization', `Bearer ${token}`)
      .send({
        formId: ctx.form.id,
        submittedAt: new Date().toISOString(),
        submissionCode: 'AUD-006',
        answers: { ...baseAnswers(ctx), [ctx.radioQuestion.id]: String(foreignOption.id) },
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/not valid/i);
  });

  it('responde 404 si el formulario no existe', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);

    const res = await request(app)
      .post('/surveys')
      .set('Authorization', `Bearer ${token}`)
      .send({
        formId: 999999,
        submittedAt: new Date().toISOString(),
        submissionCode: 'AUD-007',
        answers: { '1': 'x' },
      });

    expect(res.status).toBe(404);
  });

  it('responde 409 si el código de envío ya existe', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const ctx = await buildForm();
    const payload = {
      formId: ctx.form.id,
      submittedAt: new Date().toISOString(),
      submissionCode: 'AUD-DUP',
      answers: baseAnswers(ctx),
    };

    const first = await request(app).post('/surveys').set('Authorization', `Bearer ${token}`).send(payload);
    expect(first.status).toBe(201);

    const second = await request(app).post('/surveys').set('Authorization', `Bearer ${token}`).send(payload);
    expect(second.status).toBe(409);

    const submissionCount = await models.Survey_Submission.count();
    expect(submissionCount).toBe(1);
  });

  it('responde 403 sin un token de acceso', async () => {
    const ctx = await buildForm();
    const res = await request(app)
      .post('/surveys')
      .send({
        formId: ctx.form.id,
        submittedAt: new Date().toISOString(),
        submissionCode: 'AUD-008',
        answers: baseAnswers(ctx),
      });

    expect(res.status).toBe(403);
  });
});

describe('POST /surveys/getSurveySubmissionDetails', () => {
  it('devuelve el envío con sus respuestas y las opciones seleccionadas', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);
    const form = await createForm();
    const question = await createQuestion({
      form_id: form.id,
      label: '¿Cumple la norma?',
      input_type: 'radio',
      question_type: 'boolean',
      index: 1,
    });
    const option = await createOption({ question_id: question.id, value: 'Sí', index: 1 });

    const submitRes = await request(app)
      .post('/surveys')
      .set('Authorization', `Bearer ${token}`)
      .send({
        formId: form.id,
        submittedAt: new Date().toISOString(),
        submissionCode: 'AUD-DETAIL-1',
        answers: { [question.id]: String(option.id) },
      });
    expect(submitRes.status).toBe(201);

    const res = await request(app)
      .post('/surveys/getSurveySubmissionDetails')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: submitRes.body.submissionId });

    expect(res.status).toBe(200);
    expect(res.body.Responses).toHaveLength(1);
    expect(res.body.Responses[0].Response_Selected_Options[0].Option.value).toBe('Sí');
  });

  it('responde 400 si falta el id del envío', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);

    const res = await request(app)
      .post('/surveys/getSurveySubmissionDetails')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(400);
  });

  it('responde 404 si el envío no existe', async () => {
    const user = await createUser();
    const token = tokenFor(user.id);

    const res = await request(app)
      .post('/surveys/getSurveySubmissionDetails')
      .set('Authorization', `Bearer ${token}`)
      .send({ id: 999999 });

    expect(res.status).toBe(404);
  });

  it('responde 403 sin un token de acceso', async () => {
    const res = await request(app).post('/surveys/getSurveySubmissionDetails').send({ id: 1 });
    expect(res.status).toBe(403);
  });
});
