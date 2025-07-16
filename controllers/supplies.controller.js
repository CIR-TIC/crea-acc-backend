// controllers/suppliesController.js
const { Supplies, Supply_Type } = require('../models');

exports.createSupply = async (req, res) => {
    try {
        const {
            date,
            description,
            amount,
            unit_measure,
            cost,
            observation,
            id_supply_type
        } = req.body;

        const supply = await Supplies.create({
            date,
            description,
            amount,
            unit_measure,
            cost,
            observation,
            id_supply_type
        });

        res.status(201).json(supply);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSupplies = async (req, res) => {
    try {
        const supplies = await Supplies.findAll({
            include: [{ model: Supply_Type, as: 'supply_type' }]
        });
        res.status(200).json(supplies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSupplyById = async (req, res) => {
    try {
        const { id } = req.body.id;
        const supply = await Supplies.findByPk(id, {
            include: [{ model: Supply_Type, as: 'supply_type' }]
        });
        if (!supply) return res.status(404).json({ error: 'Supply not found' });

        res.status(200).json(supply);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSupply = async (req, res) => {
    try {
        const { id } = req.body.id;
        const supply = await Supplies.findByPk(id);
        if (!supply) return res.status(404).json({ error: 'Supply not found' });

        await supply.update(req.body);
        res.status(200).json(supply);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSupply = async (req, res) => {
    try {
        const { id } = req.body.id;
        const supply = await Supplies.findByPk(id);
        if (!supply) return res.status(404).json({ error: 'Supply not found' });

        await supply.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
