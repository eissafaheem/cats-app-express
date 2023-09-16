
const express = require('express');
const router = express.Router();
const {
    signUp,
    signIn,
    deleteUser,
    currentUser
}  = require('./../controllers/userController');


router.route('/signup').post(signUp)
router.route('/signin').post(signIn)
router.route('/').delete(deleteUser).get(currentUser)

module.exports = router;