const { Type_Activity } = require('../models');

exports.createTypeActivity = async (req, res) => {
    try {
        const { name, description } = req.body;
        const type = await Type_Activity.create({ name, description });
        res.status(201).json(type);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTypeActivities = async (req, res) => {
    try {
        const types = await Type_Activity.findAll();
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTypeActivityById = async (req, res) => {
    try {
        const { id } = req.body.id;
        const type = await Type_Activity.findByPk(id);
        if (!type) return res.status(404).json({ error: 'Type_Activity not found' });
        res.status(200).json(type);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTypeActivity = async (req, res) => {
    try {
        const { id } = req.body.id;
        const type = await Type_Activity.findByPk(id);
        if (!type) return res.status(404).json({ error: 'Type_Activity not found' });

        await type.update(req.body);
        res.status(200).json(type);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTypeActivity = async (req, res) => {
    try {
        const { id } = req.body.id;
        const type = await Type_Activity.findByPk(id);
        if (!type) return res.status(404).json({ error: 'Type_Activity not found' });

        await type.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
