const express = require('express')
const { userController } = require('../controllers');

const router = express.Router();

router.get('/getusers', userController.getUsers)
router.get('/getusersbyid/:id', userController.getUsersById)
router.get('/getusersbyemailpass', userController.getUsersByEmailPass)
router.post('/resendemailver', userController.resendEmailVer)
router.post('/addusers', userController.addUsers)
router.put('/editusers/:id', userController.editUsers)
router.put('/emailverifikasi', userController.emailVerifikasi)

module.exports = router