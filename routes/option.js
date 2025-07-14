const express = require('express');
const router = express.Router();
const optionController = require('../controllers/option.controller');

router.post('/', optionController.createOption);
router.get('/', optionController.getOptions);
router.get('/:id', optionController.getOptionById);
router.put('/:id', optionController.updateOption);
router.delete('/:id', optionController.deleteOption);

module.exports = router;
