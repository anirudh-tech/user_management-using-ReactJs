const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const upload = require('../middlewares/multer')

router.route('/user/signup')
    .post(userController.postSignup)

router.route('/user/userDetails/:id')
    .get(userController.getDetails)

router.route('/user/authentication')
    .get(userController.getAuth)

router.route('/user/login')
    .post(userController.postLogin)

router.route('/user/logout')
    .get(userController.logout)

router.route('/user/imageUpload/:id')
    .post(upload.single('image'), userController.imageUpload)


module.exports = router;