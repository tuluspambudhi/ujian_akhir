const express = require('express')
const { loginController } = require('../controllers')
const router = express.Router()

router.post('/loginpost', loginController.loginPost)
router.post('/keeplogin', loginController.keepLogin)

module.exports = router