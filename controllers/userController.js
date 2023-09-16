const User = require("./../models/userModel")
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

const createUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        avatarId,
        pawints
    } = req.body;

    const user =  await User.create({
        name,
        email,
        password,
        avatarId,
        pawints
    })
    console.log(user);
    res.json(user);
});

const loginUser = (req, res) => {
    const {
        email,
        password
    } = req.body;

    const user = User.findOne({email});
    if(user){
        
    }

    const accessToken = jwt.sign(
        {
            user: {
                _id: user._id,
                email: user.email,
                name: user.name 
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "2 days"}
    )

    res.status(200).json({accessToken});

}

const deleteUser = (req, res) => {
    res.send("User added")
}

const currentUser = (req, res) => {
    res.send("User added")
}

module.exports = {
    createUser,
    loginUser,
    deleteUser,
    currentUser
};