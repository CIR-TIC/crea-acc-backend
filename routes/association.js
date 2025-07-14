const express = require('express');
const router = express.Router();
const associationController = require('../controllers/association.controller');

router.get('/', associationController.getAssociations);

module.exports = router;
