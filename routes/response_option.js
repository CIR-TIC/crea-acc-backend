const express = require('express');
const router = express.Router();
const controller = require('../controllers/response_option.controller');

router.post('/', controller.createResponseOption);
router.get('/', controller.getResponseOptions);
router.get('/:id', controller.getResponseOptionById);
router.put('/:id', controller.updateResponseOption);
router.delete('/:id', controller.deleteResponseOption);

module.exports = router;
