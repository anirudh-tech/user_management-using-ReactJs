const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.route('/fetchUsers')
    .get(adminController.fetchUsers)

router.route('/saveUser/:id')
    .post(adminController.saveUser)

router.route('/deleteUser/:id')
    .delete(adminController.deleteUser)

router.route('/addUser')
    .post(adminController.addUser)

module.exports = router;