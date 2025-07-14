// routes/responseRoutes.js
const express = require('express');
const router = express.Router();
const responseController = require('../controllers/response.controller');

router.post('/', responseController.createResponse);
router.get('/', responseController.getResponses);
router.get('/:id', responseController.getResponseById);
router.put('/:id', responseController.updateResponse);
router.delete('/:id', responseController.deleteResponse);

module.exports = router;
