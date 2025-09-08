const db = require('../models');
const { Form, Question, Option, Survey_Submission, Response, Response_Selected_Option } = db;
const { Op } = require('sequelize');

exports.submitSurvey = async (req, res) => {
  const { formId, submittedAt, submissionCode, answers } = req.body;
  const userId = req.userId

  if (!formId || !submittedAt || !submissionCode || !answers || Object.keys(answers).length === 0) {
    return res.status(400).json({ message: 'Missing required submission data (formId, submittedAt, submissionCode, answers).' });
  }

  const formIdInt = parseInt(formId, 10);
  if (isNaN(formIdInt)) {
    return res.status(400).json({ message: 'Invalid formId.' });
  }

  const userIdInt = userId === null ? null : parseInt(userId, 10);
  if (userId !== null && isNaN(userIdInt)) {
    return res.status(400).json({ message: 'Invalid userId.' });
  }

  if (isNaN(new Date(submittedAt).getTime())) {
    return res.status(400).json({ message: 'Invalid submittedAt date format.' });
  }

  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    const form = await Form.findByPk(formIdInt, { transaction });
    if (!form) {
      await transaction.rollback();
      return res.status(404).json({ message: `Form with ID ${formIdInt} not found.` });
    }

    const surveySubmission = await Survey_Submission.create({
      form_id: formIdInt,
      pollster_id: userIdInt,
      date: submittedAt,
      submission_code: submissionCode,
    }, { transaction });

    const questionIds = Object.keys(answers).map(id => parseInt(id, 10));
    if (questionIds.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ message: 'No answers provided.' });
    }

    const questionsWithDetails = await Question.findAll({
      where: {
        id: { [Op.in]: questionIds },
        form_id: formIdInt,
      },
      include: [{
        model: Option,
        as: 'options',
      }],
      transaction,
    });

    const questionsMap = new Map();
    questionsWithDetails.forEach(q => questionsMap.set(q.id, q));

    const responsesToCreate = [];
    const optionResponsesToCreate = [];

    for (const questionIdStr in answers) {
      const questionId = parseInt(questionIdStr, 10);
      const answer = answers[questionIdStr];
      const question = questionsMap.get(questionId);

      if (!question) {
        await transaction.rollback();
        return res.status(400).json({ message: `Question with ID ${questionId} not found in Form ${formIdInt}.` });
      }

      if (['text', 'textarea', 'number'].includes(question.input_type)) {
        if (typeof answer !== 'string' && typeof answer !== 'number') {
          await transaction.rollback();
          return res.status(400).json({ message: `Invalid answer format for question ${questionId}. Expected string/number for input type ${question.input_type}.` });
        }
        responsesToCreate.push({
          survey_submission_id: surveySubmission.id,
          question_id: question.id,
          text_value: String(answer),
        });
      } else if (['radio', 'select', '"checkbox"'].includes(question.input_type)) {
        if (typeof answer !== 'string') {
          await transaction.rollback();
          return res.status(400).json({ message: `Invalid answer format for question ${questionId}. Expected string (option ID) for input type ${question.input_type}.` });
        }
        const optionId = parseInt(answer, 10);
        const validOption = question.options.some(opt => opt.id === optionId);
        if (!validOption) {
          await transaction.rollback();
          return res.status(400).json({ message: `Option ID ${optionId} is not valid for question ${questionId} (input type ${question.input_type}).` });
        }
        responsesToCreate.push({
          survey_submission_id: surveySubmission.id,
          question_id: question.id,
          text_value: null,
        });
        optionResponsesToCreate.push({
          question_id: question.id,
          option_id: optionId,
        });
      } else if (question.input_type === 'checkbox') {

        if (!Array.isArray(answer) || answer.length === 0) {
          await transaction.rollback();
          return res.status(400).json({ message: `Invalid answer format for question ${questionId}. Expected non-empty array of option IDs for input type checkbox.` });
        }
        const validOptions = question.options.map(opt => opt.id);
        const receivedOptionIds = answer.map(id => parseInt(id, 10));

        for (const receivedOptId of receivedOptionIds) {
          if (!validOptions.includes(receivedOptId)) {
            await transaction.rollback();
            return res.status(400).json({ message: `Option ID ${receivedOptId} is not valid for question ${questionId} (input type checkbox).` });
          }
        }

        responsesToCreate.push({
          survey_submission_id: surveySubmission.id,
          question_id: question.id,
          text_value: null,
        });
        receivedOptionIds.forEach(optId => {
          optionResponsesToCreate.push({
            question_id: question.id,
            option_id: optId,
          });
        });
      } else if (question.input_type === 'note') {
        console.log("note")
      }
      else {
        await transaction.rollback();
        return res.status(400).json({ message: `Unsupported input_type: ${question.input_type} for question ${questionId}.` });
      }
    }
    const createdResponses = await Response.bulkCreate(responsesToCreate, { transaction });

    const finalOptionResponses = [];
    for (const or of optionResponsesToCreate) {
      const parentResponse = createdResponses.find(
        r => r.question_id === or.question_id && r.survey_submission_id === surveySubmission.id
      );
      if (parentResponse) {
        finalOptionResponses.push({
          response_id: parentResponse.id,
          option_id: or.option_id,
        });
      } else {
        console.warn(`Could not find parent response for question ID ${or.question_id} to create option response for option ID ${or.option_id}`);
      }
    }

    if (finalOptionResponses.length > 0) {
      await Response_Selected_Option.bulkCreate(finalOptionResponses, { transaction });
    }

    await transaction.commit();
    res.status(201).json({
      message: 'Survey submission successful.',
      submissionId: surveySubmission.id,
      submissionCode: surveySubmission.submission_code,
    });

  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Error submitting survey:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        message: 'Submission code already exists. Please use a unique code.',
        error: error.message,
      });
    }
    res.status(500).json({
      message: 'Error processing survey submission.',
      error: error.message,
    });
  }
};

