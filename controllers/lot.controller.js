// controllers/lotController.js
const { Lot, Property } = require('../models');

exports.createLot = async (req, res) => {
    try {
        const {
            lot_id,
            area,
            crop_type,
            age,
            sowing_date,
            irrigation_system,
            id_property,
            id_crop
        } = req.body;

        const lot = await Lot.create({
            lot_id,
            area,
            crop_type,
            age,
            sowing_date,
            irrigation_system,
            id_property,
            id_crop
        });

        res.status(201).json(lot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLots = async (req, res) => {
    try {
        const lots = await Lot.findAll({
            include: [{ model: Property, as: 'property' }]
        });
        res.status(200).json(lots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLotById = async (req, res) => {
    try {
        const { id } = req.body.id;
        const lot = await Lot.findByPk(id, {
            include: [{ model: Property, as: 'property' }]
        });

        if (!lot) return res.status(404).json({ error: 'Lot not found' });
        res.status(200).json(lot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateLot = async (req, res) => {
    try {
        const { id } = req.body.id;
        const lot = await Lot.findByPk(id);
        if (!lot) return res.status(404).json({ error: 'Lot not found' });

        await lot.update(req.body);
        res.status(200).json(lot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteLot = async (req, res) => {
    try {
        const { lot_id } = req.body.id;
        const lot = await Lot.findByPk(lot_id);
        if (!lot) return res.status(404).json({ error: 'Lot not found' });

        await lot.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
