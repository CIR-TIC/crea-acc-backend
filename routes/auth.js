const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth.controller')

router.post('/signin', auth.signin)
router.post('/signup', auth.signup)
router.post('/refreshToken', auth.refreshToken)

module.exports = router