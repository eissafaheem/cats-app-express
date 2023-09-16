const User = require("./../models/userModel")
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const bcrypt = require("bcrypt");

const createUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        avatarId,
        pawints
    } = req.body;
    
    const userFromDb = await User.findOne({email});
    if(userFromDb){
        res.status(400);
        throw new Error("User already exists!")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user =  await User.create({
        name,
        email,
        password: hashedPassword,
        avatarId,
        pawints
    })

    res.status(200).json({
        id: user._id,
        name,
        email,
    });
});

const signin = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const userFromDb = await User.findOne({email});
    if(!userFromDb){
        res.status(404);
        throw new Error("User does not exist");
    }

    if(await bcrypt.compare(password, userFromDb.password)){
        const accessToken = jwt.sign(
            {
                user: {
                    _id: userFromDb._id,
                    email: userFromDb.email,
                    name: userFromDb.name 
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "2 days"}
        )
    
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("invalid email or password!");
    }

});

const deleteUser = (req, res) => {
    res.send("User deleted")
}

const currentUser = (req, res) => {
    res.json(req.user);
}

module.exports = {
    createUser,
    signin,
    deleteUser,
    currentUser
};