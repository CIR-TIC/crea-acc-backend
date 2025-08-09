// controllers/activityController.js
const { Activity, Lot } = require('../models');

exports.createActivity = async (req, res) => {
    try {
        const {
            name,
            description,
            date,
            equipment,
            dose,
            labour_amount,
            labour_cost,
            observation,
            status,
            id_lot,
            id_type_activity
        } = req.body;

        const activity = await Activity.create({
            name,
            description,
            date,
            equipment,
            dose,
            labour_amount,
            labour_cost,
            observation,
            status,
            id_lot,
            id_type_activity
        });

        res.status(201).json(activity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll({
            include: [{ model: Lot, as: 'lot' }]
        });
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getActivityByLot = async (req, res) => {
    try {
        const id_lot = req.body.id_lot;
        const activity = await Activity.findAll({
            where: { id_lot: id_lot }
        });

        if (!activity) return res.status(404).json({ error: 'Activity not found' });
        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateActivity = async (req, res) => {
    try {
        const { id } = req.body.id;
        const activity = await Activity.findByPk(id);
        if (!activity) return res.status(404).json({ error: 'Activity not found' });

        await activity.update(req.body);
        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteActivity = async (req, res) => {
    try {
        const { id } = req.body.id;
        const activity = await Activity.findByPk(id);
        if (!activity) return res.status(404).json({ error: 'Activity not found' });

        await activity.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
