const { Question } = require('../models');

exports.createQuestion = async (req, res) => {
    try {
        const { label, input_type, question_type, index, is_required, form_id } = req.body;
        const question = await Question.create({ label, input_type, question_type, index, is_required, form_id });
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.findAll();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getQuestionById = async (req, res) => {
    try {
        const { id } = req.body.id;
        const question = await Question.findByPk(id);
        if (!question) return res.status(404).json({ error: 'Question not found' });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const { id, label, input_type, question_type, index, is_required, form_id } = req.body;
        const question = await Question.findByPk(id);
        if (!question)
            return res.status(404).json({ error: 'Question not found' });
        await question.update({ label, input_type, question_type, index, is_required, form_id });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.body.id;
        const question = await Question.findByPk(id);
        if (!question) return res.status(404).json({ error: 'Question not found' });

        await question.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
