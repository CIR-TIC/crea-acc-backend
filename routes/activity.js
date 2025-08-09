
const express = require('express');
const { verifyToken } = require('../middlewares/authJWT');
const router = express.Router();
const activityController = require('../controllers/activity.controller');

router.post('/', verifyToken, activityController.createActivity);
router.post('/activitiesByLot', verifyToken, activityController.getActivityByLot);

module.exports = router;
