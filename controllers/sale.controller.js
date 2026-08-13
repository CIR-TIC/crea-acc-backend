const { Sale, Lot } = require('../models');
const { checkActivityEditable } = require('../utils/activityEditGuard');

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
            cacao_state,
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
            cacao_state,
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

exports.updateSale = async (req, res) => {
    try {
        const { id } = req.body;
        const sale = await Sale.findByPk(id);
        if (!sale) return res.status(404).json({ error: 'Sale not found' });

        const guardError = await checkActivityEditable(sale, req.userId);
        if (guardError) return res.status(guardError.status).json({ error: guardError.message });

        const {
            date,
            unit_measure,
            quantity,
            income,
            destination,
            description,
            transportation_type,
            observation,
            cacao_state,
        } = req.body;

        await sale.update({
            date,
            unit_measure,
            quantity,
            income,
            destination,
            description,
            transportation_type,
            observation,
            cacao_state,
        });
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSale = async (req, res) => {
    try {
        const { id } = req.body;
        const sale = await Sale.findByPk(id);
        if (!sale) return res.status(404).json({ error: 'Sale not found' });

        const guardError = await checkActivityEditable(sale, req.userId);
        if (guardError) return res.status(guardError.status).json({ error: guardError.message });

        await sale.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};