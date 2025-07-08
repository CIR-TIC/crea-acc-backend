const { Option } = require('../models');

exports.createOption = async (req, res) => {
    try {
        const { value, index, question_id } = req.body;
        const option = await Option.create({ value, index, question_id });
        res.status(201).json(option);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOptions = async (req, res) => {
    try {
        const options = await Option.findAll();
        res.status(200).json(options);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOptionById = async (req, res) => {
    try {
        const { id } = req.body.id;
        const option = await Option.findByPk(id);
        if (!option) return res.status(404).json({ error: 'Option not found' });
        res.status(200).json(option);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateOption = async (req, res) => {
    try {
        const { id, value, index, question_id } = req.body;
        const option = await Option.findByPk(id);
        if (!option) return res.status(404).json({ error: 'Option not found' });

        await option.update({ value, index, question_id });
        res.status(200).json(option);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteOption = async (req, res) => {
    try {
        const { id } = req.body.id;
        const option = await Option.findByPk(id);
        if (!option) return res.status(404).json({ error: 'Option not found' });

        await option.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
