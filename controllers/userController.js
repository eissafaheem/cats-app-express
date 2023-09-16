const User = require("./../models/userModel")
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const createUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        avatarId,
        pawints
    } = req.body;
    
    const userFromDb = await mongoose.findOne({email});
    if(userFromDb){
        res.status(400);
        throw new Error("User already exists!")
    }

    const hashedPassword = bcrypt.hash(password, 10)

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

const loginUser = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const userFromDb = User.findOne({email});
    if(!userFromDb){
        res.status(404);
        throw new Error("User does not exist")
    }

    if(await bcrypt.compare(password, userFromDb.password)){
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
    else{
        res.status(401);
        throw new Error("invalid email or password!");
    }

}

const deleteUser = (req, res) => {
    res.send("User deleted")
}

const currentUser = (req, res) => {
    res.json(req.user);
}

module.exports = {
    createUser,
    loginUser,
    deleteUser,
    currentUser
};