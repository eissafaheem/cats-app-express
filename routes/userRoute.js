
const express = require('express');
const router = express.Router();
const {
    createUser,
    signin,
    deleteUser,
    currentUser
}  = require('./../controllers/userController');


router.route('/signup').post(createUser)
router.route('/signin').post(signin)
router.route('/').delete(deleteUser).get(currentUser)

module.exports = router;