
const express = require('express');
const router = express.Router();
const {
    createUser,
    signin,
    deleteUser,
    searchUser,
    currentUser
}  = require('./../controllers/userController');


router.route('/signup').post(createUser)
router.route('/signin').post(signin)
router.route('/:token').get(searchUser)
router.route('/').delete(deleteUser).get(currentUser)

module.exports = router;