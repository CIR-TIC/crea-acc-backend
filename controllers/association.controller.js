const Association = require('../models').Association

exports.getAssociations = async (req, res) => {
    try {
        const associations = await Association.findAll();
        res.status(200).json(associations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};