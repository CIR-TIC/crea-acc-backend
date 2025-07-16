const { Crop, Variety } = require('../models');

exports.createCrop = async (req, res) => {
    try {
        const { name, description, id_variety } = req.body;
        const crop = await Crop.create({ name, description, id_variety });
        res.status(201).json(crop);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCrops = async (req, res) => {
    try {
        const crops = await Crop.findAll({
            include: [{ model: Variety, as: 'variety' }]
        });
        res.status(200).json(crops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCropById = async (req, res) => {
    try {
        const { id } = req.body.id;
        const crop = await Crop.findByPk(id, {
            include: [{ model: Variety, as: 'variety' }]
        });

        if (!crop) return res.status(404).json({ error: 'Crop not found' });
        res.status(200).json(crop);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCrop = async (req, res) => {
    try {
        const { id } = req.body.id;
        const crop = await Crop.findByPk(id);
        if (!crop) return res.status(404).json({ error: 'Crop not found' });

        await crop.update(req.body);
        res.status(200).json(crop);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCrop = async (req, res) => {
    try {
        const { id } = req.body.id;
        const crop = await Crop.findByPk(id);
        if (!crop) return res.status(404).json({ error: 'Crop not found' });

        await crop.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
