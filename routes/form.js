const express = require('express');
const { verifyToken } = require('../middlewares/authJWT');
const router = express.Router();
const formController = require('../controllers/form.controller');

//router.post('/', formController.createForm);
router.get('/', verifyToken, formController.getForms);
router.post('/', formController.getFormDetails);
router.put('/:id', formController.updateForm);
router.delete('/:id', formController.deleteForm);

module.exports = router;
