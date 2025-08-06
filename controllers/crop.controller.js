const { Crop, Variety } = require('../models');

exports.getCrops = async (req, res) => {
    try {
        const crops = await Crop.findAll();
        res.status(200).json(crops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCropById = async (req, res) => {
    try {
        const id = req.body.id;
        const crop = await Crop.findByPk(id, {
            include: [{ model: Variety }]
        });

        if (!crop) return res.status(404).json({ error: 'Crop not found' });
        res.status(200).json(crop);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};
