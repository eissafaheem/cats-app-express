
const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUser,
    deleteUser,
    currentUser
}  = require('./../controllers/userController');


router.route('/signup').post(createUser)
router.route('/signin').post(loginUser)
router.route('/').delete(deleteUser).get(currentUser)

module.exports = router;