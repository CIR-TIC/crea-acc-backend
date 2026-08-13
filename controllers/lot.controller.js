// controllers/lotController.js
const { Lot, Property, User, Activity, Harvest, Fermentation, Drying, Sale } = require('../models');

exports.createLot = async (req, res) => {
    try {
        const {
            lot_name,
            area,
            associated_crop,
            age,
            sowing_date,
            irrigation_system,
            id_variety
        } = req.body;

        const tmp_user = await User.findByPk(req.userId)

        let id_property = tmp_user.property_id
        const lot = await Lot.create({
            lot_name,
            area,
            associated_crop,
            age,
            sowing_date,
            irrigation_system,
            id_property,
            id_variety
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

exports.getLotByPropertyId = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);
        const lot = await Lot.findAll({
            where: {id_property: user.property_id}
        });

        res.status(200).json(lot);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

exports.getLotById = async (req, res) => {
    try {
        const { id } = req.body;
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
        const { id } = req.body;
        const lot = await Lot.findByPk(id);
        if (!lot) return res.status(404).json({ error: 'Lot not found' });

        const user = await User.findByPk(req.userId);
        if (lot.id_property !== user.property_id) {
            return res.status(403).json({ error: 'You do not have permission to modify this lot.' });
        }

        // Lista explícita de campos editables: nunca se debe poder reasignar
        // id_property por esta vía (cambiaría el dueño del lote).
        const {
            lot_name,
            area,
            associated_crop,
            age,
            sowing_date,
            irrigation_system,
            id_variety,
        } = req.body;

        await lot.update({
            lot_name,
            area,
            associated_crop,
            age,
            sowing_date,
            irrigation_system,
            id_variety,
        });
        res.status(200).json(lot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteLot = async (req, res) => {
    try {
        const { id } = req.body;
        const lot = await Lot.findByPk(id);
        if (!lot) return res.status(404).json({ error: 'Lot not found' });

        const user = await User.findByPk(req.userId);
        if (lot.id_property !== user.property_id) {
            return res.status(403).json({ error: 'You do not have permission to delete this lot.' });
        }

        // No se permite borrar un lote con historial de actividades: haría
        // perder registros de trazabilidad que es todo el propósito de la app.
        const [activityCount, harvestCount, fermentationCount, dryingCount, saleCount] = await Promise.all([
            Activity.count({ where: { id_lot: id } }),
            Harvest.count({ where: { id_lot: id } }),
            Fermentation.count({ where: { id_lot: id } }),
            Drying.count({ where: { id_lot: id } }),
            Sale.count({ where: { id_lot: id } }),
        ]);
        const totalActivities = activityCount + harvestCount + fermentationCount + dryingCount + saleCount;
        if (totalActivities > 0) {
            return res.status(409).json({
                error: 'This lot has recorded activities and cannot be deleted.',
            });
        }

        await lot.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
