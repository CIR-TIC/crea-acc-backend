const db = require('../models');
const Form = db.Form;
const Question = db.Question;
const Option = db.Option;

exports.createForm = async (req, res) => {
    try {
        const { title, description } = req.body;
        const form = await Form.create({ title, description });
        res.status(201).json(form);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getForms = async (req, res) => {
    try {
        const forms = await Form.findAll();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFormDetails = async (req, res) => {
    const formId = req.body.id;

    if (!formId) {
        return res.status(400).json({ message: 'Form ID is required.' });
    }

    try {
        const form = await Form.findByPk(formId, {
            include: [
                {
                    model: Question,
                    as: 'questions',
                    include: [
                        {
                            model: Option,
                            as: 'options',
                        },
                    ],
                },
            ],
            order: [
                [{ model: Question, as: 'questions' }, 'index', 'ASC'],
                [{ model: Question, as: 'questions' }, { model: Option, as: 'options' }, 'index', 'ASC'],
            ],
        });

        if (!form) {
            return res.status(404).json({ message: 'Form not found.' });
        }

        res.status(200).json(form);
    } catch (error) {
        console.error('Error fetching form details:', error);
        res.status(500).json({
            message: 'Error retrieving form details.',
            error: error.message,
        });
    }
};

exports.getFormById = async (req, res) => {
    try {
        const { id } = req.body.id;
        const form = await Form.findByPk(id);
        if (!form) return res.status(404).json({ error: 'Form not found' });
        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateForm = async (req, res) => {
    try {
        const { id, title, description } = req.body;
        const form = await Form.findByPk(id);
        if (!form)
            return res.status(404).json({ error: 'Form not found' });
        await form.update({ title, description });
        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteForm = async (req, res) => {
    try {
        const { id } = req.body.id;
        const form = await Form.findByPk(id);
        if (!form)
            return res.status(404).json({ error: 'Form not found' });
        await form.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};