
const express = require('express');
const { verifyToken } = require('../middlewares/authJWT');
const router = express.Router();
const typeActivityController = require('../controllers/type_activity.controller');

router.get('/', verifyToken, typeActivityController.getTypeActivities);

module.exports = router;
