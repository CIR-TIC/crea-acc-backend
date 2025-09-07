const { Sale, Lot } = require('../models');

exports.createSale = async (req, res) => {
    try {
        const {
            date,
            unit_measure,
            quantity,
            income,
            destination,
            description,
            transportation_type,
            observation,
            id_lot
        } = req.body;

        const sale = await Sale.create({
            date,
            unit_measure,
            quantity,
            income,
            destination,
            description,
            transportation_type,
            observation,
            id_lot
        });

        res.status(201).json(sale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSales = async (req, res) => {
    try {
        const sales = await Sale.findAll({
            where: {id_lot: req.body.id_lot}
        });
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};