exports.getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.findAll();
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSurveySubmissionDetails = async (req, res) => {
  const submissionId = req.body.id;

  if (!submissionId) {
    return res.status(400).json({ message: 'Submission ID is required.' });
  }

  const submissionIdInt = parseInt(submissionId, 10);
  if (isNaN(submissionIdInt)) {
    return res.status(400).json({ message: 'Invalid Submission ID.' });
  }

  try {
    const submissionDetails = await Survey_Submission.findByPk(submissionIdInt, {
      include: [
        {
          model: Form,
          attributes: ['title', 'description'],
        },
        {
          model: Response,
          include: [
            {
              model: Question,
              attributes: ['label', 'input_type', 'question_type', 'index'],
            },
            {
              model: Response_Selected_Option,
              include: [
                {
                  model: Option,
                  attributes: ['value', 'index'],
                },
              ],
            },
          ],
          order: [
            [{ model: Question }, 'index', 'ASC']
          ]
        },
      ],
    });

    if (!submissionDetails) {
      return res.status(404).json({ message: `Survey submission with ID ${submissionIdInt} not found.` });
    }
    res.status(200).json(submissionDetails);

  } catch (error) {
    console.error('Error fetching survey submission details:', error);
    res.status(500).json({
      message: 'Error retrieving survey submission details.',
      error: error.message,
    });
  }
};

exports.updateSurvey = async (req, res) => {
  try {
    const { id, code, date } = req.body;
    const survey = await Survey.findByPk(id);
    if (!survey) return res.status(404).json({ error: 'Survey not found' });

    await survey.update({ code, date });
    res.status(200).json(survey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSurvey = async (req, res) => {
  try {
    const { id } = req.body.id;
    const survey = await Survey.findByPk(id);
    if (!survey) return res.status(404).json({ error: 'Survey not found' });

    await survey.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
