const { Sale, Lot } = require('../models');

exports.createSale = async (req, res) => {
    try {
        const {
            date,
            quantity,
            unit,
            price_per_unit,
            total,
            buyer,
            notes,
            id_lot
        } = req.body;

        const sale = await Sale.create({
            date,
            quantity,
            unit,
            price_per_unit,
            total,
            buyer,
            notes,
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
            include: [{ model: Lot, as: 'lot' }]
        });
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSaleById = async (req, res) => {
    try {
        const { id } = req.body.id;
        const sale = await Sale.findByPk(id, {
            include: [{ model: Lot, as: 'lot' }]
        });

        if (!sale) return res.status(404).json({ error: 'Sale not found' });
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSale = async (req, res) => {
    try {
        const { id } = req.body.id;
        const sale = await Sale.findByPk(id);
        if (!sale) return res.status(404).json({ error: 'Sale not found' });

        await sale.update(req.body);
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSale = async (req, res) => {
    try {
        const { id } = req.body.id;
        const sale = await Sale.findByPk(id);
        if (!sale) return res.status(404).json({ error: 'Sale not found' });

        await sale.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
