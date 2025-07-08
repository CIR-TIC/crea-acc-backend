const Form = require('../models').Form

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