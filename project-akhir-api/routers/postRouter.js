const express = require('express')
const { postController } = require('../controllers')
const router = express.Router()

router.get('/getposts', postController.getPosts)
router.get('/getsudahbayarposts', postController.getSudahBayarPosts)
router.get('/getpostsbyid/:id', postController.getPostsById)
router.get('/getpostsbyuserid/:user_id', postController.getPostsByUserId)
router.get('/getconfirmornotposts/:status', postController.getConfirmOrNotPosts)
router.post('/uploadpembayaran/:id', postController.uploadPembayaran)
router.post('/addposts', postController.addPosts)
router.put('/updatebelumbayartosudahposts/:id', postController.updateBelumBayarToSudahPosts)
router.put('/editposts/:id', postController.editPosts)
router.delete('/deleteposts/:id', postController.deletePosts)

module.exports = router
